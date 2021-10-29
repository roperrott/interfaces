document.addEventListener('DOMContentLoaded', () => {
    let gameOver = document.querySelector('.game-over');
    let ground = document.querySelector('.ground');
    let container = document.querySelector('.container');
    let score = document.querySelector('.score');
    let scoreValue = document.querySelector('#score-value')
    let ufo = document.querySelector('.layer-4');
    let cloud = document.querySelector('.layer-3');
    let cactus = document.querySelector('.layer-2');
    let tRex = document.querySelector('.t-rex');
    let testCactus = document.querySelector('.layer-6');
    let testUfo = document.querySelector('.layer-7');
    let isEnd = false;
    let keyDown = false;
    let keyCodes = 0;
    let isFlying = false;
    let isJumping = false;

    window.addEventListener('keydown', (e) =>{
        keyDown = true;
        keyCodes = e.code;
    });

    // window.addEventListener('keyup', (e) => {
    //     keyDown = false; 
    // })

    let intervalId = setInterval(function()
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
            }else if( keyCodes === 'ArrowRight'){
                runFaster();
            }
        }else{

        }
    }, 70 /*ajustar al tiempo necesario*/);

    if(isEnd){
        window.clearInterval(intervalId);
    }

    function checkColission() {
    
        // T-rex 
        let heroWidth = tRex.getBoundingClientRect().width
        let heroHeight = tRex.getBoundingClientRect().height

        // Alien bug position
        let cactusX = testCactus.getBoundingClientRect().x;
        let cactusY = testCactus.getBoundingClientRect().y;

        // Hero bounds
        // ESTAN MAL CALCULADAS ACTUALMENTE
        let fromX = tRex.getBoundingClientRect().x - 42;
        let toX = tRex.getBoundingClientRect().x + 42;
        let fromY = tRex.getBoundingClientRect().y - (heroHeight / 2);
        let toY = tRex.getBoundingClientRect().y + (heroHeight / 2);

        let ufoX = testUfo.getBoundingClientRect().x;
        let ufoY = testCactus.getBoundingClientRect().y;

        if ((cactusX > fromX && cactusX < toX) && (cactusY > fromY && cactusY < toY)) {
            // GAME OVER
            console.log("MUERTE EN TIERRA")
        }
        if ((ufoX > fromX && ufoX < toX) && (ufoY > fromY && ufoY < toY)) {
            // GAME OVER
            console.log("MUERTE EN AIRE")
        }
    }

    function calculateScore() {
        let value = parseInt(scoreValue.innerHTML);
        value += 1;
        scoreValue.innerHTML = value;
    }

    function jump(){
        tRex.classList.remove('running');
        tRex.classList.add('jumping');

        window.addEventListener('keyup', (e) => {
            keyDown = false; 
            tRex.classList.remove('jumping');
            tRex.classList.add('running');
            isJumping = false;
        })
    }

    function superMode(){
        container.classList.add('transition-super');
      
        tRex.classList.add('superheroe');
        ground.classList.add('ground-super');
        cactus.classList.add('cactus-super');
        cloud.classList.add('cloud-super');
        ufo.classList.add('ufo-super');
        setTimeout(() => {
            tRex.classList.remove('superheroe');
            ground.classList.remove('ground-super');
            cactus.classList.remove('cactus-super');
            cloud.classList.remove('cloud-super');
            ufo.classList.remove('ufo-super');
            container.classList.remove('transition-super')
            
            keyCodes = "";
            isFlying = false;
        }, 3000);
    }

    function runFaster(){
   
    }
})