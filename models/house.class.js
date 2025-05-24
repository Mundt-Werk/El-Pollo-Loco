/**
 * Represents a house in the game environment.
 * The house is a static object placed in the game world.
 */
class House extends MovableObject {
    /**
     * Initializes a new instance of the House class.
     * The house is loaded with a specific image and placed at a fixed position in the game world.
     */
    constructor() {
        super().loadImage('img/10_own_elements/04_house/house3.1.png'); 
        this.x = -320;  
        this.y = 50;  
        this.width = 850;  
        this.height = 400; 
    }
}