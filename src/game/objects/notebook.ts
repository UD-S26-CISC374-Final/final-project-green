import phaser from "phaser";

export default class notebook extends Phaser.GameObjects.Container {
    private rect: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.rect = this.scene.add
            .rectangle(0, 0, 150, 200, 0xffffff)
            .setStrokeStyle(2, 0x000000)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.openNotebook());
        this.text = this.scene.add.text(0, 0, "Today's Codes", {
            fontSize: "16px",
            color: "#000000",
        });
        this.add(this.rect);
        this.add(this.text);
        this.text.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
    }

    openNotebook() {
        this.scene.tweens.add({
            targets: this,
            y: this.scene.cameras.main.height - 150, // Move to bottom of the screen
            duration: 500,
            ease: "Power2",
        });
    }
}
