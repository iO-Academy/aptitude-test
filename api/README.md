# Aptitude test REST API

### Local setup

- Clone this Repo
- cd into api and run `composer install` or `php composer.phar install` if no composer installed
- Install the aptitude-test.sql file from /api/db into your vagrant box database named `aptitude-test`
- cd into the api folder
- Run: `php -S localhost:8080 -t public/ public/index.php` - DO NOT CLOSE THIS TAB OR TURN THE SERVER OFF
- Set `isProd` in app/js/utils to `false`


### Routes
- for local development use localhost:8080/whatYouRequire as your ajax URL

**/user**

POST
- Create new user.
- `{"email":"example@email.com", "name":"Fred Smith", "time":"1800", "test_id":"1"}`
    - `test_id` is optional, will default to test id 1
    - Time is optional, will default to 1800
- Returns user object.

GET 
- Get all registered users, including deleted ones.
- No request data
- Returns array of user objects.

GET
- Find specific registered user.
- Send users email as a GET parameter using the key of `email`.
- Returns user object.


**/user/delete/{userID}**

POST
- Deletes a user.
- Send user id in the url like: /user/delete/{id}
- Returns result of user deletion.


**/user/edit**

POST
- Update a user.
- `{"email":"example@email.com", "name":"Fred Smith", "canRetake":"0", "id":"1"}` - all required
- Returns result of user update.

**/question**

GET
- Get all questions and options.
- Optional `test_id` query parameter to specify which test to return questions for
    - If not provided, will default to test id 1
- Returns all questions and question options for given test.

POST
- Create new question.
- `{"text":"Question example", "option1":"Answer 1", "option2":"Answer 2", "option3":"Answer 3", "option4":"Answer 
4", "option5":"Answer 4", "answer":"2", "test_id":"2"}`
    - `test_id` is optional, will default to test id 1
- Returns id of question created.

**/question/{id}/edit**

POST
- Edit existing question.
- `{"text":"Question example", "option1":"Answer 1", "option2":"Answer 2", "option3":"Answer 3", "option4":"Answer 4", "option5":"Answer 4", "answer":"2", "test_id":"2"}`
    - `test_id` is optional, omitting will persist current value
- Returns success state of edited question.

**/question/{id}/delete**

POST
- Delete existing question.
- No request data
- Returns success state of deleted question.

**/answer**

GET
- Get answers to all questions.
- Optional `test_id` query parameter to specify which test to return answers for
    - If not provided, will default to test id 1
- Returns all question answers with question ID and correct option number for given test.

POST
- Save question answers.
- `{"uid":"1", "answers": {"1": "4", "2": "3"}, "score":"24", "time":"29.55"}`.
- Returns success/fail state.

**/answer/{qid}**

GET
- Get the answer for a specific question.
- No request data, question ID included in URL.
- Returns correct option number.

**/result**

GET 
- Get all users results
- No request data
- Returns array of result objects.

GET
- Find specific users results.
- Send users id as a GET parameter using the key of `id`.
- Returns users result object.

**/setting**

GET 
- Get all application settings
- No request data
- Returns array of settings objects.
    - `[{"name": "default_time","value": "1800"}]`

POST
- Edit the application settings.
- Send an array of settings objects to be added/updated.
    - `{"settings": [{"name": "default_time","value": "1800"}]}`
    - Time must be provided in seconds
- Returns success/fail state.

**/test**

GET 
- Get all test data
- No request data
- Returns array of test objects.
    - `[{"id" : "1", "name": "example","created": "2019-10-19 12:24:35"}]`

POST
- Add new test
- Send an object containing the test name
    - `{"name": "Example"}`
- Returns success/fail state.
