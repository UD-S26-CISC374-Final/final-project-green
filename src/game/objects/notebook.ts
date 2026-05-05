export default class notebook extends Phaser.GameObjects.Container {
    public rect: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    private codes: string;
    constructor(scene: Phaser.Scene, x: number, y: number, codes: string = "") {
        super(scene, x, y);
        this.codes = codes;
        this.rect = this.scene.add
            .rectangle(0, 0, 75, 100, 0xffffff)
            .setStrokeStyle(2, 0x000000)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.openNotebook());
        this.text = this.scene.add
            .text(0, 0, "Today's\nCodes", {
                fontSize: "14px",
                color: "#000000",
            })
            .setOrigin(0.5, 0.5);

        this.add(this.rect);
        this.add(this.text);

        this.scene.add.existing(this);
    }

    setText(codes: string) {
        this.codes = codes;
    }

    openNotebook() {
        const overlay = this.scene.add
            .rectangle(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2,
                this.scene.cameras.main.width,
                this.scene.cameras.main.height,
                0x000000,
                0.5,
            )
            .setDepth(10);
        const notebookContent = this.scene.add
            .rectangle(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2,
                300,
                400,
                0xffffff,
            )
            .setStrokeStyle(2, 0x000000)
            .setDepth(11);
        const codesText = this.scene.add
            .text(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2 - 25,
                "Today's Codes:\n" + this.codes,
                {
                    fontSize: "15px",
                    color: "#000000",
                },
            )
            .setOrigin(0.5, 0.5)
            .setDepth(13);
        const closeButton = this.scene.add
            .text(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2 + 150,
                "Close",
                {
                    fontSize: "20px",
                    color: "#000000",
                },
            )
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                this.scene.children.remove(overlay);
                this.scene.children.remove(notebookContent);
                this.scene.children.remove(closeButton);
                this.scene.children.remove(codesText);
            });
        closeButton.setOrigin(0.5, 0.5).setDepth(12);
    }
}
