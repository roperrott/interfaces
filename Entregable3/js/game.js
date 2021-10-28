document.addEventListener('DOMContentLoaded', () => {
    let gameOver = document.querySelector('.game-over');
    let ground = document.querySelector('.ground');
    let container = document.querySelector('.container');
    let score = document.querySelector('.score');
    let tRex = document.querySelector('.t-rex');
    let isEnd = false;
    let keyDown = false;
    let keyCodes = 0;
    

    window.addEventListener('keydown', (e) =>{
        keyDown = true;
        keyCodes = e.code;
    });

    // window.addEventListener('keyup', (e) => {
    //     keyDown = false; 
    // })

    let intervalId = setInterval(function()
    {
        if(keyDown){
            if(keyCodes === 'Space'){
                jump(); 
            }
            
        }else{

        }
    }, 70 /*ajustar al tiempo necesario*/);

    if(isEnd){
        window.clearInterval(intervalId);
    }

    function jump(){
        tRex.classList.remove('running');
        tRex.classList.add('jumping');

        window.addEventListener('keyup', (e) => {
            keyDown = false; 
            tRex.classList.remove('jumping');
            tRex.classList.add('running');
        })

    }

    // init();
    // while(!isEnd){
    //     processInput();
    //     updateState();
    //     draw();
    // }
    // end();
})