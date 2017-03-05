let answerDOM = document.getElementById('answer');
let attemptDOM = document.getElementById('attempt');
let messageDOM = document.getElementById('message');
let resultDOM = document.getElementById('results');
let codeDOM = document.getElementById('code');

function guess() {
  let input = document.getElementById('user-guess');
  // add functionality to guess function here
  if (answerDOM.value === '' || attemptDOM.value === '') {
    setHiddenFields();
  }
  if (!validateInput(input.value)) {
    return false;
  } else {
    attemptDOM.value++;
  }
  if (!getResults(input.value)) {
    if (attemptDOM.value >= 10) {
      showAnswer(false);
      setMessage('You Lose! :(')
    } else {
      setMessage('Incorrect, try again.');
    }
    return false;
  } else {
    showAnswer(true);
    setMessage('You Win! :)');
    showReplay();
    return true;
  }
}

//implement new functions here
function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}

function showAnswer(success) {
  codeDOM.innerHTML = answerDOM.value;
  if (success) {
    codeDOM.className = "code success";
  } else {
    codeDOM.className = "code failure";
  }
}

function getResults(input) {
  let answer = answerDOM.value;
  let result = "";
  let success = true;
  for (var i = 0; i < input.length; i++) {
    if (input[i] === answer[i]) {
      result += '<span class="glyphicon glyphicon-ok">';
    } else if (answer.indexOf(input[i]) !== -1) {
      result += '<span class="glyphicon glyphicon-transfer">';
      success = false;
    } else {
      result += '<span class="glyphicon glyphicon-remove">';
      success = false;
    }
  }
  let template = `<div class="row">
            <strong class="col-md-6">${input}</strong>
            <strong class="col-md-6">${result}</strong>
          </div>`;
  resultDOM.innerHTML = resultDOM.innerHTML + template;
  return success;
}

function setMessage(message) {
  messageDOM.innerHTML = message;
}

function validateInput(input = '') {
  if (input.length !== 4) {
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
  return true;
}

function setHiddenFields() {
  let answerNumber = Math.floor(Math.random() * 10000).toString();
  while (answerNumber.length < 4) {
    answerNumber = '0' + answerNumber;
  }
  answerDOM.value = answerNumber;
  attemptDOM.value = 0;
}
