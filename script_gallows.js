let nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');
const gameInfo = document.querySelector(".information");
const hiddenWord = document.querySelector(".progress");
const privet = document.querySelector(".frame");
const meaning = document.querySelector(".box-2");
const reset = document.querySelector(".reset");
const stopGames = document.querySelector(".end");
let a = "";

privet.innerHTML = `<p>Привет, <b>${nikName}.</b> <br>Начнем игру</p>`;
console.log(`Привет, ${nikName}`);



let words = ["программа", "макака", "прекрасный", "оладушек", "чебурек"];
let word = words[Math.floor(Math.random() * words.length)];
let attempts = 7;
let answer = [];
for (let i = 0; word.length > i; i++) {
  answer[i] = "_";
}
let remainingLetters = word.length;
console.log(word);
// Показываем состояние игры
hiddenWord.innerHTML = answer.join(" ");

gameInfo.innerHTML = 'Угадайте букву или нажмите "Отмена" для выхода из игры.';

function stop() {
    a = "pause";
    console.log(a);
}
function restart() {
    a = "restart";
    console.log(a);
}
function checkAd() {
  a = meaning.value.toLowerCase();
  meaning.value = "";
  meaning.focus();
  console.log(a);
  gameInfo.innerHTML = 'Угадайте букву или нажмите "Отмена" для выхода из игры.';
}

  while (remainingLetters > 0 && attempts > 0) {
    console.log("условие выполняется",)

    if (a == "pause") {
        gameInfo.innerHTML = "Конец игры";
        console.log("Конец игры")
    } if (a === "restart"){
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

