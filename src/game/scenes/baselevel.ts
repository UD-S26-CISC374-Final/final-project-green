import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { setMaxScore, setScore } from "../objects/score";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";
import person from "../objects/person";
import notebook from "../objects/notebook";
import giveNote from "../objects/giveNote";
import notepad from "../objects/notepad";
import id from "../objects/id";

export class baseLevel extends Scene {
    moveSpeed: number = 5000;
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    numberOfTasks: number;
    numberOfPeople: number;
    numberOfImpostors: number;
    people: person[];
    currentPersonIndex: number = 0;
    notebook: notebook;
    notepad: notepad;
    score: number = 0;
    maxScore: number = 0;
    giveNote: giveNote;
    currentPerson: person;
    currentIDCard: id;
    skipButton: Phaser.GameObjects.Text;
    guards: Phaser.GameObjects.Group;
    interactiveObjects: Phaser.GameObjects.GameObject[] = [];
    constructor(numberOfPeople: number, numberOfImpostors: number, numberOfTasks: number, levelName: string) {
        super(levelName);
        this.numberOfPeople = numberOfPeople;
        this.numberOfImpostors = numberOfImpostors;
        this.numberOfTasks = numberOfTasks;
        this.people = [];
    }

    create() {


        this.maxScore = this.numberOfTasks + this.numberOfPeople; // Max score is total number of correct decisions possible
        // Explicitly enable input on the scene
        this.input.enabled = true;
        this.currentPerson = this.people[0];
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        // Make background fill the screen
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
        this.background = this.add.image(
            screenWidth / 2,
            screenHeight / 2,
            "desk+background",
        );
        this.background.displayWidth = screenWidth;
        this.background.displayHeight = screenHeight;
        this.background.setAlpha(1);

        this.fpsText = new FpsText(this);

        const impostornumbers: number[] = [];
        for (let i = 0; i < this.numberOfImpostors; i++) {
            const randomNum = Math.floor(Math.random() * this.numberOfPeople);
            if (!impostornumbers.includes(randomNum)) {
                impostornumbers.push(randomNum);
            }
        }
        for (let i = 0; i < this.numberOfPeople; i++) {
            const isImpostor = impostornumbers.includes(i);
            let newPerson = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                isImpostor
            ).setVisible(false).setDepth(0.51);
            while (this.people.some((person) => person.characterName === newPerson.characterName) ||
                   this.people.some((person) => person.codename === newPerson.codename) ||
                   this.people.some((person) => person.idNumber === newPerson.idNumber)) {
                const updatedPerson = new person(
                    this,
                    screenWidth / 2,
                    screenHeight / 2.75,
                    isImpostor
                ).setVisible(false).setDepth(0.51);
                newPerson.destroy();
                newPerson = updatedPerson;
            }
            this.people.push(newPerson);
        }
        
        this.currentPerson = this.people[0];

        for (const tempperson of this.people) {
            if (tempperson.impostor) {
                tempperson.setFakeCodenameFromPool(this.people);
            }
        }

