const nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');
//массив слов
let wordsArray = ["программа", "макака", "прекрасный", "оладушек", "чебурек"];
//мыссив функций canvas
let lifeField = document.querySelector(".canvas").getContext("2d");

const gameInfoElem = document.querySelector(".information");
const hiddenWordElem = document.querySelector(".answer");
const topWindowElem = document.querySelector(".frame");
const enteredValueElem = document.querySelector(".input");
const resetGameElem = document.querySelector(".reset");
const stopGameAlElem = document.querySelector(".end");

//проверка буковочки
let letterButtonId =""
//объект айди
let buttonIdObj = {
  "а": 0,
  "б": 1,
  "в": 2,
  "г": 3,
  "д": 4,
  "е": 5,
  "ё": 6,
  "ж": 7,
  "з": 8,
  "и": 9,
  "й": 10,
  "к": 11,
  "л": 12,
  "м": 13,
  "н": 14,
  "о": 15,
  "п": 16,
  "р": 17,
  "с": 18,
  "т": 19,
  "у": 20,
  "ф": 21,
  "х": 22,
  "ц": 23,
  "ч": 24,
  "ш": 25,
  "щ": 26,
  "ъ": 27,
  "ы": 28,
  "ь": 29,
  "э": 30,
  "ю": 31,
  "я" : 32,
}


let buttonId = 0;
let attempts = 7;
let answer = [];
let randomWord = "";
let remainingLetters = 0;

topWindowElem.innerHTML = `<p>Привет, <b>${nikName}.</b> <br>Начнем игру!</p> `;
generationWord();
console.log(`Привет, ${nikName}`, randomWord);

/**
 * функции Canvas
 */
function oneLife() {
  lifeField.beginPath();
  lifeField.moveTo(100, 240);
  lifeField.lineTo(280, 240);
  lifeField.moveTo(130, 240);
  lifeField.lineTo(130, 30);
  lifeField.moveTo(100, 30);
  lifeField.lineTo(230, 30);
  lifeField.moveTo(210, 30);
  lifeField.lineTo(210, 110);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
function twoLife() {
  lifeField.beginPath();
  lifeField.clearRect(190, 65, 40, 45);
  lifeField.arc(210, 90, 25, 300, 360, false);
  lifeField.moveTo(197, 83); //левый глаз
  lifeField.arc(197, 83, 5, 300, 360, false);
  lifeField.moveTo(222, 83); // правый глаз
  lifeField.arc(222, 83, 5, 300, 360, false);
  lifeField.moveTo(210, 98); //рот
  lifeField.arc(210, 102, 5, 300, 360, false);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
function threeLife() {
  lifeField.beginPath();
  lifeField.moveTo(210, 115);
  lifeField.lineTo(210, 180);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
function fourLife() {
  lifeField.beginPath();
  lifeField.moveTo(210, 125);
  lifeField.lineTo(170, 155);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
function fiveLife() {
  lifeField.beginPath();
  lifeField.moveTo(210, 125);
  lifeField.lineTo(250, 155);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
function sixLife() {
  lifeField.beginPath();
  lifeField.moveTo(210, 180);
  lifeField.lineTo(185, 220);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
function sevenLife() {
  lifeField.beginPath();
  lifeField.clearRect(190, 65, 40, 45);
  lifeField.arc(210, 90, 25, 300, 360, false);
  lifeField.moveTo(210, 98); //рот
  lifeField.arc(210, 102, 5, 300, 360, false);
  lifeField.moveTo(210, 180); //нога
  lifeField.lineTo(235, 220);
  lifeField.moveTo(195, 79); //глаз левый
  lifeField.lineTo(205, 86);
  lifeField.moveTo(205, 79);
  lifeField.lineTo(195, 86);
  lifeField.moveTo(215, 79); //глаз левый
  lifeField.lineTo(225, 86);
  lifeField.moveTo(215, 86);
  lifeField.lineTo(225, 79);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//массив количества жизней
let chanceLife = [sevenLife, sixLife, fiveLife, fourLife, threeLife, twoLife, oneLife];

// выбор случайного слова
/**
 * генерация слова, замена букв на символы
 */
function generationWord() {
  answer = [];
  attempts = 7;
  randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  for (let i = 0; randomWord.length > i; i++) {
    answer[i] = "_";
  }
  lifeField.clearRect(0, 0, canvas.width, canvas.height);
  hiddenWordElem.innerHTML = answer.join(" ");
  remainingLetters = randomWord.length;
  console.log(randomWord, remainingLetters);
  gameInfoElem.innerHTML = 'Угадайте букву или нажмите "Начать" заново что бы сменить слово.';
}
/**
 * вытягивание значения. проверка на количесвто букв и жизней
 */
function checkLetter() {
  const n = enteredValueElem.value.toLowerCase();
  buttonId = buttonIdObj[n];
  enteredValueElem.value = "";
  enteredValueElem.focus();
  console.log(enteredValueElem.value.toLowerCase());
  if (n.length !== 1) {
    gameInfoElem.innerHTML = "Пожалуйста, введите одну букву.";
    console.log("введено меньше или больше одной буквы");
  } else {
    gameInfoElem.innerHTML = 'Угадайте букву или нажмите "Начать заново что бы сменить слово.';
    gameProcess(n);
  }
}

/**
 * процесс игры. проверка наличия буквы, отгаданной буквы и конец игры
 * @param {Text} meaning
 */
function gameProcess(meaning) {
  letterButtonId = meaning;
  if (randomWord.includes(meaning) == false && attempts > 0 && answer.includes("_") == true) {
    gameInfoElem.innerHTML = `такой буквы нету. У вас осталось попыток: "${attempts -1}"`;
    document.querySelectorAll(".letter")[buttonId].style.cssText=`background-color: red;`
    chanceLife[attempts -1]();
    attempts--;
    console.log("минус жизнь", attempts);
  } if (attempts == 0) {
    gameInfoElem.innerHTML = `${nikName} Вы проиграли! Было загадано слово "${randomWord}"`;
    chanceLife[attempts]();
    console.log("Проигрыш");
  }
  for (let j = 0; j < randomWord.length; j++) {
    if (answer[j] == meaning) {
      gameInfoElem.innerHTML = `${nikName} вы уже угадали эту букву!`;
      console.log("такая буква уже есть");
    } else if (randomWord[j] === meaning) {
      answer[j] = meaning;
      remainingLetters--;
      hiddenWordElem.innerHTML = answer.join(" ");
      gameInfoElem.innerHTML = `Поздравляем! Такая буква есть. Следующая буква?.`;
      document.querySelectorAll(".letter")[buttonId].style.cssText=`background-color: green;`
      if (answer.includes("_") == false) {
        gameInfoElem.innerHTML = `Хорошо! ${nikName} Было загадано слово "${randomWord}"`;
      }
      console.log("Буква найдена", answer, "Победа");
    }
  }
}
