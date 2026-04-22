import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    person1: Phaser.GameObjects.Sprite;
    person2: Phaser.GameObjects.Sprite;
    person3: Phaser.GameObjects.Sprite;
    person4: Phaser.GameObjects.Sprite;

    constructor() {
        super("Level1");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        // Make background fill the screen
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
        this.background = this.add.image(screenWidth / 2, screenHeight / 2, "background");
        this.background.displayWidth = screenWidth;
        this.background.displayHeight = screenHeight;
        this.background.setAlpha(0.5);

        this.fpsText = new FpsText(this);

        // Center person1 image, start small
        this.person1 = this.add.sprite(screenWidth / 2, (screenHeight / 2.75), "person1").setScale(0.2).setDepth(0);

        // Animate person1 to grow to normal size
        this.tweens.add({
            targets: this.person1,
            scale: 3,
            duration: 10000,
            ease: 'Back.Out',
        });
        //his.person2 = this.add.sprite(400, 200, "person2").setScale(2);
        //this.person3 = this.add.sprite(600, 200, "person3").setScale(2);
        //this.person4 = this.add.sprite(800, 200, "person4").setScale(2);


        // Add a rectangle that fills the bottom half of the screen

        // Desk rectangle
        const deskY = screenHeight * 0.75;
        const tempdesk = this.add.rectangle(
            screenWidth / 2,
            deskY, // center of bottom half
            screenWidth,
            screenHeight / 2,
            0xffffff
        ).setStrokeStyle(3, 0x000000).setDepth(0.5);

        // Add two buttons on the desk
        const buttonRadius = 40;
        const buttonY = deskY;
        const buttonSpacing = 120;
        // Red button (left)
        const redButton = this.add.circle(
            screenWidth / 2 - buttonSpacing,
            buttonY,
            buttonRadius,
            0xff0000
        ).setStrokeStyle(4, 0x880000).setDepth(1).setInteractive({ useHandCursor: true });
        // Green button (right)
        const greenButton = this.add.circle(
            screenWidth / 2 + buttonSpacing,
            buttonY,
            buttonRadius,
            0x00ff00
        ).setStrokeStyle(4, 0x006600).setDepth(1).setInteractive({ useHandCursor: true });


        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
