const nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');

let wordsArray = ["программа", "макака", "прекрасный", "оладушек", "чебурек"];

const gameInfoElem = document.querySelector(".information");
const hiddenWordElem = document.querySelector(".progress");
const topWindowElem = document.querySelector(".frame");
const enteredValueElem = document.querySelector(".box-2");
const resetGameElem = document.querySelector(".reset");
const stopGameAlElem = document.querySelector(".end");

let attempts = 6;
let answer = [];
let randomWord = "";
let remainingLetters = 0;

topWindowElem.innerHTML = `<p>Привет, <b>${nikName}.</b> <br>Начнем игру!</p> `;
generationWord();
console.log(`Привет, ${nikName}`, randomWord);

// выбор случайного слова

function generationWord() {
  answer = [];
  attempts = 6;
  randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  for (let i = 0; randomWord.length > i; i++) {
    answer[i] = "_";
  }
  hiddenWordElem.innerHTML = answer.join(" ");
  remainingLetters = randomWord.length;
  console.log(randomWord, remainingLetters);
  gameInfoElem.innerHTML = 'Угадайте букву или нажмите ""Начать заново что бы сменить слово.';
}

function checkLetter() {
  const n = enteredValueElem.value.toLowerCase();
  enteredValueElem.value = "";
  enteredValueElem.focus();
  console.log(enteredValueElem.value.toLowerCase());
  if (n.length !== 1) {
    gameInfoElem.innerHTML = "Пожалуйста, введите одну букву.";
    console.log("введено меньше или больше одной буквы");
  } else if (attempts == 0) {
    gameInfoElem.innerHTML = `${nikName} Вы проиграли! Было загадано слово "${randomWord}"`;
    console.log("Проигрыш");
  } else {
    gameInfoElem.innerHTML = 'Угадайте букву или нажмите "Начать заново что бы сменить слово.';
    gameProcess(n);
  }
}

function gameProcess(meaning) {
  if (randomWord.includes(meaning) == false && attempts >= 1) {
    gameInfoElem.innerHTML = `такой буквы нету. У вас осталось попыток: "${attempts}"`;
    attempts--;
    console.log("минус жизнь", attempts);
  }
  for (let j = 0; j < randomWord.length; j++) {
    if (answer[j] == meaning) {
      gameInfoElem.innerHTML = `${nikName} вы уже угадали эту букву!`;
      console.log("такая буква уже есть");
    } else if (randomWord[j] === meaning) {
      answer[j] = meaning;
      remainingLetters--;
      hiddenWordElem.innerHTML = answer.join(" ");
      gameInfoElem.innerHTML = `Поздравляем! Такая буква есть. Следующая буква?.`
      console.log("Буква найдена", answer);
      if (answer.includes("_") == false) {
        gameInfoElem.innerHTML = `'Хорошо! ${nikName} Было загадано слово "${randomWord}"`;
        console.log("Победа");
    }
  }
}
}
