let nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');

let setWords = ["программа", "макака", "прекрасный", "оладушек", "чебурек"];

const gameInfo = document.querySelector(".information");
const hiddenWord = document.querySelector(".progress");
const topWindow = document.querySelector(".frame");
const enteredValue = document.querySelector(".box-2");
const resetGame = document.querySelector(".reset");
const stopGameAl = document.querySelector(".end");

let attempts = 7;
let answer = [];
let randomWord = ""
let remainingLetters = 0;

topWindow.innerHTML = `<p>Привет, <b>${nikName}.</b> <br>Начнем игру!</p>`;
wordGeteranion();
console.log(`Привет, ${nikName}`);

// выбор случайного слова

function wordGeteranion(){
  answer = [];
randomWord = setWords[Math.floor(Math.random() * setWords.length)];
for (let i = 0; randomWord.length > i; i++) {
  answer[i] = "_";
  hiddenWord.innerHTML = answer.join(" ");
}
remainingLetters = randomWord.length;
console.log(randomWord);
}

gameInfo.innerHTML = 'Угадайте букву или нажмите "Отмена" для выхода из игры.';


function checkLetter(n) {
  n = enteredValue.value.toLowerCase();
  enteredValue.value = "";
  enteredValue.focus();
  console.log(enteredValue.value.toLowerCase());
  gameProcess(n);
  gameInfo.innerHTML =
    'Угадайте букву или нажмите "Выйти из игры" что бы выйти.';
}

function gameProcess(meaning) {
  while (remainingLetters > 0 && attempts > 0) {
    if (meaning == "pause") {
      gameInfo.textContent = "Конец игры";
      console.log("Конец игры");
      break;
    }
    if (meaning.length !== 1) {
      gameInfo.innerHTML = "Пожалуйста, введите одну букву.";
    } else {
      for (let j = 0; j < randomWord.length; j++) {
        if (answer[j] === meaning) {
          gameInfo.innerHTML = `${nikName} вы уже угадали эту букву!`;
          break;
        } else if (randomWord[j] === meaning) {
          answer[j] = meaning;
          remainingLetters--;
        }
      }
      if (randomWord.includes(meaning) == false && attempts >= 1) {
        gameInfo.innerHTML = `${nikName} такой буквы нету. У вас осталось попыток: "$`;
        attempts - 1;
      }
      attempts--;
      console.log(attempts);
    }
  }

  if (attempts == 0) {
    gameInfo.innerHTML = 'вы проиграли! Было загадано слово "' + randomWord + '"';
  } else {
    gameInfo.innerHTML = 'Отлично! Было загадано слово "' + randomWord + '"';
  }
}
