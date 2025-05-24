// Global variables to track the current state of the dialog
let currentDialogIndex = 0;
let currentDialog = null;

// Definitions of different dialogues within the game
let dialogs = {
    game: {
        steps: [
            { text: "Pepe! Get up right now!", character: "img/10_own_elements/12_characters/01_woman.png", position: "right" },
            { text: "Snore... five more minutes...", character: "img/10_own_elements/12_characters/02_pepe_sleep.png", position: "left" },
            { text: "The chickens have gone crazy!", character: "img/10_own_elements/12_characters/01_woman_02.png", position: "right" },
            { text: "Gone crazy?", character: "img/10_own_elements/12_characters/02_pepe_shock.png", position: "left" },
            { text: "They're tearing up the farm, Pepe! Move it!", character: "img/10_own_elements/12_characters/01_woman.png", position: "right" },
            { text: "Alright... it was too quiet here anyway.", character: "img/10_own_elements/12_characters/02_pepe.png", position: "left" },
            { text: "Duck your head when the vultures come!", character: "img/10_own_elements/12_characters/01_woman_02.png", position: "right" },
            { text: "Crazy chickens and vultures... This is gonna be my day.", character: "img/10_own_elements/12_characters/02_pepe_lets_fight.png", position: "left" },            
        ],
        overlayId: "dialogOverlay",
        characterId: "dialogCharacter",
        textId: "dialogText",
        onComplete: () => resumeGame(),
        init: () => startGame(),
    },
    shop: {
        steps: [
            { text: "Welcome! Would you like to buy something?", character: "img/10_own_elements/12_characters/03_el_scelleto.png", position: "right" },
            { text: "Hmm... What do you have to offer?", character: "img/10_own_elements/12_characters/02_pepe.png", position: "left" },
            { text: "Tacos for more energy and bottles for your adventure!", character: "img/10_own_elements/12_characters/03_el_scelleto.png", position: "right" },
            { text: "Sounds good, show me the shop!", character: "img/10_own_elements/12_characters/02_pepe_happy.png", position: "left" },
        ],
        overlayId: "shopDialogOverlay",
        characterId: "shopDialogCharacter",
        textId: "shopDialogText",
        onComplete: () => world.openShopMenu(),
    },
    boss: {
        steps: [
            { text: "Who dares to challenge me?", character: "img/10_own_elements/12_characters/05_boss_02.png", position: "right" },
            { text: "I will defeat you!", character: "img/10_own_elements/12_characters/02_pepe_lets_fight.png", position: "left" },
            { text: "I will destroy your house!", character: "img/10_own_elements/12_characters/05_boss.png", position: "right" },
            { text: "Oh no, I must stop him before he reaches the house!", character: "img/10_own_elements/12_characters/02_pepe_shock.png", position: "left" },
            { text: "Let's go!", character: "img/10_own_elements/12_characters/05_boss_02.png", position: "right" },
        ],
        overlayId: "bossDialogOverlay",
        characterId: "bossDialogCharacter",
        textId: "bossDialogText",
        onComplete: () => {
            let boss = world.level.boss.find((b) => b instanceof Endboss);
            if (boss) boss.startEndbossFight();
            if (world.character) {
                world.character.speed = 4;
            }
            soundManager.stopAllMusic();
            soundManager.playMusic("bossMusic");
            resumeGame();
        },
        init: () => {
            soundManager.stopAllMusic();
            soundManager.playMusic("bossMusic");
            activeMusic = "bossMusic";
            let loseVideoSource = document.querySelector("#loseVideo source");
            if (loseVideoSource) {
                loseVideoSource.src = "video/videos/video_bosslose.mp4";
                let loseVideoElement = document.getElementById("loseVideo");
                loseVideoElement.load();
            }
        },
    },
};

// Notifications triggered by specific game events
let notificationDialogSteps = [
    { text: "Time to make some chili chicken!", character: "img/10_own_elements/12_characters/03_el_scelleto_thumbsup.png", position: "right" },
    { text: "Enjoy your meal!", character: "img/10_own_elements/12_characters/03_el_scelleto_thumbsup.png", position: "right" },
    { text: "You don't have enough coins!", character: "img/10_own_elements/12_characters/03_el_scelleto_no_01.png", position: "right" },
    { text: "You can't carry any more bottles!", character: "img/10_own_elements/12_characters/03_el_scelleto_no_01.png", position: "right" },
    { text: "You can't eat any more tacos!", character: "img/10_own_elements/12_characters/03_el_scelleto_no_02.png", position: "right" },
];

