const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const hiddenscoresheet = document.getElementById('hiddenScoreSheet')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let TIME = 75;
// const inputTextBox = document.getElementById('textBox')
const INPUT = document.getElementById("textBox")
const submitInitialsButton = document.getElementById('submitInitials')
const userTextHereSection = document.getElementById('userTextHere')
let score = 0


let shuffledQuestions, currentQuestionIndex

INPUT.addEventListener('input', letter => {
  console.log(letter.target.value)
  userTextHereSection.textContent = letter.target.value
})
 
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  TIME = 75;
}
 // Timer Function
 function quizTimer() {
     TIME = TIME -1;
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

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
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
  score = 0
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
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
  if (correct){
    score += 10
  }
}

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

// Local Storage For HighScores
submitInitialsButton.addEventListener('click', function() {
localStorage.setItem('name', INPUT.value);
console.log("heaven helped")

nameDisplayCheck()
});

function nameDisplayCheck() {
if (localStorage.getItem('name')) {
let (name = localStorage.getItem('name'));
userTextHereSection.textContent = '${name}';
}
}
// const localStorageScores = JSON.parse(localStorage.getItem('scores'));

// for (let i = 0; i < localStorageScores.length; i++) {
//   const p = document.createElement('p');
//   p.innerHTML = 'initials: ' +  localStorageScores[i].initials + ' score: ' + localStorageScores[i].score;
//   userTextHereSection.append(p);
// }

  // submitInitialsButton.addEventListener('click', function() {
  //   localStorage.setItem(inputTextBox.innerHTML) = inputTextBox
  // })

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
  