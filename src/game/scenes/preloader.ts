import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, "background");

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");

        this.load.image("logo", "logo.png");
        this.load.image("star", "star.png");
        this.load.image("todays-summary", "Todays_Summary.jpg");
        this.load.image("phaser-logo", "phaser-logo.png");
        this.load.image("background", "background.png");
        this.load.image("main-menu-bg", "Main_menu.png");
        this.load.image("credits_lvlselect_bg", "Credit_lvlselect_bg.jpg");
        this.load.image("login-icon", "Login_icon.png");
        this.load.image("notepad-button", "Todays_Code_Icon.png");
        this.load.image("notebook-button", "Notebook.png");
        this.load.image("red-button", "Red_button.png");
        this.load.image("green-button", "Green_Button.png");
        this.load.image("backgroundnodesk", "Backgrounds without desk.png");
        this.load.image("desk+background", "Desk+Background.png");
        this.load.image("desk", "Desk.png");
        this.load.image("tempboss", "tempboss.png");
        this.load.image("bodyguard", "Bodyguard.png");
        this.load.image("id-card", "ID Card.png");
        this.load.image("miirnan", "miirnan.png");
        this.load.image("person1", "Townfolk-Adult-F-001.png");
        this.load.image("person2", "Townfolk-Adult-F-002.png");
        this.load.image("person3", "Townfolk-Adult-F-003.png");
        this.load.image("person4", "Townfolk-Adult-F-004.png");
        this.load.image("person5", "Townfolk-Adult-F-005.png");
        this.load.image("person6", "Townfolk-Adult-F-006.png");
        this.load.image("person7", "Townfolk-Adult-M-001.png");
        this.load.image("person8", "Townfolk-Adult-M-002.png");
        this.load.image("person9", "Townfolk-Adult-M-003.png");
        this.load.image("person10", "Townfolk-Adult-M-004.png");
        this.load.image("person11", "Townfolk-Adult-M-005.png");
        this.load.image("person12", "Townfolk-Adult-M-006.png");
        this.load.image("person13", "Townfolk-Adult-M-007.png");
        this.load.image("person14", "Townfolk-Adult-M-008.png");
        this.load.image("person15", "Townfolk-Adult-M-009.png");
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("MainMenu");
    }
}
