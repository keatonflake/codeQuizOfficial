// Buttons
const answerButtonsElement = document.getElementById('answer-buttons')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const submitInitialsButton = document.getElementById('submitInitials')
// saving scores and initials
let INPUT = document.getElementById("textBox");
const userTextHereSection = document.getElementById('userTextHere')
const hiddenscoresheet = document.getElementById('hiddenScoreSheet')
// questions
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
// timer
let TIME = 75;
// score
let score = 0
// questions navigation
let shuffledQuestions, currentQuestionIndex

// start game
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
// hide start game opener and reset time and score
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  TIME = 75;
  score = 0;
}
// Timer Function
function quizTimer() {
  TIME = TIME - 1;
  if (TIME < 75) {
    document.getElementById('count').innerHTML = TIME;
  }
  if (TIME < 1) {
    window.clearInterval(update);
    window.alert("time is up!");
    location.reload();
  }
}
update = setInterval("quizTimer()", 1000);

// shuffling through questions and adding/removing the correct and wrong clss
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
// display questions
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// answering questions and adding a score
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct) {
    score += 10
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    hiddenscoresheet.classList.remove('hideTillEnd')
  }

}
//colors attached to correct and wrong class
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// user and highscore data

// Local Storage For HighScores
submitInitialsButton.addEventListener('click', function () {

  const data = {
    name: INPUT.value,
    score: score
  }

  let userData = JSON.parse(localStorage.getItem('highscores'));

  if (userData === null) {
    userData = []
  }

  userData.push(data)
  localStorage.setItem('highscores', JSON.stringify(userData))

  for (let i = 0; i < userData.length; i++) {
    const addingInfo = document.createElement('p')
    addingInfo.innerHTML = "NAME: " + userData[i].name + " SCORE: " + userData[i].score;
    userTextHereSection.append(addingInfo)
  }

});

const questions = [
  {
    question: 'the condition in an if else statment is closed within...',
    answers: [
      { text: '( )', correct: true },
      { text: '" "', correct: false },
      { text: '{ }', correct: false },
      { text: '< >', correct: false }
    ]
  },
  {
    question: 'what is an Array?',
    answers: [
      { text: 'A type of food', correct: false },
      { text: 'Slang for "hurray!"', correct: false },
      { text: 'Mutiple variables that is used to store a single element', correct: false },
      { text: 'a single variable that is used to store different elements', correct: true },
    ]
  },
  {
    question: 'An Element is...',
    answers: [
      { text: 'Element is the most specific class from which certain element objects (i.e. objects that represent elements) in a Document inherit.', correct: false },
      { text: 'Element is the most general base class from which all element objects (i.e. objects that represent elements) in a Document inherit.', correct: true },
      { text: 'Boating School? I thought this was spanish class', correct: false },
      { text: 'Something from Avatar', correct: false },
    ]
  },
  {
    question: 'Which is an example of an event?',
    answers: [
      { text: 'A frat party', correct: false },
      { text: 'When the user clicks a button', correct: true },
      { text: 'When the user does not click a button', correct: false },
      { text: 'Thanksgiving', correct: false },
    ]
  }
]
