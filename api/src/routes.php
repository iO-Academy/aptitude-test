<?php


// Routes

$app->get('/', function ($request, $response, $args) {
    // Render index view
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $this->renderer->render($response, 'index.phtml', $args);
});


$app->post('/user', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $user = $request->getParsedBody();

    if (empty($user['email']) || empty($user['name'])) {
        $data['message'] = 'Invalid parameters, please provide both email and name.';
        $data['data'] = $user;
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {
        $user['test_id'] = $user['test_id'] ?? 1;

        if (!empty($user['time'])) {
            $query = "INSERT INTO `user` (`email`, `name`, `time`, `test_id`) VALUES (:email, :name, :time, :testId);";
            $query = $this->db->prepare($query);
            $query->bindParam(':time', $user['time']);
        } else {
            $query = "INSERT INTO `user` (`email`, `name`, `test_id`) VALUES (:email, :name, :testId);";
            $query = $this->db->prepare($query);
        }

        $query->bindParam(':testId', $user['test_id']);
        $query->bindParam(':email', $user['email']);
        $query->bindParam(':name', $user['name']);
        $query->execute();

        $query = "SELECT * from `user` WHERE `id` = :id";
        $query = $this->db->prepare($query);
        $id = $this->db->lastInsertId();
        $query->bindParam(':id', $id);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'User registered.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->post('/user/edit', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $user = $request->getParsedBody();

    if (
        empty($user['email']) ||
        empty($user['name']) ||
        empty($user['id']) ||
        !isset($user['canRetake'])
    ) {
        $data['message'] = 'Invalid parameters.';
        $data['data'] = $user;
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {

        $user['time'] = $user['time'] ?? 1800;

        $query = "UPDATE `user` SET `email` = :email, `name` = :name, `canRetake` = :retake, `time` = :time WHERE `id` = :id;";
        $query = $this->db->prepare($query);
        $query->bindParam(':email', $user['email']);
        $query->bindParam(':name', $user['name']);
        $query->bindParam(':retake', $user['canRetake']);
        $query->bindParam(':time', $user['time']);
        $query->bindParam(':id', $user['id']);
        $query->execute();
    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'User updated.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->get('/user', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $email = $request->getQueryParam('email');

    if (empty($email)) {
        try {
            $query = "SELECT `id`, `email`, `name`, `dateCreated`, `isAdmin`, `canRetake`, `time`, `deleted` from `user` ORDER BY `dateCreated` DESC;";
            $query = $this->db->prepare($query);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
        $data['success'] = true;
        $data['message'] = 'Users found.';

    } else {

        try {
            $query = "SELECT `id`, `email`, `name`, `dateCreated`, `isAdmin`, `canRetake`, `time` from `user` WHERE `email` = :email AND `deleted` <> 1";
            $query = $this->db->prepare($query);
            $query->bindParam(':email', $email);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }

        $data['message'] = 'User not registered.';
        $data['success'] = false;
        if ($result) {
            $data['message'] = 'User found.';
            $data['success'] = true;
        }
    }

    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);

});

$app->post('/user/delete/{id}', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $user = $args;

    if (!empty($user['id']) && is_numeric($user['id'])) {
        try {
            $query = "UPDATE `user` SET `deleted` = '1' WHERE `id` = :id;";
            $query = $this->db->prepare($query);
            $query->execute(['id' => $user['id']]);
        } catch(Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }

        $data['success'] = true;
        $data['message'] = 'Successfully deleted user.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data);
    }
});

$app->get('/question', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $get = $request->getQueryParams();

    try {
        $query = "SELECT `id`, `text`, `option1`, `option2`, `option3`, `option4`, `option5`, `test_id` FROM `question` WHERE `deleted` <> 1 AND `test_id` = :testId;";

        $testId = $get['test_id'] ?? 1;

        $query = $this->db->prepare($query);
        $query->bindParam(':testId', $testId);

        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved questions.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->post('/question', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $question = $request->getParsedBody();

    if (
        !empty($question['text']) &&
        !empty($question['option1']) &&
        !empty($question['option2']) &&
        !empty($question['answer'])
    ) {

        try {

            $question['option3'] = $question['option3'] ?? NULL;
            $question['option4'] = $question['option4'] ?? NULL;
            $question['option5'] = $question['option5'] ?? NULL;
            $question['test_id'] = $question['test_id'] ?? 1;

            $query = "INSERT INTO `question`
                        (`text`, `option1`, `option2`, `option3`, `option4`, `option5`, `answer`, `test_id`)
                          VALUES
                        (:text, :option1, :option2, :option3, :option4, :option5, :answer, :testId)";
            $query = $this->db->prepare($query);

            $query->bindParam(':text', $question['text']);
            $query->bindParam(':option1', $question['option1']);
            $query->bindParam(':option2', $question['option2']);
            $query->bindParam(':option3', $question['option3']);
            $query->bindParam(':option4', $question['option4']);
            $query->bindParam(':option5', $question['option5']);
            $query->bindParam(':answer', $question['answer']);
            $query->bindParam(':testId', $question['test_id']);

            $data['success'] = $query->execute();
            $data['data']['id'] = $this->db->lastInsertId();
            $data['message'] = 'Question added successfully';
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data);

        } catch (Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
    }

    $data['message'] = 'Missing data.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data, 400);

});

$app->post('/question/{id}/edit', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $question = $request->getParsedBody();

    if (
        !empty($question['text']) &&
        !empty($question['option1']) &&
        !empty($question['option2']) &&
        !empty($question['answer']) &&
        !empty($args['id'])
    ) {

        try {

            $question['option3'] = $question['option3'] ?? NULL;
            $question['option4'] = $question['option4'] ?? NULL;
            $question['option5'] = $question['option5'] ?? NULL;


            if (empty($question['test_id'])) {
                $query = "UPDATE `question` SET
                        `text` = :text,
                        `option1` = :option1,
                        `option2` = :option2,
                        `option3` = :option3,
                        `option4` = :option4,
                        `option5` = :option5,
                        `answer` = :answer,
                        WHERE `id` = :id";
            } else {
                $query = "UPDATE `question` SET
                        `text` = :text,
                        `option1` = :option1,
                        `option2` = :option2,
                        `option3` = :option3,
                        `option4` = :option4,
                        `option5` = :option5,
                        `answer` = :answer,
                        `test_id` = :testId
                        WHERE `id` = :id";
            }

            $query = $this->db->prepare($query);

            $query->bindParam(':text', $question['text']);
            $query->bindParam(':option1', $question['option1']);
            $query->bindParam(':option2', $question['option2']);
            $query->bindParam(':option3', $question['option3']);
            $query->bindParam(':option4', $question['option4']);
            $query->bindParam(':option5', $question['option5']);
            $query->bindParam(':answer', $question['answer']);
            $query->bindParam(':id', $args['id']);

            if (!empty($question['test_id'])) {
                $query->bindParam(':testId', $question['test_id']);
            }

            $data['success'] = $query->execute();
            $data['message'] = 'Question updated successfully';
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data);

        } catch (Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
    }

    $data['message'] = 'Missing data.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data, 400);

});

$app->post('/question/{id}/delete', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $question = $request->getParsedBody();

    if (!empty($args['id'])) {

        try {

            $query = "UPDATE `question` SET
                        `deleted` = 1
                        WHERE `id` = :id";

            $query = $this->db->prepare($query);

            $query->bindParam(':id', $args['id']);

            $data['success'] = $query->execute();
            $data['message'] = 'Question deleted successfully';
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data);

        } catch (Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
    }

    $data['message'] = 'Missing data.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data, 400);

});

$app->get('/answer/{id}', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    if (empty($args['id'])) {
        $data['message'] = 'Missing question ID';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {
        $query = "SELECT `answer` from `question` WHERE `id` = :id";
        $query = $this->db->prepare($query);
        $query->bindParam(':id', $args['id']);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved answer.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->get('/answer', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $get = $request->getQueryParams();

    try {
        $testId = $get['test_id'] ?? 1;

        $query = "SELECT `id`, `answer` from `question` WHERE `test_id` = :testId";
        $query = $this->db->prepare($query);

        $query->bindParam(':testId', $testId);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved answers.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->post('/answer', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $postData = $request->getParsedBody();

    if (
        empty($postData['answers']) ||
        empty($postData['uid']) ||
        !(
            isset($postData['score']) && // allows 0 score
            is_numeric($postData['score'])
        ) ||
        empty($postData['time'])
    ) {
        $data['message'] = 'Missing post data, required keys: answers, uid, score, time.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    $answers = json_encode($postData['answers']);

    try {
        $query = "INSERT INTO `result` (`uid`, `answers`, `score`, `time`) VALUES (:uid, :answers, :score, :time);";
        $query = $this->db->prepare($query);
        $query->bindParam(':uid', $postData['uid']);
        $query->bindParam(':answers', $answers);
        $query->bindParam(':score', $postData['score']);
        $query->bindParam(':time', $postData['time']);
        $query->execute();

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully saved answers.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->get('/result', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $uid = $request->getQueryParam('id');

    if (!empty($uid)) {
        try {
            $query = "SELECT `uid` as 'id', `answers`, `score`, `time`, `dateCreated` from `result` WHERE `uid` = :uid;";
            $query = $this->db->prepare($query);
            $query->bindParam(':uid', $uid);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);

        } catch(Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
    } else {
        try {
            $query = "SELECT `uid` as 'id', `answers`, `score`, `time`, `dateCreated` from `result`;";
            $query = $this->db->prepare($query);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
        } catch(Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
    }

    if (empty($result)) {
        $data['success'] = false;
        $data['message'] = 'No results found.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 200);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved results.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});


$app->get('/setting', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    try {
        $query = "SELECT `name`, `value` FROM setting;";
        $query = $this->db->prepare($query);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved settings.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->post('/setting', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $postData = $request->getParsedBody();

    if (
        empty($postData['settings']) ||
        empty($postData['settings'][0]['name']) ||
        empty($postData['settings'][0]['value'])
    ) {
        $data['message'] = 'Must provide a valid settings with a name and value';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 200);
    }

    try {

        foreach($postData['settings'] as $setting) {
            $query = "INSERT INTO setting (`name`, `value`) VALUES (:name, :value) ON DUPLICATE KEY UPDATE `value` = :value";
            $query = $this->db->prepare($query);
            $query->execute($setting);
        }

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully updated settings.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->get('/test', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    try {
        $query = "SELECT * FROM test;";
        $query = $this->db->prepare($query);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved test data.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->post('/test', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $postData = $request->getParsedBody();

    if (empty($postData['name']) && count($postData['name']) < 256) {
        $data['message'] = 'Must provide a valid test name';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 200);
    }

    try {
        $query = "INSERT INTO test (`name`) VALUES (?)";
        $query = $this->db->prepare($query);
        $query->execute([$postData['name']]);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully added test.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});