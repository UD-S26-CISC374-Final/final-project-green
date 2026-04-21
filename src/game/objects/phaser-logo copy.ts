import Phaser from "phaser";

export default class person1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "person1");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true)
            .setBounce(0.6)
            .setInteractive()
            .on("pointerdown", () => {
                this.setVelocityY(-400);
            });
    }
}
