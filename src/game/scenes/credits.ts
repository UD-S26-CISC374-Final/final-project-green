import { Scene } from "phaser";
import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

export class Credits extends Scene implements ChangeableScene {
    constructor() {
        super("Credits");
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add
            .image(centerX, centerY, "credits_lvlselect_bg")
            .setOrigin(0.5)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add
            .text(centerX - 25, centerY - 280, "Credits", {
                fontFamily: "Arial Black",
                fontSize: "42px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

        this.add
            .text(centerX - 5, centerY - 80, "Created by Team          ", {
                fontFamily: "Arial",
                fontSize: "30px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 6,
                align: "center",
            })
            .setOrigin(0.5);
        this.add
            .text(centerX + 70, centerY - 80, "Green", {
                fontFamily: "Arial",
                fontSize: "30px",
                color: "#0bac0b",
                stroke: "#1df41d",
                strokeThickness: 6,
                align: "center",
            })
            .setOrigin(0, 0.5);
        this.add
            .text(
                centerX - 5,
                centerY - 30,
                "Andrew Shaffer and Joanna Amoah",
                {
                    fontFamily: "Arial",
                    fontSize: "26px",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 6,
                    align: "center",
                },
            )
            .setOrigin(0.5);

        this.add
            .text(centerX - 5, centerY + 20, "Thanks for playing!", {
                fontFamily: "Arial",
                fontSize: "24px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 6,
                align: "center",
            })
            .setOrigin(0.5);

        const backText = this.add
            .text(centerX - 5, centerY + 140, "Back to Menu", {
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
                centerX - 5,
                centerY + 140,
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
