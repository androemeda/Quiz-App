let questions = [
    {
        question: 'what is the capital of india?',
        choice1: 'mumbai',
        choice2: 'delhi',
        choice3: 'nagpur',
        choice4: 'banglore',
        answer: 2,
    },
    {
        question: 'who is india\'s prime minister?',
        choice1: 'narendra modi',
        choice2: 'rahul gandhi',
        choice3: 'mamta banerjee',
        choice4: 'manmohan singh',
        answer: 1,
    },
    {
        question: 'what is currency of india?',
        choice1: 'dollar',
        choice2: 'pound',
        choice3: 'rupee',
        choice4: 'dhiram',
        answer: 3,
    },
];

let currentQuestionIndex = 0;
let score = 0;
let questionNumber = 1;

const questionElement = document.getElementById('question');
const choicesContainer = document.getElementById('choices');
const questionNumberElement = document.getElementById('question-number');
const scoreElement = document.getElementById('score');

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    if (questions.length === 0) {
        localStorage.setItem('score', score);
        window.location.href = 'end.html';
        return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[randomIndex];

    questionElement.innerText = currentQuestion.question;
    questionNumberElement.innerText = `Question ${questionNumber}`;

    choicesContainer.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        const choiceButton = document.createElement('div');
        choiceButton.classList.add('choice');
        choiceButton.innerHTML = `
            <span class="choice-letter">${String.fromCharCode(64 + i)}</span>
            <span class="choice-text">${currentQuestion['choice' + i]}</span>
        `;
        choiceButton.addEventListener('click', () => selectAnswer(i, randomIndex, choiceButton));
        choicesContainer.appendChild(choiceButton);
    }
}

function selectAnswer(selectedChoice, questionIndex, choiceButton) {
    const correctChoice = questions[questionIndex].answer;
    if (selectedChoice === correctChoice) {
        choiceButton.classList.add('correct');
        score++;
        scoreElement.innerText = `Score: ${score}`;
    } else {
        choiceButton.classList.add('incorrect');
    }

    setTimeout(() => {
        questions.splice(questionIndex, 1);
        questionNumber++;
        showQuestion();
    }, 1000);
}

startQuiz();
