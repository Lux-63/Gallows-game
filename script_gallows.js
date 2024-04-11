const nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');
//массивы слов по категориям и сложности
let easyAnimalsWord = [
  "лиса",
  "волк",
  "бобёр",
  "ёжик",
  "медведь",
  "олень",
  "заяц",
  "кролик",
  "корова",
  "лягушка",
  "кошка",
  "собака",
  "мышь",
];
let hardAnimalsWord = ["Игуана", "гиппопотам", "трясогузка", "леопард", "аллигатор", "горилла"];
let easyEdibleWord = [
  "каша",
  "пицца",
  "арбуз",
  "лимон",
  "грибы",
  "хлеб",
  "тесто",
  "мясо",
  "салат",
  "рыба",
  "молоко",
];
let hardEdibleWord = [
  "сельдерей",
  "фейхоа",
  "картофель",
  "абрикос",
  "баклажан",
  "виноград",
  "йогурт",
  "конфета",
  "свинина",
  "говядина",
];
let easyInedibleWord = [
  "окно",
  "стена",
  "шкаф",
  "стол",
  "стул",
  "пакет",
  "мешок",
  "шарик",
  "очки",
  "машина",
];
let hardInedibleWord = [
  "гильотина",
  "наволочка",
  "автозаправка",
  "фортепиано",
  "антресоль",
  "домкрат",
  "электричка",
  "сноуборд",
  "программа",
];
let allArray = [];

/**
 * выбор массива слов исходя из сложности и выбранной категории
 */
const gameLevel = {
  animal: {
    easy: () => easyAnimalsWord,
    hard: () => hardAnimalsWord,
  },
  edible: {
    easy: () => easyEdibleWord,
    hard: () => hardEdibleWord,
  },
  inedible: {
    easy: () => easyInedibleWord,
    hard: () => hardInedibleWord,
  },
  all: {
    easy: () => allArray.concat(easyAnimalsWord, easyEdibleWord, easyInedibleWord),
    hard: () => allArray.concat(hardAnimalsWord, hardEdibleWord, hardInedibleWord),
  },
};
let difficultyGame = "easy";
let selectedCategory = "animal";

//мыссив функций canvas
let lifeField = document.querySelector(".canvas").getContext("2d");

//доступ к элементам в html
const gameInfoElem = document.querySelector(".information");
const hiddenWordElem = document.querySelector(".answer");
const topWindowElem = document.querySelector(".frame");
const enteredValueElem = document.querySelector(".input");
const resetGameElem = document.querySelector(".reset");
const stopGameAlElem = document.querySelector(".end");
const meaningButton = document.querySelectorAll(".letter");

//создание див загаданого слова
const displayHiddenWord = document.createElement("div");

//проверка буковочки
let letterButtonId = "";
//объект ID
let buttonIdObj = {
  ё: 0,
  й: 1,
  ц: 2,
  у: 3,
  к: 4,
  е: 5,
  н: 6,
  г: 7,
  ш: 8,
  щ: 9,
  з: 10,
  х: 11,
  ъ: 12,
  ф: 13,
  ы: 14,
  в: 15,
  а: 16,
  п: 17,
  р: 18,
  о: 19,
  л: 20,
  д: 21,
  ж: 22,
  э: 23,
  я: 24,
  ч: 25,
  с: 26,
  м: 27,
  и: 28,
  т: 29,
  ь: 30,
  б: 31,
  ю: 32,
};

let buttonId = 0;
let attempts = 7;
let answer = [];
let answerDiv = [];
let randomWord = "";
let remainingLetters = 0;

topWindowElem.innerHTML = `<p>Привет, <b>${nikName}.</b> Начнем игру!</p> `;
generationWord();
console.log(`Привет, ${nikName}`);

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
 * генерация слова, замена букв на символы, сброс всех значений при рестарте игры
 */
function generationWord() {
  answer = [];
  answerDiv = [];

  //убираем елементы div
  for (i = 0; hiddenWordElem.childNodes.length >= 1; i++) {
    hiddenWordElem.childNodes[0].remove();
  }

  //восстанавливаем жизни
  attempts = 7;
  //выбираем слово из массива по категории.
  randomWord =
    gameLevel[selectedCategory][difficultyGame]()[
      Math.floor(Math.random() * gameLevel[selectedCategory][difficultyGame]().length)
    ];

  for (let i = 0; randomWord.length > i; i++) {
    let divElem = document.createElement("div");
    divElem.className = "answer-word"; //уточнить что за див в переменной
    divElem.append((answer[i] = "-"));
    answerDiv.push(divElem);
    answer[i] = "-";
  }

  //сброс стилей кнопок алфавита
  for (i = 0; meaningButton.length > i; i++) {
    meaningButton[i].style = ".letter";
  }

  lifeField.clearRect(0, 0, canvas.width, canvas.height);
  hiddenWordElem.append(...answerDiv);

  remainingLetters = randomWord.length;
  console.log(randomWord, remainingLetters);
  gameInfoElem.innerHTML = 'Угадайте букву или нажмите "Начать заново" что бы сменить слово.';
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
    gameInfoElem.innerHTML = 'Угадайте букву или нажмите "Начать заново" что бы сменить слово.';
    gameProcess(n);
  }
}

/**
 * процесс игры. проверка наличия буквы, отгаданной буквы и конец игры
 * @param {Text} meaning
 */
function gameProcess(meaning) {
  //console.log(event, "евента значение") function gameProcess(event, meaning) {

  letterButtonId = meaning;
  if (randomWord.includes(meaning) == false && attempts > 0 && answer.includes("-") == true) {
    gameInfoElem.innerHTML = `такой буквы нету. У вас осталось попыток: "${attempts - 1}"`;

    //смена цвета
    document.querySelectorAll(".letter")[buttonId].style.cssText = `background-color: red;`;

    // отнимаем жизнь
    chanceLife[attempts - 1]();
    attempts--;

    console.log("минус жизнь", attempts);
  }
  //game over
  if (attempts == 0) {
    gameInfoElem.innerHTML = `${nikName} Вы проиграли! Было загадано слово "${randomWord}"`;
    chanceLife[attempts]();
    console.log("Проигрыш");
    return;
  }

  for (let j = 0; j < randomWord.length; j++) {
    if (answer.includes("-") == false) {
      gameInfoElem.innerHTML = `Хорошо! ${nikName} Было загадано слово "${randomWord}"`;
      return;
    } else if (answer[j] == meaning) {
      gameInfoElem.innerHTML = `${nikName} вы уже угадали эту букву!`;
      console.log("такая буква уже есть");
    } else if (randomWord[j] === meaning) {
      answer[j] = meaning;

      remainingLetters--;
      hiddenWordElem.childNodes[j].innerHTML = meaning.toUpperCase();

      gameInfoElem.innerHTML = `Поздравляем! Такая буква есть. Следующая буква?.`;

      //смена цвета кнопки
      document.querySelectorAll(".letter")[buttonId].style.cssText = `background-color: green;`;

      console.log("Буква найдена", answer, "Победа");
    }
  }
}

/*
- изменить количество жизней в зависимости от длины слова.
- соответственно перерисовать canvas
*/