/**
 * Represents a shop in the game where players can interact and purchase items.
 * The shop has a basic animation effect alternating between two images.
 */
class Shop extends MovableObject {
    /**
     * Array of image paths used for the shop animation.
     * @type {string[]}
     */
    IMAGES = [
        'img/10_own_elements/08_shop/shop.png',       
        'img/10_own_elements/08_shop/shop_02.png'   
    ];

    /**
     * Creates a new instance of the Shop object.
     * Initializes the shop's position, size, and animation sequence.
     */
    constructor() {
        super().loadImage(this.IMAGES[0]); 
        this.loadImages(this.IMAGES);     
        this.x = 800;
        this.y = 170;
        this.width = 400;
        this.height = 250;

        this.animate(); 
    }

    /**
     * Animates the shop by periodically changing the image.
     * The animation switches between two frames at a set interval.
     */
    animate() {
        setInterval(() => {
            this.img = this.imageCache[this.IMAGES[1]]; 
            setTimeout(() => {
                this.img = this.imageCache[this.IMAGES[0]]; 
            }, 1000/20);
        }, 15000/5); 
    }
}
