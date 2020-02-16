'use strict';
/* global STORE, $ */

/**
 *Performs the initial render and begins listening for events 
*/
function init() {
  addHandlers();
  render();
}


// =============================================================
// INTERFACE FUNCTIONS
// =============================================================

/**
 *Demonstrates that users can scroll options on smaller screens
*/
function demonstrateScroll() {
  STORE.demoCompleted = true;
  let width = $('body').outerWidth();
  if (width < 720) {
    setTimeout(() => {
      let bottom = $('main').find('#bottom .cards');
      bottom.animate({
        scrollLeft: bottom.outerWidth() / 2
      }, {
        duration: 800,
        complete: () => {
          bottom.animate({ scrollLeft: 0 }, 800);
        }
      });
    }, 400);
  }
}

/**
 *Scrolls to the correct answer to give feedback
*/
function scrollToAnswer() {
  let width = $('body').outerWidth();
  if (width < 720) {
    let bottom = $('main').find('#bottom .cards');

    // selected answer offset
    let selectedOffset = $('main').find('input:checked').closest('.card').offset().left;
    bottom.scrollLeft(selectedOffset - 60);

    // correct answer offset
    let correctOffset = $('main').find('.card-correct').offset().left;
    bottom.animate({ scrollLeft: correctOffset - 60 }, 500);
  }
}



// =============================================================
// GAME LOGIC FUNCTIONS
// =============================================================

/**
 *Resets all the STORE properties to restart the game
*/
function restartGame() {
  STORE.quizStarted = false;
  STORE.questionNumber = 0;
  STORE.score = 0;
}

/**
 *Checks the answer on submission of the form
*/
function checkAnswer() {
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  if (STORE.selectedAnswer === correctAnswer) {
    STORE.score++;
  }
  giveFeedback(correctAnswer);
}

/**
 *Updates the visuals to show correct and incorrect answers
 *(this one's kinda hacky)
*/
function giveFeedback() {
  STORE.questionAnswered = true;
  render();
  scrollToAnswer();
}

/**
 *Advances to the next question and re-renders
*/
function nextQuestion() {
  // go to the next question, or end the game
  STORE.questionAnswered = false;
  STORE.selectedAnswer = '';
  STORE.questionNumber++;
  render();
}

/**
 *Returns a message for results screen
*/
function gradeResults() {
  let obj = { title: '', message: '' };
  if (STORE.score >= .8 * STORE.questions.length) {
    obj.title = '🎉 Good job!';
    obj.message = `You got ${STORE.score} question${STORE.score !== 1 ? 's' : ''} correct!<br>
                  Someone should give you a ribbon!`;
  } else if (STORE.score >= .5 * STORE.questions.length) {
    obj.title = '😨 Wow...';
    obj.message = `You only managed to get ${STORE.score} question${STORE.score !== 1 ? 's' : ''} right.<br>
                  Go read a book or something.`;
  } else if (STORE.score > 0) {
    obj.title = '🤔 Hmmm...';
    obj.message = `It takes a certain kind of person to get only ${STORE.score} question${STORE.score !== 1 ? 's' : ''} right.<br>
                  We're praying for you.`;
  } else {
    obj.title = '👀 Yikes...';
    obj.message = 'We <em>literally cannot</em> understand how you didn\'t get anything right. Good job?';
  }

  return obj;
}



// =============================================================
// HANDLER FUNCTIONS
// =============================================================

/**
 * 
 *Sets up all event handlers
*/
function addHandlers() {
  startGameHandler();
  cardClickHandler();
  cardHoverHandler();
  formSubmitHandler();
  restartGameHandler();
  nextHandler();
}

/**
 *Listens for click of the #startGame button and starts the game
*/
function startGameHandler() {
  $('main').on('click', '#startGame', () => {
    STORE.quizStarted = true;
    render();
    if (STORE.demoCompleted === false) demonstrateScroll();
  });
}

/**
 *Listens for click of the #restart button and restarts the game
*/
function restartGameHandler() {
  $('main').on('click', '#restart', () => {
    restartGame();
    render();
  });
}

/**
 *Listens for click of the .card and submits (on mobile)
*/
function cardClickHandler() {
  $('main').on('change', '.card', e => {
    let element = $(e.target).closest('label').find('input');
    let text = element.val();
    STORE.selectedAnswer = text;

    let width = $('body').outerWidth();

    // auto submit on mobile devices
    if (width < 500) {
      element.closest('form').submit();
    } else {
      render();
      $('main').find('input:checked').focus().click();
    }
  });
}


/**
 *Listens for hover of the .card and updates the answer card to match
*/
function cardHoverHandler() {
  $('main').on('mouseover', '.card', e => {
    let element = $(e.target).closest('label');
    try {
      element.find('input').focus().click();
    } catch (e) { /* ignored */ }
  });
}

/**
 *Listens for the form submit event and checks the answer
*/
function formSubmitHandler() {
  $('main').on('submit', 'form', e => {
    e.preventDefault();
    checkAnswer();
  });
}

