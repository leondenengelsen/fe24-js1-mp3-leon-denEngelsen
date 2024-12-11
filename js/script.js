document.getElementById('startQuiz').addEventListener('click', (event) => {
  event.preventDefault();

  const name = document.getElementById('nameInput').value;
  const header = document.getElementById('gameHeader');

  header.innerText = `Quiz Time ${name}!`;

  const numQuestions = document.getElementById('numberOfQuestions').value || 10;
  
  const level = document.getElementById('levelSelector').value || "easy";

  const cat1 = document.getElementById('categorySelector1').value || Math.floor(Math.random() * (24)) + 9;

  const quizUserUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${cat1}&difficulty=${level}&type=multiple`;

  fetch(quizUserUrl)
    .then(response => response.json())
    .then(data => {

      let correctAnswers = 0;
      let incorrectAnswers = 0;

      for (let i = 0; i < data.results.length; i++) {
        console.log(`Question ${i + 1}: ${data.results[i].question}`);

        const questionContainer = document.createElement('div');
        questionContainer.classList.add('questionContainer');
        quizContainer.append(questionContainer);

        const questionEl = document.createElement('h3');
        questionEl.innerText = `Question ${i + 1}: ${decodeHtml(data.results[i].question)}`;
        questionContainer.append(questionEl);

        // Combine correct and incorrect answers
        const answers = [...data.results[i].incorrect_answers, data.results[i].correct_answer];

        // Shuffle answers 
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

        // Display answers
        shuffledAnswers.forEach(answer => {
          const answerEl = document.createElement('button');
          answerEl.classList.add('answerButton');
          answerEl.innerText = decodeHtml(answer);

          // Add event listeners
          answerEl.addEventListener('click', () => {
            if (answer === data.results[i].correct_answer) {
              answerEl.classList.add('rightAnswer');
              correctAnswers++;
            } else {
              answerEl.classList.add('wrongAnswer');
              incorrectAnswers++;
            }

            // Update result container
            resultContainer.innerText = `Correct Answers: ${correctAnswers} | Incorrect Answers: ${incorrectAnswers}`;

            // Disable all buttons for the current question
            questionContainer.querySelectorAll('.answerButton').forEach(button => {
              button.disabled = true;
            });
          });

          questionContainer.append(answerEl);
        });
      }
    })
})

document.getElementById('resetButton').addEventListener('click', () => {
  location.reload(); // I choose to reload the page. Goes quickly but maybe not the best way to do it?
});

function decodeHtml(html) {
  const tempElement = document.createElement('textarea');
  tempElement.innerHTML = html;
  return tempElement.value;
}



//------------------------------TO LOOK UP or ASK!!!------------------------------------//

//WHY DECODE??
// I got questions back from the API like this: 
// Question 3: On a standard Monopoly board, which square is diagonally opposite &#039;Go&#039;?
//does innerHTML make me able to skip decodeHtml???
