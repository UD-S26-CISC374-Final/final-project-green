import { baseLevel } from "./baselevel";
import { random2Code } from "../objects/codes";

export class Level2 extends baseLevel {
    constructor() {
        super(6,2,1,"Level2");
    }

    create(): void {
        super.create();
        this.notebook.setText(random2Code(this.people));
        let randomperson = this.people[Math.floor(Math.random() * this.people.length)];
        while (randomperson.impostor) {
            randomperson = this.people[Math.floor(Math.random() * this.people.length)]
        }
        const start = ((randomperson.idNumber - 13 + 1000) * 143) % 1000;

        this.giveNote.setText(`#include <stdio.h>

int main() {
    
    ID = (${start} * 7 + 13) % 1000;

    printf("Final ID: %d\\n", ID);

    return 0;
}`, randomperson.idNumber)

    }


}   
