document.addEventListener('DOMContentLoaded', () => {
    let divGameOver = document.querySelector('#game-over');
    let divNoConnection = document.querySelector('#connection-lost');
    let ground = document.querySelector('.ground');
    let container = document.querySelector('.container');
    let score = document.querySelector('.score');
    let scoreValue = document.querySelector('#score-value');
    let ufo = document.querySelector('.layer-4');
    let cloud = document.querySelector('.layer-3');
    let cactus = document.querySelector('.layer-2');
    let tRex = document.querySelector('.t-rex');
    let octopus = document.querySelector('.layer-6');
    let coin = document.querySelector('.layer-7');
    let isEnd = true;
    let keyDown = false;
    let keyCodes = 0;
    let isFlying = false;
    let isJumping = false;
    let intervalId;

    window.addEventListener('keydown', (e) =>{
        if (isEnd && e.code == 'Enter') {
            startGame();
        }
        keyDown = true;
        keyCodes = e.code;
    });

    function checkColission() {
        const ufoOffsetY = -250;
        const coinOffsetY = -264;

        // T-rex 
        let heroHeight = tRex.getBoundingClientRect().height

        // Alien bug position
        let octopusX = octopus.getBoundingClientRect().x;
        let octopusY = octopus.getBoundingClientRect().y;

        // Hero bounds
        let fromX = tRex.getBoundingClientRect().x - 20;
        let toX = tRex.getBoundingClientRect().x + 20;
        let fromY = tRex.getBoundingClientRect().y - (heroHeight / 2);
        let toY = tRex.getBoundingClientRect().y + (heroHeight / 2);

        // UFO position
        let ufoX = ufo.getBoundingClientRect().x;
        let ufoY = octopus.getBoundingClientRect().y + ufoOffsetY;

        // Coin position
        let coinX = coin.getBoundingClientRect().x;
        let coinY = coin.getBoundingClientRect().y + coinOffsetY;

        console.log("REX Y from " + fromY + "to" + toY);
        console.log("COIN POS -> " + coinY);

        if ((coinX > fromX && coinX < toX) && (coinY > fromY && coinY < toY)) {
            var soundEffect = new Audio("sounds/coin.mp3");
            soundEffect.loop = false;
            soundEffect.play();
            coin.classList.add('hidden');
            setTimeout(() => {  
                coin.classList.remove('hidden');
            }, 1000);
            calculateScore(500);
        }

        if (keyCodes != 'KeyS') {
            if ((octopusX > fromX && octopusX < toX) && (octopusY > fromY && octopusY < toY)) {
                gameOver();
            }
            if ((ufoX > fromX && ufoX < toX) && (ufoY > fromY && ufoY < toY)) {
                gameOver();
            }
        }
    }

    function startInterval() {   
        intervalId = setInterval(function()
        {
            calculateScore();
            checkColission();
            if(keyDown && !isFlying){
                if(keyCodes === 'Space'){
                    isJumping = true;
                    jump(); 
                }else if( keyCodes === 'KeyS' && isJumping){
                    isFlying = true;
                    superMode();
                }
            }
        }, 70);
    }

    function resetScore() {
        scoreValue.innerHTML = 0;
    }

    function startGame() {

        const audio = document.querySelector("audio");
        audio.volume = 0.4;
        audio.play();

        divNoConnection.classList.add('hidden');
        divGameOver.classList.add('hidden');
        isEnd = false;
        resetScore();
        startInterval();
        coin.classList.remove('hidden'); 
        coin.classList.add('coin-move');       
        ground.classList.add('ground-move');
        cactus.classList.add('cactus-move');
        cloud.classList.add('cloud-move');
        tRex.classList.add('running');
        octopus.classList.add('octopus-move');
        ufo.classList.add('ufo-move');
    }
    
    function gameOver() {
        window.clearInterval(intervalId);
        coin.classList.add('hidden');
        tRex.classList.remove('running');
        ground.classList.remove('ground-move');
        cactus.classList.remove('cactus-move');
        cloud.classList.remove('cloud-move');
        octopus.classList.remove('octopus-move');
        ufo.classList.remove('ufo-move');
        divGameOver.classList.remove('hidden');
        isEnd = true;
    }

    function calculateScore(extra = 0) {
        let value = parseInt(scoreValue.innerHTML);
        value = value + 1 + extra;
        scoreValue.innerHTML = value;
    }

    function jump(){
        if (!isEnd) {
            tRex.classList.remove('running');
            tRex.classList.add('jumping');
        
            window.addEventListener('keyup', (e) => {
                keyDown = false; 
                tRex.classList.remove('jumping');
                tRex.classList.add('running');
                isJumping = false;
            });
        }
    }

    function superMode(){
        container.classList.add('transition-super');
    
        tRex.classList.add('superheroe');
        ground.classList.add('ground-super');
        cactus.classList.add('cactus-super');
        cloud.classList.add('cloud-super');
        ufo.classList.add('ufo-super');
        octopus.classList.add('octopus-super');
        coin.classList.add('coin-super');
        setTimeout(() => {
            tRex.classList.remove('superheroe');
            ground.classList.remove('ground-super');
            cactus.classList.remove('cactus-super');
            cloud.classList.remove('cloud-super');
            ufo.classList.remove('ufo-super');
            container.classList.remove('transition-super');
            octopus.classList.remove('octopus-super');
            coin.classList.remove('coin-super');

            keyCodes = "";
            isFlying = false;
        }, 3000);
    }
});