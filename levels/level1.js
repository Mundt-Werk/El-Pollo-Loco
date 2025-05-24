/**
 * Represents the first level in the game with various game objects positioned throughout the level.
 */
const level1 = new Level(
    // Array of Chicken objects with specific positions on the x-axis.
    [
        new Chicken(800),
        new Chicken(1000),
        new Chicken(1500),
        new Chicken(1850),
        new Chicken(2200),
        new Chicken(2500),
        new Chicken(2830),
        new Chicken(3000),
    ],
    // Array containing an Endboss object.
    [
        new Endboss(),
    ],
    // Array of Bird objects with specified x positions and a y offset.
    [
        new Bird(1500, 120),
        new Bird(3000, 120),
    ],
    // Array of Cloud objects at different x positions to simulate sky and depth.
    [
        new Cloud(100),
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2000),
        new Cloud(2500),
        new Cloud(3000),
        new Cloud(3500),
        new Cloud(4000),
        new Cloud(4500),
        new Cloud(5000),
    ],
    // Array of BackgroundObject instances with layered background images to create a parallax effect.
    [
        // Each BackgroundObject receives an image path and an x position.
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),                
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719*2),                
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),           
    ],
    // Array containing a House object as part of the level's environment.
    [
        new House()
    ],
    // Array containing a Shop object where players can buy upgrades or items.
    [
        new Shop()
    ],
    // Array of Coin objects placed throughout the level for players to collect.
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(), 
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(), 
    ],
    // Array of Bottle objects available for collection within the level.
    [ 
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ]
);
