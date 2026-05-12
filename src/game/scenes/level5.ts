import { random5bugfix, random5Code } from "../objects/codes";
import { baseLevel } from "./baselevel";

export class Level5 extends baseLevel {
    randombugfixproblem2: string
    randombugfixanswer2: number
    constructor() {
        super(12,5,3,"Level5");
    }
    create(): void {
            super.create();
            this.notebook.setText(random5Code(this.people));

            let randomperson = this.people[Math.floor(Math.random() * this.people.length)];
        while (randomperson.impostor) {
            randomperson = this.people[Math.floor(Math.random() * this.people.length)]
        }
        let start = ((((randomperson.idNumber + 8) / 4) + 7) * 3) - 5;

        this.giveNote.setText(`#include <stdio.h>

int main() {
    int x = ${start};
    int y;
    int z;

    y = x + 5;
    z = y / 3;

    if (z % 2 == 0) {
        y = z - 7;
    } else {
        y = (z + 1) - 8;
    }

    x = y * 4;
    z = x - 8;

    printf("Starting Value: %d\\n", start);
    printf("Final ID: %d\\n", z);

    return 0;
}`, randomperson.idNumber);
        ({problem: this.bugfixproblem, answer: this.bugfixanswer} = random5bugfix());
        while(this.bugfixproblem === this.randombugfixproblem2) {
            ({problem: this.randombugfixproblem2, answer: this.randombugfixanswer2} = random5bugfix());
        }
        }
        
}