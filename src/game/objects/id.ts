import Phaser from "phaser";

export default class id extends Phaser.GameObjects.Container {
    private rect: Phaser.GameObjects.Rectangle;
    private nameText: Phaser.GameObjects.Text;
    private codenameText: Phaser.GameObjects.Text;
    private idNumberText: Phaser.GameObjects.Text;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        name: string = "Name",
        codename: string = "Codename",
        idNumber: string = "ID#",
    ) {
        super(scene, x, y);

        // Rectangle background
        this.rect = scene.add
            .rectangle(0, 0, 200, 100, 0xffffff, 0.9)
            .setStrokeStyle(2, 0x000000)
            .setOrigin(0.5);

        // Text fields
        this.nameText = scene.add.text(-90, -35, `Name: ${name}`, {
            fontSize: "16px",
            color: "#000",
        });
        this.codenameText = scene.add.text(-90, -10, `Codename: ${codename}`, {
            fontSize: "16px",
            color: "#000",
        });
        this.idNumberText = scene.add.text(-90, 15, `ID: ${idNumber}`, {
            fontSize: "16px",
            color: "#000",
        });

        this.add([
            this.rect,
            this.nameText,
            this.codenameText,
            this.idNumberText,
        ]);
        scene.sys.add.existing(this);
    }

    setName(name: string) {
        this.nameText.setText(`Name: ${name}`);
        return this;
    }

    setCodename(codename: string) {
        this.codenameText.setText(`Codename: ${codename}`);
        return this;
    }

    setIdNumber(idNumber: string) {
        this.idNumberText.setText(`ID: ${idNumber}`);
        return this;
    }
}
