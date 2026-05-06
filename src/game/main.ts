import { Boot } from "./scenes/boot";
import { GameOver } from "./scenes/game-over";
import { Level1 as MainGame } from "./scenes/level1";
import { MainMenu } from "./scenes/main-menu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/preloader";
import { EndOfDay } from "./scenes/endofday";
import { Level5 } from "./scenes/level5";
import { Level4 } from "./scenes/level4";
import { Level3 } from "./scenes/level3";
import { Level2 } from "./scenes/level2";
import { Credits } from "./scenes/credits";
import { LevelSelect } from "./scenes/levelselect";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    title: "That's Not My Programmer",
    version: "0.0.1",
    type: AUTO,
    parent: "game-container",
    backgroundColor: "#ffffff",
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver, EndOfDay, Level2, Level3, Level4, Level5, Credits, LevelSelect],
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { x: 0, y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
