/**
 * Represents the coin bar in the game, displaying the player's collected coins as a visual progress bar.
 * The bar updates based on the percentage of collected coins out of a maximum value.
 */
class CoinBar extends DrawableObject {
     /**
     * Array of image paths representing the different states of the coin bar.
     * Each image corresponds to a percentage level of coin collection.
     * @type {string[]}
     */
    IMAGES = [
        'img/10_own_elements/05_statusbar/coin_bar_0.png',
        'img/10_own_elements/05_statusbar/coin_bar_10.png',
        'img/10_own_elements/05_statusbar/coin_bar_20.png',
        'img/10_own_elements/05_statusbar/coin_bar_30.png',
        'img/10_own_elements/05_statusbar/coin_bar_40.png',
        'img/10_own_elements/05_statusbar/coin_bar_50.png',
        'img/10_own_elements/05_statusbar/coin_bar_60.png',
        'img/10_own_elements/05_statusbar/coin_bar_70.png',
        'img/10_own_elements/05_statusbar/coin_bar_80.png',
        'img/10_own_elements/05_statusbar/coin_bar_90.png',
        'img/10_own_elements/05_statusbar/coin_bar_100.png',        
    ];

    /**
     * Initializes a new instance of the CoinBar class with default position, size, and images.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 42;
        this.width = 254;
        this.height = 34;
        this.setPercentage(0);
    }

    /**
     * Sets the current progress of the coin bar based on the collected coins.
     * Adjusts the displayed image according to the percentage provided.
     * @param {number} percentage - The percentage of collected coins (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imageIndex = Math.round((percentage / 100) * (this.IMAGES.length - 1));
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }
};