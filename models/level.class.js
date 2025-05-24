/**
 * Represents a level in the game, containing all elements and objects required for gameplay.
 */
class Level {
    enemies;
    boss;
    birds;
    clouds;
    backgroundObjects;
    houses;
    shop;
    coins; 
    bottles; 
    level_end_x = 2800;

    /**
     * Creates a new level instance with the provided objects and elements.
     * @param {Array<MovableObject>} enemies - The enemies present in the level.
     * @param {Array<Endboss>} boss - The boss enemy for the level.
     * @param {Array<Bird>} birds - The birds present in the level.
     * @param {Array<Cloud>} clouds - The clouds for the background.
     * @param {Array<BackgroundObject>} backgroundObjects - The background objects of the level.
     * @param {Array<House>} houses - The houses present in the level.
     * @param {Array<Shop>} shop - The shop objects in the level.
     * @param {Array<Coin>} coins - The coins scattered in the level.
     * @param {Array<Bottle>} bottles - The bottles scattered in the level.
     */
    constructor(enemies,boss, birds, clouds, backgroundObjects, houses, shop, coins, bottles) {
        this.enemies = enemies;
        this.boss = boss;
        this.birds = birds;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.houses = houses;
        this.shop = shop;
        this.coins = coins; 
        this.bottles = bottles; 
    }
}
