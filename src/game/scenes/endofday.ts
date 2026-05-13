import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import {
    SCORE,
    MAX_SCORE,
    resetScore,
    TOTAL_MAX_SCORE,
} from "../objects/score";

export class EndOfDay extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    endOfDayText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    nextDayButton: Phaser.GameObjects.Text;
    levelSelectButton: Phaser.GameObjects.Text;

    constructor() {
        super("EndOfDay");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);

        this.background = this.add
            .image(this.camera.centerX, this.camera.centerY, "todays-summary")
            .setOrigin(0.5)
            .setDisplaySize(this.camera.width, this.camera.height);

        this.endOfDayText = this.add
            .text(512, 384, "Today's Summary", {
                fontFamily: "Arial Black",
                fontSize: 64,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.scoreText = this.add
            .text(512, 450, `Today's Score: ${SCORE}/${MAX_SCORE}`, {
                fontFamily: "Arial Black",
                fontSize: 32,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.nextDayButton = this.add
            .text(512, 500, "Next Day", {
                fontFamily: "Arial Black",
                fontSize: 24,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                this.changeScene();
            });

        this.levelSelectButton = this.add
            .text(512, 550, "Level Select", {
                fontFamily: "Arial Black",
                fontSize: 24,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                resetScore();
                this.scene.start("LevelSelect");
            })
            .on("pointerover", () => {
                this.levelSelectButton.setStyle({ color: "#ffff00" });
            })
            .on("pointerout", () => {
                this.levelSelectButton.setStyle({ color: "#ffffff" });
            });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        resetScore();
        if (TOTAL_MAX_SCORE === 5) {
            this.scene.start("Level2");
        } else if (TOTAL_MAX_SCORE === 12) {
            this.scene.start("Level3");
        } else if (TOTAL_MAX_SCORE === 21) {
            this.scene.start("Level4");
        } else if (TOTAL_MAX_SCORE === 33) {
            this.scene.start("Level5");
        } else {
            this.scene.start("GameOver");
        }
    }
}
