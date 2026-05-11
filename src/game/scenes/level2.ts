import { baseLevel } from "./baselevel";
import { random2Code } from "../objects/codes";

export class Level2 extends baseLevel {
    constructor() {
        super(6,2,2,"Level2");
    }

    create(): void {
        super.create();
        this.notebook.setText(random2Code(this.people));
    }




}   
