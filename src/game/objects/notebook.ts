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
        const maxContentHeight = Math.floor(this.scene.cameras.main.height * 0.75);
        const maxContentWidth = 550;
        const padding = 40;
        const padding_x = 20;
        let currentPage = 0;
        const pages: string[] = [];

        // Split codes into lines
        const codeLines = this.codes.split('\n');
        
        // Create a temporary text to measure line height and width
        const tempText = this.scene.add
            .text(0, 0, "Test", {
                fontSize: "15px",
                color: "#000000",
                wordWrap: { width: maxContentWidth - padding_x * 2 }
            });
        const lineHeight = tempText.height;
        this.scene.children.remove(tempText);

        // Calculate lines per page
        const linesPerPage = Math.floor((maxContentHeight - padding) / lineHeight);
        
        // Split code into pages
        for (let i = 0; i < codeLines.length; i += linesPerPage) {
            pages.push(codeLines.slice(i, i + linesPerPage).join('\n'));
        }

        // Measure first page to determine appropriate width
        const measureText = this.scene.add
            .text(0, 0, "Today's Codes:\n" + pages[0], {
                fontSize: "15px",
                color: "#000000",
                wordWrap: { width: maxContentWidth - padding_x * 2 }
            });
        const textBounds = measureText.getBounds();
        this.scene.children.remove(measureText);

        const contentWidth = Math.min(Math.max(textBounds.width + padding_x * 2, 200), maxContentWidth);
        const contentHeight = pages.length > 1 ? maxContentHeight : Math.min(textBounds.height + padding, maxContentHeight);

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
            .setDepth(10);

        const notebookContent = this.scene.add
            .rectangle(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2,
                contentWidth,
                contentHeight,
                0xffffff,
            )
            .setStrokeStyle(2, 0x000000)
            .setDepth(11);

        const codesText = this.scene.add
            .text(
                this.scene.cameras.main.width / 2,
                this.scene.cameras.main.height / 2 - contentHeight / 2 + padding / 2,
                "Today's Codes:\n" + pages[0],
                {
                    fontSize: "15px",
                    color: "#000000",
                    wordWrap: { width: contentWidth - padding_x * 2 }
                },
            )
            .setOrigin(0.5, 0)
            .setDepth(13);

        const pageIndicator = document.createElement("div");
        pageIndicator.style.position = "fixed";
        pageIndicator.style.left = "50%";
        pageIndicator.style.top = (this.scene.cameras.main.height / 2 + contentHeight / 2 - 20) + "px";
        pageIndicator.style.transform = "translate(-50%, 0)";
        pageIndicator.style.zIndex = "2001";
        pageIndicator.style.fontSize = "14px";
        pageIndicator.style.color = "#333";
        pageIndicator.textContent = pages.length > 1 ? `Page ${currentPage + 1} of ${pages.length}` : "";

        const buttonContainer = document.createElement("div");
        buttonContainer.style.position = "fixed";
        buttonContainer.style.left = "50%";
        buttonContainer.style.top = (this.scene.cameras.main.height / 2 + contentHeight / 2 + 20) + "px";
        buttonContainer.style.transform = "translate(-50%, 0)";
        buttonContainer.style.zIndex = "2001";
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "10px";
        buttonContainer.style.justifyContent = "center";

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "< Previous";
        prevBtn.style.fontSize = "14px";
        prevBtn.style.padding = "6px 16px";
        prevBtn.style.border = "2px solid #333";
        prevBtn.style.borderRadius = "4px";
        prevBtn.style.background = "#eee";
        prevBtn.style.cursor = "pointer";
        prevBtn.disabled = currentPage === 0;
        prevBtn.style.opacity = currentPage === 0 ? "0.5" : "1";
        prevBtn.style.display = pages.length > 1 ? "block" : "none";

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next >";
        nextBtn.style.fontSize = "14px";
        nextBtn.style.padding = "6px 16px";
        nextBtn.style.border = "2px solid #333";
        nextBtn.style.borderRadius = "4px";
        nextBtn.style.background = "#eee";
        nextBtn.style.cursor = "pointer";
        nextBtn.disabled = currentPage === pages.length - 1;
        nextBtn.style.opacity = currentPage === pages.length - 1 ? "0.5" : "1";
        nextBtn.style.display = pages.length > 1 ? "block" : "none";

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.style.fontSize = "14px";
        closeBtn.style.padding = "6px 16px";
        closeBtn.style.border = "2px solid #333";
        closeBtn.style.borderRadius = "4px";
        closeBtn.style.background = "#eee";
        closeBtn.style.cursor = "pointer";

        prevBtn.onclick = () => {
            if (currentPage > 0) {
                currentPage--;
                codesText.setText("Today's Codes:\n" + pages[currentPage]);
                pageIndicator.textContent = `Page ${currentPage + 1} of ${pages.length}`;
                prevBtn.disabled = currentPage === 0;
                prevBtn.style.opacity = currentPage === 0 ? "0.5" : "1";
                nextBtn.disabled = currentPage === pages.length - 1;
                nextBtn.style.opacity = currentPage === pages.length - 1 ? "0.5" : "1";
            }
        };

        nextBtn.onclick = () => {
            if (currentPage < pages.length - 1) {
                currentPage++;
                codesText.setText("Today's Codes:\n" + pages[currentPage]);
                pageIndicator.textContent = `Page ${currentPage + 1} of ${pages.length}`;
                prevBtn.disabled = currentPage === 0;
                prevBtn.style.opacity = currentPage === 0 ? "0.5" : "1";
                nextBtn.disabled = currentPage === pages.length - 1;
                nextBtn.style.opacity = currentPage === pages.length - 1 ? "0.5" : "1";
            }
        };

        closeBtn.onclick = () => {
            this.scene.children.remove(overlay);
            this.scene.children.remove(notebookContent);
            this.scene.children.remove(codesText);
            document.body.removeChild(pageIndicator);
            document.body.removeChild(buttonContainer);
        };

        buttonContainer.appendChild(prevBtn);
        buttonContainer.appendChild(nextBtn);
        buttonContainer.appendChild(closeBtn);
        document.body.appendChild(pageIndicator);
        document.body.appendChild(buttonContainer);
    }
}
