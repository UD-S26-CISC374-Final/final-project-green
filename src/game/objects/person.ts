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
    "Soldier76",
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
    constructor(scene: Phaser.Scene, x: number, y: number, impostor: boolean, boss: boolean = false) {
        const randomIndex = Math.floor(Math.random() * Spritelist.length);
        const texture = Spritelist[randomIndex];
        if (boss) {
            super(scene, x, y, "tempboss");
        } else {
            super(scene, x, y, texture);
        
            this.characterName =
                randomIndex < 6 ?
                    NamelistF[Math.floor(Math.random() * NamelistF.length)]
                :   NamelistM[Math.floor(Math.random() * NamelistM.length)];
            this.codename =
                CodenameList[Math.floor(Math.random() * CodenameList.length)];
            this.idNumber = Math.floor(Math.random() * 1000);
        
            this.impostor = impostor;
        }
        this.boss = boss;
        scene.add.existing(this);
    }
    setFakeCodenameFromPool(pool: person[]) {
        let fake: string;

        do {
            const random = pool[Math.floor(Math.random() * pool.length)];
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
