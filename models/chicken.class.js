/**
 * Represents a chicken enemy in the game.
 * Manages the chicken's movements, animations, and interactions such as dying.
 */
class Chicken extends MovableObject {
    y = 380;
    height = 50;
    width = 50;
    energy = 1; 
    removeFromGame = false; 
    lastAttackTime = 0;
    static chickenCount = 0;
    hasHitRecently = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * Constructor for the Chicken class.
     * Initializes chicken settings and loads necessary images for walking and death animations.
     * @param {number} x - The initial horizontal position of the chicken.
     */
    constructor(x) { 
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = x; 
        this.speed = 0.15; 
        this.otherDirection = false;

        Chicken.chickenCount++;
        this.animate();
    }

    /**
     * Manages the animation and movement cycles of the chicken.
     */
    animate() {
        setInterval(() => {
            if (this.energy > 0) {
                this.move(); 
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING); 
            }
        }, 1000 / 10);
    }

     /**
     * Controls the chicken's movement logic, changing direction at boundaries.
     */
    move() {
        if (this.energy <= 0) return; 
    
        this.moveLeft();
    
        if (this.x <= 430) {
            this.x = 431; 
            this.changeDirection();
        } else if (this.x >= 3000) {
            this.x = 2999; 
            this.changeDirection();
        }
    }

    /**
     * Changes the movement direction of the chicken.
     */
    changeDirection() {
        if (Math.sign(this.speed) === 1) {
            this.speed = -Math.abs(this.speed); 
        } else {
            this.speed = Math.abs(this.speed); 
        }
        this.otherDirection = this.speed < 0;
    }

    /**
     * Handles the chicken's death process, including animations and sound effects.
     */
    die() {
        if (this.energy > 0) { 
            this.energy = 0; 
            this.loadImage(this.IMAGE_DEAD); 
            setTimeout(() => {
                this.removeFromGame = true; 
            }, 10);
            soundManager.playSoundEffect('chickenDead');

            Chicken.chickenCount--;
            
            if (Chicken.chickenCount <= 0) {
                soundManager.pauseMusic('chickenBG');
            }
        }}
}
