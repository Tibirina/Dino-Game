const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyup(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
    //Descendo        
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else{
                position -= 20;
                dino.style.bottom = position + 'px';
                }
            }, 20);
        } else{
//subindo
        position += 20;
        dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = 1000 + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition <- 60) {
            //Saiu de tela
            clearInterval(leftTimer);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
 
            //Game Over
        clearInterval(leftTimer);
        isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else{  
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyup);