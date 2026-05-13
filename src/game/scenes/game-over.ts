import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { scoreState } from "../objects/score";

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;

    constructor() {
        super("GameOver");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.gameOverText = this.add
            .text(512, 384, "Game Over", {
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
            .text(
                512,
                450,
                `Final Score: ${scoreState.TOTAL_SCORE}/${scoreState.TOTAL_MAX_SCORE}`,
                {
                    fontFamily: "Arial Black",
                    fontSize: 32,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center",
                },
            )
            .setOrigin(0.5)
            .setDepth(100);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}
