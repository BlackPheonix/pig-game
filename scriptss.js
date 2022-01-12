'use strict';

var scores, roundScore, activePlayer, gamePlaying, prevRoll;

init();

var lastDice;

// dice =  Math.floor(Math.random() * 6) + 1;

// console.log(dice);

// document.querySelector('#current--' + activePlayer).textContent = dice;

// document.querySelector('#current--' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score--0').textContent;

// console.log(x);





document.querySelector('.btn--roll').addEventListener('click', function() {
    if(gamePlaying) {
          
        //1.  Random number
        var dice1 =  Math.floor(Math.random() * 6) + 1;
        var dice2 =  Math.floor(Math.random() * 6) + 1;

        
        //   Gett prev and current number
        
    
         //2.  Display the result
         document.getElementById('dice-1').style.display = 'block';
         document.getElementById('dice-2').style.display = 'block';
    
    
         document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

         document.getElementById('dice-1').src = 'dice-' + dice2 + '.png';
    
    
          //3.  Update the round score IF the rolled number was NOT a 1

          if(dice1 > 1 && dice2 !== 1) {
            //   Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
          } else {
            nextPlayer();
          }


        //   if ( dice === 6 && lastDice === 6){

        //     // player looses score
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        //     nextPlayer();

        //   } else if (dice > 1) {
        //     //   Add score
        //     roundScore += dice;
        //     document.querySelector('#current--' + activePlayer).textContent = roundScore;

        //   } else {
        //     //   Next player
        //     nextPlayer();
        //   }

        //   lastDice = dice;

    }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if(gamePlaying) {

        // add current score to GLOBAL score
        scores[activePlayer] += roundScore;
    
    
        //  Update the UI
    
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    

        // Collecting Predefined winning score

        var input = document.querySelector('.final-score').value;
        console.log(input);

        var winningScore;

        // undefined, 0, null or "" are coerced to false
        // Anything else is coerced to true
        if(input) {
            winningScore = input;

        } else {

            winningScore = 100;
        }
    
        //  check if player won the game 
    
        if ( scores[activePlayer] >= winningScore ) {
    
                // Winner
    
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
    
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
    
            document.querySelector('.player--' + activePlayer ).classList.add('player--winner');
    
            document.querySelector('.player--' + activePlayer ).classList.remove('player--active');
            gamePlaying = false;
    
        } else {
    
        // Next Player 
    
            nextPlayer();
        }
    }



});




function nextPlayer() {
    //   Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    
    // document.querySelector('.player--0').classList.remove('player--active');
    // document.querySelector('.player--1').classList.add('player--active')


    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active')

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    
    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';

    document.querySelector('.player--0 ').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    document.querySelector('.player--0 ').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--0').classList.add('player--active');
}

