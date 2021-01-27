const background = document.querySelector('.background');

class Dino {
    constructor() {
        this.dino = document.querySelector('.dino');
        this.isJumping = false;
        this.y = 0;
        this.ascensionSpeed = 5;
        this.descentSpeed = 5;
        this.verticalLeap = 150;
    }
        
    jump() {
        if (!this.isJumping) { 
            this.isJumping = true;
            this.ascend();
        }
    }
    
    ascend() {
        let interval = setInterval(() => {
            if (this.y >= this.verticalLeap) {
                clearInterval(interval);
                this.descend();
            } else {
                this.y += this.ascensionSpeed;
            }
        }, 1);
    }
    
    descend() {
        let interval = setInterval(() => {
            if (this.y <= 0) {
                clearInterval(interval);
                this.isJumping = false;
            } else {
                this.y -= this.descentSpeed;
            }
        }, 1);
    }
}

class Cactus {
    constructor() {
        this.cactus = this.render();
        this.x = 1000;
        this.leftwardSpeed = 5;
        this.isVisible = true;
    }
    
    render() {
        const cactus = document.createElement('div');
        cactus.classList.add('cactus');
        cactus.style.left = 1000 + 'px';
        background.appendChild(cactus);
        
        return cactus;
    }
    
    move() {
        let interval = setInterval(() => {
            this.x -= this.leftwardSpeed;
            if (this.x < -60) {
                clearInterval(interval);
                this.isVisible = false;
                background.removeChild(this.cactus);
            }
        }, 1);
    }
}

class Game {
    constructor() {
        this.dino = new Dino();
        this.cacti = new Set();
    }
    
    start() {
        this.spawnCactus();
        let interval = setInterval(() => {
            const cacti = document.getElementsByClassName('cactus');
        
            this.dino.dino.style.bottom = this.dino.y + 'px';
            this.cacti.forEach((value1, value2, set) => {
                if(value1.isVisible) {
                    value1.cactus.style.left = value1.x + 'px';
                    if(this.hasCollided(value1)) {
                        clearInterval(this.start);
                        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
                    }
                } else
                    set.delete(value1);
            });
        }, 1);
        
        document.addEventListener('keyup', (event) => { this.handleKeyUp(event); });
    }
    
    spawnCactus() {
        let randomTime = Math.random() * 6000;
        let cactus = new Cactus();
        console.log(this);
        this.cacti.add(cactus);
        cactus.move();
        setTimeout(this.spawnCactus.bind(this), randomTime);
    }
    
    handleKeyUp(event) {
        if (event.keyCode === 32) {
            this.dino.jump();
        }
    }
    
    hasCollided(cactus) {
        if(cactus.x < 60 && this.dino.y < 60) {
            return true;
        }
        return false;
    }
}

new Game().start();