import { random4bugfix, random4Code } from "../objects/codes";
import { baseLevel } from "./baselevel";

export class Level4 extends baseLevel {
    constructor() {
        super(10,4,2,"Level4");
    }
    create(): void {
            super.create();
            this.notebook.setText(random4Code(this.people));

            let randomperson = this.people[Math.floor(Math.random() * this.people.length)];
        while (randomperson.impostor) {
            randomperson = this.people[Math.floor(Math.random() * this.people.length)]
        }
        let start  = (((randomperson.idNumber + 6) / 3) - 5) * 2;

        this.giveNote.setText(`#include <stdio.h>

int main() {

    int x = ${start};
    int y;
    int z;

    y = x / 2;
    z = y + 5;

    if (z % 2 == 0) {
        z = z * 3;
    } else {
        z = (z + 1) * 3 - 3;
    }

    x = z - 6;

    printf("Final ID: %d\\n", x);

    return 0;
}`, randomperson.idNumber);

    this.bugFixTasks.push(random4bugfix());
        }
}