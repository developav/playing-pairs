/* eslint-disable no-sequences */
import Card from './card.js';
// Создаем поле для ввода
const contEl = document.querySelector('div.container');
const blockHead = document.createElement('div'); 
const head = document.createElement('h1');
const input = document.createElement('input');
const button = document.createElement('button');
const btn = document.createElement('button');
const timerShow = document.createElement('div');
timerShow.setAttribute('id', 'timer');
contEl.prepend(blockHead);
contEl.append(btn);
head.classList.add('head')
head.textContent = "Игра в пары"
btn.textContent = 'Сыграть еще раз';
btn.setAttribute('disabled', true);
btn.classList.add('again');
contEl.append(timerShow);
button.classList.add('button');
blockHead.classList.add('block__input')
button.setAttribute('id', 'btn');
input.setAttribute('id', 'inp');
button.textContent = 'Начать';
blockHead.prepend(button);
blockHead.prepend(input);
blockHead.prepend(head)
input.setAttribute('placeholder', 'Введите желаемое количество карточек 16 max');

btn.classList.add("none")

button.addEventListener('click', () => {
  let inputVal = document.getElementById('inp').value;
  const finish = document.querySelectorAll('.card.success');

  function newGame(container, cardsCount) { // создание игрового поля
    let cardNumberArray = [];
    let cardsArray = [];
    let firstCard = null;
    let secondCard = null;

    function createTimer() {
      let timeMinut = 60;
      const timer = setInterval(() => {
        const seconds = timeMinut % 60;
        const minutes = timeMinut / 60 % 60;
        const hour = timeMinut / 60 / 60 % 60;
        if (timeMinut < 0 || finish.length == cardNumberArray.length) {
          clearInterval(timer);
          // eslint-disable-next-line no-unused-expressions
          container.innerHTML = 'Время вышло',
          cardNumberArray = [],
          cardsArray = [],
          firstCard = null,
          secondCard = null,
          btn.disabled = false;
          btn.addEventListener('click', () => {
            clearInterval(timer);
            container.innerHTML = '',
            cardNumberArray = [],
            cardsArray = [],
            firstCard = null,
            secondCard = null;
            newGame(document.getElementById('game'), inputVal);
          
            btn.disabled = true;
          });
        } else {
          const strTimer = `${Math.trunc(hour)} : ${Math.trunc(minutes)} : ${seconds}`;
          timerShow.innerHTML = strTimer;
        }
        --timeMinut;
      }, 1000);
    }
    createTimer();

    for (let i = 1; i <= cardsCount / 2; i++) {
      cardNumberArray.push(i);
      cardNumberArray.push(i);
    }

    cardNumberArray = cardNumberArray.sort(() => Math.random() - 0.5);

    for (const cardNumber of cardNumberArray) {
      cardsArray.push(new Card(container, cardNumber, flip));
    }
    function flip(card) { // логика игры
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number != secondCard.number) {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
        }
      }
      if (firstCard == null) {
        firstCard = card;
      } else if (secondCard == null) {
        secondCard = card;
      }
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number == secondCard.number) {
          firstCard.success = true;
          secondCard.success = true;
          firstCard = null;
          secondCard = null;
        }
      }
      if (document.querySelectorAll('.card.success').length == cardNumberArray.length) { // сброс игры
        container.innerHTML = 'Победа';
        clearInterval(timer),
        cardNumberArray = [],
        cardsArray = [],
        firstCard = null,
        secondCard = null,
        btn.disabled = false;
        btn.classList.remove('none')
        btn.addEventListener('click', () => {
          container.innerHTML = '',
          cardNumberArray = [],
          cardsArray = [],
          firstCard = null,
          secondCard = null;
          newGame(document.getElementById('game'), inputVal);
          btn.disabled = true;
          btn.classList.add('none')
        });
      }
    }
  }
  if (inputVal > 16) {
    newGame(document.getElementById('game'), inputVal = 8);
  }
   else {
    newGame(document.getElementById('game'), inputVal);
  }
  input.value = '';
}, { once: true });
