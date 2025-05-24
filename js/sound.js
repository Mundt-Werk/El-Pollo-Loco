class SoundManager {
    constructor() {
        this.music = {
            menu: new Audio('audio/10_backgroundmusic/menü_music.mp3'),
            game: new Audio('audio/10_backgroundmusic/game_music.mp3'),
            bossMusic: new Audio('audio/10_backgroundmusic/boss_music.mp3'),
            chickenBG: new Audio('audio/02_chicken/chicken_02.mp3'),
            win: new Audio('audio/10_backgroundmusic/game_win.mp3'),
            lose: new Audio('audio/17_lose/lose.mp3'),
        };

        this.soundEffects = {
            coin: new Audio('audio/11_coin/coin_02.mp3'),
            hit: new Audio('audio/12_pepe/hit_01.mp3'),
            jump: new Audio('audio/05_jump/jump_01.mp3'),
            bottleCollect: new Audio('audio/01_bottle/bottle_plopp_01.mp3'),
            bottleThrow: new Audio('audio/01_bottle/rotate_movement_01.mp3'),
            bottleSplash: new Audio('audio/01_bottle/splash_01.mp3'),
            bottleBreak: new Audio('audio/01_bottle/bottle_break_01.mp3'),
            hover: new Audio('audio/13_hover/hover_01.mp3'),
            nextPage: new Audio('audio/14_nextPage/nextPage_01.mp3'),
            click: new Audio('audio/15_click/click_03.mp3'),
            chickenDead: new Audio('audio/02_chicken/chicken_01.mp3'),
            birdWarning: new Audio('audio/16_bird/bird_01.mp3'),
            walkingSound: new Audio('audio/07_running/footsteps_03.mp3'),
        };

        this.musicVolume = 0.2;
        this.effectsVolume = 1.0;

        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;
        this.isMusicMuted = JSON.parse(localStorage.getItem('musicMuted')) || false;
        this.isEffectsMuted = JSON.parse(localStorage.getItem('effectsMuted')) || false;

        this.music.menu.loop = true;
        this.music.game.loop = true;

        this.applyVolume();
    }
    
    /**
     * Applies the current volume settings to all sounds.
     */
    applyVolume() {
        this.setVolume('music', this.isMusicMuted ? 0 : this.musicVolume);
        this.setVolume('soundEffects', this.isEffectsMuted ? 0 : this.effectsVolume);
        this.isMuted = this.isMusicMuted && this.isEffectsMuted;
        localStorage.setItem('isMuted', this.isMuted);
    }

    /**
     * Sets the volume for a category of sounds.
     * @param {string} category - Either 'music' or 'soundEffects'.
     * @param {number} volume - The volume level to set.
     */
    setVolume(category, volume) {
        const sounds = category === 'music' ? this.music : this.soundEffects;
        Object.values(sounds).forEach(sound => sound.volume = volume);
    }

    /**
     * Mutes all background music.
     */
    muteMusic() {
        this.isMusicMuted = true;
        this.applyVolume();
        localStorage.setItem('musicMuted', true);
    }

    /**
     * Unmutes all background music.
     */
    unmuteMusic() {
        this.isMusicMuted = false;
        this.applyVolume();
        localStorage.setItem('musicMuted', false);
    }

    /**
     * Mutes all sound effects.
     */
    muteEffects() {
        this.isEffectsMuted = true;
        this.applyVolume();
        localStorage.setItem('effectsMuted', true);
    }

    /**
     * Unmutes all sound effects.
     */
    unmuteEffects() {
        this.isEffectsMuted = false;
        this.applyVolume();
        localStorage.setItem('effectsMuted', false);
    }

    playSoundEffect(effectName) {
        const effect = this.soundEffects[effectName];
        if (!this.isEffectsMuted && effect) {
            effect.currentTime = 0;
            effect.play();
        }
    }

     /**
     * Plays a specific sound effect.
     * @param {string} effectName - The name of the effect to play.
     */
     playSoundEffect(effectName) {
        const effect = this.soundEffects[effectName];
        if (!this.isEffectsMuted && effect) {
            effect.currentTime = 0; // Resets the audio to the start.
            effect.play();
        }
    }

    /**
     * Plays background music of a specific type.
     * @param {string} type - The type of music to play, e.g., 'menu', 'game'.
     */
    playMusic(type) {
        const music = this.music[type];
        if (!this.isMusicMuted && music) {
            this.stopAllMusic();
            music.play();
        }
    }

    /**
     * Stops all currently playing background music.
     */
    stopAllMusic() {
        Object.values(this.music).forEach(sound => sound.pause());
    }

    /**
     * Pauses the background music of a specific type.
     * @param {string} type - The type of music to pause, e.g., 'menu', 'game'.
     */
    pauseMusic(type) {
        const music = this.music[type];
        if (music) music.pause();
    }

    /**
     * Resumes the background music of a specific type.
     * @param {string} type - The type of music to resume, e.g., 'menu', 'game'.
     */
    resumeMusic(type) {
        const music = this.music[type];
        if (music && !this.isMusicMuted) music.play();
    }

    /**
     * Mutes all sound categories.
     */
    muteAll() {
        this.isMusicMuted = true;
        this.isEffectsMuted = true;
        this.applyVolume();
    }

    /**
     * Unmutes all sound categories.
     */
    unmuteAll() {
        this.isMusicMuted = false;
        this.isEffectsMuted = false;
        this.applyVolume();
    }
}

let soundManager = new SoundManager();
