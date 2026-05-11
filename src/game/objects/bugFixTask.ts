export default class bugFix extends Phaser.GameObjects.Container {


    public codes: string;
    public correctLine: number;
    public kiernanchat: Phaser.GameObjects.Container;
    public overlay: Phaser.GameObjects.Rectangle

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        codes: string = "",
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
        this.createChatPopup();
        this.scene.time.delayedCall(5000, () => {
            this.createCodePopup();
            this.kiernanchat.destroy;
        });
    }

    createChatPopup() {
        this.kiernanchat = this.scene.add
        .container(this.scene.cameras.main.width / 1.75, this.scene.cameras.main.height / 5)
        .setDepth(1)
        .setVisible(false);
        const bossTextBackground = this.scene.add
        .rectangle(0, 0, 400, 100, 0xffffff)
        .setStrokeStyle(3, 0x000000);
        const kiernantext = this.scene.add.text(-180, -40, "Hey, would you be able to take a look at this code. It doesn't work, could you click the line that makes it break?", {
            fontSize: "18px",
            color: "#000000",
            wordWrap: { width: 350 },
        });
        this.kiernanchat.add([bossTextBackground, kiernantext]);
    }

    createCodePopup() {

        const codeLines = this.codes.split("\n");

        const bg = this.scene.add.rectangle(
            0,
            0,
            600,
            400,
            0x1e1e1e
        )
        .setOrigin(0);

        this.add(bg);

        codeLines.forEach((line, index) => {

            const lineNumber = index + 1;

            const lineText = this.scene.add.text(
                20,
                20 + index * 30,
                `${lineNumber}. ${line}`,
                {
                    fontSize: "20px",
                    color: "#ffffff",
                    fontFamily: "monospace"
                }
            );

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

                // correct answer
                if (lineNumber === this.correctLine) {

                    console.log("Correct!");

                    // add to scene score
                    (this.scene as any).score++;
                }

                else {

                    console.log("Wrong!");
                }
                
                this.destroy();
                
            });

            this.add(lineText);
        });
    }
}