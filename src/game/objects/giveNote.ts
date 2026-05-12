export default class giveNote extends Phaser.GameObjects.Container {
    public rect: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    private codes: string;
    private correctId: number;
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

        const popupWidth = 500;
        const popupHeight = 550;

        const notebookContent = this.scene.add
            .rectangle(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2,
                popupWidth,
                popupHeight,
                0xffffff,
            )
            .setStrokeStyle(3, 0x000000)
            .setDepth(11);
        const codesText = this.scene.add
            .text(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2 - 25,
                "Give This To The Following ID Number:\n\n" + this.codes,
                {
                    fontSize: "14px",
                    color: "#000000",
                    wordWrap: { width: popupWidth - 60 }
                },
            )
            .setOrigin(0.5, 0)
            .setDepth(13);

        const buttonY = this.scene.cameras.main.height / 2 + 200

        const giveButton = this.scene.add
            .text(
                this.scene.cameras.main.width / 2 - 100,
                buttonY,
                "Give Note",
                {
                    fontSize: "20px",
                    color: "#000000",
                    backgroundColor: "#2e8b57",
                    padding: {
                        left: 20,
                        right: 20,
                        top: 10,
                        bottom: 10
                    }
                },
            )
            .setOrigin(0.5)
            .setDepth(12)
            .setInteractive({ useHandCursor: true })

        const closeButton = this.scene.add
            .text(
                this.scene.cameras.main.width / 2 + 100,
                buttonY,
                "Close",
                {
                    fontSize: "20px",
                    color: "#000000",
                    backgroundColor: "#666666",
                    padding: {
                        left: 20,
                        right: 20,
                        top: 10,
                        bottom: 10
                    }
                },
            )
            .setOrigin(0.5)
            .setDepth(12)
            .setInteractive({ useHandCursor: true });
            
        giveButton.on("pointerover", () => {
            giveButton.setStyle({ backgroundColor: "#3cb371" });
        });

        giveButton.on("pointerout", () => {
            giveButton.setStyle({ backgroundColor: "#2e8b57" });
        });

        closeButton.on("pointerover", () => {
            closeButton.setStyle({ backgroundColor: "#888888" });
        });

        closeButton.on("pointerout", () => {
            closeButton.setStyle({ backgroundColor: "#666666" });
        });
            
            
        giveButton.on("pointerdown", () => {
            const sceneWithPerson = this.scene as Phaser.Scene & {
                currentPerson?: { idNumber: number };
            };
            if (
                sceneWithPerson.currentPerson &&
                sceneWithPerson.currentPerson.idNumber === this.correctId
            ) {
                (this.scene as Phaser.Scene & { score: number }).score += 1;
            }
            overlay.destroy();
            notebookContent.destroy();
            codesText.destroy();
            giveButton.destroy();
            closeButton.destroy(); 
            this.setVisible(false);
            });
        
        closeButton.on("pointerdown", () => {
            if (!this.emitted) {
                console.log("emitting closeGiveNote");
                this.scene.events.emit('closeGiveNote');
                this.emitted = true;
            }
            overlay.destroy();
            notebookContent.destroy();
            codesText.destroy();
            giveButton.destroy();
            closeButton.destroy();
                
            });
    }
    checkGive(idNumber: number) {
        return idNumber === this.correctId;
    }
}
