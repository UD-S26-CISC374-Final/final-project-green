export default class bugFix extends Phaser.GameObjects.Container {

    public codes: string;
    public correctLine: number;
    public overlay: Phaser.GameObjects.Rectangle

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        codes: string = "Hi its me broken code. \n\nand another line",
        correctLine: number = 1
    ) {
        super(scene, x, y);

        this.codes = codes;

        // line numbers start at 1
        this.correctLine = correctLine;

        this.overlay = this.scene.add
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
        
        scene.add.existing(this);
        this.setDepth(20)
        
        
        this.createCodePopup();
            
    }

    createCodePopup() {

    const codeLines = this.codes.split("\n");

    const paddingX = 10;
    const paddingY = 10;
    const lineSpacing = 15;
    const maxWidth = 700;

    // TEMP text for measuring
    const measureText = this.scene.add.text(
        0,
        0,
        this.codes,
        {
            fontSize: "15px",
            fontFamily: "monospace",
            wordWrap: { width: maxWidth - paddingX * 2 }
        }
    );

    const bounds = measureText.getBounds();

    measureText.destroy();

    // Dynamic sizing
    const boxWidth = Math.min(
        Math.max(bounds.width + paddingX * 2, 300),
        maxWidth
    );

    const boxHeight = Math.max(
        bounds.height + paddingY * 2,
        150
    );

    // Background
    const bg = this.scene.add.rectangle(
        0,
        0,
        boxWidth,
        boxHeight,
        0x1e1e1e
    )
    .setOrigin(0.5);

    this.add(bg);

    // Starting positions
    const startX = -boxWidth / 2 + paddingX;
    const startY = -boxHeight / 2 + paddingY;

    codeLines.forEach((line, index) => {

        const lineNumber = index + 1;

        const lineText = this.scene.add.text(
            startX,
            startY + index * lineSpacing,
            `${line}`,
            {
                fontSize: "15px",
                color: "#ffffff",
                fontFamily: "monospace",
                wordWrap: {
                    width: boxWidth - paddingX * 2
                }
            }
        )
        .setOrigin(0);

        lineText.setInteractive({ useHandCursor: true });

        lineText.on("pointerover", () => {

            lineText.setStyle({
                backgroundColor: "#444444"
            });
        });

        lineText.on("pointerout", () => {

            lineText.setStyle({
                backgroundColor: ""
            });
        });

        lineText.on("pointerdown", () => {

            console.log("Clicked line:", lineNumber);

            if (lineNumber === this.correctLine) {

                console.log("Correct!");

                (this.scene as Phaser.Scene & { score: number }).score += 1;

            } else {

                console.log("Wrong!");
            }

            this.scene.events.emit("bugFixed");

            this.overlay.destroy();

            this.destroy();
        });

        this.add(lineText);
    });
}
}