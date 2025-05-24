/**
 * Represents a collectible coin in the game.
 * The coin rotates through two images for a simple animation effect and is placed at a random position.
 */
class Coin extends MovableObject {
    /**
     * Array of image paths representing the coin animation frames.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'img/8_coin/coin_1.png', 
        'img/8_coin/coin_2.png'  
    ];

    /**
     * Creates a new coin object with random positioning and starts the animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.x = 200 + Math.random() * 2000 + 200; 
        this.y = Math.random() * (250 - 300) + 200;
        this.width = 32;
        this.height = 32;
        this.loadImages(this.IMAGES_COINS); 
        this.animate(); 
    }

    /**
     * Animates the coin by switching between the provided images.
     * The animation updates every 300 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS); 
        }, 300); 
    }
}
