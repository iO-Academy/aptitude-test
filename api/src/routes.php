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
        $user['category_id'] = $user['category_id'] ?? 1;
        $user['showTimer'] = $user['showTimer'] ?? 1;

        if (!empty($user['time'])) {
            $query = "INSERT INTO `user` (`email`, `name`, `time`, `test_id`, `category_id`, `showTimer`) VALUES (:email, :name, :time, :testId, :categoryId, :showTimer);";
            $query = $this->db->prepare($query);
            $query->bindParam(':time', $user['time']);
        } else {
            $query = "INSERT INTO `user` (`email`, `name`, `test_id`, `category_id`, `showTimer`) VALUES (:email, :name, :testId, :categoryId, :showTimer);";
            $query = $this->db->prepare($query);
        }

        $query->bindParam(':testId', $user['test_id']);
        $query->bindParam(':categoryId', $user['category_id']);
        $query->bindParam(':email', $user['email']);
        $query->bindParam(':name', $user['name']);
        $query->bindParam(':showTimer', $user['showTimer']);
        $query->execute();

        $query = "
SELECT `user`.*, `category`.`name` AS 'category_name' 
FROM `user` 
LEFT JOIN `category` ON `user`.`category_id` = `category`.`id` 
WHERE `user`.`id` = :id";
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
    $data = ['success' => false, 'message' => 'An unexpected error occurred.', 'data' => []];
    $user = $request->getParsedBody();

    if (
        empty($user['email']) ||
        empty($user['name']) ||
        empty($user['id']) ||
        empty($user['test_id']) ||
        !isset($user['canRetake'])
    ) {
        $data['message'] = 'Invalid parameters.';
        $data['data'] = $user;
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {

        $user['time'] = $user['time'] ?? 1800;
        $user['category_id'] = $user['category_id'] ?? 1;
        $user['canResume'] = $user['canResume'] ?? 0;
        $user['showTimer'] = $user['showTimer'] ?? 1;

        $query = "UPDATE `user` SET `email` = :email, `name` = :name, `canRetake` = :retake, `canResume` = :canResume, `time` = :time, `showTimer` = :showTimer, `test_id` = :test_id, `category_id` = :category_id WHERE `id` = :id;";
        $query = $this->db->prepare($query);
        $query->bindParam(':email', $user['email']);
        $query->bindParam(':name', $user['name']);
        $query->bindParam(':retake', $user['canRetake']);
        $query->bindParam(':canResume', $user['canResume']);
        $query->bindParam(':time', $user['time']);
        $query->bindParam(':showTimer', $user['showTimer']);
        $query->bindParam(':test_id', $user['test_id']);
        $query->bindParam(':category_id', $user['category_id']);
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
            $query = "
SELECT `user`.`id`, `email`, `user`.`name`, `dateCreated`, `isAdmin`, `canRetake`, `canResume`, `time`, `showTimer`, `test_id`, `category_id`, 
`category`.`name` AS 'category_name', `deleted` from `user` 
LEFT JOIN `category` ON `user`.`category_id` = `category`.`id` 
ORDER BY `dateCreated` DESC;";
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
            $query = "SELECT `user`.`id`, `email`, `user`.`name`, `dateCreated`, `isAdmin`, `canRetake`, `canResume`, `time`, `showTimer`, `test_id`, `category_id`, 
`category`.`name` AS 'category_name' from `user`
 LEFT JOIN `category` ON `user`.`category_id` = `category`.`id` 
 WHERE `email` = :email AND `deleted` <> 1";
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

$app->get('/question/{id}', function ($request, $response, $question) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    if (empty($question['id']) || !is_numeric($question['id'])) {
        $data['message'] = 'Please supply a valid question ID';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {
        $query = "SELECT `id`, `text`, `option1`, `option2`, `option3`, `option4`, `option5`, `answer`, `test_id` FROM `question` WHERE `deleted` <> 1 AND `id` = :questionId;";

        $questionId = $question['id'];

        $query = $this->db->prepare($query);
        $query->bindParam(':questionId', $questionId);

        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved question.';
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
                        `answer` = :answer
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

        $query = "SELECT `id`, `answer` from `question` WHERE `deleted` <> 1 AND `test_id` = :testId";
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
        empty($postData['testLength']) ||
        empty($postData['uid']) ||
        !(
            isset($postData['score']) && // allows 0 score
            is_numeric($postData['score'])
        ) ||
        empty($postData['time'])
    ) {
        $data['message'] = 'Missing post data, required keys: answers, uid, score, testLength, time.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    $answers = json_encode($postData['answers']);

    if (!isset($postData['autoCompleted']) || $postData['autoCompleted'] != 1) {
        $postData['autoCompleted'] = 0;
    }

    try {
        $query = "INSERT INTO `result` (`uid`, `answers`, `score`, `testLength`, `time`, `autoCompleted`) VALUES (:uid, :answers, :score, :testLength, :time, :autoCompleted);";
        $query = $this->db->prepare($query);
        $query->bindParam(':uid', $postData['uid']);
        $query->bindParam(':answers', $answers);
        $query->bindParam(':score', $postData['score']);
        $query->bindParam(':testLength', $postData['testLength']);
        $query->bindParam(':time', $postData['time']);
        $query->bindParam(':autoCompleted', $postData['autoCompleted']);
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
            $query = "SELECT `uid` as 'id', `id` as `resultId`, `answers`, `userTestNotes`, `score`, `testLength`, `time`, `dateCreated`, `autoCompleted` from `result` WHERE `uid` = :uid ORDER BY `dateCreated` DESC;";
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
            $query = "SELECT `uid` as 'id', `id` as `resultId`, `answers`, `userTestNotes`, `score`, `testLength`, `time`, `dateCreated`, `autoCompleted` from `result`;";
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

$app->post('/result/{id}/notes/edit', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $rId = $args['id'];

    $postData = $request->getParsedBody();

    if (
        empty($postData['notes']) ||
        empty($rId) ||
        !is_numeric($rId)
    ) {
        $data['message'] = 'Missing post data, required keys: notes and result id must be numerical.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {
        $query = "UPDATE `result` SET `userTestNotes` = :notes WHERE `id` = :id";
        $query = $this->db->prepare($query);
        $result = $query->execute(['notes' => $postData['notes'], 'id' => $rId]);
    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    if (!$result) {
        $data['message'] = 'Unable to update notes. Unexpected error.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully updated notes.';
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
        empty($postData['name']) ||
        empty($postData['value'])
    ) {
        $data['message'] = 'Must provide a valid settings with a name and value';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 200);
    }

    try {
        $query = "INSERT INTO setting (`name`, `value`) VALUES (:name, :value) ON DUPLICATE KEY UPDATE `value` = :value";
        $query = $this->db->prepare($query);
        $query->execute($postData);
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

    if (empty($postData['name']) || strlen($postData['name']) > 255) {
        $data['message'] = 'Must provide a valid test name';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 200);
    }


    try {
        if (!empty($postData['time']) && is_numeric($postData['time'])) {
            $query = "INSERT INTO test (`name`, `time`) VALUES (?, ?)";
            $query = $this->db->prepare($query);
            $query->execute([$postData['name'], $postData['time']]);
        } else {
            $query = "INSERT INTO test (`name`) VALUES (?)";
            $query = $this->db->prepare($query);
            $query->execute([$postData['name']]);
        }

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

$app->post('/category', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $postData = $request->getParsedBody();

    if (empty($postData['name']) || strlen($postData['name']) > 255) {
        $data['message'] = 'Must provide a valid category name';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 200);
    }

    try {
        $query = "INSERT INTO category (`name`) VALUES (?)";
        $query = $this->db->prepare($query);
        $query->execute([$postData['name']]);
    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully added category.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);

});

$app->get('/category', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    try {
        $query = "SELECT * FROM category;";
        $query = $this->db->prepare($query);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved categories.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);

});

$app->post('/category/delete/{id}', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $postData = $request->getParsedBody();

    if (empty($args['id']) || !is_numeric($args['id'])) {
        $data['message'] = 'Must provide a category ID';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 200);
    }

    if ($args['id'] == 1) {
        $data['message'] = 'Cannot delete category 1';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {
        $updateUserQuery = "UPDATE `user` SET `category_id` = 1 WHERE `category_id` = ?";
        $updateUserQuery = $this->db->prepare($updateUserQuery);
        $updateUserQuery->execute([$args['id']]);

        $deleteQuery = "DELETE FROM category WHERE `id` = ?";
        $deleteQuery = $this->db->prepare($deleteQuery);
        $deleteQuery->execute([$args['id']]);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully removed category.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);

});








