class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;

    x = 250;
    y = 150;
    
    height = 300;
    width = 150;

    /**
     * Loads an image into the drawable object.
     * @param {string} path - The path to the image file.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

     /**
     * Draws the image on a given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the drawing canvas.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the drawable object that represents its hitbox.
     * The hitbox adjusts based on the type of object (e.g., Character, Bird, etc.).
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the drawing canvas.
     */
    drawFrame(ctx) {
        let hitbox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    
        // Adjust hitbox based on object type
        if (this instanceof Character) {
            if (this.isCrouching) {                
                hitbox.y = this.y + this.height / 2;
                hitbox.height = this.height / 2;
            } else {                
                hitbox.x = this.x + 20;
                hitbox.width = this.width - 40;
                hitbox.height = this.height / 1.5;
                hitbox.y = this.y + this.height / 3;
            }
        } else if (this instanceof Bird) {            
            hitbox.x = this.x + 30; 
            hitbox.y = this.y + 20; 
            hitbox.width = this.width - 60; 
            hitbox.height = this.height - 50; 
        } else if (this instanceof Chicken) {
            hitbox.x = this.x; 
            hitbox.y = this.y; 
            hitbox.width = this.width;
            hitbox.height = this.height;
        } else if (this instanceof Coin) {            
            hitbox.x = this.x + 5;
            hitbox.y = this.y + 5;
            hitbox.width = this.width - 10;
            hitbox.height = this.height - 10;
        }else if (this instanceof Bottle) {
            hitbox.x = this.x + 400;
            hitbox.y = this.y;
            hitbox.width = this.width;
            hitbox.height = this.height;
        }
        
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    }    

     /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });        
    }
    
    /**
     * Resolves the image index based on the current percentage value.
     * @param {number} percentage - The current percentage value (0-100).
     * @returns {number} The resolved image index.
     */
    resolveImageIndex(percentage) {
        if (percentage === 100) return 10;
        if (percentage > 90) return 9;
        if (percentage > 80) return 8;
        if (percentage > 70) return 7;
        if (percentage > 60) return 6;
        if (percentage > 50) return 5;
        if (percentage > 40) return 4;
        if (percentage > 30) return 3;
        if (percentage > 20) return 2;
        if (percentage > 10) return 1;
        return 0;
    }
}