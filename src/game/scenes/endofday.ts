import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { scoreState, resetScore } from "../objects/score";

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

        // this.endOfDayText = this.add
        //     .text(512, 100, "Today's Summary", {
        //         fontFamily: "Arial Black",
        //         fontSize: 48,
        //         color: "#ffffff",
        //         stroke: "#000000",
        //         strokeThickness: 8,
        //         align: "center",
        //     })
        //     .setOrigin(0.5)
        //     .setDepth(100);

        const messages = this.generateSummaryMessages();

        for (const message of messages) {
            const messageText = this.add
                .text(450, 360, message, {
                    fontFamily: "Courier New",
                    fontSize: 18,
                    color: "#261913",
                    stroke: "#000000",
                    strokeThickness: 3,
                    align: "center",
                    wordWrap: { width: 430 },
                })
                .setOrigin(0.5)
                .setDepth(100);
            this.summaryMessage.push(messageText);
        }

        this.scoreText = this.add
            .text(
                450,
                600,
                `Today's Score: ${scoreState.SCORE}/${scoreState.MAX_SCORE}`,
                {
                    fontFamily: "Courier New",
                    fontSize: 30,
                    color: "#261913",
                    stroke: "#000000",
                    strokeThickness: 4,
                    align: "center",
                },
            )
            .setOrigin(0.5)
            .setDepth(100);

        this.nextDayButton = this.add
            .text(1000, 380, "Next Day", {
                fontFamily: "Courier New",
                fontSize: 45,
                color: "#261913",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                this.changeScene();
            })
            .on("pointerover", () => {
                this.nextDayButton.setStyle({ color: "#c47f00" });
            })
            .on("pointerout", () => {
                this.nextDayButton.setStyle({ color: "#ffffff" });
            });

        this.levelSelectButton = this.add
            .text(1000, 480, "Level Select", {
                fontFamily: "Courier New",
                fontSize: 45,
                color: "#261913",
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
                this.levelSelectButton.setStyle({ color: "#c47f00" });
            })
            .on("pointerout", () => {
                this.levelSelectButton.setStyle({ color: "#ffffff" });
            });

        EventBus.emit("current-scene-ready", this);
    }

    generateSummaryMessages(): string[] {
        const messages: string[] = [];
        const employeesSent = scoreState.EMPLOYEES_SENT_TO_WORK;
        const incorrectlyKickedOut = scoreState.INCORRECTLY_KICKED_OUT;
        const correctNoteGiven = scoreState.CORRECT_NOTE_GIVEN;
        const codeFixed = scoreState.CODE_FIXED;

        console.log("End of Day Summary Debug:");
        console.log("Employees Sent:", employeesSent);
        console.log("Incorrectly Kicked Out:", incorrectlyKickedOut);
        console.log("Correct Note Given:", correctNoteGiven);
        console.log("Code Fixed:", codeFixed);
        console.log("Level Has Code Fix:", scoreState.LEVEL_HAS_CODE_FIX);

        // Employee summary messages
        if (employeesSent > 0) {
            const employeeWord = employeesSent === 1 ? "employee" : "employees";
            messages.push(
                `${employeesSent} ${employeeWord} successfully went to work and completed their assignments.`,
            );
        }
        if (incorrectlyKickedOut > 0) {
            const employeeWord =
                incorrectlyKickedOut === 1 ? "employee" : "employees";
            messages.push(
                `${incorrectlyKickedOut} ${employeeWord} didn't show up to work today.`,
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
        } else if (scoreState.LEVEL_HAS_CODE_FIX) {
            messages.push("The company's servers had an outage.");
        }
        console.log("Generated Messages:", messages);
        return messages.length > 0 ? messages : ["Great job out there!"];
    }

    changeScene() {
        resetScore();
        if (scoreState.TOTAL_MAX_SCORE === 5) {
            this.scene.start("Level2");
        } else if (scoreState.TOTAL_MAX_SCORE === 12) {
            this.scene.start("Level3");
        } else if (scoreState.TOTAL_MAX_SCORE === 21) {
            this.scene.start("Level4");
        } else if (scoreState.TOTAL_MAX_SCORE === 33) {
            this.scene.start("Level5");
        } else {
            this.scene.start("GameOver");
        }
    }
}