        this.skipButton = this.add
            .text(screenWidth - 100, 20, "Skip", {
                fontSize: "24px",
                color: "#000000",
            })
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                console.log("Skip button clicked");
                this.changeScene();
            });

        this.guards = this.add.group();
        const guardPositions = [
            screenWidth * 0.175,
            screenWidth * 0.325,
            screenWidth * 0.65,
            screenWidth * 0.8
        ];
        for (let i = 0; i < 4; i++) {
            const guard = this.add.image(
                guardPositions[i],
                screenHeight / 3, // Near the top/back wall
                "bodyguard"
            ).setScale(0.5).setDepth(0.5);
            this.guards.add(guard);
        }

        this.notebook = new notebook(
            this,
            screenWidth / 4,
            screenHeight / 1.35,
            "",
        ).setDepth(1);
        // Notebook handles its own interactivity
        
        this.notepad = new notepad(
            this,
            screenWidth / 5.2,
            screenHeight / 1.35,
        ).setDepth(1);
        
        // Notepad handles its own interactivity

        this.giveNote = new giveNote(
            this,
            screenWidth / 1.25,
            screenHeight / 1.35,
            ``,
            0,
        ).setDepth(1);

        this.currentPerson.setVisible(true);
        // Do not set currentPerson as interactive
        this.tweens.add({
            targets: this.currentPerson,
            scale: 3,
            duration: this.moveSpeed,
            ease: "Back.Out",
        });
        this.time.delayedCall(1, () => {
            this.createIDCard();
        });

        // Add a rectangle that fills the bottom half of the screen

        // Desk rectangle
        const deskY = screenHeight * 0.75;
        const tempdesk = this.add
            .rectangle(
                screenWidth / 2,
                deskY, // center of bottom half
                screenWidth,
                screenHeight / 2,
                0xffffff,
            )
            .setStrokeStyle(3, 0x000000)
            .setDepth(0.4)
            .setVisible(false);
        // Do not set desk as interactive at all

        // Add two buttons on the desk at the very end, with highest depth
        const buttonRadius = 40;
        const buttonY = deskY;
        const buttonSpacing = 120;
        // Red button (left)
        const redButton = this.add
            .circle(
                screenWidth / 2 - buttonSpacing,
                buttonY,
                buttonRadius,
                0xff0000,
            )
            .setStrokeStyle(4, 0x880000)
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                console.log("Red button clicked");
                this.personRejected();
            });
        // Green button (right)
        const greenButton = this.add
            .circle(
                screenWidth / 2 + buttonSpacing,
                buttonY,
                buttonRadius,
                0x00ff00,
            )
            .setStrokeStyle(4, 0x006600)
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                console.log("Green button clicked");
                this.personAccepted();
            });


        EventBus.emit("current-scene-ready", this);

        //fix errors with unused variables
        console.log(tempdesk, redButton, greenButton);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        setScore(this.score);
        setMaxScore(this.maxScore);
        this.scene.start("EndOfDay");
    }

    personAccepted() {
        this.input.enabled = false; // Disable input while moving offscreen
        if (!this.currentPerson.impostor) {
            this.score++;
        }
        this.tweens.add({
            targets: this.currentPerson,
            x: this.cameras.main.width + 200, // Move off-screen to the right
            y: this.currentPerson.y,
            duration: this.moveSpeed,
            ease: "Power2",
        });
        this.nextPerson();
    }

    personRejected() {
        // Wait 3 seconds before moving offscreen to the left
        this.currentIDCard.destroy(); // Remove ID card when person is rejected
        this.input.enabled = false; // Disable input while waiting
        if (this.currentPerson.impostor) {
            this.score++;
        }
        this.tweens.add({
            targets: [this.guards.getChildren()[1], this.guards.getChildren()[2]], // Middle guards react to rejections
            scale: 0.75,
            y: this.currentPerson.y + 20,
            duration: 1500,
        });
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: [this.currentPerson, this.guards.getChildren()[1], this.guards.getChildren()[2]], // Move person and middle guards off-screen
                x: -200, // Move offscreen to the left
                y: this.currentPerson.y,
                duration: this.moveSpeed,
            });
            this.time.delayedCall(this.moveSpeed+1000, () => {
                this.tweens.add({
                    targets: this.guards.getChildren()[2], // Move middle guards back to original position
                    scale: 0.5,
                    x: this.cameras.main.width * 0.65,
                    y: this.cameras.main.height / 3,
                    duration: this.moveSpeed,
                });
                this.tweens.add({
                    targets: this.guards.getChildren()[1],
                    scale: 0.5,
                    x: this.cameras.main.width * 0.325,
                    y: this.cameras.main.height / 3,
                    duration: this.moveSpeed,
                });
                this.nextPerson();
            });
        });
    }
    nextPerson() {
        this.currentPersonIndex++;
        this.time.delayedCall(this.moveSpeed, () => {
            if (this.currentPersonIndex < this.people.length) {
                this.currentPerson = this.people[this.currentPersonIndex];
                this.currentPerson.setVisible(true);
                this.tweens.add({
                    targets: this.currentPerson,
                    scale: 3,
                    duration: this.moveSpeed,
                    ease: "Back.Out",
                });
                this.createIDCard();
                this.input.enabled = true; // Re-enable input for the next person
            } else {
                console.log("All people processed. Final score:", this.score);
                this.changeScene();
            }
        });
    }
    createIDCard() {
            this.currentIDCard = new id(
                this,
                this.currentPerson.x,
                this.currentPerson.y + 150,
                this.currentPerson.characterName,
                this.currentPerson.impostor ? this.currentPerson.fakeCodename : this.currentPerson.codename,
                this.currentPerson.idNumber.toString(),
            );
        }
}
