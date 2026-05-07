import { Scene } from "phaser";
import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

const unlockKey = "game-unlocked-level";
const totalLevels = 5;

function getUnlockedLevel() {
    const stored = window.localStorage.getItem(unlockKey);
    const parsed = stored ? parseInt(stored, 10) : NaN;
    return Number.isInteger(parsed) ?
            Math.max(1, Math.min(totalLevels, parsed))
        :   1;
}

export class LevelSelect extends Scene implements ChangeableScene {
    constructor() {
        super("LevelSelect");
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const unlockedLevel = getUnlockedLevel();

        this.add.image(centerX, centerY, "background").setOrigin(0.5);

        this.add
            .text(centerX, centerY - 170, "Level Select", {
                fontFamily: "Arial Black",
                fontSize: "44px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

        this.add
            .text(
                centerX,
                centerY - 110,
                "Complete levels in order to unlock later stages.",
                {
                    fontFamily: "Arial",
                    fontSize: "22px",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 6,
                    align: "center",
                },
            )
            .setOrigin(0.5);

        let lockedHint: Phaser.GameObjects.Text | null = null;
        const showLockedHint = () => {
            if (lockedHint) {
                lockedHint.destroy();
            }
            lockedHint = this.add
                .text(
                    centerX,
                    centerY + 260,
                    "Finish the previous level to unlock this one.",
                    {
                        fontFamily: "Arial",
                        fontSize: "24px",
                        color: "#ffcc00",
                        stroke: "#000000",
                        strokeThickness: 6,
                        align: "center",
                    },
                )
                .setOrigin(0.5)
                .setDepth(10);
            this.time.delayedCall(2200, () => lockedHint?.destroy());
        };

        const buttonStartY = centerY - 40;
        const buttonSpacing = 75;
        for (let level = 1; level <= totalLevels; level += 1) {
            const y = buttonStartY + (level - 1) * buttonSpacing;
            const isLocked = level > unlockedLevel;
            const buttonText = this.add
                .text(centerX, y, `Level ${level}`, {
                    fontFamily: "Arial Black",
                    fontSize: "32px",
                    color: isLocked ? "#bbbbbb" : "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 6,
                })
                .setOrigin(0.5)
                .setDepth(2);

            const buttonBg = this.add
                .rectangle(
                    centerX,
                    y,
                    buttonText.width + 120,
                    buttonText.height + 28,
                    0x000000,
                    isLocked ? 0.25 : 0.65,
                )
                .setStrokeStyle(3, 0xffffff)
                .setDepth(1)
                .setInteractive({ useHandCursor: true });

            if (isLocked) {
                const lockText = this.add
                    .text(centerX + buttonText.width / 2 + 24, y, "🔒", {
                        fontFamily: "Arial",
                        fontSize: "28px",
                    })
                    .setOrigin(0.5)
                    .setDepth(2);

                [buttonBg, buttonText, lockText].forEach((obj) => {
                    obj.on("pointerdown", showLockedHint);
                });
            } else {
                const sceneKey = `Level${level}`;
                const activateButton = () => this.scene.start(sceneKey);
                [buttonBg, buttonText].forEach((obj) => {
                    obj.on("pointerdown", activateButton);
                    obj.on("pointerover", () =>
                        buttonBg.setFillStyle(0xffffff, 0.3),
                    );
                    obj.on("pointerout", () =>
                        buttonBg.setFillStyle(0x000000, 0.65),
                    );
                });
            }
        }

        const backText = this.add
            .text(centerX, centerY + 280, "Back to Menu", {
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
                centerY + 280,
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
