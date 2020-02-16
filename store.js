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
      source: 'http://www.fda.gov/food/guidanceregulation/guidancedocumentsregulatoryinformation/sanitationtransportation/ucm056174.htm#CHPT3'
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
      source: 'http://www.health.com/health/gallery/0,,20588763,00.html#shellac-0'
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
      source: 'http://www.bbc.com/future/story/20151008-the-graveyard-in-the-clouds-everests-200-dead-bodies'
    },
    {
      question: 'There is an island near mexico city full of _____.',
      answers: [
        'Rabid alligators',
        'Blue flamingos',
        'Smelly diapers',
        'Decaying dolls'
      ],
      correctAnswer: 'Decaying dolls',
      source: 'http://www.atlasobscura.com/places/la-isla-de-las-munecas'
    },
    {
      question: 'You can get _____ from a koala\'s cuddle.',
      answers: [
        'First degree burns',
        'Chlamydia',
        'A terrible, terrible rash',
        'Shocked'
      ],
      correctAnswer: 'Chlamydia',
      source: 'http://io9.gizmodo.com/5920738/you-can-accidentally-get-an-std-from-a-koala'
    },
  ]
};