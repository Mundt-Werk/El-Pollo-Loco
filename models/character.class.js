/**
 * Represents the main playable character in the game.
 * This class manages the character's movements, animations, and interactions.
 */
class Character extends MovableObject {
    y = 130;
    speed = 2; 
    isJumping = false; 
    isCrouching = false; 
    world;
    coinCount = 0;
    lastMoveTime = new Date().getTime(); 
    idleDelay = 4000; 

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/1_editables/neu/HIT/hurt_new_1.png',
        'img/1_editables/neu/HIT/hurt_new_2.png',
        'img/1_editables/neu/HIT/hurt_new_3.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_CROUCHING  = [
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_3.png',
        'img/1_editables/neu/CROUCH/08_crouch_4.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Initializes a new instance of the Character class with default properties and loads the necessary animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_CROUCHING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.applyGravity();
        this.movement();
        this.animate();
    }

    /**
     * Handles the character's movement based on keyboard input.
     */
    movement() {
        setInterval(() => {
            if (!this.isCrouching) { 
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRightAction();
                }
                if (this.world.keyboard.LEFT && this.x > -180) {
                    this.moveLeftAction();
                }
                if (this.world.keyboard.UP && !this.isAboveGround() && !this.isJumping) {
                    this.jumpAction();
                }
                }
                if (this.world.keyboard.DOWN && !this.isCrouching) {
                this.playDuckAnimation(); 
                }
                if (!this.isAboveGround()) {
                this.isJumping = false;
                }
                this.world.camera_x = -this.x + 100; 
            }, 1000 / 60);
    }

    /**
     * Handles the animation of the character based on current state and activities.
     */
    animate(){
        setInterval(() => {
            const timeSinceLastMove = new Date().getTime() - this.lastMoveTime;
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isCrouching) { 
                this.playAnimation(this.IMAGES_CROUCHING);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (timeSinceLastMove > this.idleDelay) {
                this.playAnimation(this.IMAGES_IDLE); 
            }
        }, 700 / 3);
    }

    /**
    * Moves the character to the right and updates relevant movement data.
    * Adjusts the direction and records the last movement time.
    */
    moveRightAction() {
        this.moveRight();
        this.otherDirection = false;
        this.lastMoveTime = new Date().getTime();
    }

    /**
    * Moves the character to the left and updates relevant movement data.
    * Adjusts the direction and records the last movement time.
    */
    moveLeftAction() {
        this.moveLeft();
        this.otherDirection = true;
        this.lastMoveTime = new Date().getTime();
    }

    /**
    * Makes the character jump and updates the jump state.
    * Sets the character to a jumping state and resets the animation frame.
    */
    jumpAction() {
        this.jump();
        this.isJumping = true;
        this.currentImage = 0;
        this.lastMoveTime = new Date().getTime();
    }
    /**
     * Plays the crouching animation and manages the crouching state.
     */
    playDuckAnimation() {
        if (this.isCrouching) return;
        this.isCrouching = true; 
        let currentIndex = 0; 
        const frameDuration = 200; 

        const duckInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_CROUCHING[currentIndex]]; 
            currentIndex++; 

            if (currentIndex >= this.IMAGES_CROUCHING.length) {
                clearInterval(duckInterval); 
                this.isCrouching = false; 
            }
        }, frameDuration);
        this.lastMoveTime = new Date().getTime(); 
    }

    /**
     * Increases the coin count when the character collects a coin.
     */
    collectCoin() {
        this.coinCount++;
    }
}
