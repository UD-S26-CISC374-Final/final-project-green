import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { setMaxScore, setScore } from "../objects/score";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";
import person from "../objects/person";
import notebook from "../objects/notebook";
import giveNote from "../objects/giveNote";
import notepad from "../objects/notepad";
import id from "../objects/id";
import bugFix from "../objects/bugFixTask";
import { random3bugfix } from "../objects/codes";

export class baseLevel extends Scene {
    moveSpeed: number = 5000;
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;
    numberOfTasks: number;
    numberOfPeople: number;
    numberOfImpostors: number;
    people: person[] = [];
    peopleOrder: person[] = [];
    currentPersonIndex: number = -1;
    notebook: notebook;
    notepad: notepad;
    score: number = 0;
    maxScore: number = 0;
    giveNote: giveNote;
    currentPerson: person;
    taskpersonnumbers: number[];
    currentIDCard: id;
    skipButton: Phaser.GameObjects.Text;
    guards: Phaser.GameObjects.Group;
    interactiveObjects: Phaser.GameObjects.GameObject[] = [];
    dialogueOverlay: any;
    bossTimeCount: number = 0;
    boss: person;
    currentBugFix: bugFix;
    currentSequence: any;
    currentBossLine: number;
    bossChat: any;
    bossText: any;
    bossTimer: Phaser.Time.TimerEvent;
    skipLocked: any;
    desk: Phaser.GameObjects.Image;
    clickallowed: boolean = false;
    bugFixTasks: any;
    currentBugIndex: any;
    constructor(numberOfPeople: number, numberOfImpostors: number, numberOfTasks: number, levelName: string) {
        super(levelName);
        this.numberOfPeople = numberOfPeople;
        this.numberOfImpostors = numberOfImpostors;
        this.numberOfTasks = numberOfTasks;
        this.people = [];
    }

