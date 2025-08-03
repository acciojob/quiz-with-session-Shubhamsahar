const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "What is the highest mountain in the world?",
        choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
        answer: "Everest",
    },
    {
        question: "What is the largest country by area?",
        choices: ["Russia", "China", "Canada", "United States"],
        answer: "Russia",
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Mars"],
        answer: "Jupiter",
    },
    {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        answer: "Ottawa",
    },
];

let userAnswers = new Array(questions.length).fill(null);

// Display the quiz questions and choices
function renderQuestions() {
    questionsElement.innerHTML = "";
    const storedProgress = sessionStorage.getItem("progress");
    if (storedProgress) {
        userAnswers = JSON.parse(storedProgress);
    }
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);
        for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);
            if (userAnswers[i] === choice) {
                choiceElement.setAttribute("checked", true);
            }
            const label = document.createElement("label");
            label.textContent = choice;
            choiceElement.addEventListener("change", () => {
                userAnswers[i] = choice;
                sessionStorage.setItem("progress", JSON.stringify(userAnswers));
            });
            questionElement.appendChild(choiceElement);
            questionElement.appendChild(label);
            questionElement.appendChild(document.createElement("br"));
        }
        questionsElement.appendChild(questionElement);
    }
}

renderQuestions();

submitButton.addEventListener("click", () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
    scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem("score", score);
});

const storedScore = localStorage.getItem("score");
if (storedScore) {
    scoreElement.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
}
