// Array of quiz questions, each with a question, options, and the index of the correct answer
const questions = [
   {
       question: "What is the capital of France?",
       options: ["Berlin", "Madrid", "Paris", "Lisbon"],
       answer: 2
   },
   {
       question: "Which planet is known as the Red Planet?",
       options: ["Earth", "Mars", "Jupiter", "Saturn"],
       answer: 1
   },
   {
       question: "What is the largest ocean on Earth?",
       options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
       answer: 3
   },
   {
       question: "Who wrote 'Romeo and Juliet'?",
       options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
       answer: 2
   }
];

// Variables to track the current question index and the user's score
let currentQuestionIndex = 0;
let score = 0;

// Get references to HTML elements for displaying the quiz content
const questionElement = document.getElementById('question');  // To display the question
const optionsElement = document.getElementById('options');    // To display the options (answer buttons)
const nextButton = document.getElementById('nextButton');     // Button to move to the next question
const scoreElement = document.getElementById('score');        // Element to display the final score

// Function to start the quiz
function startQuiz() {
   // Reset the quiz to the first question and reset the score
   currentQuestionIndex = 0;
   score = 0;

   // Hide the next button and score display
   nextButton.classList.add('hidden');
   scoreElement.classList.add('hidden');

   // Show the first question
   showQuestion();
}

// Function to display the current question and its options
function showQuestion() {
   // Get the current question from the array using the current index
   const currentQuestion = questions[currentQuestionIndex];

   // Display the question text in the HTML element
   questionElement.innerText = currentQuestion.question;

   // Clear any previous options displayed
   optionsElement.innerHTML = '';

   // Loop through the options for the current question
   currentQuestion.options.forEach((option, index) => {
       // Create a button for each option
       const optionButton = document.createElement('button');
       optionButton.innerText = option;
       optionButton.classList.add('option');
       
       // Add a click event listener for when the user selects an option
       optionButton.addEventListener('click', () => selectAnswer(index));
       
       // Append the option button to the options container
       optionsElement.appendChild(optionButton);
   });
}

// Function to handle answer selection
function selectAnswer(selectedIndex) {
   // Disable all option buttons after an answer is selected
   Array.from(optionsElement.children).forEach(button => button.disabled = true);

   // Get the current question's correct answer index
   const currentQuestion = questions[currentQuestionIndex];

   // Check if the selected answer is correct
   if (selectedIndex === currentQuestion.answer) {
       // Increase score if the selected answer is correct
       score++;

       // Highlight the correct answer in green
       optionsElement.children[selectedIndex].classList.add('correct');
   } else {
       // Highlight the selected incorrect answer in red
       optionsElement.children[selectedIndex].classList.add('incorrect');

       // Highlight the correct answer in green
       optionsElement.children[currentQuestion.answer].classList.add('correct');
   }

   // Show the "Next Question" button to allow moving to the next question
   nextButton.classList.remove('hidden');
}

// Function to handle the "Next Question" button click
nextButton.addEventListener('click', () => {
   // Move to the next question index
   currentQuestionIndex++;

   // Check if there are more questions left
   if (currentQuestionIndex < questions.length) {
       // Hide the next button and show the next question
       nextButton.classList.add('hidden');
       showQuestion();
   } else {
       // If no more questions, show the final score
       showScore();
   }
});

// Function to display the user's score at the end of the quiz
function showScore() {
   // Hide the question and options
   questionElement.innerText = '';
   optionsElement.innerHTML = '';

   // Display the score in the score element
   scoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
   scoreElement.classList.remove('hidden');

   // Hide the next button since the quiz is over
   nextButton.classList.add('hidden');
}

// Start the quiz automatically when the page loads
window.onload = startQuiz;