    create() {

        let randomindexlist: number[] = []
        for(let i = 0; i < this.numberOfTasks-1; i++){
            let randomIndex = Math.floor(Math.random() * this.numberOfPeople);
                while(randomindexlist.includes(randomIndex)){
                    randomIndex = Math.floor(Math.random() * this.numberOfPeople)
                }
                randomindexlist.push(randomIndex);
        }

        this.maxScore = this.numberOfTasks + this.numberOfPeople; // Max score is total number of correct decisions possible
        // Explicitly enable input on the scene
        this.input.enabled = true;
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        // Make background fill the screen
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
        this.background = this.add.image(
            screenWidth / 2,
            screenHeight / 2,
            "backgroundnodesk",
        );
        this.background.displayWidth = screenWidth;
        this.background.displayHeight = screenHeight;
        this.background.setAlpha(1);

        this.desk = this.add.image(
                    screenWidth / 2,
                    screenHeight * 0.75,
                    "desk",
                ).setScale(0.75).setDepth(0.99);
        
        this.fpsText = new FpsText(this);
        
        this.boss = new person(this, screenWidth + 300, screenHeight / 2.75, false, true).setVisible(false).setDepth(0.51).setScale(0.5);   
        
        const impostornumbers: number[] = [];
        for (let i = 0; i < this.numberOfImpostors; i++) {
            const randomNum = Math.floor(Math.random() * this.numberOfPeople);
            if (!impostornumbers.includes(randomNum)) {
                impostornumbers.push(randomNum);
            }
        }
        for (let i = 0; i < this.numberOfPeople; i++) {
            const isImpostor = impostornumbers.includes(i);
            let newPerson = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                isImpostor
            ).setVisible(false).setDepth(0.51);
            while (this.people.some((person) => person.characterName === newPerson.characterName) ||
                   this.people.some((person) => person.codename === newPerson.codename) ||
                   this.people.some((person) => person.idNumber === newPerson.idNumber)) {
                const updatedPerson = new person(
                    this,
                    screenWidth / 2,
                    screenHeight / 2.75,
                    isImpostor
                ).setVisible(false).setDepth(0.51);
                newPerson.destroy();
                newPerson = updatedPerson;
            }
            this.people.push(newPerson);
            this.peopleOrder.push(newPerson);

            if (randomindexlist.includes(i)) {

        const kiernanPerson = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            false,
            false,
            true
        )
        .setVisible(false)
        .setDepth(0.51)
        .setScale(0.1);

        kiernanPerson.defaultscale = 1;
        this.peopleOrder.push(kiernanPerson);

        this.events.once("bugFixed", () => {
            this.tweens.add({
                targets: this.currentPerson,
                x: this.cameras.main.width + 200, // Move off-screen to the right
                y: this.currentPerson.y,
                duration: this.moveSpeed,
                ease: "Power2",
            });
                this.nextPerson();
            });
}       

        }

        for (const tempperson of this.people) {
            if (tempperson.impostor) {
                tempperson.setFakeCodenameFromPool(this.people);
            }
        }

        this.skipButton = this.add
            .text(screenWidth - 100, 20, "Skip", {
                fontSize: "24px",
                color: "#000000",
            })
            .setInteractive({ useHandCursor: true })
            .setDepth(10000000000000000000)
            .on("pointerdown", () => {
                console.log("Skip button clicked");
                this.changeScene();
            });

        this.guards = this.add.group();
        const guardPositions = [
            screenWidth * 0.175,
            screenWidth * 0.325,
            screenWidth * 0.65,
            screenWidth * 0.8
        ];
        for (let i = 0; i < 4; i++) {
            const guard = this.add.image(
                guardPositions[i],
                screenHeight / 3, // Near the top/back wall
                "bodyguard"
            ).setScale(0.5).setDepth(0.5);
            this.guards.add(guard);
        }

        this.notebook = new notebook(
            this,
            screenWidth / 4,
            screenHeight / 1.35,
            "",
        ).setDepth(1);
        // Notebook handles its own interactivity
        
        this.notepad = new notepad(
            this,
            screenWidth / 5.2,
            screenHeight / 1.35,
        ).setDepth(1);
        
        // Notepad handles its own interactivity

        this.giveNote = new giveNote(
            this,
            screenWidth / 1.25,
            screenHeight / 1.35,
            ``,
            0,
        ).setDepth(1)
        .setVisible(false);

        // Add a rectangle that fills the bottom half of the screen

        // Desk rectangle
        const deskY = screenHeight * 0.75;
        

        // Add two buttons on the desk at the very end, with highest depth
        const buttonRadius = 40;
        const buttonY = deskY;
        const buttonSpacing = 120;
        // Red button (left)
        const redButton = this.add
            .circle(
                screenWidth / 2 - buttonSpacing,
                buttonY,
                buttonRadius,
                0xff0000,
            )
            .setStrokeStyle(4, 0x880000)
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                console.log("Red button clicked");
                this.personRejected();
            });
        // Green button (right)
        const greenButton = this.add
            .circle(
                screenWidth / 2 + buttonSpacing,
                buttonY,
                buttonRadius,
                0x00ff00,
            )
            .setStrokeStyle(4, 0x006600)
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                console.log("Green button clicked");
                this.personAccepted();
            });

        this.bossChat = this.add
        .container(this.cameras.main.width / 1.75, this.cameras.main.height / 5)
        .setDepth(1)
        .setVisible(false);
        const bossTextBackground = this.add
        .rectangle(0, 0, 400, 100, 0xffffff)
        .setStrokeStyle(3, 0x000000);
        this.bossText = this.add.text(-180, -40, "", {
            fontSize: "18px",
            color: "#000000",
            wordWrap: { width: 350 },
        });
        this.bossChat.add([bossTextBackground, this.bossText]);

        this.boss.setInteractive({ useHandCursor: true });
        this.boss.on("pointerdown", () => {
            this.bossChat.setVisible(!this.bossChat.visible);
        });


        EventBus.emit("current-scene-ready", this);

        //fix errors with unused variables
        console.log(redButton, greenButton);

        this.bossTime()
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        setScore(this.score);
        setMaxScore(this.maxScore);
        this.scene.start("EndOfDay");
    }

    personAccepted() {
        if (this.clickallowed){
            this.input.enabled = false; // Disable input while moving offscreen
            this.currentIDCard.destroy();
            if (!this.currentPerson.impostor) {
                this.score++;
            }
            this.tweens.add({
                targets: this.currentPerson,
                x: this.cameras.main.width + 200, // Move off-screen to the right
                y: this.currentPerson.y,
                duration: this.moveSpeed,
                ease: "Power2",
            });
            this.nextPerson();
        }
        
    }

    personRejected() {
        if (this.clickallowed){
        // Wait 3 seconds before moving offscreen to the left
        this.currentIDCard.destroy(); // Remove ID card when person is rejected
        this.input.enabled = false; // Disable input while waiting
        if (this.currentPerson.impostor) {
            this.score++;
        }
        this.tweens.add({
            targets: [this.guards.getChildren()[1], this.guards.getChildren()[2]], // Middle guards react to rejections
            scale: 0.75,
            y: this.currentPerson.y + 20,
            duration: 1500,
        });
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: [this.currentPerson, this.guards.getChildren()[1], this.guards.getChildren()[2]], // Move person and middle guards off-screen
                x: -200, // Move offscreen to the left
                y: this.currentPerson.y,
                duration: this.moveSpeed,
            });
            this.time.delayedCall(this.moveSpeed+1000, () => {
                this.tweens.add({
                    targets: this.guards.getChildren()[2], // Move middle guards back to original position
                    scale: 0.5,
                    x: this.cameras.main.width * 0.65,
                    y: this.cameras.main.height / 3,
                    duration: this.moveSpeed,
                });
                this.tweens.add({
                    targets: this.guards.getChildren()[1],
                    scale: 0.5,
                    x: this.cameras.main.width * 0.325,
                    y: this.cameras.main.height / 3,
                    duration: this.moveSpeed,
                });
                this.nextPerson();
            });
        });
    }
    }
    nextPerson() {
        this.currentPersonIndex++;
        this.time.delayedCall(this.moveSpeed, () => {
            if (this.currentPersonIndex < this.peopleOrder.length) {
                this.currentPerson = this.peopleOrder[this.currentPersonIndex];
                this.currentPerson.setVisible(true);
                this.tweens.add({
                    targets: this.currentPerson,
                    scale: this.currentPerson.defaultscale,
                    duration: this.moveSpeed,
                    ease: "Back.Out",
                });
                console.log(this.currentPerson);
                console.log("is kiernan?", this.currentPerson.kiernan);
                this.time.delayedCall(4000, () => {
                    if (this.currentPerson.kiernan){
                        this.bossTime()
                    } else {
                        this.createIDCard();
                        this.clickallowed = true;
                    }
                    this.input.enabled = true;
                });
            } else {
                console.log("All people processed. Final score:", this.score);
                this.changeScene();
            }
        });
    }
    createIDCard() {
            this.currentIDCard = new id(
                this,
                this.currentPerson.x,
                this.currentPerson.y + 150,
                this.currentPerson.characterName,
                this.currentPerson.impostor ? this.currentPerson.fakeCodename : this.currentPerson.codename,
                this.currentPerson.idNumber.toString(),
            );
            this.currentIDCard.setDepth(1);
        }
    bossTime() {
        if (!this.dialogueOverlay) {

        this.dialogueOverlay = this.add
            .rectangle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                this.cameras.main.width,
                this.cameras.main.height,
                0x000000,
                0
            )
            .setDepth(100000000000)
            .setInteractive();

        this.dialogueOverlay.on("pointerdown", () => {
            this.skipBossDialogue();
            });
        }

        this.dialogueOverlay.setActive(true);
        this.dialogueOverlay.setVisible(true);
        this.input.enabled = true;
        console.log("Boss time called, bossTimeCount:", this.bossTimeCount);

        this.boss.setVisible(true);

        const sequences: Record<number, any> = {

            0: {
                moveIn: true,
                lines: [
                    "Hey welcome back!",
                    "I have another note for you today. Same as usual, give it to whoever's ID it traces to.",
                    "Good luck today!"
                ],
                onComplete: () => {
                    this.giveNote.visible = true;
                    this.tweens.add({
                        x: this.cameras.main.width + 300,
                        targets: this.boss
                    });
                    this.nextPerson();
                }
            },
            1: {
                lines: [
                    "Yo what's up buddy!",
                    "See I'm having this issue with my code and I got no clue what's going wrong.",
                    "Would you mind taking a peek at it and letting me know what the problem is?",
                    "Just go ahead and click on the line where the error occurrs."
                ],
                onComplete: () => {
                    const task = this.bugFixTasks[this.currentBugIndex];
                    this.currentBugFix = new bugFix(
                        this,
                        this.cameras.main.width / 2,
                        this.cameras.main.height / 2,
                        task.problem,
                        task.answer,
                        (correct: boolean) => {

                            if (correct) this.score++;
                            
                            this.currentBugIndex++;

                            this.tweens.add({
                                targets: this.currentPerson,
                                x: this.cameras.main.width + 200,
                                y: this.currentPerson.y,
                                duration: this.moveSpeed,
                                ease: "Power2",
                            });

                            this.nextPerson();
                        }
                    );
                }
            }
        };

        this.currentSequence =
        sequences[this.bossTimeCount > 0 ? 1 : 0];

        if (!this.currentSequence) return;

        this.currentBossLine = 0;

        const startDialogue = () => {

            this.bossChat.setVisible(true);

            this.showBossLine();

        };

        if (this.currentSequence.moveIn) {

            this.tweens.add({
                x: this.cameras.main.width / 1.33,
                targets: this.boss,
                duration: this.moveSpeed,
                onComplete: startDialogue
            });

        } else {

            startDialogue();
        }
    }

    showBossLine() {

    

        if (this.currentBossLine >= this.currentSequence.lines.length) {

            this.bossChat.setVisible(false);

            if (this.dialogueOverlay) {
                this.dialogueOverlay.setVisible(false);
                this.dialogueOverlay.setActive(false);
            }

            if (this.currentSequence.onComplete) {
                this.currentSequence.onComplete();
            }

            this.bossTimeCount++;

            return;
        }

        this.bossText.setText(
            this.currentSequence.lines[this.currentBossLine]
        );

        if (
            this.currentSequence.actions &&
            this.currentSequence.actions[this.currentBossLine]
        ) {
            this.currentSequence.actions[this.currentBossLine]();
        }

        const delay =
            this.currentSequence.delays?.[this.currentBossLine] || 5000;

        this.currentBossLine++;

        this.bossTimer = this.time.delayedCall(delay, () => {
            this.showBossLine();
        });
    }

        skipBossDialogue() {

        if (this.skipLocked) return;

        this.skipLocked = true;

        this.time.delayedCall(150, () => {
            this.skipLocked = false;
        });

        if (this.bossTimer && !this.bossTimer.hasDispatched) {

            this.bossTimer.remove(false);

            this.showBossLine();
        }
    }
    
}
