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
  setTimeout(() => {
    $('main').removeClass('unclickable');
    STORE.questionAnswered = false;
    nextQuestion();
  }, 2000);
}

/**
 *Updates the visuals to show correct and incorrect answers
 *(this one's kinda hacky)
*/
function giveFeedback() {
  $('main').addClass('unclickable');

  // set an answered state?
  STORE.questionAnswered = true;
  render();
}

/**
 *Advances to the next question and re-renders
*/
function nextQuestion() {
  // go to the next question, or end the game
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
    obj.message = `You got ${STORE.score} question(s) correct!<br>Someone should give you a ribbon!`;
  } else if (STORE.score >= .5 * STORE.questions.length) {
    obj.title = '😨 Wow...';
    obj.message = `You only managed to get ${STORE.score} question(s) right.<br>Go read a book or something.`;
  } else if (STORE.score > 0) {
    obj.title = '🤔 Hmmm...';
    obj.message = `It takes a certain kind of person to get only ${STORE.score} question(s) right.<br>We're praying for you.`;
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
  cardHoverHandler();
  formSubmitHandler();
  restartGameHandler();
}

/**
 *Listens for click of the #startGame button and starts the game
*/
function startGameHandler() {
  $('main').on('click', '#startGame', () => {
    STORE.quizStarted = true;
    render();
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
 *Listens for hover of the .card and updates the answer card to match
*/
function cardHoverHandler() {
  $('main').on('mouseover', '.card', e => {
    let element = $(e.target).closest('label');
    try {
      element.find('input').focus().click();
    } catch (e) {
      // ignore it
    }
  });

  $('main').on('change', '.card', e => {
    let element = $(e.target).closest('label').find('input');
    let text = element.val();
    STORE.selectedAnswer = text;
    render();
    $('main').find('input:checked').focus().click();
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
  } else if (STORE.quizStarted === false) {
    // render start page
    $('main').html(renderStartPage());
  } else {
    // end game
    $('main').html(renderResultsPage());
  }
}



// =============================================================
// TEMPLATE GENERATION FUNCTIONS
// =============================================================

/**
 *Returns the start page template
*/
function renderStartPage() {
  return `
  <div class="container">
    <section id="middle">
      <button id="startGame">Start Game</button>
    </section>
    <section id="bottom">
      <div class="credits">
        <h3>Quiz Against Humanity 1.0</h3>
        <p>
          Designed & developed by<br>
          <a id="rg" href="https://github.com/Vicious27" target="_blank">@vicious27</a> and <a id="mk" href="https://github.com/malcolmkiano" target="_blank">@malcolmkiano</a>
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
        <input type="submit" value="Click here to submit" />
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

/**
 *Returns the start results page template
*/
function renderResultsPage() {
  return `
  <div class="container">
    <section id="middle">
      <article id="result">
        <h2>${gradeResults().title}</h2>
        <p>${gradeResults().message}</p>
        <p>See all the facts <a href="https://www.buzzfeed.com/matwhitehead/gross-facts" target="_blank">here</a>!</p>
        <button class="btn-small" id="restart">Start Over</button>
      </article>
    </section>
    <section id="bottom">
      <div class="credits">
        <h3>Quiz Against Humanity 1.0</h3>
        <p>
          Designed & developed by<br>
          <a id="rg" href="https://github.com/Vicious27" target="_blank">@vicious27</a> and <a id="mk" href="https://github.com/malcolmkiano" target="_blank">@malcolmkiano</a>
        </p>
      </div>
    </section>
  </div>
  `;
}



// =============================================================
// DOM READY FUNCTION
// =============================================================
$(init);