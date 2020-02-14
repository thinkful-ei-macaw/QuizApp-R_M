'use strict';
/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
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
      question: 'There is an island near mexico city full of _______.',
      answers: [
        'Rabid alligators',
        'Blue flamingos',
        'Smelly diapers',
        'Creepy decaying dolls'
      ],
      correctAnswer: 'Creepy decaying dolls',
      source: 'https://www.atlasobscura.com/places/la-isla-de-las-munecas'
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
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

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