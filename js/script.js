let isMusicPlaying = false;
let isGamePaused = false;
let gameInterval;
let activeMusic = 'game';
let currentBackground = 1;

/**
 * Toggles the background image based on direction.
 * @param {string} direction - 'left' or 'right' to change the background image.
 */
function toggleBackground(direction) {
    soundManager.playSoundEffect('nextPage');
    let infoMenu = document.getElementById('infoMenü');
    
    if (direction === 'left') {
        currentBackground = currentBackground === 1 ? 3 : currentBackground - 1;
    } else if (direction === 'right') {
        currentBackground = currentBackground === 3 ? 1 : currentBackground + 1;
    }

    infoMenu.style.backgroundImage = `url('./img/10_own_elements/01_buttons/info_menü_${currentBackground}.png')`;
}

/**
 * Initializes sound settings when the window loads.
 */
window.onload = function() {
    initializeSoundSettings();
};

/**
 * Initializes the sound settings based on saved preferences.
 */
function init() {
    let isMuted = JSON.parse(localStorage.getItem('isMuted'));
    if (isMuted) {
        soundManager.muteAll();
        updateSoundButton(false);
    } else {
        soundManager.unmuteAll();
        soundManager.playMusic('menu');
        updateSoundButton(true);
    }
}

/**
 * Updates the sound button image based on the current playing state.
 * @param {boolean} isPlaying - Whether the sound is currently playing.
 */
function updateSoundButton(isPlaying) {
    let soundButton = document.getElementById('soundButton').querySelector('img');
    soundButton.src = isPlaying
        ? "./img/10_own_elements/01_buttons/sound_on_button.png"
        : "./img/10_own_elements/01_buttons/sound_off_button.png";
}

/**
 * Toggles the sound on or off, adjusting local storage values.
 */
function toggleSound() {
    if (soundManager.isMuted) {
        soundManager.unmuteAll();
        if (isGameRunning) {
            soundManager.playMusic('game');
        } else {
            soundManager.playMusic('menu');
        }
        updateButtons(true, true, true);
        localStorage.setItem('soundMuted', 'false');
        localStorage.setItem('musicMuted', 'false');
        localStorage.setItem('effectsMuted', 'false');
    } else {
        soundManager.muteAll();
        soundManager.stopAllMusic();
        updateButtons(false, false, false);
        localStorage.setItem('soundMuted', 'true');
        localStorage.setItem('musicMuted', 'true');
        localStorage.setItem('effectsMuted', 'true');
    }
}

/**
 * Initializes sound settings from local storage.
 */
function initializeSoundSettings() {
    let soundMuted = localStorage.getItem('soundMuted') === 'true';
    let musicMuted = localStorage.getItem('musicMuted') === 'true';
    let effectsMuted = localStorage.getItem('effectsMuted') === 'true';

    if (soundMuted) {
        soundManager.muteAll();
    } else {
        soundManager.unmuteAll();
        if (musicMuted) {
            soundManager.muteMusic();
        } else {
            soundManager.unmuteMusic();
            soundManager.playMusic('menu');
        }
        if (effectsMuted) {
            soundManager.muteEffects();
        } else {
            soundManager.unmuteEffects();
        }
    }
    updateButtons(!soundMuted, !musicMuted, !effectsMuted);
}

/**
 * Toggles the game pause state and handles related UI changes.
 */
function togglePause() {
    let pauseOverlay = document.getElementById('pauseOverlay');
    if (!isGamePaused) {
        isGamePaused = true;
        world.pauseGame();
        soundManager.pauseMusic(activeMusic);
        pauseOverlay.style.display = 'flex';
    } else {
        resumeGame();
    }
}

/**
 * Opens the pause menu.
 */
function openPause() {
    let pauseOverlay = document.getElementById('pauseOverlay');
    if (!isGamePaused) {
        isGamePaused = true;
        world.pauseGame();
        soundManager.pauseMusic(activeMusic);
        pauseOverlay.style.display = 'flex';
}
}

/**
 * Resumes the game from a paused state.
 */
function resumeGame() {
    let pauseOverlay = document.getElementById('pauseOverlay');
    isGamePaused = false;
    world.resumeGame();
    soundManager.stopAllMusic();
    soundManager.resumeMusic(activeMusic);
    pauseOverlay.style.display = 'none';
}

/**
 * Toggles the display of the settings menu.
 */
function toggleSettingsMenu() {
    let settingsMenu = document.getElementById('settingMenü');
    settingsMenu.style.display =
        (settingsMenu.style.display === 'none' || settingsMenu.style.display === '')
            ? 'block'
            : 'none';
}

/**
 * Toggles the display of the information menu.
 */
function toggleInfoMenu() {
    let infoMenu = document.getElementById('infoMenü');
    infoMenu.style.display =
        (infoMenu.style.display === 'none' || infoMenu.style.display === '')
            ? 'block'
            : 'none';
}

/**
 * Quits the game and saves sound settings to local storage.
 */
function quitGame() {
    localStorage.setItem('soundMuted', soundManager.isMuted.toString());
    localStorage.setItem('musicMuted', localStorage.getItem('musicMuted'));
    localStorage.setItem('effectsMuted', localStorage.getItem('effectsMuted'));
    isGameRunning = false;
    soundManager.stopAllMusic();
    if (!soundManager.isMuted) {
        soundManager.playMusic('menu');
    }
    localStorage.setItem('soundMuted', soundManager.isMuted.toString());
    initializeSoundSettings();
    location.reload();
}

/**
 * Toggles the image for a given button based on its current state.
 * @param {string} buttonId - The ID of the button whose image needs to be toggled.
 */
