import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { setMaxScore, setScore } from "../objects/score";

import FpsText from "../objects/fps-text";
import person from "../objects/person";
import notebook from "../objects/notebook";
import giveNote from "../objects/giveNote";
import notepad from "../objects/notepad";
import id from "../objects/id";

export class Level1 extends Scene {
    moveSpeed: number = 5000;

    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    desk: Phaser.GameObjects.Image;
    fpsText: FpsText;
    guards: Phaser.GameObjects.Group;
    redButton: Phaser.GameObjects.Arc;
    greenButton: Phaser.GameObjects.Arc;
    person1: person;
    person2: person;
    person3: person;
    person4: person;
    people: person[];
    boss: person;
    currentPersonIndex: number = -1;
    notebook: notebook;
    notepad: notepad;
    score: number = 0;
    maxScore: number = 5;
    giveNote: giveNote;
    currentIDCard: id;
    skipButton: Phaser.GameObjects.Text;
    bossTimeCount: number = 0;
    bossChat: Phaser.GameObjects.Container;
    bossText: Phaser.GameObjects.Text;
    clickallowed: boolean = false;
    currentPerson: person;
    currentSequence: any;
    currentBossLine: number;
    bossTimer: Phaser.Time.TimerEvent;
    skipLocked: any;
    dialogueOverlay: any;
    constructor() {
        super("Level1");
    }

