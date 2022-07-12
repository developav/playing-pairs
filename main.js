import Card from './card.js'

// Создаем поле для ввода
const contEl = document.querySelector('div.container')
const input = document.createElement('input')
const button = document.createElement('button')
const btn = document.createElement('button')
let timerShow = document.createElement('div')
timerShow.setAttribute('id', 'timer')
contEl.append(btn)
btn.textContent = 'Сыграть еще раз'
btn.setAttribute('disabled', true)
btn.classList.add('again')
contEl.append(timerShow)
button.classList.add('button')
button.setAttribute('id', 'btn')
input.setAttribute('id','inp')
button.textContent = 'Начать'
contEl.prepend(button)
contEl.prepend(input)
input.setAttribute('placeholder', 'Введите желаемое количество карточек')

    
 
button.addEventListener('click', function (){
    let inputVal = document.getElementById('inp').value
    let finish = document.querySelectorAll('.card.success')

    function newGame(container,cardsCount) {// создание игрового поля
        let cardNumberArray = [],
        cardsArray = [],
        firstCard = null,
        secondCard = null
        
        function createTimer(){
            let timeMinut = 60; 
                    let timer = setInterval(() => {
                        let seconds = timeMinut % 60 
                        let minutes = timeMinut / 60 % 60 
                        let hour = timeMinut / 60 / 60 % 60
                        if (timeMinut < 0 || finish.length == cardNumberArray.length) {
                            clearInterval(timer)
                            container.innerHTML = 'Время вышло',
                            cardNumberArray = [],
                            cardsArray = [],
                            firstCard = null,
                            secondCard = null,
                            btn.disabled = false

                        btn.addEventListener('click', function(){
                            clearInterval(timer)
                            container.innerHTML = '',
                            cardNumberArray = [],
                            cardsArray = [],
                            firstCard = null,
                            secondCard = null
                            newGame(document.getElementById('game'), inputVal);
                            btn.disabled = true
                        })
                            
                        }  else {
                            let strTimer = `${Math.trunc(hour)} : ${Math.trunc(minutes)} : ${seconds}`;
                            timerShow.innerHTML = strTimer;
                        }
                        --timeMinut
                    }, 1000);
        }
        createTimer();
    
        for (let i = 1; i <= cardsCount / 2; i++){
            cardNumberArray.push(i)
            cardNumberArray.push(i)
        }
        
        cardNumberArray = cardNumberArray.sort(() => Math.random() - 0.5)
    
        for(const cardNumber of cardNumberArray){
            cardsArray.push(new Card(container, cardNumber, flip))
        }
        function flip(card){ // логика игры
            if (firstCard !== null && secondCard !== null) {
                if (firstCard.number != secondCard.number){
                    firstCard.open = false
                    secondCard.open = false
                    firstCard = null
                    secondCard = null
                }
            }
            if(firstCard == null){
                firstCard = card
            } else {
                if(secondCard == null){
                    secondCard = card
                }
               
            }
            if (firstCard !== null && secondCard !== null) {
                if (firstCard.number == secondCard.number){
                    firstCard.success = true
                    secondCard.success = true
                    firstCard = null
                    secondCard = null
                }
            }
            if (document.querySelectorAll('.card.success').length == cardNumberArray.length){//сброс игры
                container.innerHTML = 'Победа'
                clearInterval(timer),
                cardNumberArray = [],
                cardsArray = [],
                firstCard = null,
                secondCard = null,
                btn.disabled = false
                btn.addEventListener('click', function(){
                    container.innerHTML = '',
                    cardNumberArray = [],
                    cardsArray = [],
                    firstCard = null,
                    secondCard = null
                    newGame(document.getElementById('game'), inputVal);
                    btn.disabled = true
                   
                })

            
            }
        
        }
    }


        if (inputVal > 16){
            newGame(document.getElementById('game'), inputVal = 4);
        } else {
            newGame(document.getElementById('game'), inputVal);
        }
        input.value = '';
},{once: true})


