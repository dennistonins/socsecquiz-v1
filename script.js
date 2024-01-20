const questions = [
  { question: "Question 1 (a)?", answers: ["A", "B", "C", "D"], correctAnswer: 0 },
  { question: "Question 2 (b)?", answers: ["A", "B", "C", "D"], correctAnswer: 1 },
  { question: "Question 3 (c)?", answers: ["A", "B", "C", "D"], correctAnswer: 2 },
  { question: "Question 4 (d)?", answers: ["A", "B", "C", "D"], correctAnswer: 3 },
  { question: "Question 5 (a)?", answers: ["A", "B", "C", "D"], correctAnswer: 0 },
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

  // Always shuffle the answers for each question
  const shuffledAnswers = [...currentQuestion.answers];
  shuffleArray(shuffledAnswers);

  // Update the correct answer index for the shuffled answers
  currentQuestion.shuffledCorrectAnswer = shuffledAnswers.indexOf(currentQuestion.answers[currentQuestion.correctAnswer]);

  // Store the shuffled answers in the current question object
  currentQuestion.shuffledAnswers = shuffledAnswers;

  // Update the correct answer index for the shuffled answers
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
