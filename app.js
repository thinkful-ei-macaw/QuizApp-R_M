'use strict';
/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */

// App logic ======================
// start the game
// check the answer, give feedback
// go to next question (if one is available)
// end game

const GAME = {
  // initialize
  mainElement: null,
  init: function(){
    this.mainElement = $('main');
    this.addListeners();
    this.render();
  },

  // game logic
  checkAnswer: function(answer){
    let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
    if (answer === correctAnswer) {
      STORE.score ++;
    }
    this.giveFeedback();
    this.nextQuestion();
  },

  giveFeedback: function(){
    // show feedback
  },

  nextQuestion: function(){
    // go to the next question, or end the game
  },

  // listener functions
  addListeners: function(){
    this.startGameListener();
    this.cardHoverListener();
    this.cardClickListener();
  },

  startGameListener: function(){
    this.mainElement.on('click', '#startGame', () => {
      STORE.quizStarted = true;
      this.render();
    });
  },

  cardHoverListener: function(){
    this.mainElement.on('mouseover', '.card', e => {
      let element = $(e.target).closest('label');
      element.find('input').focus();
    });

    this.mainElement.on('focus', '.card', e => {
      let element = $(e.target).closest('label').find('span');
      let text = element.html();
      this.mainElement.find('#answer span').html(text);
    });
  },

  cardClickListener: function(){
    this.this.mainElement.on('click', '.card', e => {
      let element = $(e.target).closest('label').find('span');
      let text = element.html();
      this.checkAnswer(text);
    });
  },

  // render functions
  render: function() {
    if (STORE.quizStarted === true) {
      if (STORE.quizFinished === true) {
        // render results page
        this.mainElement.html('');
      } else {
        // render game page
        this.mainElement.html( this.pages.gamePage() );
      }
    } else {
      // render start page
      this.mainElement.html( this.pages.startPage() );
    }
  },

  // pages
  pages: {
    startPage: function() {
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
    },

    gamePage: function() {
      let currentQuestion = STORE.questions[STORE.questionNumber];
      return `
      <section id="info">
        <p>Score: <span>0</span></p>
        <p>Question: <span>1/10</span></p>
      </section>
      <form class="container">
        <section id="middle">
          <article>
            <p id="question" class="card card-question">
              <span>${currentQuestion.question}</span>
            </p>
            <p id="answer" class="card">
              <span>Your answer goes here.</span>
            </p>
          </article>
        </section>
        <section id="bottom">
          <div class="cards">
            <label for="answer1" class="card">
              <input type="radio" checked name="answer" value="1" id="answer1">
              <span>${currentQuestion.answers[0]}</span>
            </label>
            <label for="answer2" class="card">
              <input type="radio" name="answer" value="2" id="answer2">
              <span>${currentQuestion.answers[1]}</span>
            </label>
            <label for="answer3" class="card">
              <input type="radio" name="answer" value="3" id="answer3">
              <span>${currentQuestion.answers[2]}</span>
            </label>
            <label for="answer4" class="card">
              <input type="radio" name="answer" value="4" id="answer4">
              <span>${currentQuestion.answers[3]}</span>
            </label>
          </div>
        </section>
      </form>
      `;
    }
  },
};

$(document).ready(() => {
  GAME.init();
});