class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    isGravityInitialized = false; 
    isSplashing = false; 
    onSplashCallback = null; 

    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speedY = 15; 
        this.isSplashing = false; 
        this.applyGravity();
    }

    /**
     * Initializes gravity effects for the object.
     */
    initializeGravity() {
        this.isGravityInitialized = true;
    }

    /**
     * Initiates the throwing action for the object, starting motion and rotation animations.
     */
    throw() {
        this.initializeGravity(); 
        this.speed = 2; 
        this.rotationInterval = setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);

        this.animateRotation();
        soundManager.playSoundEffect('bottleThrow');
    }

    /**
     * Animates rotation for the object.
     */
    animateRotation() {
        this.rotationInterval = setInterval(() => {
            if (!this.isSplashing) {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 1000 / 10);
    }

    /**
     * Executes splash effects when the object impacts, playing appropriate animations and sounds.
     */
    splash() {
        if (this.isSplashing) return; 
        this.isSplashing = true;

        soundManager.playSoundEffect('bottleBreak');
        soundManager.playSoundEffect('bottleSplash');
        
        this.speed = 0;
        this.speedY = 0;
        clearInterval(this.rotationInterval);
        this.currentImage = 0; 

        let splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
            if (this.currentImage >= this.IMAGES_SPLASH.length) {
                clearInterval(splashInterval); 
                this.removeFromGame = true; 
                
                if (this.onSplashCallback) {
                    this.onSplashCallback();
                }
            }
        }, 1000 / 10);
    }

    /**
     * Applies gravity to the object, altering its vertical position and speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isGravityInitialized && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY; 
                this.speedY -= this.acceleration; 
            } else if (this.isGravityInitialized && !this.isAboveGround() && !this.isSplashing) {
                this.splash(); 
            }
        }, 1000 / 25);
    }

    /**
     * Sets a callback function to be executed when the object completes its splash.
     * @param {function} callback - The callback function to execute.
     */
    onSplash(callback) {
        this.onSplashCallback = callback;
    }
}
