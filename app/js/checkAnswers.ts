import {UserAnswers} from "./interfaces/UserAnswers";

var questionAmount;

document.querySelector('#finish').addEventListener('click', () => {
    finishTest(false);
})

/**
 * called when clicking finish button in dialogue box
 */
function finishTest(pageLeft) {
    showResults(pageLeft);
    document.querySelector<HTMLElement>('#overview_page').style.display = 'none';
    document.querySelector<HTMLElement>('#result_page').style.display = 'none';
    document.body.removeEventListener("mouseleave", pageLeaveAlert);
    document.removeEventListener("visibilitychange", cancelTest);
}

/**
 * checks the users answers against api answers
 *
 * @param userAnswers answers provided by user
 *
 * @return Promise - containing the result object ready for the api
 */
async function checkAnswers(userAnswers: UserAnswers): Promise<any> {
    let userScore = 0;
    let answers = await getAnswers();

    if (answers.success) {
        answers = answers.data;
        answers.forEach(function (answerItem) {
            if (!userAnswers[answerItem.id]) {
                userAnswers[answerItem.id] = {answerID: 'unanswered'}
            }
            if (answerItem.answer == userAnswers[answerItem.id]['answerID']) {
                userScore++;
                userAnswers[answerItem.id]['isCorrect'] = true;
            }
            userAnswers[answerItem.id]['notes'] = document.querySelector<HTMLTextAreaElement>(`textarea[name='answer_${answerItem.id}']`).value;
        })
        let result = {
            uid: parseInt(getCookie('uid') as string, 10), // typecast to string as getCookie shouldnt ever return false
            answers: userAnswers,
            score: userScore,
            time: parseFloat(getTimeForApi()),
            testLength: questionAmount
        }
        return result;
    }
    return answers;
}

/**
 * gets correct answers from api
 *
 * @return Promise - containing the correct answers
 */
async function getAnswers() {
    let baseUrl = getBaseUrl();
    let cookie = getCookie('userEmail');
    let userData = await getData(`user?email=${cookie}`)
    let testId =  userData.data.test_id;
    let data = await fetch(baseUrl + "answer?test_id=" + testId, {method: 'get'});
    return data.json();
}

/**
 * gets answers the user provided from the DOM
 *
 * @return Object of users answers
 */
function getUserAnswers(): UserAnswers {
    questionAmount = document.querySelectorAll('#questions .question').length;
    let checkedInputs = document.querySelectorAll('#questions .question .answers input:checked');
    let answers = {};

    checkedInputs.forEach(function(input: HTMLInputElement) {
        let id = input.name.split("_")[1];
        answers[id] = {answerID: input.value};
    })

    return answers;
}

/**
 * gets percentage of user score
 *
 * @param userScore user score
 * @param questionAmount total number of questions
 *
 * @return Integer percentage of user score
 */
function getPercentResult(userScore: number, questionAmount: number): number {
    return Math.round(userScore / questionAmount * 100);
}

/**
 * function adds event listeners to .question and listens for click event within here
 * it then updates the class of the span containing the question number allowing styling to be applied
 *
 */
function addAnswerEventListeners() {
    document.querySelectorAll('.question').forEach(function (input) {
        input.addEventListener('click', function(e: any) {
            if (e.target.tagName == 'INPUT') {
                let id = parseInt(this.dataset['questionOrderId']) - 1;
                document.querySelector('#question-nav').children[id].classList.add('answered-nav-box');
            }
        })
    })
}

/**
 * function removes current status from all questions and then adds current status
 * to the current question allowing styling to be applied
 *
 * @param id is the id of the active question
 */
function trackActiveQuestion(id: number) {
    let activeQuestion = document.querySelector('.nav-item.current-nav-box');
    if (activeQuestion) {
        activeQuestion.classList.remove('current-nav-box');
    }
    document.querySelector('#question-nav').children[id - 1].classList.add('current-nav-box');
}

/**
 * this checks the answers and marks them to show the finishing page
 */
function showResults(pageLeft) {
    document.exitFullscreen();
    resetReapplyCounter();
    clearInterval(interval);
    const userAnswers = getUserAnswers();
    checkAnswers(userAnswers).then(function (result) {
        if (result.score || result.score === 0) {
            if (pageLeft) {
                document.querySelector<HTMLElement>('.greetings').innerHTML = '<p>Test cancelled!</p>';
                document.querySelector<HTMLElement>('.email_for_results').innerHTML = `
                <p>This test has ended because you clicked away from the page</p>
                <p>Please contact us at <a href="mailto:hello@io-academy.uk">hello@io-academy.uk</a> to discuss further</p>`;
               result.autoCompleted = 1
            } else {
                document.querySelector<HTMLElement>('.greetings').innerHTML = '';
                document.querySelector<HTMLElement>('.email_for_results').innerHTML = `
                <p id="completedMessage">You have completed the test!</p>
                <p>Please contact us at <a href="mailto:hello@io-academy.uk">hello@io-academy.uk</a> if you would like to find out your results</p>
                <p>We look forward to chatting with you soon.</p>`;
            }
            document.querySelector<HTMLElement>('#question_page').style.display = 'none';
            document.querySelector<HTMLElement>('#overview_page').style.display = 'none';
            document.querySelector<HTMLElement>('#result_page').style.display = 'block';
            handleResponseFromAPI(sendUserResults(result), pageLeft);
        } else {
            let body = document.querySelector('body');
            let html = body.innerHTML;
            html += '<p class="error_message text-danger">Please contact admin. Answers cannot be checked at present.</p>';
            body.innerHTML = html;
        }
    });
}