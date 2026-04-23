import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";
import person from "../objects/person";
import notebook from "../objects/notebook";

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
    score: number = 0;

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
            "background",
        );
        this.background.displayWidth = screenWidth;
        this.background.displayHeight = screenHeight;
        this.background.setAlpha(0.5);

        this.fpsText = new FpsText(this);

        this.person1 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            false,
        ).setVisible(false);
        while (
            this.person2.characterName === this.person1.characterName ||
            this.person2.codename === this.person1.codename
        ) {
            this.person2 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                false,
            ).setVisible(false);
        }
        while (
            this.person3.characterName === this.person1.characterName ||
            this.person3.characterName === this.person2.characterName ||
            this.person3.codename === this.person1.codename ||
            this.person3.codename === this.person2.codename
        ) {
            this.person3 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                true,
            ).setVisible(false);
        }
        while (
            this.person4.characterName === this.person1.characterName ||
            this.person4.characterName === this.person2.characterName ||
            this.person4.characterName === this.person3.characterName ||
            this.person4.codename === this.person1.codename ||
            this.person4.codename === this.person2.codename ||
            this.person4.codename === this.person3.codename
        ) {
            this.person4 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                false,
            ).setVisible(false);
        }

        this.notebook = new notebook(
            this,
            screenWidth / 4,
            screenHeight / 1.35,
            `int main() {\nchar *${this.person1.codename} = "${this.person3.characterName}";\nchar *${this.person2.codename} = "${this.person4.characterName}";\nchar *${this.person3.codename} = "${this.person1.characterName}";\nchar *${this.person4.codename} = "${this.person2.characterName}";\nchar *tmp;\ntmp = ${this.person1.codename};\n${this.person1.codename} = ${this.person3.codename};\n${this.person3.codename} = ${this.person4.codename};\n${this.person4.codename} = ${this.person2.codename};\n${this.person2.codename} = tmp;\ntmp = ${this.person4.codename};\n${this.person4.codename} = ${this.person3.codename};\n${this.person3.codename} = ${this.person1.codename};\n${this.person1.codename} = tmp;\nprintf("%s\\n", ${this.person1.codename});\nprintf("%s\\n", ${this.person2.codename});\nprintf("%s\\n", ${this.person3.codename});\nprintf("%s\\n", ${this.person4.codename});\nreturn 0;\n}`,
        ).setDepth(1);
        // Notebook handles its own interactivity

        this.currentPerson = this.person1;
        this.people = [this.person1, this.person2, this.person3, this.person4];

        this.currentPerson.setVisible(true);
        // Do not set currentPerson as interactive
        this.tweens.add({
            targets: this.currentPerson,
            scale: 3,
            duration: this.moveSpeed,
            ease: "Back.Out",
        });
        this.createIDCard();

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
            .setDepth(0.4);
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
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        this.scene.start("GameOver");
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
                this.createIDCard();
                this.input.enabled = true; // Re-enable input for the next person
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
            .rectangle(0, 0, 200, 100, 0xffffff, 0.9)
            .setStrokeStyle(2, 0x000000)
            .setOrigin(0.5);
        // Do not set ID card rect as interactive at all
        const nameText = this.add.text(
            -90,
            -35,
            `Name: ${this.currentPerson.characterName}`,
            { fontSize: "16px", color: "#000" },
        );
        const codenameText = this.add.text(
            -90,
            -10,
            this.currentPerson.impostor ?
                `Codename: ${this.currentPerson.fakeCodename}`
            :   `Codename: ${this.currentPerson.codename}`,
            { fontSize: "16px", color: "#000" },
        );
        const idNumberText = this.add.text(
            -90,
            15,
            `ID: ${this.currentPerson.idNumber}`,
            { fontSize: "16px", color: "#000" },
        );
        idCard.add([rect, nameText, codenameText, idNumberText]);
    }
}
