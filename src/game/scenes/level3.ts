import { random3bugfix, random3Code } from "../objects/codes";
import { baseLevel } from "./baselevel";

export class Level3 extends baseLevel {
    constructor() {
        super(7,3,2,"Level3");
    }
    create(): void {
            super.create();
            this.notebook.setText(random3Code(this.people));

            let randomperson = this.people[Math.floor(Math.random() * this.people.length)];
        while (randomperson.impostor) {
            randomperson = this.people[Math.floor(Math.random() * this.people.length)]
        }
        let start = ((randomperson.idNumber + 9) / 2) - 4;

        this.giveNote.setText(`#include <stdio.h>

int main() {

    int x = ${start};
    int y;

    y = x + 4;
    x = y * 2;
    y = x - 9;

    printf("Final ID: %d\\n", y);

    return 0;
}`, randomperson.idNumber);

            ({problem: this.bugfixproblem, answer: this.bugfixanswer} = random3bugfix());

        }
        
}