import Phaser from "phaser";

const NamelistM: string[] = [
    "John",
    "Michael",
    "David",
    "James",
    "Robert",
    "William",
    "Austin",
    "Daniel",
    "Joseph",
    "Cory",
    "Andrew",
];
const NamelistF: string[] = [
    "Mary",
    "Jennifer",
    "Linda",
    "Elizabeth",
    "Barbara",
    "Susan",
    "Joanna",
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
    idNumber: integer;
    fakeCodename: string;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        const randomIndex = Math.floor(Math.random() * Spritelist.length);
        const texture = Spritelist[randomIndex];
        super(scene, x, y, texture);
        this.characterName =
            randomIndex < 6 ?
                NamelistF[Math.floor(Math.random() * NamelistF.length)]
            :   NamelistM[Math.floor(Math.random() * NamelistM.length)];
        this.codename = CodenameList[Math.floor(Math.random() * CodenameList.length)];
        this.idNumber = Math.floor(Math.random() * 1000);
        // Ensure fakeCodename is not the same as codename
        let fakeCodename = CodenameList[Math.floor(Math.random() * CodenameList.length)];
        while (fakeCodename === this.codename && CodenameList.length > 1) {
            fakeCodename = CodenameList[Math.floor(Math.random() * CodenameList.length)];
        }
        this.fakeCodename = fakeCodename;
        scene.add.existing(this);
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