/**
 *Listenes for next question button click and goes to next
*/
function nextHandler() {
  $('main').on('click', '#nextButton', e => {
    e.preventDefault();
    nextQuestion();
  });
}


// =============================================================
// RENDER FUNCTION
// =============================================================

/**
 *Renders the whole page based on STORE values
*/
function render() {
  if (STORE.quizStarted === true && STORE.questionNumber < STORE.questions.length) {
    // render game page
    $('main').html(renderGamePage());
  } else {
    // show other pages
    $('main').html(renderMainPage());
  }
}



// =============================================================
// TEMPLATE GENERATION FUNCTIONS
// =============================================================

/**
 *Returns the start page template
*/
function renderMainPage() {
  return `
  <div class="container">
    <section id="middle">
      ${STORE.quizStarted === false ? `
      <button class="btn btn-default" id="startGame">Start Game</button>
      ` : `
      <article id="result">
        <h2>${gradeResults().title}</h2>
        <p>${gradeResults().message}</p>
        <p>*All the rude messages are <em>entirely</em> sarcastic. 💖</p>
        <button class="btn btn-default btn-small" id="restart">Start Over</button>
      </article>
      `}
    </section>
    <section id="bottom">
      <div class="credits">
        <h3>Quiz Against Humanity ${STORE.appVesion}</h3>
        <p>
          Designed & developed by<br>
          <a id="rg" href="https://github.com/Vicious27" target="_blank">@vicious27</a> 
          and <a id="mk" href="https://github.com/malcolmkiano" target="_blank">@malcolmkiano</a>
        </p>
      </div>
    </section>
  </div>
  `;
}

/**
 *Returns the game page template
*/
function renderGamePage() {
  let currentQuestion = STORE.questions[STORE.questionNumber];
  return `
  ${renderScoreAndQuestionNumber()}
  <form class="container">
    ${STORE.questionAnswered === true ? renderFeedback() : ''}
    ${renderQuestion(currentQuestion)}
    ${renderAnswers(currentQuestion)}
  </form>
  `;
}

/**
 *Returns the score & question number template
*/
function renderScoreAndQuestionNumber() {
  return `
  <section id="info">
    <p>Score: <span>${STORE.score}/${STORE.questions.length}</span></p>
    <p>Question: <span>${STORE.questionNumber + 1}/${STORE.questions.length}</span></p>
  </section>
  `;
}

/**
 *Returns the feedback (if the question was answered)
*/
function renderFeedback() {
  let q = STORE.questions[STORE.questionNumber];
  let a = STORE.selectedAnswer;
  let isCorrectAnswer = (a === q.correctAnswer);
  let isLastQuestion = (STORE.questionNumber === STORE.questions.length - 1);
  return `
  <section id="feedback">
    <article>
      ${isCorrectAnswer === true ? `
      <h2>Nice!</h2>
      <p>
        '<span class="right">${a}</span>' was the right answer.<br>
        So you <em>do</em> have a brain!
      </p>
      <p>Go you! 🙄</p>
      ` : `
      <h2>Whoops!</h2>
      <p>
        '<span class="wrong">${a}</span>' wasn't the right answer.<br>
        If you were smarter, you would have picked '<span class="right">${q.correctAnswer}</span>'.
      </p>
      <p>Oh, well. 🤷‍♂️</p>
      `}
      Find out more <a target="_blank" href="${q.source}">here</a>.
      <a href="#" id="nextButton" class="btn btn-alt">${isLastQuestion ? 'See my results' : 'Next Question'}</a>
    </article>
  </section>
  `;
}

/**
 *Returns the question template
*/
function renderQuestion(q) {
  return `
  <section id="middle">
    <article>
      <p id="question" class="card card-question">
        <span>${q.question}</span>
      </p>
      <p id="answer" class="card">
        <span>${STORE.selectedAnswer ? STORE.selectedAnswer : 'Your answer goes here.'}</span>
        <input class="btn btn-alt" type="submit" value="Click here to submit" />
      </p>
    </article>
  </section>
  `;
}

/**
 *Returns the answer template
*/
function renderAnswers(q) {
  let answersHTML = '';
  for (let i = 0; i < q.answers.length; i++) {
    let answer = q.answers[i];
    let isCheckedAnswer = STORE.selectedAnswer === answer ? true : false;

    answersHTML += `
    <label for="answer${i}" class="card ${STORE.questionAnswered === true ? answer === q.correctAnswer ? 'card-correct' : '' : ''}">
      <input required type="radio" ${isCheckedAnswer === true ? 'checked' : ''} name="answer" value="${answer}" id="answer${i}">
      <span>${answer}</span>
    </label>
    `;
  }

  return `
  <section id="bottom">
    <div class="cards ${STORE.questionAnswered === true ? 'answered' : ''}">
      ${answersHTML}
    </div>
  </section>
  `;
}



// =============================================================
// DOM READY FUNCTION
// =============================================================
$(init);