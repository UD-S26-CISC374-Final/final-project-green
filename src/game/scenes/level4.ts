import { random4Code } from "../objects/codes";
import { baseLevel } from "./baselevel";

export class Level4 extends baseLevel {
    constructor() {
        super(10,4,3,"Level4");
    }
    create(): void {
            super.create();
            this.notebook.setText(random4Code());
        }
}