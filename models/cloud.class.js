/**
 * Represents a cloud in the game environment.
 * Manages the cloud's continuous leftward movement across the game screen.
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    /**
     * Constructor for the Cloud class.
     * Initializes cloud settings, sets the initial position, and starts the animation.
     * @param {number} x - The initial horizontal position of the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = x;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Continuously moves the cloud leftward at a set interval.
     */
    animate() {
        setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);
    }
}