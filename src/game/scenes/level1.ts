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

        // Center person1 image
        this.person1 = this.add.sprite(screenWidth / 2, (screenHeight / 2.75), "person1").setScale(3).setDepth(0);
        //his.person2 = this.add.sprite(400, 200, "person2").setScale(2);
        //this.person3 = this.add.sprite(600, 200, "person3").setScale(2);
        //this.person4 = this.add.sprite(800, 200, "person4").setScale(2);


        // Add a rectangle that fills the bottom half of the screen
        const tempdesk = this.add.rectangle(
            screenWidth / 2,
            screenHeight * 0.75, // center of bottom half
            screenWidth,
            screenHeight / 2,
            0xffffff
        ).setStrokeStyle(3, 0x000000).setDepth(0.5);


        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
