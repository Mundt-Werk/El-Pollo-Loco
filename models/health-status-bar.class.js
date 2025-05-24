/**
 * Represents the health bar displayed in the game interface.
 * Manages the visual representation of the player's health status.
 */
class HealthBar extends DrawableObject {
    /**
     * Array containing image paths for different health states.
     * @type {string[]}
     */
    IMAGES = [
        'img/10_own_elements/05_statusbar/energy_bar_0.png',
        'img/10_own_elements/05_statusbar/energy_bar_10.png',
        'img/10_own_elements/05_statusbar/energy_bar_20.png',
        'img/10_own_elements/05_statusbar/energy_bar_30.png',
        'img/10_own_elements/05_statusbar/energy_bar_40.png',
        'img/10_own_elements/05_statusbar/energy_bar_50.png',
        'img/10_own_elements/05_statusbar/energy_bar_60.png',
        'img/10_own_elements/05_statusbar/energy_bar_70.png',
        'img/10_own_elements/05_statusbar/energy_bar_80.png',
        'img/10_own_elements/05_statusbar/energy_bar_90.png',
        'img/10_own_elements/05_statusbar/energy_bar_100.png',      
    ];

    /**
     * Initializes a new health bar instance.
     * The health bar starts at full health (100%).
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 8;
        this.width = 254;
        this.height = 34;
        this.setPercentage(100);
    }

    /**
     * Updates the health bar display based on the current health percentage.
     * @param {number} percentage - The health percentage to display (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imageIndex = Math.round((percentage / 100) * (this.IMAGES.length - 1));
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }
};