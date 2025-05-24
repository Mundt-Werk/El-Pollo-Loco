/**
 * Represents the health bar for boss characters in the game, displaying their current energy level.
 * Inherits from DrawableObject to utilize drawing capabilities.
 */
class BossBar extends DrawableObject {
    bossenergy = 100;

    IMAGES = [
        'img/10_own_elements/05_statusbar/boss_bar_0.png',
        'img/10_own_elements/05_statusbar/boss_bar_10.png',
        'img/10_own_elements/05_statusbar/boss_bar_20.png',
        'img/10_own_elements/05_statusbar/boss_bar_30.png',
        'img/10_own_elements/05_statusbar/boss_bar_40.png',
        'img/10_own_elements/05_statusbar/boss_bar_50.png',
        'img/10_own_elements/05_statusbar/boss_bar_60.png',
        'img/10_own_elements/05_statusbar/boss_bar_70.png',
        'img/10_own_elements/05_statusbar/boss_bar_80.png',
        'img/10_own_elements/05_statusbar/boss_bar_90.png',
        'img/10_own_elements/05_statusbar/boss_bar_100.png',        
    ];

     /**
     * Constructor for BossBar. Initializes the images, position, size, and initial energy.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 450;
        this.y = 8;
        this.width = 254;
        this.height = 34;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the boss's energy and updates the displayed image accordingly.
     * @param {number} percentage - The current energy level of the boss as a percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imageIndex = Math.round((percentage / 100) * (this.IMAGES.length - 1));
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }  
};