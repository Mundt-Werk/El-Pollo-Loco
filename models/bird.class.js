/**
 * Represents a Bird object within the game, inheriting from MovableObject.
 * Birds can move horizontally across the screen and change direction upon reaching boundary limits.
 */
class Bird extends MovableObject {
    height = 150;
    width = 150;

    IMAGES_FLYING = [
        'img/10_own_elements/10_bird/1.png',
        'img/10_own_elements/10_bird/2.png',
        'img/10_own_elements/10_bird/3.png',
        'img/10_own_elements/10_bird/4.png',
        'img/10_own_elements/10_bird/5.png',
        'img/10_own_elements/10_bird/6.png',
        'img/10_own_elements/10_bird/7.png',
        'img/10_own_elements/10_bird/8.png',
        'img/10_own_elements/10_bird/9.png',
        'img/10_own_elements/10_bird/10.png',
        'img/10_own_elements/10_bird/11.png',
        'img/10_own_elements/10_bird/12.png',
    ];

    constructor(x, y, minX = 1200, maxX = 3000) { 
        super().loadImage(this.IMAGES_FLYING[0]);
        this.loadImages(this.IMAGES_FLYING);

        this.x = x; 
        this.y = y; 
        this.speed = 10 / 1000; 
        this.otherDirection = false; 
        this.minX = minX; 
        this.maxX = maxX; 
        this.hasPlayedSound = false;

        this.animate();
    }

    /**
     * Starts the animation loop for the bird, which includes movement and sprite animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_FLYING); 
            this.move(); 
        }, 5000 / 60); 
    }

    /**
     * Updates the bird's horizontal position and changes its direction if it reaches the defined boundaries.
     */
    move() {
        
        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
        
        if (this.x <= this.minX || this.x >= this.maxX) {
            this.changeDirection();
        }
    }

    /**
     * Reverses the bird's current direction of movement.
     */
    changeDirection() {
        this.otherDirection = !this.otherDirection; 
    }
}
