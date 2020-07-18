// 'use strict';

const squaresObj = {
    addNumbers: function() {
        const numbers = document.querySelectorAll(`.number`);

        let indx = 0;
        for (let i = 99; i >= 0; --i) {
            numbers[indx].textContent = i;
            ++indx;
        }
    },

    addSymbol: function() {
        const symb = document.querySelectorAll('.symbol');

        const getRandomValue = function() {
            
            let value = Math.ceil(Math.random() * Math.floor(126));

            do {
                value = Math.ceil(Math.random() * Math.floor(126));
            } while (value < 64);
            
            return value;
        };

        let specialSymb = String.fromCodePoint(getRandomValue());
        for (const key in symb) {
            if ((key % 9) == 0) {
                symb[key].textContent = specialSymb;
            } else {
                symb[key].innerText = String.fromCodePoint(getRandomValue());
            }
        }
    },

    ansver: function() {
        const blackSquare = document.querySelector(`img.black_square`),
             symb = document.querySelectorAll('.symbol');

             const getAnsver = (e) => {
                e.preventDefault();
                const action = document.querySelector(`.action`);

                const yourSymbol = document.createElement('div'),
                again = document.createElement(`button`);

                yourSymbol.classList.add(`your_symbol`);
                again.classList.add(`try_again`);

                yourSymbol.textContent = symb[0].textContent;
                again.textContent = 'try again';

                action.append(yourSymbol);
                action.after(again);

                blackSquare.removeEventListener(`click`, getAnsver);
                this.tryAgain();
            };

        blackSquare.addEventListener(`click`, getAnsver);
        
    },

    tryAgain: function() {
        const btn =  document.querySelector(`.try_again`),
            symbol = document.querySelector('.your_symbol'),
            squaresWrap = document.querySelector(`.squares_wrapper`);

        btn.addEventListener(`click`, (e) => {
            e.preventDefault();
            btn.remove();
            symbol.remove();
            squaresWrap.remove();
            this.createItems();
        });
    },

     createItems: function() {
        const main = document.querySelector(`.magic_main`); 
        const squaresWrap = document.createElement(`div`);
        squaresWrap.classList.add(`squares_wrapper`); 

        main.append(squaresWrap);

    
        for(let i = 0; i < 100; ++i) {
            const item = document.createElement(`div`),
            num = document.createElement(`div`),
            symbol = document.createElement(`div`);
    
            item.classList.add(`square_item`);
            num.classList.add(`number`);
            symbol.classList.add(`symbol`);
    
            squaresWrap.append(item);
            item.append(num);
            item.append(symbol);
        }

        this.addNumbers();
        this.addSymbol();
        this.ansver();
        
    },
};

squaresObj.createItems();