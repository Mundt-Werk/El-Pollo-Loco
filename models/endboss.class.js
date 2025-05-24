/**
 * Represents the Endboss in the game.
 * Manages movement, attacks, animations, and interactions with the player.
 */
class Endboss extends MovableObject {
    height = 200;
    width = 200;
    y = 230;
    speed = 3; 
    isJumping = false; 
    isActive = false; 
    energy = 100;
    hasHitRecently = false;

    /**
     * Image paths for the endboss walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ALERT = [
        'img/1_editables/neu/BOSS/01_alert/1_G1.png',
        'img/1_editables/neu/BOSS/01_alert/1_G2.png',
        'img/1_editables/neu/BOSS/01_alert/1_G3.png',
        'img/1_editables/neu/BOSS/01_alert/1_G4.png',
    ];

    IMAGES_ATTACK = [
        'img/1_editables/neu/BOSS/02_attack_1/1_G5.png',
        'img/1_editables/neu/BOSS/02_attack_1/1_G6.png',
        'img/1_editables/neu/BOSS/02_attack_1/1_G7.png',
    ];


    IMAGES_HIT = [
        'img/1_editables/neu/BOSS/04_hurt/1_G21.png',
        'img/1_editables/neu/BOSS/04_hurt/1_G22.png',
        'img/1_editables/neu/BOSS/04_hurt/1_G23.png',
    ];

    IMAGES_DEAD = [
        'img/1_editables/neu/BOSS/05_dead/1_G24.png',
        'img/1_editables/neu/BOSS/05_dead/1_G25.png',
        'img/1_editables/neu/BOSS/05_dead/1_G26.png',
    ];

    /**
     * Creates a new Endboss instance and initializes animations and movement.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2500;
        this.bossenergy = 100; 
        this.animate();
        this.bossEndfightJump();
        this.bossEndfightMoveLeft();
        this.bossEndfightJumpReset();
        this.applyGravity();
    }

    /**
     * Activates the endboss and starts the battle.
     */
    startEndbossFight() {
        this.isActive = true; 
    }

     /**
     * Damages the character if a collision occurs.
     */
    damageCharacter() {
        if (this.isColliding(this.world.character)) {
            this.world.character.hit(20); 
        }
    }

    /**
     * Controls the endboss's animations based on its state.
     */
    animate() {
        setInterval(() => {
            if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);} 
            if (this.bossIsDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.y += 20;
            } else if (this.bossIsHurt()) {
                this.playAnimation(this.IMAGES_HIT); 
            } else {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 700 / 3);}

    /**
    * Makes the endboss jump periodically during the fight.
    */
    bossEndfightJump(){        
        setInterval(() => {
            if (this.isActive && !this.isJumping && !this.isAboveGround() && !this.bossIsDead()) {
                this.bossJump();
                this.isJumping = true;
            }
        }, 3000);     
    }

    /**
     * Moves the endboss left while active and not dead.
     */
    bossEndfightMoveLeft(){
        setInterval(() => {
            if (this.isActive && this.isAboveGround() && !this.bossIsDead()) {
                this.moveHorizontally(); 
            }
        }, 1000 / 60);
    }
    
    /**
     * Resets the jumping state after the endboss lands.
     */
    bossEndfightJumpReset(){   
        setInterval(() => {
            if (this.isActive && !this.isAboveGround() && !this.bossIsDead()) {
                this.isJumping = false; 
            }
        }, 100); 
    }   

    /**
     * Checks if the endboss is in an attacking state.
     * @returns {boolean} True if the boss is attacking.
     */
    isAttacking() {        
        let characterInRange = this.world && Math.abs(this.world.character.x - this.x) < 400;
        return this.isActive && characterInRange && !this.isJumping;
    }

    /**
     * Moves the endboss horizontally to the left.
     */
    moveHorizontally() {
        this.moveLeft();
    }
}
 
