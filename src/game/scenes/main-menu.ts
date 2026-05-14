import { GameObjects, Scene } from "phaser";

import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

export class MainMenu extends Scene implements ChangeableScene {
    background: GameObjects.Image;

    constructor() {
        super("MainMenu");
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.background = this.add
            .image(centerX, centerY, "main-menu-bg")
            .setOrigin(0.5)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add
            .image(centerX, centerY - 120, "login-icon")
            .setOrigin(0.5)
            .setScale(0.5);

        const menuOptions = [
            { label: "Start Game", scene: "Level1" },
            { label: "Level Select", scene: "LevelSelect" },
            { label: "Credits", scene: "Credits" },
        ];

        const startY = centerY - 10;
        const spacing = 70;

        menuOptions.forEach((option, index) => {
            const y = startY + index * spacing;
            const buttonText = this.add
                .text(centerX, y, option.label, {
                    fontFamily: "Arial Black",
                    fontSize: "25px",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                })
                .setOrigin(0.5)
                .setDepth(2)
                .setInteractive({ useHandCursor: true });

            const buttonBg = this.add
                .rectangle(
                    centerX,
                    y,
                    buttonText.width + 80,
                    buttonText.height + 30,
                    0x000000,
                    0.6,
                )
                .setStrokeStyle(3, 0xffffff)
                .setDepth(1)
                .setInteractive({ useHandCursor: true });

            const activateButton = () => this.scene.start(option.scene);
            [buttonBg, buttonText].forEach((obj) => {
                obj.on("pointerdown", activateButton);
                obj.on("pointerover", () =>
                    buttonBg.setFillStyle(0xffffff, 0.2),
                );
                obj.on("pointerout", () =>
                    buttonBg.setFillStyle(0x000000, 0.6),
                );
            });
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("Level1");
    }
}
