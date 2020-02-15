'use strict';
/**
 * Holds all of the app state and data
 */
// eslint-disable-next-line no-unused-vars
const STORE = {
  quizStarted: false,
  questionNumber: 0,
  questionAnswered: false,
  selectedAnswer: '',
  demoCompleted: false,
  score: 0,

  questions: [
    {
      question: 'The FDA allows an average of _____ per 100 grams of peanut butter manufactured.',
      answers: [
        'Twelve nail clippings',
        'Five dead skin fragments',
        'One rodent hair',
        'Three insect legs'
      ],
      correctAnswer: 'One rodent hair',
    },
    {
      question: 'Jelly beans get their shine from shellac, which is made from _____.',
      answers: [
        'Insect poop',
        'Formaldehyde',
        'Honey',
        'Corn syrup'
      ],
      correctAnswer: 'Insect poop',
    },
    {
      question: 'There are over _____ on Mount Everest.',
      answers: [
        '1000 indigenous families',
        '30 species of penguin',
        '50 different peaks',
        '200 corpses of climbers and sherpas'
      ],
      correctAnswer: '200 corpses of climbers and sherpas',
    },
    {
      question: 'There is an island near mexico city full of _______.',
      answers: [
        'Rabid alligators',
        'Blue flamingos',
        'Smelly diapers',
        'Creepy decaying dolls'
      ],
      correctAnswer: 'Creepy decaying dolls'
    },
    {
      question: 'You can get _____ from a koala\'s cuddle.',
      answers: [
        'First degree burns',
        'Chlamydia',
        'A terrible, terrible rash',
        'Shocked'
      ],
      correctAnswer: 'Chlamydia'
    },
  ]
};