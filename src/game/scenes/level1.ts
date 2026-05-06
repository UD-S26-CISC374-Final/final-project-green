import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { setMaxScore, setScore } from "../objects/score";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";
import person from "../objects/person";
import notebook from "../objects/notebook";
import giveNote from "../objects/giveNote";
import notepad from "../objects/notepad";

export class Level1 extends Scene {
    moveSpeed: number = 9000;

    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    person1: person;
    person2: person;
    person3: person;
    person4: person;
    people: person[];
    currentPersonIndex: number = 0;
    notebook: notebook;
    notepad: notepad;
    score: number = 0;
    maxScore: number = 5;
    giveNote: giveNote;
    currentIDCard: Phaser.GameObjects.Container;

    currentPerson: person;
    constructor() {
        super("Level1");
    }

    create() {
        // Explicitly enable input on the scene
        this.input.enabled = true;
        this.currentPerson = this.person1;
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

        this.person1 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            false,
        ).setVisible(false);
        this.person2 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            false,
        ).setVisible(false);
        while (
            this.person2.characterName === this.person1.characterName ||
            this.person2.codename === this.person1.codename ||
            this.person2.idNumber === this.person1.idNumber
        ) {
            this.person2 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                false,
            ).setVisible(false);
        }
        this.person3 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            true,
        ).setVisible(false);
        while (
            this.person3.characterName === this.person1.characterName ||
            this.person3.characterName === this.person2.characterName ||
            this.person3.codename === this.person1.codename ||
            this.person3.codename === this.person2.codename ||
            this.person3.idNumber === this.person1.idNumber ||
            this.person3.idNumber === this.person2.idNumber
        ) {
            this.person3 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                true,
            ).setVisible(false);
        }
        this.person4 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            false,
        ).setVisible(false);
        while (
            this.person4.characterName === this.person1.characterName ||
            this.person4.characterName === this.person2.characterName ||
            this.person4.characterName === this.person3.characterName ||
            this.person4.codename === this.person1.codename ||
            this.person4.codename === this.person2.codename ||
            this.person4.codename === this.person3.codename ||
            this.person4.idNumber === this.person1.idNumber ||
            this.person4.idNumber === this.person2.idNumber ||
            this.person4.idNumber === this.person3.idNumber
        ) {
            this.person4 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                false,
            ).setVisible(false);
        }
        this.currentPerson = this.person1;
        this.people = [this.person1, this.person2, this.person3, this.person4];

        for (const tempperson of this.people) {
            if (tempperson.impostor) {
                tempperson.setFakeCodenameFromPool(this.people);
            }
        }

        this.notebook = new notebook(
            this,
            screenWidth / 4,
            screenHeight / 1.35,
            `int main() {\nchar *${this.person1.codename} = "${this.person3.characterName}";\nchar *${this.person2.codename} = "${this.person4.characterName}";\nchar *${this.person3.codename} = "${this.person1.characterName}";\nchar *${this.person4.codename} = "${this.person2.characterName}";\nchar *tmp;\ntmp = ${this.person1.codename};\n${this.person1.codename} = ${this.person3.codename};\n${this.person3.codename} = ${this.person4.codename};\n${this.person4.codename} = ${this.person2.codename};\n${this.person2.codename} = tmp;\ntmp = ${this.person4.codename};\n${this.person4.codename} = ${this.person3.codename};\n${this.person3.codename} = ${this.person1.codename};\n${this.person1.codename} = tmp;\nprintf("%s\\n", ${this.person1.codename});\nprintf("%s\\n", ${this.person2.codename});\nprintf("%s\\n", ${this.person3.codename});\nprintf("%s\\n", ${this.person4.codename});\nreturn 0;\n}`,
        ).setDepth(1);
        // Notebook handles its own interactivity
        const startNumber = (this.person4.idNumber - 5) / 2;
        this.giveNote = new giveNote(
            this,
            screenWidth / 1.25,
            screenHeight / 1.35,
            `int main() { \nint x = ${startNumber}; \nx = x + 2; \ny = x; \ny = y - 1; \nx = y * 2; \ny = x + 3; \nprintf("ID: %d", y); \nreturn 0; \n}`,
            this.person4.idNumber,
        ).setDepth(1);

        this.notepad = new notepad(
                    this,
                    screenWidth / 5.2,
                    screenHeight / 1.35,
                ).setDepth(1);

        this.currentPerson.setVisible(true);
        // Do not set currentPerson as interactive
        this.tweens.add({
            targets: this.currentPerson,
            scale: 3,
            duration: this.moveSpeed,
            ease: "Back.Out",
        });
        this.time.delayedCall(4000, () => {
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

        const tempBlob = this.add
            .text(
                50,
                50,
                "Ok so heres how the alpha version works\nThe person in front of you is supposedly one of your coworkers\nIt is your job to determine if they are telling the truth\nAs you can see they have given you their ID card\nIf you click the codes book on the left of the desk,\nit will show you a program\nIf the name on the ID card matches what the print\nstatement for the respective Codename\nat the end of the code would print,\nthe person is not an impostor\nIf the name does not match, they are an impostor\nFor impostors hit the red button and \ncoworkers hit the green button\nYou also have that note\nGive that note to the person with the ID number \nyou get from tracing the code in the note\nYeah thats it for now ok bye good luck",
                {
                    fontSize: "16px",
                    color: "#000000",
                },
            )
            .setDepth(1);

        EventBus.emit("current-scene-ready", this);
        console.log("Person 1:", this.person1);
        console.log("Person 2:", this.person2);
        console.log("Person 3:", this.person3);
        console.log("Person 4:", this.person4);

        //fix errors with unused variables
        console.log(tempdesk, redButton, greenButton, tempBlob);
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
        this.currentIDCard.destroy(); // Remove ID card when person is accepted
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
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: this.currentPerson,
                x: -200, // Move offscreen to the left
                y: this.currentPerson.y,
                duration: this.moveSpeed,
                ease: "Power2",
            });
            this.nextPerson();
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
                this.time.delayedCall(4000, () => {
                    this.createIDCard();
                    this.input.enabled = true; // Re-enable input for the next person
                });
            } else {
                console.log("All people processed. Final score:", this.score);
                this.changeScene();
            }
        });
    }
    createIDCard() {
        const idCard = this.add
            .container(this.currentPerson.x, this.currentPerson.y + 150)
            .setDepth(0.5);
        const rect = this.add
            .rectangle(0, 0, 150, 75, 0xffffff, 1)
            .setStrokeStyle(2, 0x000000)
            .setOrigin(0.5);
        // Do not set ID card rect as interactive at all
        const nameText = this.add.text(
            -70,
            -35,
            `Name: ${this.currentPerson.characterName}`,
            { fontSize: "14px", color: "#000" },
        );
        const codenameText = this.add.text(
            -70,
            -10,
            this.currentPerson.impostor ?
                `Codename: ${this.currentPerson.fakeCodename}`
            :   `Codename: ${this.currentPerson.codename}`,
            { fontSize: "14px", color: "#000" },
        );
        const idNumberText = this.add.text(
            -70,
            15,
            `ID: ${this.currentPerson.idNumber}`,
            { fontSize: "14px", color: "#000" },
        );
        idCard.add([rect, nameText, codenameText, idNumberText]);
        this.currentIDCard = idCard;
    }
}
