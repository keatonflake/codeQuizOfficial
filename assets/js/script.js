const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

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
        }
    }
    update = setInterval("quizTimer()", 1000);
  
  // Alert "time is up!"
  function stopInterval() {
      console.log('time is up!');
      clearInterval(timer);
  }

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

const questions = [
  {
    question: 'What function is written correctly?',
    answers: [
      { text: 'Answer', correct: true },
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: false }
    ]
  },
  {
    question: 'what is an Array?',
    answers: [
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: true }
    ]
  },
  {
    question: 'best Analogy for how HTML, CSS, JS work together?',
    answers: [
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: true },
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: false }
    ]
  },
  {
    question: 'What describes an event?',
    answers: [
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: true },
      { text: 'Answer', correct: false },
      { text: 'Answer', correct: false }
    ]
  }
]
  