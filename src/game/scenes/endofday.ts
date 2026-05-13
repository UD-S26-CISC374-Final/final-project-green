import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import {
    SCORE,
    MAX_SCORE,
    resetScore,
    TOTAL_MAX_SCORE,
    EMPLOYEES_SENT_TO_WORK,
    INCORRECTLY_KICKED_OUT,
    CORRECT_NOTE_GIVEN,
    CODE_FIXED,
    LEVEL_HAS_CODE_FIX,
} from "../objects/score";

export class EndOfDay extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    endOfDayText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    nextDayButton: Phaser.GameObjects.Text;
    levelSelectButton: Phaser.GameObjects.Text;
    summaryMessage: Phaser.GameObjects.Text[] = [];

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
            .text(512, 100, "Today's Summary", {
                fontFamily: "Arial Black",
                fontSize: 48,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        let yOffset = 170;
        const messages = this.generateSummaryMessages();

        for (const message of messages) {
            const messageText = this.add
                .text(512, yOffset, message, {
                    fontFamily: "Arial Black",
                    fontSize: 18,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 3,
                    align: "center",
                    wordWrap: { width: 800 },
                })
                .setOrigin(0.5)
                .setDepth(100);
            this.summaryMessage.push(messageText);
            yOffset += 50;
        }

        this.scoreText = this.add
            .text(512, 400, `Today's Score: ${SCORE}/${MAX_SCORE}`, {
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
            .text(512, 480, "Next Day", {
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

    generateSummaryMessages(): string[] {
        const messages: string[] = [];
        const employeesSent = EMPLOYEES_SENT_TO_WORK;
        const incorrectlyKickedOut = INCORRECTLY_KICKED_OUT;
        const correctNoteGiven = CORRECT_NOTE_GIVEN;
        const codeFixed = CODE_FIXED;

        // Employee summary message
        if (incorrectlyKickedOut > 0) {
            const employeeWord =
                incorrectlyKickedOut === 1 ? "employee" : "employees";
            messages.push(
                `${incorrectlyKickedOut} ${employeeWord} didn't show up to work today.`,
            );
        } else if (employeesSent > 0) {
            const employeeWord = employeesSent === 1 ? "employee" : "employees";
            messages.push(
                `${employeesSent} ${employeeWord} successfully went to work and completed their assignments.`,
            );
        }

        // Boss thank you note
        if (correctNoteGiven) {
            messages.push(
                'Boss: "Thank you for getting that note to the right person!"',
            );
        }

        // Server status message
        if (codeFixed) {
            messages.push("The servers are running smoothly.");
        } else if (LEVEL_HAS_CODE_FIX) {
            messages.push("The company's servers had an outage.");
        }

        return messages.length > 0 ? messages : ["Great job out there!"];
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
