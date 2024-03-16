let nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');

const gameInfo = document.querySelector(".information");
const hiddenWord = document.querySelector(".progress");
const topWindow = document.querySelector(".frame");
const enteredValue = document.querySelector(".box-2");
const resetGame = document.querySelector(".reset");
const stopGame = document.querySelector(".end");
let value = "";

topWindow.innerHTML = `<p>Привет, <b>${nikName}.</b> <br>Начнем игру!</p>`;
console.log(`Привет, ${nikName}`);
 

// массив слов и выбор случайного числа
let setWords = ["программа", "макака", "прекрасный", "оладушек", "чебурек"];
let randomWord = setWords[Math.floor(Math.random() * setWords.length)];
let attempts = 7;
let answer = [];
for (let i = 0; word.length > i; i++) {
  answer[i] = "_";
}
let remainingLetters = word.length;
console.log(word);

hiddenWord.innerHTML = answer.join(" ");

gameInfo.innerHTML = 'Угадайте букву или нажмите "Отмена" для выхода из игры.';

function stopGame() {
    gameProcess("pause");
    console.log(value);
}
function restartGame() {
    gameProcess("restart");
    console.log(value);
}
function checkLetter() {
  value = meaning.value.toLowerCase();
  meaning.value = "";
  meaning.focus();
  console.log(value);
  gameInfo.innerHTML = 'Угадайте букву или нажмите "Отмена" для выхода из игры.';
}

function gameProcess(vauel) {
  while (remainingLetters > 0 && attempts > 0) {
    console.log("условие выполняется",)

    if (value == "pause") {
        gameInfo.textContent = "Конец игры";
        console.log("Конец игры")
    } if (value === "restart"){
        word = words[Math.floor(Math.random() * words.length)];
        console.log(word)
    } if (aasdGf.length !== 1) {
      gameInfo.innerHTML = "Пожалуйста, введите только одну букву.";
    } else {
      for (let j = 0; j < word.length; j++) {
        if (answer[j] === a) {
          gameInfo.innerHTML = `${nikName} вы уже угадали эту букву!`;
          break;
        } else if (word[j] === a) {
          answer[j] = a;
          remainingLetters--;
        }
      }
      if (word.includes(a) == false && attempts >= 1) {
        gameInfo.innerHTML = `${nikName} такой буквы нету. У вас осталось попыток: "$`
        attempts - 1
        };
        attempts--;
        console.log(attempts);
      }
    }
  if (attempts == 0) {
    alert('вы проиграли! Было загадано слово "' + word + '"');
  } else {
    alert(answer.join(" "));
    alert('Отлично! Было загадано слово "' + word + '"');
  }
}

