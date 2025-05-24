class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    bossenergy = 100; 
    lastHit = 0;
    hitTarget = false;

    /**
     * Applies gravity to the object, altering its vertical position and speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this instanceof Endboss) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY; 
                    this.speedY -= this.acceleration * 0.5; 
                } else {
                    this.speedY = 0; 
                }
            } else if (this instanceof ThrowableObject) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY; 
                    this.speedY -= this.acceleration; 
                } else {
                    this.speedY = 0; 
                    this.splash();                    
                }
            } else {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY; 
                    this.speedY -= this.acceleration; 
                } else {
                    this.speedY = 0; 
                }
            }
        }, 1000 / 25);
    }    

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 380;
        } else if (this instanceof Endboss) {
            return this.y < 230;
        } else {
            return this.y < 140;
        }
    }

    /**
     * Determines if the current object is colliding with another object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if there is a collision, false otherwise.
     */
    isColliding(mo) {
        let hitbox1 = this.getHitbox();
        let hitbox2 = mo.getHitbox();
    
        return (
            hitbox1.x < hitbox2.x + hitbox2.width &&
            hitbox1.x + hitbox1.width > hitbox2.x &&
            hitbox1.y < hitbox2.y + hitbox2.height &&
            hitbox1.y + hitbox1.height > hitbox2.y
        );
    }

    /**
     * Retrieves the hitbox of the object, which is used for collision detection.
     * @returns {Object} The hitbox of the object.
     */
    getHitbox() {
        let hitbox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    
        if (this instanceof Character) {
            if (this.isCrouching) {
                hitbox.y = this.y + this.height / 2;
                hitbox.height = this.height / 2;
            } else {
                hitbox.x = this.x - 10;
                hitbox.width = this.width - 40;
                hitbox.height = this.height / 1.5;
                hitbox.y = this.y + this.height / 2.8;
            }
        } else if (this instanceof Bird) {
            hitbox.x = this.x + 30;
            hitbox.y = this.y + 30;
            hitbox.width = this.width - 60;
            hitbox.height = this.height - 20;
        } else if (this instanceof Coin) {
            hitbox.x = this.x + 5;
            hitbox.y = this.y + 5;
            hitbox.width = this.width - 10;
            hitbox.height = this.height - 10;
        } else if (this instanceof Bottle) {
            hitbox.x = this.x + 10;
            hitbox.y = this.y + 10;
            hitbox.width = this.width - 20;
            hitbox.height = this.height - 20;
        }
        return hitbox;
    }

    /**
     * Reduces the energy of the object when hit and potentially triggers other effects.
     * @param {number} hi - The amount of damage taken.
     */
    hit(hi) {
        this.energy -= hi;
        if (this.energy <= 0) {
            this.energy = 0;
           
        } else {
            this.lastHit = new Date().getTime();
        }
        if (this.world && this.world.healthBar) {
            this.world.healthBar.setPercentage(this.energy);
        }
        soundManager.playSoundEffect('hit');
    }

    /**
     * Triggers win conditions, including displaying win overlay and playing win music.
     */
    triggerWin() {
        setTimeout(() => {
            let overlay = document.getElementById('winOverlay');
            let video = document.getElementById('winVideo');

            overlay.style.display = 'flex';
            soundManager.playMusic('win'); 
            if (video.paused) {
                video.play();}
                
            video.onended = () => {
                quitGame(); 
            };
        }, 2000); 
    }

    /**
     * Triggers lose conditions, including displaying lose overlay and playing lose music.
     */
    triggerLose() {
        world.pauseGame();
        setTimeout(() => {
            let overlay = document.getElementById('loseOverlay');
            let video = document.getElementById('loseVideo');

            overlay.style.display = 'flex';
            soundManager.playMusic('lose'); 
            if (video.paused) {
                video.play();}
                
            video.onended = () => {
                quitGame(); 
            };
        }, 1000); 
    }  

    /**
     * Reduces the boss's energy when hit.
     */
    bossHit() {
        this.bossenergy -= 20; 
        if (this.bossenergy < 0) {
            this.bossenergy = 0;
        }
        this.lastHit = new Date().getTime();
        if (this.world && this.world.bossBar) {
            this.world.bossBar.setPercentage(this.bossenergy);
        }
    }

    /**
     * Checks if the object is hurt based on time since last hit.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed / 1000 < 1;
    }

    /**
     * Checks if the boss is hurt based on time since last hit.
     * @returns {boolean} True if the boss is hurt, false otherwise.
     */
    bossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed / 1000 < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        if (this.energy === 0) {
            if (this instanceof Character) {
                this.triggerLose(); 
            }
            return true;
        }
        return false;
    }
    
    /**
     * Checks if the boss is dead.
     * @returns {boolean} True if the boss is dead, false otherwise.
     */
    bossIsDead() {
        if (this.bossenergy === 0) {
            this.triggerWin(); 
            return true;
        }
        return false;
    }    

    /**
     * Plays a set of animation frames for the object.
     * @param {string[]} images - Array of image paths for the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Causes the object to jump.
     */
    jump() {
        this.speedY = 15; 
        soundManager.playSoundEffect('jump');
    }

    /**
     * Causes a boss object to jump.
     */
    bossJump() {
        this.speedY = 16; 
        soundManager.playSoundEffect('chickenDead');
    }
}