function toggleImage(buttonId) {
    let button = document.getElementById(buttonId);
    let disabledImage = './img/10_own_elements/01_buttons/disable_button.png';
    let enabledImage = './img/10_own_elements/01_buttons/enable_button.png';
    button.src = button.src.includes('disable_button.png') ? enabledImage : disabledImage;
}

/**
 * Toggles the sound setting and updates the visual indicator.
 */
function toggleSoundSetting() {
    toggleSound();
    toggleImage('soundSettingButton');
    toggleMusicSetting();
    toggleEffectsSetting();
}

/**
 * Toggles the music setting on or off and updates the visual indicator.
 */
function toggleMusicSetting() {
    let menuMusicButton = document.getElementById('musicSettingButton');
    let musicMuted = localStorage.getItem('musicMuted') === 'true';
    if (!soundManager.isMuted) {
        if (musicMuted) {
            soundManager.unmuteMusic();
            menuMusicButton.src = "/img/10_own_elements/01_buttons/enable_button.png";
            localStorage.setItem('musicMuted', 'false');
        } else {
            soundManager.muteMusic();
            menuMusicButton.src = "/img/10_own_elements/01_buttons/disable_button.png";
            localStorage.setItem('musicMuted', 'true');
        }
        checkGlobalSoundStatus();
    }
}

/**
 * Toggles the effects setting on or off and updates the visual indicator.
 */
function toggleEffectsSetting() {
    let menuEffectButton = document.getElementById('effectsSettingButton');
    let effectsMuted = localStorage.getItem('effectsMuted') === 'true';
    if (!soundManager.isMuted) {
        if (effectsMuted) {
            soundManager.unmuteEffects();
            menuEffectButton.src = "/img/10_own_elements/01_buttons/enable_button.png";
            localStorage.setItem('effectsMuted', 'false');
        } else {
            soundManager.muteEffects();
            menuEffectButton.src = "/img/10_own_elements/01_buttons/disable_button.png";
            localStorage.setItem('effectsMuted', 'true');
        }
        checkGlobalSoundStatus();
    }
}

/**
 * Checks and updates the global sound status, muting or unmuting all sounds as needed.
 */
function checkGlobalSoundStatus() {
    let musicMuted = localStorage.getItem('musicMuted') === 'true';
    let effectsMuted = localStorage.getItem('effectsMuted') === 'true';
    if (musicMuted && effectsMuted) {
        soundManager.muteAll();
        updateButtons(false, false, false);
        localStorage.setItem('soundMuted', 'true');
    }
}

/**
 * Updates the visual indicators for sound, music, and effects buttons.
 * @param {boolean} sound - Indicates if sound is enabled.
 * @param {boolean} music - Indicates if music is enabled.
 * @param {boolean} effects - Indicates if effects are enabled.
 */
function updateButtons(sound, music, effects) {
    let soundButton = document.getElementById('soundButton').querySelector('img');
    let menuSoundButton = document.getElementById('soundSettingButton');
    let menuMusicButton = document.getElementById('musicSettingButton');
    let menuEffektButton = document.getElementById('effectsSettingButton');
    soundButton.src = sound
        ? "./img/10_own_elements/01_buttons/sound_on_button.png"
        : "./img/10_own_elements/01_buttons/sound_off_button.png";
    menuSoundButton.src = sound
        ? "./img/10_own_elements/01_buttons/enable_button.png"
        : "./img/10_own_elements/01_buttons/disable_button.png";
    menuMusicButton.src = music
        ? "./img/10_own_elements/01_buttons/enable_button.png"
        : "./img/10_own_elements/01_buttons/disable_button.png";
    menuEffektButton.src = effects
        ? "./img/10_own_elements/01_buttons/enable_button.png"
        : "./img/10_own_elements/01_buttons/disable_button.png";
}

/**
 * Starts the main game loop with a consistent update rate.
 */
function startGameLoop() {
    gameInterval = setInterval(() => {
        world.update();
        world.draw();
    }, 1000 / 60);
}

/**
 * Closes the in-game shop and resumes the game.
 */
function closeShop() {
    world.closeShopMenu();
    resumeGame();
}

/**
 * Updates the inventory display in the shop based on the player's current resources.
 */
function updateShopInventory() {
    let coinCount = world.character.coinCount || 0;
    let bottleCount = world.character.bottleCount || 0;
    let tacoCount = Math.floor(world.character.energy / 10);
    document.getElementById('coinCount').innerText = `${Math.max(0, coinCount)}x`;
    document.getElementById('bottleCount').innerText = `${Math.max(0, bottleCount)}x`;
    document.getElementById('tacoCount').innerText = `${Math.max(0, tacoCount)}x`;
}

/**
 * Adds event listeners to buttons for hover and click sound effects.
 */
document.addEventListener('DOMContentLoaded', () => {
    let buttons = document.querySelectorAll('.menu-button img, .settings-menü-buttons img, .info-menü-back-button img, .info-menü-page-buttons img, .pause-overlay img, .shop-button-container img');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => soundManager.playSoundEffect('hover'));
        button.addEventListener('click', () => soundManager.playSoundEffect('click'));
    });
});

/**
 * Checks and updates the orientation overlay based on the current window dimensions.
 */
function checkOrientation() {
    let overlay = document.getElementById('orientationOverlay');
    if (window.innerHeight > window.innerWidth) {
        overlay.classList.add('visible');
    } else {
        overlay.classList.remove('visible');
    }
}

// Adds event listeners for window resize and orientation change to handle orientation checks.
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.onload = checkOrientation;

// Prevents the default context menu from appearing on right-click.
document.addEventListener('contextmenu', (event) => event.preventDefault());
