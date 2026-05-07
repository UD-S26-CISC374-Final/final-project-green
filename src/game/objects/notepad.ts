export default class notepad extends Phaser.GameObjects.Container {
    public rect: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    private static LOCAL_STORAGE_KEY = "player_notepad_notes";
    private emitted: boolean;
    constructor(scene: Phaser.Scene, x: number, y: number, emitted: boolean = true) {
        super(scene, x, y);
        this.emitted = emitted;
        this.rect = this.scene.add
            .rectangle(0, 0, 75, 100, 0xffffff)
            .setStrokeStyle(2, 0x000000)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.openNotepad());
        this.text = this.scene.add
            .text(0, 0, "Notepad", {
                fontSize: "14px",
                color: "#000000",
            })
            .setOrigin(0.5, 0.5);

        this.add(this.rect);
        this.add(this.text);

        this.scene.add.existing(this);
        this.wipeNotes(); // Clear notes at the start of each game
    }

    openNotepad() {
        // Create overlay
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

        // Create HTML textarea overlay
        const textarea = document.createElement("textarea");
        textarea.id = "phaser-notepad-textarea";
        textarea.style.position = "fixed";
        textarea.style.left = "50%";
        textarea.style.top = "50%";
        textarea.style.transform = "translate(-50%, -50%)";
        textarea.style.width = "500px";
        textarea.style.height = "350px";
        textarea.style.zIndex = "2000";
        textarea.style.fontSize = "18px";
        textarea.style.padding = "16px";
        textarea.style.border = "2px solid #333";
        textarea.style.borderRadius = "8px";
        textarea.style.background = "#fff";
        textarea.style.color = "#222";
        textarea.style.resize = "vertical";
        textarea.style.boxShadow = "0 4px 32px rgba(0,0,0,0.25)";
        textarea.placeholder = "Type your notes here...";
        textarea.value = localStorage.getItem(notepad.LOCAL_STORAGE_KEY) || "";

        // Save on input
        textarea.addEventListener("input", () => {
            localStorage.setItem(notepad.LOCAL_STORAGE_KEY, textarea.value);
        });

        document.body.appendChild(textarea);

        // Close button (HTML)
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.style.position = "fixed";
        closeBtn.style.left = "50%";
        closeBtn.style.top = "calc(50% + 200px)";
        closeBtn.style.transform = "translate(-50%, 0)";
        closeBtn.style.zIndex = "2001";
        closeBtn.style.fontSize = "18px";
        closeBtn.style.padding = "8px 32px";
        closeBtn.style.border = "2px solid #333";
        closeBtn.style.borderRadius = "8px";
        closeBtn.style.background = "#eee";
        closeBtn.style.cursor = "pointer";

        closeBtn.onclick = () => {
            if (!this.emitted) {
                console.log("Emitting closeNotepad event");
                this.scene.events.emit('closeNotepad');
                this.emitted = true;
            }
            this.scene.children.remove(overlay);
            document.body.removeChild(textarea);
            document.body.removeChild(closeBtn);
        };
        document.body.appendChild(closeBtn);
    }

    wipeNotes() {
        localStorage.removeItem(notepad.LOCAL_STORAGE_KEY);
    }
}
