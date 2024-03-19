const nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?')
//массив слов
let wordsArray = ["программа", "макака", "прекрасный", "оладушек", "чебурек"];
//мыссив функций canvas
let lifeField = document.querySelector(".canvas").getContext("2d");

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


/**
 * функции Canvas
 */
function oneLife () {
    lifeField.beginPath();
    lifeField.moveTo(0, 180);
    lifeField.lineTo(160, 180);
    lifeField.moveTo(30, 180);
    lifeField.lineTo(30, 20);
    lifeField.moveTo(10, 20);
    lifeField.lineTo(100, 20);
    lifeField.moveTo(90, 20);
    lifeField.lineTo(90, 75);
    lifeField.lineWidth = 2;
    lifeField.stroke();
}  lifeField.clearRect(0, 0, canvas.width, canvas.height);
function  twoLife() {
    lifeField.beginPath();
    lifeField.clearRect(70, 45, 40, 40)
    lifeField.arc(90, 60, 15, 300, 360, false);
    lifeField.lineWidth = 2;
    lifeField.stroke();
}
function threeLife() {
    lifeField.beginPath();
    lifeField.moveTo(90, 75);
    lifeField.lineTo(90, 130);
    lifeField.lineWidth = 2; 
    lifeField.stroke();
}
function fourLife() {
    lifeField.beginPath();
    lifeField.moveTo(90, 85);
    lifeField.lineTo(70, 110);
    lifeField.lineWidth = 2;
    lifeField.stroke();
}
function fiveLife() {
    lifeField.beginPath();
    lifeField.moveTo(90, 85);
    lifeField.lineTo(110, 110);
    lifeField.lineWidth = 2;
    lifeField.stroke();
}
function sixLife() {
    lifeField.beginPath();
    lifeField.moveTo(90, 130);
    lifeField.lineTo(70, 160);
    lifeField.lineWidth = 2;
    lifeField.stroke();
}
function sevenLife() {
    lifeField.beginPath();
    lifeField.moveTo(90, 130);
    lifeField.lineTo(110, 160);
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
  attempts = 6;
  randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  for (let i = 0; randomWord.length > i; i++) {
    answer[i] = "_";
  }
  lifeField.clearRect(0, 0, canvas.width, canvas.height);
  hiddenWordElem.innerHTML = answer.join(" ");
  remainingLetters = randomWord.length;
  console.log(randomWord, remainingLetters);
  gameInfoElem.innerHTML = 'Угадайте букву или нажмите ""Начать заново что бы сменить слово.';
}
/**
 * вытягивание значения. проверка на количесвто букв и жизней
 */
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
    chanceLife[attempts]();
    console.log("Проигрыш");
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
  if (randomWord.includes(meaning) == false && attempts >= 0) {
    gameInfoElem.innerHTML = `такой буквы нету. У вас осталось попыток: "${attempts}"`;
    chanceLife[attempts]();
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
        gameInfoElem.innerHTML = `Хорошо! ${nikName} Было загадано слово "${randomWord}"`;
        console.log("Победа");
    }
  }
}
}
