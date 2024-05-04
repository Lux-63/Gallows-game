const nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');

/**
 * выбор массива слов исходя из сложности и выбранной категории.
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
//переменные категории и сложности.
let difficultyGame = "easy";
let selectedCategory = "animal";
/**
 * массив всех категорий по сложности.
 */
for (let category in gameLevel) {
  if (category != "all") {
    gameLevel["all"]["easy"] = gameLevel["all"]["easy"].concat(gameLevel[category]["easy"]);
    gameLevel["all"]["hard"] = gameLevel["all"]["hard"].concat(gameLevel[category]["hard"]);
  }
}

//массив функций canvas.
let lifeField = document.querySelector(".canvas").getContext("2d");
//доступ к элементам в html.
const gameInfoElem = document.querySelector(".information");
const hiddenWordElem = document.querySelector(".answer");
const topWindowElem = document.querySelector(".frame");
const enteredValueElem = document.querySelector(".input");
const resetGameElem = document.querySelector(".reset");
const stopGameAlElem = document.querySelector(".end");
const meaningButton = document.querySelectorAll(".letter");
//создание див загаданого слова.
const displayHiddenWord = document.createElement("div");

const gameParameters = {
  lettersUsed: [],
  answer: [],
  answerDiv: [],
  randomWord: "",
  maxLife: 7,
  remainingAttempts: 0,
  remainingLetters: 0,
};

/**
 * обнуляем значения, для начала новой игры
 */
function defaultGameParameter() {
  gameParameters.lettersUsed = [];
  gameParameters.answer = [];
  gameParameters.answerDiv = [];
  //сброс div слова
  for (i = 0; hiddenWordElem.childNodes.length >= 1; i++) {
    hiddenWordElem.childNodes[0].remove();
  }
  //сброс кнопок алфавита.
  for (i = 0; meaningButton.length > i; i++) {
    meaningButton[i].style = ".letter";
    meaningButton[i].disabled = false;
  }
  lifeField.clearRect(0, 0, canvas.width, canvas.height);
}

topWindowElem.innerHTML = `<p>Привет, <b>${nikName}.</b> Начнем игру!</p> `;
generationWord();
console.log(`Привет, ${nikName}`);

//количество жизней и отрисовка игры в canvas.
/**
 * площадка.
 */
function oneLife() {
  lifeField.beginPath();
  lifeField.moveTo(50, 240);
  lifeField.lineTo(230, 240);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * столб.
 */
function twoLife() {
  lifeField.beginPath();
  lifeField.moveTo(100, 240);
  lifeField.lineTo(100, 30);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * поперечина.
 */
function threeLife() {
  lifeField.beginPath();
  lifeField.moveTo(60, 30);
  lifeField.lineTo(180, 30);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * веревка.
 */
function fourLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 31);
  lifeField.lineTo(160, 80);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * голова.
 */
function fiveLife() {
  lifeField.beginPath();
  lifeField.clearRect(140, 65, 40, 45);
  lifeField.arc(160, 90, 25, 300, 360, false);
  //л. глаз.
  lifeField.moveTo(147, 83);
  lifeField.arc(147, 83, 5, 300, 360, false);
  // пр. глаз.
  lifeField.moveTo(172, 83);
  lifeField.arc(172, 83, 5, 300, 360, false);
  //рот.
  lifeField.moveTo(160, 98);
  lifeField.arc(160, 102, 5, 300, 360, false);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * тело.
 */
function sixLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 115);
  lifeField.lineTo(160, 180);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * левая рука.
 */
function sevenLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 130);
  lifeField.lineTo(120, 155);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * правая рука.
 */
function eightLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 130);
  lifeField.lineTo(200, 155);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * левая нога.
 */
function nineLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 180);
  lifeField.lineTo(135, 220);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * game over.
 */
