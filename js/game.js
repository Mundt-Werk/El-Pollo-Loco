/**
 * The main game canvas element
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The canvas drawing context
 * @type {CanvasRenderingContext2D}
 */
let ctx;

/**
 * The main game world instance
 * @type {World}
 */
let world;

/**
 * The keyboard input handler
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Flag indicating whether the game is currently running
 * @type {boolean}
 */
let isGameRunning = false; 

/**
 * Starts the game by initializing the world and showing the game screen
 */
function startGame() {
    isGameRunning = true; 
    document.getElementById('startScreen').style.display = 'none'; 
    document.querySelector('.mobile-controls').style.display = 'flex'; 
    document.querySelector('.mobile-controls-one').style.display = 'flex'; 

    soundManager.stopAllMusic(); 
    if (!soundManager.isMuted) {
        soundManager.playMusic('game'); 
    }

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    initMobileControls();
}

/**
 * Event listener for key down events to set keyboard inputs
 */
window.addEventListener("keydown", handleKeyDown);

/**
 * Event listener for key up events to reset keyboard inputs
 */
window.addEventListener("keyup", handleKeyUp);

/**
 * Handles the keydown event and sets the corresponding keyboard state.
 * @param {KeyboardEvent} event - The event object representing the key press.
 */
function handleKeyDown(event) {
    switch(event.key) {
        case "ArrowRight": keyboard.RIGHT = true; break;
        case "ArrowLeft": keyboard.LEFT = true; break;
        case "ArrowUp": keyboard.UP = true; break;
        case "ArrowDown": keyboard.DOWN = true; break;
        case "b": keyboard.b = true; break;
    }
    if (event.code === "Space") keyboard.SPACE = true;
    if (event.key === "Escape") togglePause();
}

/**
 * Handles the keyup event and resets the corresponding keyboard state.
 * @param {KeyboardEvent} event - The event object representing the key release.
 */
function handleKeyUp(event) {
    switch(event.key) {
        case "ArrowRight": keyboard.RIGHT = false; break;
        case "ArrowLeft": keyboard.LEFT = false; break;
        case "ArrowUp": keyboard.UP = false; break;
        case "ArrowDown": keyboard.DOWN = false; break;
        case "b": keyboard.b = false; break;
    }
    if (event.code === "Space") keyboard.SPACE = false;
}

/**
 * Initializes mobile controls by adding event listeners to the buttons
 */
function initMobileControls() {
    addMobileControlEvent('buttonLeft', 'LEFT');
    addMobileControlEvent('buttonRight', 'RIGHT');
    addMobileControlEvent('buttonJump', 'UP');
    addMobileControlEvent('buttonThrow', 'SPACE');
    addMobileControlEvent('buttonCrouch', 'DOWN');
    addMobileControlEvent('buttonShop', 'b');

    const buttonMenü = document.getElementById('buttonMenü'); 
    buttonMenü.addEventListener('mousedown', () => openPause());
    buttonMenü.addEventListener('touchstart', () => openPause());
}

function addMobileControlEvent(buttonId, actionKey) {
    const button = document.getElementById(buttonId);
    button.addEventListener('mousedown', () => keyboard[actionKey] = true);
    button.addEventListener('mouseup', () => keyboard[actionKey] = false);
    button.addEventListener('touchstart', () => keyboard[actionKey] = true);
    button.addEventListener('touchend', () => keyboard[actionKey] = false);
}

/**
 * Toggles the visibility of the shop overlay
 */
function handleShopButton() {
    const shopOverlay = document.getElementById('shopOverlay');
    shopOverlay.style.display = (shopOverlay.style.display === 'none' || !shopOverlay.style.display) 
        ? 'block' 
        : 'none';
}
