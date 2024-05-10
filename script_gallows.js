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
/**
 * сложность игры.
 * @param {string} n 
 */
function difficultyGame(n) {
  gameState.difficulty = n;
}
/**
 * категория слов.
 * @param {string} n 
 */
function selectedCategory(n){
  gameState.category = n;
}

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
const gameInfoElem = document.querySelector(".information"); // назвать более одинаково что бы не путаться
const hiddenWordElem = document.querySelector(".answer");
const topWindowElem = document.querySelector(".frame");
const enteredValueElem = document.querySelector(".input");
const resetGameElem = document.querySelector(".reset");
const stopGameAlElem = document.querySelector(".end");
const meaningButton = document.querySelectorAll(".letter");
//создание див загаданого слова.
const displayHiddenWord = document.createElement("div");



const gameState = {
  lettersUsed: [],
  answer: [],
  answerDiv: [],
  difficulty: "easy",
  category: "animal",
  randomWord: "",
  maxLife: 7,
  remainingAttempts: 0,
  remainingLetters: 0,
  charLetterUsage(letter) {
    if(this.lettersUsed.includes(letter)) {
      console.log(1)
      return 1;
    }
    if (this.randomWord.includes(letter)) {
      console.log(2)
      return 2;
    } else {
      console.log(3)
      return 3;
    }
    },
  /* написать функцию, которое будет проверять (cherLetterUsage) использованные буквы и 
  методы для иффов. через this  что бы не писать gameParameters а сразу this.abswer
  */
};
/*
  if (gameState.lettersUsed.includes(letter) == true) {
    gameInfoElem.innerHTML = `${nikName} вы уже использовали букву!`;
    return;
  } 
  */

/**
 * обнуляем значения, для начала новой игры
 */
function gameStateReset() { //заменить на gameState
  gameState.lettersUsed = [];
  gameState.answer = [];
  gameState.answerDiv = [];
  hiddenWordElem.replaceChildren();
  //сброс кнопок алфавита.
  for (i = 0; meaningButton.length > i; i++) {// поменять минингбаттон на леттер батон
    meaningButton[i].style = ".letter";
    meaningButton[i].disabled = false;
  }
  lifeField.clearRect(0, 0, canvas.width, canvas.height);
  // life
  if (gameState.difficulty == "hard") {
    gameState.maxLife = 10;
  } else {
    gameState.maxLife = 7;
  }
  gameState.remainingAttempts = gameState.maxLife;
}
const gameInfo = {
  hiPlayer: `<p>Привет, <b>${nikName}.</b> Начнем игру!</p> `,
  startGame: 'Угадайте букву или нажмите "Начать заново" что бы сменить слово.',
  letterWas: `${nikName} вы уже использовали букву!`,
  correctLetter: `Поздравляем! Такая буква есть. Следующая буква?.`,
  wrong: 'Такой буквы нет. Осталось попыток: ',
  playerWin: `Хорошо! ${nikName} Было загадано слово "`,
  gameOver: `${nikName} Вы проиграли! Было загадано слово "`,
}


topWindowElem.innerHTML = gameInfo.hiPlayer;
generationWord();
console.log(`Привет, ${nikName}`);

//количество жизней и отрисовка игры в canvas.
/**
 * площадка.
 */
function drawOneLife() {
  lifeField.beginPath();
  lifeField.moveTo(50, 240);
  lifeField.lineTo(230, 240);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * столб.
 */
function drawTwoLife() {
  lifeField.beginPath();
  lifeField.moveTo(100, 240);
  lifeField.lineTo(100, 30);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * поперечина.
 */
function drawThreeLife() {
  lifeField.beginPath();
  lifeField.moveTo(60, 30);
  lifeField.lineTo(180, 30);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * веревка.
 */
function drawFourLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 31);
  lifeField.lineTo(160, 80);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * голова.
 */
function drawFiveLife() {
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
function drawSixLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 115);
  lifeField.lineTo(160, 180);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * левая рука.
 */
function drawSevenLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 130);
  lifeField.lineTo(120, 155);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * правая рука.
 */
function drawEightLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 130);
  lifeField.lineTo(200, 155);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * левая нога.
 */
function drawNineLife() {
  lifeField.beginPath();
  lifeField.moveTo(160, 180);
  lifeField.lineTo(135, 220);
  lifeField.lineWidth = 2;
  lifeField.stroke();
}
/**
 * game over.
 */