/**
 * Initializes and starts a dialog based on the specified type.
 * @param {string} dialogType - The type of dialog to start.
 */
function startDialog(dialogType) {
    let dialog = dialogs[dialogType];
    currentDialogIndex = 0;
    currentDialog = dialog;
    if (dialog.init) {
        dialog.init();
    }
    if (typeof world.pauseGame === "function") {
        world.pauseGame();
    }
    let overlay = document.getElementById(dialog.overlayId);
    if (!overlay) return;
    overlay.style.display = "flex";
    showCurrentDialogStep();
}

/**
 * Displays the current step of the dialog using character image and text.
 */
function showCurrentDialogStep() {
    let step = currentDialog.steps[currentDialogIndex];
    let characterImg = document.getElementById(currentDialog.characterId);
    let dialogText = document.getElementById(currentDialog.textId);
    if (!step || !characterImg || !dialogText) return;
    dialogText.textContent = step.text;
    if (characterImg.src !== step.character) {
        characterImg.src = step.character;
        applyAnimation(characterImg);
    }
    applyAnimation(dialogText);
    characterImg.style.left = step.position === "left" ? "0%" : "1.2%";
}

/**
 * Advances to the next step in the dialog or ends the dialog if all steps have been shown.
 */
function nextDialogStep() {
    currentDialogIndex++;
    if (currentDialogIndex < currentDialog.steps.length) {
        showCurrentDialogStep();
    } else {
        endCurrentDialog();
    }
}

/**
 * Closes the current dialog and resumes the game.
 */
function endCurrentDialog() {
    let overlay = document.getElementById(currentDialog.overlayId);
    if (overlay) overlay.style.display = "none";
    if (currentDialog.onComplete) {
        currentDialog.onComplete();
    }
}

/**
 * Applies a simple fade-in animation to an HTML element.
 * @param {HTMLElement} element - The element to animate.
 */
function applyAnimation(element) {
    element.style.animation = "none";
    void element.offsetWidth;
    element.style.animation = "fadeIn 1s ease-in forwards";
}

/**
 * Shows a notification dialog with context-specific messages.
 * @param {number} notificationIndex - Index of the notification to display.
 */
function startNotificationDialog(notificationIndex) {
    let notificationStep = notificationDialogSteps[notificationIndex];
    let characterImg = document.getElementById("shopDialogCharacter");
    let dialogText = document.getElementById("shopDialogText");
    let overlay = document.getElementById("shopDialogOverlay");
    if (characterImg && dialogText && overlay) {
        dialogText.textContent = notificationStep.text;
        characterImg.src = notificationStep.character;
        applyAnimation(characterImg);
        applyAnimation(dialogText);
        characterImg.style.left = notificationStep.position === "left" ? "0%" : "1%";
        overlay.style.display = "flex";
    }
}

/**
 * Closes the notification dialog and resumes gameplay.
 */
function closeNotificationDialog() {
    let overlay = document.getElementById("shopDialogOverlay");
    if (overlay) overlay.style.display = "none";
    world.resumeGame();
}

/**
 * Handles purchasing tacos in the game, checking conditions and updating game state.
 */
function buyTaco() {
    if (world.character.energy >= 100) {
        startNotificationDialog(4);
        return;
    }
    if (world.character.coinCount <= 0) {
        startNotificationDialog(2);
        return;
    }
    world.character.coinCount = Math.max(0, world.character.coinCount - 1);
    world.character.energy = Math.min(100, world.character.energy + 10);
    world.coinBar.setPercentage((world.character.coinCount / 10) * 100);
    world.healthBar.setPercentage(world.character.energy);
    updateShopInventory();
    startNotificationDialog(1);
}

/**
 * Handles purchasing bottles in the game, similar to buying tacos.
 */
function buyBottle() {
    if (world.character.bottleCount >= 10) {
        startNotificationDialog(3);
        return;
    }
    if (world.character.coinCount <= 0) {
        startNotificationDialog(2);
        return;
    }
    world.character.coinCount = Math.max(0, world.character.coinCount - 1);
    world.character.bottleCount = Math.min(10, (world.character.bottleCount || 0) + 1);
    world.coinBar.setPercentage((world.character.coinCount / 10) * 100);
    world.bottleBar.setPercentage((world.character.bottleCount / 10) * 100);
    updateShopInventory();
    startNotificationDialog(0);
}