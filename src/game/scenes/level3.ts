import { random3Code } from "../objects/codes";
import { baseLevel } from "./baselevel";

export class Level3 extends baseLevel {
    constructor() {
        super(7,3,2,"Level3");
    }
    create(): void {
            super.create();
            this.notebook.setText(random3Code());
        }
}