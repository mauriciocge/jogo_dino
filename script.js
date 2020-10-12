const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let position = 0;
let isJumping = false;
let isGameOver = false;

function handleKeyUp(event){
	if(!isJumping){
		jump();
	}
}

function jump(){

		if(event.keyCode === 32){
			isJumping = true;
			let upInterval = setInterval(() => {
				if(position >= 150){
					clearInterval(upInterval);
					let downInterval = setInterval(() => {
						if(position <= 0){
							clearInterval(downInterval);
							isJumping = false;
						}
						else{
							position -= 20;
							dino.style.bottom = position + "px";
						}
					},20);
				}
				else{
					position += 20;
					dino.style.bottom = position + "px";
				}
			},20);
	}
}

function createCactus(){
	let cactusPosition = 1000;
	const cactus = document.createElement('div');
	cactus.classList.add('cactus');
	background.appendChild(cactus);
	cactus.style.left = cactusPosition + 'px';
	
	let randomTime = Math.random() * 6000;

	if (isGameOver) return;
	
	let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);
  
    setTimeout(createCactus, randomTime);
	
}

createCactus();
document.addEventListener('keyup', handleKeyUp);