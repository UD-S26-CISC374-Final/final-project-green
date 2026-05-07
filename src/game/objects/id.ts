import Phaser from "phaser";

export default class id extends Phaser.GameObjects.Container {
    private cardBg: Phaser.GameObjects.Image;
    private nameText: Phaser.GameObjects.Text;
    private codenameText: Phaser.GameObjects.Text;
    private idNumberText: Phaser.GameObjects.Text;
    private emitted: boolean;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        name: string = "Name",
        codename: string = "Codename",
        idNumber: string = "ID#",
        emitted: boolean = true,
    ) {
        super(scene, x, y);
        this.emitted = emitted;
        // ID card background image
        this.cardBg = scene.add
            .image(0, 0, "id-card")
            .setOrigin(0.5)
            .setDisplaySize(180, 110);

        // Text fields positioned to align with image fields
        this.nameText = scene.add.text(10, -15, name, {
            fontSize: "12px",
            color: "#000",
        });
        this.codenameText = scene.add.text(20, -5, codename, {
            fontSize: "12px",
            color: "#000",
        });
        this.idNumberText = scene.add.text(-50, 15, idNumber, {
            fontSize: "12px",
            color: "#000",
        });

        this.add([
            this.cardBg,
            this.nameText,
            this.codenameText,
            this.idNumberText,
        ]);
        scene.sys.add.existing(this);

        // Make the card clickable to show enlarged version
        this.cardBg.setInteractive({ useHandCursor: true });
        this.cardBg.on('pointerdown', () => {
            this.openIDCard();
        });
    }

    setName(name: string) {
        this.nameText.setText(name);
        return this;
    }

    setCodename(codename: string) {
        this.codenameText.setText(codename);
        return this;
    }

    setIdNumber(idNumber: string) {
        this.idNumberText.setText(idNumber);
        return this;
    }

    openIDCard() {
        const overlay = this.scene.add.container(
            this.scene.cameras.main.width / 2,
            this.scene.cameras.main.height / 2
        ).setDepth(1000);
        
        // Semi-transparent background
        const bg = this.scene.add.rectangle(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height, 0x000000, 0.7);
        bg.setInteractive();
        bg.on('pointerdown', () => {
            if (!this.emitted) {
                console.log("Emitting closeIDCard event");
                this.scene.events.emit('closeIDCard');
                this.emitted = true;
            }
            overlay.destroy();
        });
        
        // Enlarged ID card
        const largeCard = this.scene.add.image(0, 0, "id-card").setDisplaySize(360, 220);
        
        // Enlarged text
        const largeName = this.scene.add.text(20, -30, this.nameText.text, {
            fontSize: "24px",
            color: "#000",
        });
        const largeCodename = this.scene.add.text(40, -10, this.codenameText.text, {
            fontSize: "24px",
            color: "#000",
        });
        const largeId = this.scene.add.text(-100, 30, this.idNumberText.text, {
            fontSize: "24px",
            color: "#000",
        });
        
        overlay.add([bg, largeCard, largeName, largeCodename, largeId]);
    }
}
