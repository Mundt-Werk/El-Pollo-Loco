/**
 * Represents a collectible bottle object in the game.
 * Inherits from MovableObject to utilize common movement and image handling properties.
 */
class Bottle extends MovableObject {
    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'  
    ];

    /**
     * Constructor for the Bottle class.
     * Initializes the bottle with an image and random position within a defined range on the game map.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOTTLES[0]); 
        
        this.x = 400 + Math.random() * 2000; 
        this.y = 380; 
        this.width = 50;
        this.height = 50;
    }
}
