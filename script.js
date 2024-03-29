const questions = [
  { question: "Question 1?", answers: ["A", "B", "C", "D"], correctAnswer: 0 },
  // Add more questions here...
];
let currentQuestionIndex = Math.floor(Math.random() * questions.length);
let selectedAnswerIndex = null;
let correctAnswerRevealed = false;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById('question').innerText = currentQuestion.question;

  // Copy the answers array and shuffle the order only if it's a new question
  const shuffledAnswers = currentQuestion.shuffledAnswers || [...currentQuestion.answers];
  if (!currentQuestion.shuffledAnswers) {
    shuffleArray(shuffledAnswers);

    // Update the correct answer index for the shuffled answers
    currentQuestion.shuffledCorrectAnswer = shuffledAnswers.indexOf(currentQuestion.answers[currentQuestion.correctAnswer]);

    currentQuestion.shuffledAnswers = shuffledAnswers;
  }

  const answersHtml = shuffledAnswers.map((answer, index) => {
    const selectedClass = index === selectedAnswerIndex ? 'selected' : '';
    return `<div class="answer ${selectedClass}" onclick="selectAnswer(${index})">${answer}</div>`;
  }).join('');

  document.getElementById('answers').innerHTML = answersHtml;
}

function selectAnswer(selectedIndex) {
  selectedAnswerIndex = selectedIndex;
  loadQuestion();
}

function checkAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerIndex = currentQuestion.shuffledCorrectAnswer;

  const answers = document.querySelectorAll('.answer');
  answers.forEach((answer, index) => {
    answer.classList.remove('correct', 'wrong', 'selected'); // Clear previous answer highlighting
    if (index === correctAnswerIndex && selectedAnswerIndex === correctAnswerIndex) {
      answer.classList.add('correct', 'selected'); // Green for correct answer if selected
    } else if (index === selectedAnswerIndex && index !== correctAnswerIndex) {
      answer.classList.add('wrong'); // Red for wrong answer
    }
  });

  correctAnswerRevealed = true;
}

function nextQuestion() {
  selectedAnswerIndex = null;
  correctAnswerRevealed = false;

  // Reset the shuffledAnswers and shuffledCorrectAnswer properties for the next question
  const currentQuestion = questions[currentQuestionIndex];
  currentQuestion.shuffledAnswers = null;
  currentQuestion.shuffledCorrectAnswer = null;

  // Randomly select the next question index
  currentQuestionIndex = Math.floor(Math.random() * questions.length);

  loadQuestion();
}

// Initial load
loadQuestion();