    create() {
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
            

        this.person1 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            false,
        ).setVisible(false).setDepth(0.51);
        this.person2 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            false,
        ).setVisible(false).setDepth(0.51);
        while (
            this.person2.characterName === this.person1.characterName ||
            this.person2.codename === this.person1.codename ||
            this.person2.idNumber === this.person1.idNumber
        ) {
            this.person2 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                false,
            ).setVisible(false).setDepth(0.51);
        }
        this.person3 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            true,
        ).setVisible(false).setDepth(0.51);
        while (
            this.person3.characterName === this.person1.characterName ||
            this.person3.characterName === this.person2.characterName ||
            this.person3.codename === this.person1.codename ||
            this.person3.codename === this.person2.codename ||
            this.person3.idNumber === this.person1.idNumber ||
            this.person3.idNumber === this.person2.idNumber
        ) {
            this.person3 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                true,
            ).setVisible(false).setDepth(0.51);
        }
        this.person4 = new person(
            this,
            screenWidth / 2,
            screenHeight / 2.75,
            false,
        ).setVisible(false).setDepth(0.51);
        while (
            this.person4.characterName === this.person1.characterName ||
            this.person4.characterName === this.person2.characterName ||
            this.person4.characterName === this.person3.characterName ||
            this.person4.codename === this.person1.codename ||
            this.person4.codename === this.person2.codename ||
            this.person4.codename === this.person3.codename ||
            this.person4.idNumber === this.person1.idNumber ||
            this.person4.idNumber === this.person2.idNumber ||
            this.person4.idNumber === this.person3.idNumber
        ) {
            this.person4 = new person(
                this,
                screenWidth / 2,
                screenHeight / 2.75,
                false,
            ).setVisible(false).setDepth(0.51);
        }
        this.people = [this.person1, this.person2, this.person3, this.person4];

        for (const tempperson of this.people) {
            if (tempperson.impostor) {
                tempperson.setFakeCodenameFromPool(this.people);
            }
        }
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
            `int main()     {\nchar *${this.person1.codename} = "${this.person3.characterName}";\n     char *${this.person2.codename} = "${this.person4.characterName}";\n     char *${this.person3.codename} = "${this.person1.characterName}";\n     char *${this.person4.codename} = "${this.person2.characterName}";\n     char *tmp;\n\n     tmp = ${this.person1.codename};\n     ${this.person1.codename} = ${this.person3.codename};\n     ${this.person3.codename} = ${this.person4.codename};\n     ${this.person4.codename} = ${this.person2.codename};\n     ${this.person2.codename} = tmp;\n     tmp = ${this.person4.codename};\n     ${this.person4.codename} = ${this.person3.codename};\n     ${this.person3.codename} = ${this.person1.codename};\n     ${this.person1.codename} = tmp;\n\n     printf("%s\\n", ${this.person1.codename});\n     printf("%s\\n", ${this.person2.codename});\n     printf("%s\\n", ${this.person3.codename});\n     printf("%s\\n", ${this.person4.codename});\n     return 0;\n}`,
            false,
        ).setDepth(1).setVisible(false);
        // Notebook handles its own interactivity
        const startNumber = (this.person4.idNumber - 5) / 2;
        this.giveNote = new giveNote(
            this,
            screenWidth / 1.25,
            screenHeight / 1.35,
            `int main() { \nint x = ${startNumber}; \nx = x + 2; \ny = x; \ny = y - 1; \nx = y * 2; \ny = x + 3; \nprintf("ID: %d", y); \nreturn 0; \n}`,
            this.person4.idNumber,
            false,
        ).setDepth(1).setVisible(false);

        this.notepad = new notepad(
                    this,
                    screenWidth / 5.2,
                    screenHeight / 1.35,
                    false,
                ).setDepth(1).setVisible(false);

        

        this.skipButton = this.add
            .text(screenWidth - 100, 20, "Skip", {
                fontSize: "24px",
                color: "#000000",
            })
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                console.log("Skip button clicked");
                this.changeScene();
            });

        // Desk rectangle
        const deskY = screenHeight * 0.75;

        // Add two buttons on the desk at the very end, with highest depth
        const buttonRadius = 40;
        const buttonY = deskY;
        const buttonSpacing = 120;
        // Red button (left)
        this.redButton = this.add
            .circle(
                screenWidth / 2 - buttonSpacing,
                buttonY,
                buttonRadius,
                0xff0000,
            )
            .setStrokeStyle(4, 0x880000)
            .setDepth(1)
            .setVisible(false)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                if(this.clickallowed){
                    console.log("Red button clicked");
                    this.personRejected();
                }
            });
        // Green button (right)
        this.greenButton = this.add
            .circle(
                screenWidth / 2 + buttonSpacing,
                buttonY,
                buttonRadius,
                0x00ff00,
            )
            .setStrokeStyle(4, 0x006600)
            .setDepth(1)
            .setVisible(false)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                if(this.clickallowed){
                    console.log("Green button clicked");
                    this.personAccepted();
                }
            });

        /*const tempBlob = this.add
            .text(
                50,
                50,
                "Ok so heres how the alpha version works\nThe person in front of you is supposedly one of your coworkers\nIt is your job to determine if they are telling the truth\nAs you can see they have given you their ID card\nIf you click the codes book on the left of the desk,\nit will show you a program\nIf the name on the ID card matches what the print\nstatement for the respective Codename\nat the end of the code would print,\nthe person is not an impostor\nIf the name does not match, they are an impostor\nFor impostors hit the red button and \ncoworkers hit the green button\nYou also have that note\nGive that note to the person with the ID number \nyou get from tracing the code in the note\nYeah thats it for now ok bye good luck",
                {
                    fontSize: "16px",
                    color: "#000000",
                },
            )
            .setDepth(1);
            */
        EventBus.emit("current-scene-ready", this);
        console.log("Person 1:", this.person1);
        console.log("Person 2:", this.person2);
        console.log("Person 3:", this.person3);
        console.log("Person 4:", this.person4);


        this.bossChat = this.add
        .container(this.cameras.main.width / 1.75, this.cameras.main.height / 5)
        .setDepth(1)
        .setVisible(false);
        const bossTextBackground = this.add
        .rectangle(0, 0, 400, 100, 0xffffff)
        .setStrokeStyle(3, 0x000000);
        this.bossText = this.add.text(-180, -40, "Hey! Welcome to your first day on the job!", {
            fontSize: "18px",
            color: "#000000",
            wordWrap: { width: 350 },
        });
        this.bossChat.add([bossTextBackground, this.bossText]);

        this.boss.setInteractive({ useHandCursor: true });
        this.boss.on("pointerdown", () => {
            this.bossChat.setVisible(!this.bossChat.visible);
        });
        this.events.once("closeIDCard", () => {
                console.log("closeIDCard event received, calling bossTime");
                this.bossTime();
            });
        
            this.events.once("closeNotebook", () => {
                console.log("closeNotebook event received, calling bossTime");
                this.bossTime();
            });
        
            this.events.once("closeNotepad", () => {
                console.log("closeNotepad event received, calling bossTime");
                this.bossTime();
            });
        
            this.events.once("closeGiveNote", () => {
                console.log("closeGiveNote event received, calling bossTime");
                this.bossTime();
            });

        this.bossTime();
    }

    update() {
    
    }

    changeScene() {
        setScore(this.score);
        setMaxScore(this.maxScore);
        this.scene.start("EndOfDay");
    }

    personAccepted() {
        this.input.enabled = false; // Disable input while moving offscreen
        this.currentIDCard.destroy(); // Remove ID card when person is accepted
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
        
        
            this.time.delayedCall(this.moveSpeed, () => {
                this.bossTime();
            });
    }

    personRejected() {
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
                
                    this.time.delayedCall(2000, () => {
                        this.bossTime();
                    });
                
            });
        });
    }
    nextPerson() {
        this.currentPersonIndex++;
        this.time.delayedCall(this.moveSpeed, () => {
            if (this.currentPersonIndex < this.people.length) {
                this.currentPerson = this.people[this.currentPersonIndex];
                this.currentPerson.setVisible(true);
                this.tweens.add({
                    targets: this.currentPerson,
                    scale: 3,
                    duration: this.moveSpeed,
                    ease: "Back.Out",
                });
                this.time.delayedCall(4000, () => {
                    this.createIDCard();
                    this.clickallowed = true; // Re-enable input for the next person
                    this.input.enabled = true;
                    if(this.bossTimeCount === 1) {
                        this.bossTime();
                    }
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
            !(this.currentPerson === this.person1),
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

    this.clickallowed = false;
    this.boss.setVisible(true);

    const sequences: Record<number, any> = {

        0: {
            moveIn: true,
            lines: [
                "Welcome to the company! I'm Steve, your boss.",
                "Don't worry, I'll be here to help you out through your first day. Just follow my instructions and you'll do great!",
                "Oh, and if you ever forget anything I tell you go ahead and give me a pat on the shoulder, I'll repeat it for you.",
                "Alright, let's get started with the first person."
            ],
            onComplete: () => {
                this.nextPerson();
            }
        },

        1: {
            lines: [
                "This is one of your coworkers, make sure to greet them so you're not an ass.",
                "There is their ID card, go ahead and click it so you can read it better."
            ],
            onComplete: () => {
                this.clickallowed = true;
            }
        },

        2: {
            lines: [
                "Awesome! Know we know who we're dealing with right now.",
                "In order to deduce whether or not they are who they say they are, we will have to trace today's code.",
                "Go ahead and click on today's code to take a peek at it."
            ],

            actions: {
                1: () => {
                    this.notebook.setVisible(true);
                }
            },

            onComplete: () => {
                this.clickallowed = true;
            }
        },

        3: {
            lines: [
                "Now we have to trace that code to see if his codename on his ID matches what would be printed by the respective print statement in the code.",
                "If you want to take notes at all, there is a notepad on the left you can click to jot down any thoughts you have.",
                "Why dont you try jotting down a little something in there to see how it works?"
            ],

            actions: {
                1: () => {
                    this.notepad.setVisible(true);
                }
            },

            onComplete: () => {
                this.clickallowed = true;
            }
        },

        4: {
            lines: [
                "Once you think you have figured out whether or not they are an impostor, go ahead and hit one of the two buttons on the desk.",
                "The green button means the ID and code match, so they are a coworker, and the red button means they don't, and are an impostor."
            ],

            actions: {
                1: () => {
                    this.greenButton.setVisible(true);
                    this.redButton.setVisible(true);

                    this.clickallowed = true;
                }
            },

            onComplete: () => {
                this.clickallowed = true;
            }
        },

        5: {
            lines: [
                "Nice job! You're a natural at this! Just keep doing what you're doing and you'll do great!",
                "*ring ring*",
                "Oh, sorry, I'm getting a call. Here, let me take this and you check in the next person."
            ],

            onComplete: () => {

                this.tweens.add({
                    x: this.cameras.main.width + 300,
                    targets: this.boss
                });

                this.nextPerson();
            }
        },

        6: {
            moveIn: true,

            lines: [
                "Hey, great job! Sorry about stepping out like that.",
                "But here, take this secret note that I had to go get.",
                "Typically I would give you this at the start of the day if I have one.",
                "The note has code on it that when traced will give you the ID number of one of the people you're checking in.",
                "You can give the note to the respective person by clicking on the note and then clicking the give note button."
            ],

            actions: {
                1: () => {
                    this.giveNote.setVisible(true);
                }
            },

            onComplete: () => {
                this.clickallowed = true;
            }
        },

        7: {
            lines: [
                "Alright, I think it's about time for the next person. Just go ahead and check them in like normal."
            ],

            onComplete: () => {
                this.nextPerson();
            }
        },

        8: {
            lines: [
                "Seems like you got the hang of this pretty well! You're doing a great job, keep it up!",
                "One more person to check in, then we can go home and play Overwatch... I mean uhhhhh... sleep..."
            ],

            onComplete: () => {
                this.nextPerson();
            }
        },

        9: {
            lines: [
                "Hey, great job today! You're a natural at this, I'm sure you'll be promoted in no time!",
                "Alright, go home and get some rest, I'll see you bright and early tomorrow. I hear Dan is bringing donuts!"
            ],

            onComplete: () => {

                this.tweens.add({
                    x: this.cameras.main.width + 300,
                    targets: this.boss,
                    duration: this.moveSpeed,
                });

                this.changeScene();
            }
        }
    };

    this.currentSequence = sequences[this.bossTimeCount];

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
