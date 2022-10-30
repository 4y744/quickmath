let startWrapper = document.getElementById('start');
startWrapper.style.display = 'flex';
let problemsWrapper = document.getElementById('problems');
let endWrapper = document.getElementById('end');

let problem = document.getElementById('problem');
let input = document.getElementById('input');

let correctAnswersLabel = document.getElementById('correctAnswers');
let timeLabel = document.getElementById('time');

let num1 = 0;
let num2 = 0;
let result = 0;

let correctAnswerCount = 0;
let answerCount = 0;

let startTime = 0;

let operationMap = new Map([
    [0, '+'],
    [1, '-'],
    [2, 'x'],
    [3, ':']
])

function start()
{
    startWrapper.style.display = 'none';
    problemsWrapper.style.display = 'flex';

    startTime = new Date().getTime();
    
    newProblem();
}

function newProblem()
{
    if(answerCount > 19) end();

    num1 = Math.floor(Math.random() * 30);
    num2 = Math.floor(Math.random() * 30);
    result = 0;
    let operation = operationMap.get(Math.floor(Math.random() * 4));
    switch(operation)
    {
        case '+':
            result = num1 + num2;
        break;
        case '-':
            result = num1 - num2;
        break;
        case 'x':
            result = num1 * num2;
        break;
        case ':':
            while(num1 % num2 != 0 || num1 == num2)
            {
                num2--;
            }
            result = num1 / num2;
        break;
    }

    problem.textContent = `${num1} ${operation} ${num2}`
}

function submit()
{
    if(input.value == result) correctAnswerCount++;
    answerCount++;

    input.value = null;
    newProblem();
}

function end()
{
    problemsWrapper.style.display = 'none';
    endWrapper.style.display = 'flex';

    correctAnswersLabel.textContent = `${correctAnswerCount}/${answerCount} correct answers`;
    
    let currentTime = new Date().getTime();
    timeLabel.textContent = `Time: ${(currentTime - startTime) / 1000} s`;
}

function _continue()
{
    correctAnswerCount = 0;
    answerCount = 0;

    endWrapper.style.display = 'none';
    startWrapper.style.display = 'flex';
}

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      if(startWrapper.style.display == 'flex') start();
      else  if(problemsWrapper.style.display == 'flex') submit();
      else  if(endWrapper.style.display == 'flex') _continue();
    }
  });