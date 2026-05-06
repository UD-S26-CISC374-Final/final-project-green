import { random5Code } from "../objects/codes";
import { baseLevel } from "./baselevel";

export class Level5 extends baseLevel {
    constructor() {
        super(12,5,4,"Level5");
    }
    create(): void {
            super.create();
            this.notebook.setText(random5Code());
        }
}