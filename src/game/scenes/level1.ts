import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    moveSpeed: number = 9000;

    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    person1: Phaser.GameObjects.Sprite;
    person2: Phaser.GameObjects.Sprite;
    person3: Phaser.GameObjects.Sprite;
    person4: Phaser.GameObjects.Sprite;
    people: Phaser.GameObjects.Sprite[];
    currentPersonIndex: number = 0;

    currentPerson: Phaser.GameObjects.Sprite;
    constructor() {
        super("Level1");
    }

    create() {
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

        this.person1 = this.add
            .sprite(screenWidth / 2, screenHeight / 2.75, "person1")
            .setScale(0.2)
            .setDepth(0)
            .setVisible(false);
        this.person2 = this.add
            .sprite(screenWidth / 2, screenHeight / 2.75, "person2")
            .setScale(0.2)
            .setDepth(0)
            .setVisible(false);
        this.person3 = this.add
            .sprite(screenWidth / 2, screenHeight / 2.75, "person3")
            .setScale(0.2)
            .setDepth(0)
            .setVisible(false);
        this.person4 = this.add
            .sprite(screenWidth / 2, screenHeight / 2.75, "person4")
            .setScale(0.2)
            .setDepth(0)
            .setVisible(false);

        this.currentPerson = this.person1;
        this.people = [this.person1, this.person2, this.person3, this.person4];

        this.currentPerson.setVisible(true);
        this.tweens.add({
            targets: this.currentPerson,
            scale: 3,
            duration: this.moveSpeed,
            ease: "Back.Out",
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
            .setDepth(0.5);

        // Add two buttons on the desk
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
            .on("pointerdown", () => this.personRejected());
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
            .on("pointerdown", () => this.personAccepted());

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        this.scene.start("GameOver");
    }

    personAccepted() {
        this.tweens.add({
            targets: this.currentPerson,
            x: this.cameras.main.width + 200, // Move off-screen to the right
            y: this.currentPerson.y,
            duration: this.moveSpeed,
            ease: "Power2",
        });
        this.currentPersonIndex++;
        if (this.currentPersonIndex < this.people.length) {
            this.currentPerson = this.people[this.currentPersonIndex];
            this.currentPerson.setVisible(true);
            this.tweens.add({
                targets: this.currentPerson,
                scale: 3,
                duration: this.moveSpeed,
                ease: "Back.Out",
            });
        }
    }

    personRejected() {
        // Wait 3 seconds before moving offscreen to the left
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: this.currentPerson,
                x: -200, // Move offscreen to the left
                y: this.currentPerson.y,
                duration: this.moveSpeed,
                ease: "Power2",
            });
            this.currentPersonIndex++;
            if (this.currentPersonIndex < this.people.length) {
                this.currentPerson = this.people[this.currentPersonIndex];
                this.currentPerson.setVisible(true);
                this.tweens.add({
                    targets: this.currentPerson,
                    scale: 3,
                    duration: this.moveSpeed,
                    ease: "Back.Out",
                });
            }
        });
    }
}
