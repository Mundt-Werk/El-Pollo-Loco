/**
 * Represents the inventory status bar for bottles in the game, inheriting from DrawableObject.
 * Displays the current count of bottles the player has as a visual bar.
 */
class BottleBar extends DrawableObject {
    IMAGES = [
        'img/10_own_elements/05_statusbar/bottle_bar_0.png',
        'img/10_own_elements/05_statusbar/bottle_bar_10.png',
        'img/10_own_elements/05_statusbar/bottle_bar_20.png',
        'img/10_own_elements/05_statusbar/bottle_bar_30.png',
        'img/10_own_elements/05_statusbar/bottle_bar_40.png',
        'img/10_own_elements/05_statusbar/bottle_bar_50.png',
        'img/10_own_elements/05_statusbar/bottle_bar_60.png',
        'img/10_own_elements/05_statusbar/bottle_bar_70.png',
        'img/10_own_elements/05_statusbar/bottle_bar_80.png',
        'img/10_own_elements/05_statusbar/bottle_bar_90.png',
        'img/10_own_elements/05_statusbar/bottle_bar_100.png',        
    ];

    /**
     * Constructor for the BottleBar class. Initializes the bar's location, size, and initial load of images.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 75;
        this.width = 254;
        this.height = 34;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the bottle bar and updates the displayed image based on the percentage.
     * @param {number} percentage - The current percentage of bottles collected relative to the capacity.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imageIndex = Math.round((percentage / 100) * (this.IMAGES.length - 1));
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }
};