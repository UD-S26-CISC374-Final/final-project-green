import { Scene } from "phaser";
import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

export class LevelSelect extends Scene implements ChangeableScene {
    constructor() {
        super("LevelSelect");
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.image(centerX, centerY, "background").setOrigin(0.5);

        this.add
            .text(centerX, centerY - 120, "Choose a Level", {
                fontFamily: "Arial Black",
                fontSize: "42px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

        const backText = this.add
            .text(centerX, centerY + 120, "Back to Menu", {
                fontFamily: "Arial Black",
                fontSize: "32px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(2);

        const backButton = this.add
            .rectangle(
                centerX,
                centerY + 120,
                backText.width + 60,
                backText.height + 30,
                0x000000,
                0.6,
            )
            .setStrokeStyle(3, 0xffffff)
            .setDepth(1)
            .setInteractive({ useHandCursor: true });

        [backButton, backText].forEach((obj) => {
            obj.on("pointerdown", () => this.scene.start("MainMenu"));
            obj.on("pointerover", () => backButton.setFillStyle(0xffffff, 0.2));
            obj.on("pointerout", () => backButton.setFillStyle(0x000000, 0.6));
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}
