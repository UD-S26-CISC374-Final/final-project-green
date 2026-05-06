import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { SCORE, MAX_SCORE, resetScore } from "../objects/score";

export class EndOfDay extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    endOfDayText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;

    constructor() {
        super("EndOfDay");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.endOfDayText = this.add
            .text(512, 384, "End of Day", {
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

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        resetScore();
        this.scene.start("MainMenu");
    }
}