function tenLife() {
  lifeField.beginPath();
  //очистка поля.
  lifeField.clearRect(115, 31, 90, 190);
  //веревка.
  lifeField.moveTo(160, 30);
  lifeField.lineTo(160, 75);
  //голова.
  lifeField.arc(160, 100, 25, 300, 360, false);
  //л. глаз.
  lifeField.moveTo(145, 89);
  lifeField.lineTo(155, 96);
  lifeField.moveTo(155, 89);
  lifeField.lineTo(145, 96);
  //пр. глаз.
  lifeField.moveTo(165, 89);
  lifeField.lineTo(175, 96);
  lifeField.moveTo(165, 96);
  lifeField.lineTo(175, 89);
  //рот.
  lifeField.moveTo(160, 108); //рот
  lifeField.arc(160, 112, 5, 300, 360, false);
  //тело.
  lifeField.moveTo(160, 125);
  lifeField.lineTo(160, 180);
  //л. рука.
  lifeField.moveTo(160, 140);
  lifeField.lineTo(130, 180);
  //пр. рука.
  lifeField.moveTo(160, 140);
  lifeField.lineTo(190, 180);
  //л. нога.
  lifeField.moveTo(160, 180);
  lifeField.lineTo(145, 225);
  //пр. нога.
  lifeField.moveTo(160, 180);
  lifeField.lineTo(175, 225);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * в случае победы, человек радуется спасению.
 */
function playerWin() {
  lifeField.beginPath();
  //очистка поля.
  lifeField.clearRect(115, 63, 95, 165);
  //л. глаз.
  lifeField.moveTo(148.5, 111);
  lifeField.arc(148.5, 115, 5, 300, 360, false);
  lifeField.fillStyle = "white";
  lifeField.fill();
  lifeField.moveTo(148.5, 115);
  lifeField.arc(148.5, 115, 0.05, 300, 360, false);
  //пр. глаз.
  lifeField.moveTo(170.5, 111);
  lifeField.arc(170.5, 115, 5, 300, 360, false, "white");
  lifeField.fill();
  lifeField.moveTo(170.5, 115);
  lifeField.arc(170.5, 115, 0.05, 300, 360, false);
  //голова.
  lifeField.moveTo(160, 96);
  lifeField.clearRect(140, 65, 40, 45);
  lifeField.arc(160, 120, 25, 300, 360, false);
  //рот.
  lifeField.moveTo(175, 132); //рот
  lifeField.arc(160, 119, 20, 1, 2.4, false);
  //тело.
  lifeField.moveTo(160, 145);
  lifeField.lineTo(160, 200);
  //л. рука.
  lifeField.moveTo(160, 160);
  lifeField.lineTo(120, 135);
  //пр. рука.
  lifeField.moveTo(160, 160);
  lifeField.lineTo(200, 135);
  //л.нога.
  lifeField.moveTo(160, 200);
  lifeField.lineTo(135, 240);
  //пр. нога.
  lifeField.moveTo(160, 200);
  lifeField.lineTo(185, 240);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
//массив количества жизней.
let chanceLife = [
  oneLife,
  twoLife,
  threeLife,
  fourLife,
  fiveLife,
  sixLife,
  sevenLife,
  eightLife,
  nineLife,
  tenLife,
];

//кол-во частей в канвас.
const imageParts = chanceLife.length;

// выбор случайного слова.
/**
 * генерация слова, замена букв на символы, сброс всех значений при рестарте игры.
 */
function generationWord() {
  //обнуляем значения.
  defaultGameParameter();

  //жизни.
  if (difficultyGame == "hard") {
    gameParameters.maxLife = 10;
  } else {
    gameParameters.maxLife = 7;
  }
  gameParameters.remainingAttempts = gameParameters.maxLife;

  //выбираем слово из массива по категории.
  gameParameters.randomWord =
    gameLevel[selectedCategory][difficultyGame][
      Math.floor(Math.random() * gameLevel[selectedCategory][difficultyGame].length)
    ];

  for (let i = 0; gameParameters.randomWord.length > i; i++) {
    let divElem = document.createElement("div");
    divElem.className = "answer-word";
    divElem.append((gameParameters.answer[i] = "-"));
    gameParameters.answerDiv.push(divElem);
    gameParameters.answer[i] = "-";
  }

  hiddenWordElem.append(...gameParameters.answerDiv);

  gameParameters.remainingLetters = gameParameters.randomWord.length;
  console.log(gameParameters.randomWord, gameParameters.remainingLetters);
  gameInfoElem.innerHTML = 'Угадайте букву или нажмите "Начать заново" что бы сменить слово.';
}

/**
 * процесс игры. проверка наличия буквы, отгаданной буквы и конец игры.
 * @param {Text} meaning
 */
function gameProcess(event) {
  const meaning = event.target.dataset.index;
  console.log(
    "попытка выцепить данные:",
    event.target,
    "значение data-index:",
    event.target.dataset.index
  );

  if (gameParameters.lettersUsed.includes(meaning) == true) {
    gameInfoElem.innerHTML = `${nikName} вы уже использовали букву!`;
    return;
  }

  if (gameParameters.randomWord.includes(meaning) == true) {
    correctLetter(event, meaning);
  } else {
    wrongLetter(event, meaning);
  }

  if (gameParameters.remainingAttempts == 0) {
    gameOver();
  } else if (gameParameters.answer.includes("-") == false && gameParameters.remainingAttempts > 0) {
    victory();
  }
  gameParameters.lettersUsed.push(meaning);
}

function correctLetter(event, meaning) {
  console.log(
    "что",
    meaning,
    "верная буква",
    event.target,
    "значение data-index:",
    event.target.dataset.index
  );

  for (let j = 0; j < gameParameters.randomWord.length; j++) {
    if (gameParameters.randomWord[j] === meaning) {
      gameParameters.answer[j] = meaning;

      gameParameters.remainingLetters--;
      hiddenWordElem.childNodes[j].innerHTML = meaning.toUpperCase();
      gameInfoElem.innerHTML = `Поздравляем! Такая буква есть. Следующая буква?.`;

      //смена цвета кнопки.
      event.target.style.cssText = `background-color: green;`;
      console.log("Буква найдена", gameParameters.answer, "Победа");
    }
  }
}

function wrongLetter(event, meaning) {
  if (
    gameParameters.randomWord.includes(meaning) == false &&
    gameParameters.remainingAttempts > 0 &&
    gameParameters.answer.includes("-") == true
  ) {
    if (meaning == "е" && gameParameters.randomWord.includes("ё")) {
      correctLetter(event, "ё");
    } else {
      gameInfoElem.innerHTML = `такой буквы нету. У вас осталось попыток: "${
        gameParameters.remainingAttempts - 1
      }"`;

      //смена цвета.
      event.target.style.cssText = `background-color: red;`;
      // отнимаем жизнь
      gameParameters.remainingAttempts--;
      // рисуем.
      let partPerLife = imageParts / gameParameters.maxLife;
      let parts = imageParts - Math.ceil(partPerLife * gameParameters.remainingAttempts);

      for (let indexAnswer = 0; parts > indexAnswer; indexAnswer++) {
        chanceLife[indexAnswer]();
      }
    }
    console.log("минус жизнь");
  }
}

function gameOver() {
  gameInfoElem.innerHTML = `${nikName} Вы проиграли! Было загадано слово "${gameParameters.randomWord}"`;
  console.log("Проигрыш");
  for (let j = 0; j < gameParameters.randomWord.length; j++) {
    gameParameters.answer[j] = gameParameters.randomWord[j];
    hiddenWordElem.childNodes[j].innerHTML = gameParameters.randomWord[j].toUpperCase();
  }
  buttonOff();
}

function victory() {
  gameInfoElem.innerHTML = `Хорошо! ${nikName} Было загадано слово "${gameParameters.randomWord}"`;
  playerWin();
  buttonOff();
}

function buttonOff() {
  // отключить кнопки
  for (let j = 0; j < meaningButton.length; j++) {
    meaningButton[j].disabled = true;
  }
}

/*
это сделал
- цифры стоит выносить в константы. не использовать внутри кода целенаправленные числа(слова), которые имеют смысл.
- если не было ни одной ошибки челочек рисуется с веревкой но без виселицы. веревка в воздухе висит.
- буквы которые отмечены цветом уже нажимались, а следовательно повторное их нажатие должно вызывать надпись
  "Вы уже пробовали эту букву".
- буква "ё" тут вобще не нужна. заменить "ё" на "е".
- изменить количество жизней в зависимости от длины слова.
- когда закончились жизни не выдается слово.
- когда проиграл отобразить в div загаданное слово.

это еще не нет


*/
