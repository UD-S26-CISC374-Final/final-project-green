export default class giveNote extends Phaser.GameObjects.Container {
    public rect: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    private codes: string;
    private correctId: number;
    private giveButton: Phaser.GameObjects.Text;
    private emitted: boolean;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        codes: string = "",
        correctId: number,
        emitted: boolean = true,
    ) {
        super(scene, x, y);
        this.codes = codes;
        this.emitted = emitted;
        this.correctId = correctId;
        this.rect = this.scene.add
            .rectangle(0, 0, 50, 50, 0xffffff)
            .setStrokeStyle(2, 0x000000)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.openNotebook());
        this.text = this.scene.add
            .text(0, 0, "Note", {
                fontSize: "14px",
                color: "#000000",
            })
            .setOrigin(0.5, 0.5);

        this.add(this.rect);
        this.add(this.text);

        this.scene.add.existing(this);
    }

    setText(codes: string, correctId: number) {
        this.codes = codes;
        this.correctId = correctId;
    }

    openNotebook() {
        // eslint-disable-next-line prefer-const
        let closeButton: Phaser.GameObjects.Text;

        const overlay = this.scene.add
            .rectangle(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2,
                this.scene.cameras.main.width,
                this.scene.cameras.main.height,
                0x000000,
                0.5,
            )
            .setInteractive()
            .setDepth(10)
            .on("pointerdown", () => {
                // Swallow clicks while the popup is open
            });
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
                "Give This To The Following ID Number:\n\n" + this.codes,
                {
                    fontSize: "12px",
                    color: "#000000",
                },
            )
            .setOrigin(0.5, 0.5)
            .setDepth(13);
        const giveButton = this.scene.add
            .text(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2 + 100,
                "Give Note",
                {
                    fontSize: "20px",
                    color: "#000000",
                },
            )
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                const sceneWithPerson = this.scene as Phaser.Scene & {
                    currentPerson?: { idNumber: number };
                };
                if (
                    sceneWithPerson.currentPerson &&
                    sceneWithPerson.currentPerson.idNumber === this.correctId
                ) {
                    (this.scene as Phaser.Scene & { score: number }).score += 1;
                }
                this.scene.children.remove(overlay);
                this.scene.children.remove(notebookContent);
                this.scene.children.remove(closeButton);
                this.scene.children.remove(codesText);
                this.scene.children.remove(this.giveButton);
                this.setVisible(false);
            });
        giveButton.setOrigin(0.5, 0.5).setDepth(12);
        closeButton = this.scene.add
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
                if (!this.emitted) {
                    console.log("emitting closeGiveNote");
                    this.scene.events.emit('closeGiveNote');
                    this.emitted = true;
                }
                this.scene.children.remove(overlay);
                this.scene.children.remove(notebookContent);
                this.scene.children.remove(closeButton);
                this.scene.children.remove(codesText);
                this.scene.children.remove(giveButton);
                
            });
        closeButton.setOrigin(0.5, 0.5).setDepth(12);
    }
    checkGive(idNumber: number) {
        return idNumber === this.correctId;
    }
}
