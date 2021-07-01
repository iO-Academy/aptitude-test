# Aptitude test REST API

### Local setup

- Clone this Repo
- cd into api and run `composer install` or `php composer.phar install` if no composer installed
- Install the aptitude-test.sql file from /api/db into your docker box database named `aptitude-test`
- *After* installing the databases, run any `patch-*.sql` files in the same folder, in their numerical order, lowest first
- cd into the api folder
- Run: `php -S localhost:8080 -t public/ public/index.php` - DO NOT CLOSE THIS TAB OR TURN THE SERVER OFF
- Set `isProd` in app/js/utils to `false`


### Routes
- for local development use localhost:8080/whatYouRequire as your ajax URL

**/user**

POST
- Create new user.
- `{"email":"example@email.com", "name":"Fred Smith", "time":"1800", "test_id":"1", "category_id":"1"}`
    - `test_id` is optional, will default to test id 1
    - `category_id` is optional, will default to category id 1
    - `time` is optional, will default to 1800
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
- `{"email":"example@email.com", "name":"Fred Smith", "canRetake":"0", "id":"1", "test_id":"1"}` - all required
    - Additionally there are some optional fields:
      - `time` - default to `1800`
      - `category_id` - defaults to `1`
      - `canResume` - defaults to `0`
    - **Careful with this, as they could change unintentionally**
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

**/question/{id}**

GET
- Get the data for a specific question based on the question id
- Returns a single question object
    - `{"id":1, "text":"Question example", "option1":"Answer 1", "option2":"Answer 2", "option3":"Answer 3", "option4
    ":"Answer 
      4", "option5":"Answer 4", "answer":"2", "test_id":"2"}`


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
- `{"uid":"1", "answers": {"1": "4", "2": "3"}, "score":"24", "testLength":"30", "time":"29.55"}`.
  - Optionally you can add the "autoCompleted" property to the object with a value of 1, to signal that a test has been auto-finished by the cheat detection
  - `{"uid":"1", "answers": {"1": "4", "2": "3"}, "score":"24", "testLength":"30", "time":"29.55", "autoCompleted":1}`
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
- Returns an array of result objects for the specified user.

**/result/{id}/notes/edit**

POST
- Edit the notes for a users result
    - `id` in the URL should be the result id, not the user `id`
- `{"notes": "The result notes here"}`
- Returns success/fail state.

**/setting**

GET 
- Get all application settings
- No request data
- Returns array of settings objects.
    - `[{"name": "default_time", "value": "1800"}]`

POST
- Edit the application settings.
- Send an settings objects to be added/updated. To update multiple settings send multiple requests.
    - `{"name": "default_time", "value": "1800"}`
    - Time must be provided in seconds
- Returns success/fail state.

**/test**

GET 
- Get all test data
- No request data
- Returns array of test objects.
    - `[{"id" : "1", "name": "example","time": 1800, "created": "2019-10-19 12:24:35"}]`

POST
- Add new test
- Send an object containing the test name, optionally including the test time in seconds
    - `{"name": "Example"}`
    - `{"name": "Example", "time": 2100}`
- Returns success/fail state.


**/category**

GET 
- Get all category data
- No request data
- Returns array of category objects.
    - `[{"id" : "1", "name": "example"  }]`


POST
- Add new category
- Send an object containing the category name:
    - `{"name": "Category Name"}`
- Returns a success/fail state.
   
   
**/category/delete/{id}**

POST
- Remove an existing category
    - Prevents you deleting category 1
    - Sets all users assigned to this category to category 1
- No request data - category ID in URL
- Returns a success/fail state.