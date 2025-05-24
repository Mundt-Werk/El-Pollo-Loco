class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    bossBar = new BossBar();
    throwableObject = [new ThrowableObject()];
    gamePaused = false; 
    intervalIds = [];
    canThrowBottle = true; 

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Associates the world with characters and enemies.
     */
    setWorld() {
        this.character.world = this;
        this.level.boss.forEach((boss) => {
            boss.world = this; 
        });
    }

    /**
     * Starts the game loop to handle game mechanics regularly.
     */
    run() {
        let interval = setInterval(() => {
            if (!this.gamePaused) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkCoinCollection();
                this.checkBottleCollection();
                this.checkShopInteraction(); 
                this.checkEndbossEncounter();
                this.checkBirdVisibility();
                this.checkBossReachesHouse(); 
            }
        }, 200);
        this.intervalIds = [interval]; 
    }
    
    /**
     * Draws all game objects to the canvas, manages camera and UI overlays.
     */
    draw() {
        if (!this.gamePaused) {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.ctx.translate(this.camera_x, 0);
    
            this.throwableObject = this.throwableObject.filter(bottle => !bottle.removeFromGame);
    
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.shop);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.boss);
            this.addObjectsToMap(this.level.birds);
            this.addObjectsToMap(this.throwableObject); 
            this.addObjectsToMap(this.level.coins);
    
            this.ctx.translate(-this.camera_x, 0);
    
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.houses);
    
            this.ctx.translate(-this.camera_x, 0);
        }

        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.bossBar);
    
        let self = this;

        requestAnimationFrame(function () {
            self.draw();
        });        
    }

    /**
     * Pauses the game, stopping movement of all dynamic game objects.
     */
    pauseGame() {
        this.gamePaused = true;
        this.level.enemies.forEach(enemy => enemy.speed = 0); 
        this.level.birds.forEach(bird => bird.speed = 0);
        this.level.boss.forEach(boss => boss.speed = 0); 
    }
    
    /**
     * Resumes the game from a paused state.
     */
    resumeGame() {
        this.gamePaused = false;
        this.level.enemies.forEach(enemy => enemy.speed = 0.15 + Math.random() * 0.5); 
        this.level.birds.forEach(bird => bird.speed = 10);       
        this.level.boss.forEach(boss => boss.speed = 3); 
        this.draw();
    }

    /**
    * Checks all collisions in the game, including enemies, bosses, throwable objects, and birds.
    */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkBossCollisions();
        this.checkThrowableCollisions();
        this.checkBirdCollisions();
    }

    /**
    * Checks collisions between the character and standard enemies (e.g., chickens).
    * - If the character jumps on the enemy, the enemy dies.
    * - If the character collides from the side, he takes damage.
    */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.speedY < 0 && this.character.y + this.character.height - 12 < enemy.y + enemy.height) {
                enemy.die();
                this.character.speedY = 10;
                this.character.y -= 10;
                setTimeout(() => { this.character.speedY = 0; }, 100);
            } else if (enemy instanceof Chicken && this.character.isColliding(enemy) && !enemy.hasHitRecently && !enemy.isDead()) {
                this.character.hit(10);
                this.healthBar.setPercentage(this.character.energy);
                enemy.hasHitRecently = true;
                setTimeout(() => { enemy.hasHitRecently = false; }, 1000);
            }
        });
    }

    /**
    * Checks collisions between the character and the endboss.
    * - The character takes damage if the boss collides with him.
    */
    checkBossCollisions() {
        this.level.boss.forEach((boss) => {
            if (boss instanceof Endboss && boss.isColliding(this.character) && !boss.bossIsDead() && !boss.hasHitRecently) {
                this.character.hit(20);
                this.healthBar.setPercentage(this.character.energy);
                boss.hasHitRecently = true;
                setTimeout(() => { boss.hasHitRecently = false; }, 1000);
            }
        });
    }

    /**
    * Checks collisions between throwable objects (like bottles) and enemies or bosses.
    * - If a bottle hits an enemy, the enemy dies.
    * - If a bottle hits the boss, the boss takes damage.
    */
    checkThrowableCollisions() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.hitTarget && !enemy.isDead()) {
                    enemy.die();
                    bottle.splash();
                }
            });

            this.level.boss.forEach((boss) => {
                if (bottle.isColliding(boss) && !bottle.hitTarget && boss.bossenergy > 0) {
                    bottle.hitTarget = true;
                    boss.bossHit();
                    bottle.splash();
                }
            });
        });
        this.level.enemies = this.level.enemies.filter((enemy) => !enemy.removeFromGame);
        this.throwableObject = this.throwableObject.filter((bottle) => !bottle.removeFromGame);
    }

    /**
    * Checks collisions between the character and birds.
    * - The character takes damage when a bird collides with him.
    */
    checkBirdCollisions() {
        this.level.birds.forEach((bird) => {
            if (this.character.isColliding(bird) && !bird.hasHitRecently) {
                this.character.hit(10);
                this.healthBar.setPercentage(this.character.energy);
                bird.hasHitRecently = true;
                setTimeout(() => { bird.hasHitRecently = false; }, 1000);
            }
        });
    }
    
    /**
     * Checks if objects need to be thrown based on keyboard input.
     */
    checkThrowObjects() {    
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 150);
            this.throwableObject.push(bottle);
        }
    }

    /**
     * Continuously update the positions and states of birds.
     */
    update() {
        this.level.birds.forEach((bird) => bird.move());
        this.checkBirdVisibility();
    }

    /**
     * Adds multiple objects to the canvas at their respective positions.
     * @param {Array} objects - Array of objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single movable object on the canvas.
     * @param {MovableObject} mo - The movable object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of the object for correct orientation.
     * @param {MovableObject} mo - The movable object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original orientation of the flipped image.
     * @param {MovableObject} mo - The movable object whose image was flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
    * Checks if the character has collected any coins and updates the coin count and display.
    */
    checkCoinCollection() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1); 
                this.character.coinCount++;
                this.coinBar.setPercentage((this.character.coinCount / 10) * 100);
                soundManager.playSoundEffect('coin');
            }
        });
    }

    /**
    * Checks if the character has collected any bottles and updates the bottle count and display.
    */
    checkBottleCollection() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.bottleCount >= 10) {
                return; 
            }
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1); 
                this.character.bottleCount = (this.character.bottleCount || 0) + 1;
                this.bottleBar.setPercentage((this.character.bottleCount / 10) * 100);
                soundManager.playSoundEffect('bottleCollect'); 
            }
        });
    }
    
    /**
    * Allows the character to throw objects if the conditions are met.
    */
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.character.bottleCount > 0 && this.canThrowBottle) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);
            bottle.throw(); 
            this.throwableObject.push(bottle);
            this.character.bottleCount--; 
            this.bottleBar.setPercentage((this.character.bottleCount / 10) * 100); 
            soundManager.playSoundEffect('bottle'); 
            
            this.canThrowBottle = false; 
            bottle.onSplash(() => {
                this.canThrowBottle = true; 
            });
        }
    }
    
    /**
    * Checks for interactions with the shop and displays controls if within range.
    */
    checkShopInteraction() {
        let shop = this.level.shop[0];
        let inShopRange = this.character.x >= shop.x && this.character.x <= shop.x + shop.width - 90;
        let coinButton = document.querySelector('.mobile-controls-middle'); 
    
        if (inShopRange) {
            coinButton.style.display = 'flex'; 
            if (keyboard.b) {
                startDialog('shop'); 
                keyboard.b = false;
            }
        } else {
            coinButton.style.display = 'none';
        }
    }    
    
    /**
    * Opens the shop menu and pauses the game.
    */
    openShopMenu() {
        this.pauseGame(); 
        let overlay = document.getElementById('shopOverlay');
        overlay.style.display = 'flex';
        updateShopInventory(); 
    }
    
    /**
    * Closes the shop menu and resumes the game.
    */
    closeShopMenu() {
        this.resumeGame(); 
        let overlay = document.getElementById('shopOverlay');
        overlay.style.display = 'none'; 
        keyboard.b = false; 
    }
    
    /**
    * Checks if the character has encountered the end boss and triggers the boss dialog.
    */
    checkEndbossEncounter() {
        if (this.character.x >= 2000 && !this.bossDialogActive) { 
            this.bossDialogActive = true; 
            this.pauseGame(); 
            this.removeBirds(); 
            startDialog('boss'); 
        }
    }
    
    /**
    * Removes all birds from the level.
    */
    removeBirds() {
        this.level.birds = []; 
    }

    /**
    * Updates the visibility and audibility of birds based on their distance to the character.
    */
    checkBirdVisibility() {
        let characterX = this.character.x; 
        let visibilityRange = 300; 
    
        this.level.birds.forEach((bird) => {
            let distanceToCharacter = Math.abs(bird.x - characterX); 
    
            if (distanceToCharacter <= visibilityRange) {
                if (!bird.hasPlayedSound) {
                    soundManager.playSoundEffect('birdWarning'); 
                    bird.hasPlayedSound = true; 
                }
            } else {
                bird.hasPlayedSound = false;
            }
        });
    }    
    
    /**
    * Checks if the boss reaches the house, triggering a loss if true.
    */
    checkBossReachesHouse() {
        let house = this.level.houses[0]; 
        let boss = this.level.boss.find(b => b instanceof Endboss); 
    
        if (house && boss) { 
            let bossReachesHouse =
                boss.x + boss.width > house.x && 
                boss.x + 400 < house.x + house.width && 
                boss.y + boss.height > house.y && 
                boss.y < house.y + house.height;
    
            if (bossReachesHouse) {
                this.character.triggerLose(); 
            }
        }
    }    
}