function drawTenLife() {
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
function drawPlayerWin() {
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
  drawOneLife,
  drawTwoLife,
  drawThreeLife,
  drawFourLife,
  drawFiveLife,
  drawSixLife,
  drawSevenLife,
  drawEightLife,
  drawNineLife,
  drawTenLife,
];

//кол-во частей в канвас.
const imageParts = chanceLife.length;

// выбор случайного слова.
/**
 * генерация слова, замена букв на символы, сброс всех значений при рестарте игры.
 */
function generationWord() {
  //обнуляем значения.
  gameStateReset();
  //выбираем слово из массива по категории.
  gameState.randomWord =
  gameLevel[gameState.category][gameState.difficulty][
      Math.floor(Math.random() * gameLevel[gameState.category][gameState.difficulty].length)
    ];

  for (let i = 0; gameState.randomWord.length > i; i++) {
    let divElem = document.createElement("div");
    divElem.className = "answer-word";
    divElem.append((gameState.answer[i] = "-"));
    gameState.answerDiv.push(divElem);
    gameState.answer[i] = "-";
  }

  hiddenWordElem.append(...gameState.answerDiv);

  gameState.remainingLetters = gameState.randomWord.length;
  console.log(gameState.randomWord, gameState.remainingLetters);
  gameInfoElem.innerHTML = gameInfo.startGame;
}


/**
 * процесс игры. проверка наличия буквы, отгаданной буквы и конец игры.
 * @param {Text} meaning
 */
function gameProcess(event) {
  //meaning заменить на letter или какой то леттер
  // сделать константу с евент таргет и его пробрасывать
  const buttonPosition = event.target;
  const letter = event.target.dataset.index;
  console.log(
    "попытка выцепить данные:",
    event.target,
    "значение data-index:",
    event.target.dataset.index
  );
  
  switch(gameState.charLetterUsage(letter)) {
    case 1:
      gameInfoElem.innerHTML = gameInfo.letterWas;
      break;
    case 2:
      correctLetter(buttonPosition, letter);
      break;
    case 3:
      wrongLetter(buttonPosition, letter);
      break;
  }
  gameState.lettersUsed.push(letter);

  if (gameState.remainingAttempts == 0) {
    gameOver();
  } else if (gameState.answer.includes("-") == false && gameState.remainingAttempts > 0) {
    victory();
  }
}

function correctLetter(buttonPosition, letter) {
  for (let j = 0; j < gameState.randomWord.length; j++) {
    if (gameState.randomWord[j] === letter) {
      gameState.answer[j] = letter;

      gameState.remainingLetters--;
      hiddenWordElem.childNodes[j].innerHTML = letter.toUpperCase();
      gameInfoElem.innerHTML = gameInfo.correctLetter;

      //смена цвета кнопки.
      buttonPosition.style.cssText = `background-color: green;`;
      console.log("Буква найдена", gameState.answer, "Победа");
    }
  }
}

function wrongLetter(buttonPosition, letter) {
  if (//подумать может быть и всеь этот иф не нужен вовсе
  gameState.remainingAttempts > 0 &&
  gameState.answer.includes("-") == true
  ) {
    if (letter == "е" && gameState.randomWord.includes("ё")) {
      correctLetter(buttonPosition, "ё"); // так не красивое. надо в чеклеттер уседж
    } else {
      //смена цвета.
      buttonPosition.style.cssText = `background-color: red;`;
      // отнимаем жизнь
      gameState.remainingAttempts--;
      gameInfoElem.innerHTML = gameInfo.wrong + '\"' + gameState.remainingAttempts + '\"';
      // рисуем.
      let partPerLife = imageParts / gameState.maxLife;
      let parts = imageParts - Math.ceil(partPerLife * gameState.remainingAttempts);

      for (let indexAnswer = 0; parts > indexAnswer; indexAnswer++) {
        chanceLife[indexAnswer]();
      }
    }
    console.log("минус жизнь");
  }
}

function gameOver() {
  gameInfoElem.innerHTML = gameInfo.gameOver + gameState.randomWord +'\"';
  console.log("Проигрыш");
  for (let j = 0; j < gameState.randomWord.length; j++) {
    gameState.answer[j] = gameState.randomWord[j];
    hiddenWordElem.childNodes[j].innerHTML = gameState.randomWord[j].toUpperCase();
  }
  buttonOff();
}

function victory() {
  gameInfoElem.innerHTML = gameInfo.playerWin + gameState.randomWord +'\"';
  drawPlayerWin();
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
- draw добавить в начале каждой функции рисования

это еще не нет
- я меняю цвет напрямую, а надо добавлять класс..... 
- про свитч кейс
методы в гайм параметры



вопросы:
-объект фраз, для общения с игроком.
*/
