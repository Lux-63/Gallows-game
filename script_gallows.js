const nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');

/**
 * выбор массива слов исходя из сложности и выбранной категории
 */
const gameLevel = {
  animal: {
    easy: [
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
    ],
    hard: ["Игуана", "гиппопотам", "трясогузка", "леопард", "аллигатор", "горилла"],
  },
  edible: {
    easy: [
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
    ],
    hard: [
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
    ],
  },
  inedible: {
    easy: ["окно", "стена", "шкаф", "стол", "стул", "пакет", "мешок", "шарик", "очки", "машина"],
    hard: [
      "гильотина",
      "наволочка",
      "автозаправка",
      "фортепиано",
      "антресоль",
      "домкрат",
      "электричка",
      "сноуборд",
      "программа",
    ],
  },
  all: {
    easy: [],
    hard: [],
  },
};
//переменные категории и сложности
let difficultyGame = "easy";
let selectedCategory = "animal";
/**
 * массив всех категорий по сложности
 */
for (let category in gameLevel) {
  if (category != "all") {
    gameLevel["all"]["easy"] = gameLevel["all"]["easy"].concat(gameLevel[category]["easy"]);
    gameLevel["all"]["hard"] = gameLevel["all"]["hard"].concat(gameLevel[category]["hard"]);
  }
}

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
 * количество жизней и отрисовка игры в canvas
 */
//площадка
function oneLife() {
  lifeField.beginPath();
  lifeField.moveTo(50, 240);
  lifeField.lineTo(230, 240);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//столб
function twoLife() {
  lifeField.beginPath();
  lifeField.moveTo(100, 240);
  lifeField.lineTo(100, 30);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//поперечина
function threeLife() {
  lifeField.beginPath();
  lifeField.moveTo(60, 30);
  lifeField.lineTo(180, 30);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//веревка
function fourLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 31); // веревка
  lifeField.lineTo(160, 80);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//голова
function fiveLife() {
  lifeField.beginPath();
  lifeField.clearRect(140, 65, 40, 45);
  lifeField.arc(160, 90, 25, 300, 360, false);
  //левый глаз
  lifeField.moveTo(147, 83);
  lifeField.arc(147, 83, 5, 300, 360, false);
  // правый глаз
  lifeField.moveTo(172, 83);
  lifeField.arc(172, 83, 5, 300, 360, false);
  //рот
  lifeField.moveTo(160, 98);
  lifeField.arc(160, 102, 5, 300, 360, false);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//тело
function sixLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 115);
  lifeField.lineTo(160, 180);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//левая рука
function sevenLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 130);
  lifeField.lineTo(120, 155);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//правая рука
function eightLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 130);
  lifeField.lineTo(200, 155);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//левая нога
function nineLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 180);
  lifeField.lineTo(135, 220);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
function tenLife() {
  lifeField.beginPath();
  //очистка поля
  lifeField.clearRect(115, 31, 90, 190);
  //веревка
  lifeField.moveTo(160, 30);
  lifeField.lineTo(160, 75);
  //голова
  lifeField.arc(160, 100, 25, 300, 360, false);
  //глаз лев
  lifeField.moveTo(145, 89);
  lifeField.lineTo(155, 96);
  lifeField.moveTo(155, 89);
  lifeField.lineTo(145, 96);
  //глаз прав
  lifeField.moveTo(165, 89);
  lifeField.lineTo(175, 96);
  lifeField.moveTo(165, 96);
  lifeField.lineTo(175, 89);
  //рот
  lifeField.moveTo(160, 108); //рот
  lifeField.arc(160, 112, 5, 300, 360, false);
  //тело
  lifeField.moveTo(160, 125);
  lifeField.lineTo(160, 180);
  //левая рука
  lifeField.moveTo(160, 140);
  lifeField.lineTo(130, 180);
  //прававя рука
  lifeField.moveTo(160, 140);
  lifeField.lineTo(190, 180);
  //л.нога
  lifeField.moveTo(160, 180);
  lifeField.lineTo(145, 225);
  //пр нога
  lifeField.moveTo(160, 180);
  lifeField.lineTo(175, 225);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * в случае победы, человек радуется спасению
 */
function playerWin() {
  lifeField.beginPath();
  //очистка поля
  lifeField.clearRect(115, 31, 90, 208);
  //веревка
  lifeField.moveTo(160, 31);
  lifeField.lineTo(160, 80);
  //глаз лев
  lifeField.moveTo(148.5, 111);
  lifeField.arc(148.5, 115, 5, 300, 360, false);
  lifeField.fillStyle = "white";
  lifeField.fill();
  lifeField.moveTo(148.5, 115);
  lifeField.arc(148.5, 115, 0.05, 300, 360, false);
  //глаз прав
  lifeField.moveTo(170.5, 111);
  lifeField.arc(170.5, 115, 5, 300, 360, false, "white");
  lifeField.fill();
  lifeField.moveTo(170.5, 115);
  lifeField.arc(170.5, 115, 0.05, 300, 360, false);
  //голова
  lifeField.moveTo(160, 96);
  lifeField.clearRect(140, 65, 40, 45);
  lifeField.arc(160, 120, 25, 300, 360, false);
  //рот
  lifeField.moveTo(175, 132); //рот
  lifeField.arc(160, 119, 20, 1, 2.4, false);
  //тело
  lifeField.moveTo(160, 145);
  lifeField.lineTo(160, 200);
  //левая рука
  lifeField.moveTo(160, 160);
  lifeField.lineTo(120, 135);
  //прававя рука
  lifeField.moveTo(160, 160);
  lifeField.lineTo(200, 135);
  //л.нога
  lifeField.moveTo(160, 200);
  lifeField.lineTo(135, 240);
  //пр нога
  lifeField.moveTo(160, 200);
  lifeField.lineTo(185, 240);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//массив количества жизней
let chanceLife = [
  tenLife,
  nineLife,
  eightLife,
  sevenLife,
  sixLife,
  fiveLife,
  fourLife,
  threeLife,
  twoLife,
  oneLife,
];

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
  if (difficultyGame == "hard") {
    attempts = 10;
  } else {
    attempts = 7;
  }

  //выбираем слово из массива по категории.
  randomWord =
    gameLevel[selectedCategory][difficultyGame][
      Math.floor(Math.random() * gameLevel[selectedCategory][difficultyGame].length)
    ];

  for (let i = 0; randomWord.length > i; i++) {
    let divElem = document.createElement("div");
    divElem.className = "answer-word";
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
    if (difficultyGame == "easy" && attempts == 7) {
      chanceLife[9]();
      chanceLife[8]();
      chanceLife[7]();
      attempts--;
    } else {
      chanceLife[attempts - 1]();
      attempts--;

      console.log("минус жизнь", attempts);
    }
  }
  //game over
  if (attempts == 0) {
    gameInfoElem.innerHTML = `${nikName} Вы проиграли! Было загадано слово "${randomWord}"`;
    chanceLife[attempts]();
    console.log("Проигрыш");
    return;
  }

  for (let j = 0; j < randomWord.length; j++) {
    if (answer[j] == meaning) {
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
  if (answer.includes("-") == false) {
    gameInfoElem.innerHTML = `Хорошо! ${nikName} Было загадано слово "${randomWord}"`;
    playerWin();
    return;
  }
}

/*
- если отгадать осталось одну букву, и последней буквой была не правильная, то при следующей 
  правильной букве, игра не выдет победу
- изменить количество жизней в зависимости от длины слова.
- соответственно перерисовать canvas
- у html есть атрибут отвечающий за изменение кнопок
- атрибуты data
*/
