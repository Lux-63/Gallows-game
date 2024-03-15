//document.addEventListener("keydown", handleKey);

let nikName = prompt('Добро пожаловать в игру "Виселица" как вас зовут?');
const gameInfo = document.querySelector(".information");
const hiddenWord = document.querySelector(".progress");
const privet =document.querySelector(".frame"); 
privet.innerHTML =`<p>Привет, <b>${nikName}.</b> <br>Начнем игру</p>` 
console.log(`Привет, ${nikName}`)

document.getElementById("check").addEventListener("click", () => {
    let a = document.getElementById("input").value;
    console.log(a);
})
    
    

//function handleKey(event) {


/**
 * массив слов
 */
let words = [
    "программа",
    "макака",
    "прекрасный",
    "оладушек",
    "чебурек"
    ];

    let word = words[Math.floor(Math.random() * words.length)];
    let attempts = 7;

    let answer = [];
    for (let i = 0; word.length > i; i++) {
        answer[i] = "_";
    }
    let remainingLetters = word.length;
    console.log(word);
    // Игровой цикл
    while (remainingLetters > 0 && attempts > 0) {
    // Показываем состояние игры
    hiddenWord.innerHTML = answer.join(" ");
    // Запрашиваем вариант ответа

    let guess = prompt("Угадайте букву или нажмите Отмена для выхода из игры.".toLowerCase());
    if (guess === null) {
        break;
    } else if (guess.length !== 1) {
        gameInfo.innerHTML= "Пожалуйста, введите только одну букву.";
    } else {
        for (let j = 0; j < word.length; j++) {
            if (answer[j] === guess) {
                gameInfo.innerHTML=`${nikName} вы уже угадали эту букву!`
                break;
            } else if (word[j] === guess) {
                answer[j] = guess;
                remainingLetters--;
            }
        }
        if (word.includes(guess) == false && attempts >= 1) {
            gameInfo.innerHTML=`${nikName} такой буквы нету. У вас осталось попыток: "${attempts - 1}"`
            attempts--;
            console.log(attempts)
        }
    }
}
if (attempts == 0) {
    alert('вы проиграли! Было загадано слово "' + word +'"');
} else {
    alert(answer.join(" "));
    alert('Отлично! Было загадано слово "' + word +'"');
}
