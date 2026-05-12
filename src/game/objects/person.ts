import Phaser from "phaser";

const NamelistM: string[] = [
    "Andrew",
    "Justin",
    "Chase",
    "Aiden",
    "Austin",
    "Carter",
    "Chris",
    "Matt",
    "James",
    "Jay",
];
const NamelistF: string[] = [
    "Samantha",
    "Joanna",
    "Ellayna",
    "Catie",
    "Eman",
    "Elissa",
    "Lauren",
    "Lily",
    "Kheira",
    "Macy",
    "Monica",
];
const CodenameList: string[] = [
    "Shadow",
    "Eagle",
    "Viper",
    "Falcon",
    "Wolf",
    "Panther",
    "Tiger",
    "Hawk",
    "Raven",
    "Cobra",
    "Phoenix",
    "Crow",
    "Sphinx",
    "Soldier",
    "Reaper",
    "Tracer",
];
const Spritelist: string[] = [
    "person1",
    "person2",
    "person3",
    "person4",
    "person5",
    "person6",
    "person7",
    "person8",
    "person9",
    "person10",
    "person11",
    "person12",
    "person13",
    "person14",
    "person15",
];

export default class person extends Phaser.GameObjects.Sprite {
    characterName: string;
    codename: string;
    idNumber: number;
    fakeCodename: string = "";
    impostor: boolean;
    boss: boolean;
    kiernan: boolean;
    defaultscale: number = 3;
    constructor(scene: Phaser.Scene, x: number, y: number, impostor: boolean, boss: boolean = false, kiernan = false) {
        const randomIndex = Math.floor(Math.random() * Spritelist.length);
        const texture = Spritelist[randomIndex];
        super(
            scene,
            x,
            y,
            boss ? "tempboss"
            : kiernan ? "miirnan"
            : texture
        );
        this.boss = boss;
        this.kiernan = kiernan;
        this.impostor = impostor;
        

        if (!boss && !kiernan) {

            this.characterName =
                randomIndex < 6
                    ? NamelistF[Math.floor(Math.random() * NamelistF.length)]
                    : NamelistM[Math.floor(Math.random() * NamelistM.length)];

            this.codename =
                CodenameList[Math.floor(Math.random() * CodenameList.length)];

            this.idNumber = Math.floor(Math.random() * 1000);
        }
        scene.add.existing(this);
    }
    setFakeCodenameFromPool(pool: person[]) {

        if (this.boss || this.kiernan) return;
        let fake: string;
        const goodpool = []
        for (let p of pool) {
            if (!p.kiernan) {
                goodpool.push(p);
            }
        }

        do {
            const random = goodpool[Math.floor(Math.random() * goodpool.length)];
            fake = random.codename;

        } while (fake === this.codename);

        this.fakeCodename = fake;
    }
    getIdCard() {
        return {
            name: this.characterName,
            codename: this.codename,
            idNumber: this.idNumber,
        };
    }
    getFakeIdCard() {
        return {
            name: this.characterName,
            codename: this.fakeCodename,
            idNumber: this.idNumber,
        };
    }
}
