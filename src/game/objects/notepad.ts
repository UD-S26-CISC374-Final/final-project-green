export default class notepad extends Phaser.GameObjects.Container {
    public icon: Phaser.GameObjects.Image;
    private static LOCAL_STORAGE_KEY = "player_notepad_notes";
    private emitted: boolean;
    private overlay: Phaser.GameObjects.Rectangle;
    private textarea: HTMLTextAreaElement;
    private closeBtn?: HTMLButtonElement;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        emitted: boolean = true,
    ) {
        super(scene, x, y);
        this.emitted = emitted;
        this.icon = this.scene.add
            .image(0, 0, "notebook-button")
            .setOrigin(0.5)
            .setScale(0.45)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.openNotepad());

        this.add(this.icon);

        this.scene.add.existing(this);
        this.wipeNotes(); // Clear notes at the start of each game
    }

    openNotepad(x?: number, y?: number, makeOverlay: boolean = true) {
        const posX = x ?? this.scene.cameras.main.width / 2;
        const posY = y ?? this.scene.cameras.main.height / 2;

        // Create overlay
        if (makeOverlay) {
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
        }

        // Create HTML textarea overlay
        this.textarea = document.createElement("textarea");
        this.textarea.id = "phaser-notepad-textarea";
        this.textarea.style.position = "fixed";
        this.textarea.style.left = `${posX}px`;
        this.textarea.style.top = `${posY}px`;
        this.textarea.style.transform = "translate(-50%, -50%)";
        this.textarea.style.width = "500px";
        this.textarea.style.height = "350px";
        this.textarea.style.zIndex = "2000";
        this.textarea.style.fontSize = "18px";
        this.textarea.style.padding = "16px";
        this.textarea.style.border = "2px solid #333";
        this.textarea.style.borderRadius = "8px";
        this.textarea.style.background = "#fff";
        this.textarea.style.color = "#222";
        this.textarea.style.resize = "vertical";
        this.textarea.style.boxShadow = "0 4px 32px rgba(0,0,0,0.25)";
        this.textarea.placeholder = "Type your notes here...";
        this.textarea.value = localStorage.getItem(notepad.LOCAL_STORAGE_KEY) || "";

        // Save on input
        this.textarea.addEventListener("input", () => {
            localStorage.setItem(notepad.LOCAL_STORAGE_KEY, this.textarea.value);
        });

        document.body.appendChild(this.textarea);

        // Close button (HTML)
        if (makeOverlay) {
        this.closeBtn = document.createElement("button");
        this.closeBtn.textContent = "Close";
        this.closeBtn.style.position = "fixed";
        this.closeBtn.style.left = `${posX}px`;
        this.closeBtn.style.top = `${posY + 200}px`;
        this.closeBtn.style.transform = "translate(-50%, 0)";
        this.closeBtn.style.zIndex = "2001";
        this.closeBtn.style.fontSize = "18px";
        this.closeBtn.style.padding = "8px 32px";
        this.closeBtn.style.border = "2px solid #333";
        this.closeBtn.style.borderRadius = "8px";
        this.closeBtn.style.background = "#eee";
        this.closeBtn.style.cursor = "pointer";

        this.closeBtn.onclick = () => {
            if (!this.emitted) {
                console.log("Emitting closeNotepad event");
                this.scene.events.emit("closeNotepad");
                this.emitted = true;
            }
            this.closeNotes();
            console.log("from notepad")
        };
        document.body.appendChild(this.closeBtn);
    }
    }
    closeNotes() {
        this.overlay.destroy();
        if (document.body.contains(this.textarea)) {
            this.textarea.remove();
        }

        if (this.closeBtn && document.body.contains(this.closeBtn)) {
            this.closeBtn.remove();
        }
        console.log("notes closed")
    }

    wipeNotes() {
        localStorage.removeItem(notepad.LOCAL_STORAGE_KEY);
    }
}
