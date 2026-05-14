console.log("score.ts module loaded");
export type ScoreState = {
    SCORE: number;
    MAX_SCORE: number;
    TOTAL_SCORE: number;
    TOTAL_MAX_SCORE: number;
    EMPLOYEES_SENT_TO_WORK: number;
    INCORRECTLY_KICKED_OUT: number;
    CORRECT_NOTE_GIVEN: boolean;
    CODE_FIXED: boolean;
    LEVEL_HAS_CODE_FIX: boolean;
};

export const scoreState: ScoreState = {
    SCORE: 0,
    MAX_SCORE: 0,
    TOTAL_SCORE: 0,
    TOTAL_MAX_SCORE: 0,
    EMPLOYEES_SENT_TO_WORK: 0,
    INCORRECTLY_KICKED_OUT: 0,
    CORRECT_NOTE_GIVEN: false,
    CODE_FIXED: false,
    LEVEL_HAS_CODE_FIX: false,
};

export function resetScore() {
    scoreState.SCORE = 0;
    scoreState.MAX_SCORE = 0;
    scoreState.EMPLOYEES_SENT_TO_WORK = 0;
    scoreState.INCORRECTLY_KICKED_OUT = 0;
    scoreState.CORRECT_NOTE_GIVEN = false;
    scoreState.CODE_FIXED = false;
    scoreState.LEVEL_HAS_CODE_FIX = false;
    console.trace("resetScore called");
}
export function setEmployeesSentToWork(count: number) {
    scoreState.EMPLOYEES_SENT_TO_WORK = count;
}

export function incrementEmployeesSentToWork() {
    scoreState.EMPLOYEES_SENT_TO_WORK++;
    console.log(
        "incrementEmployeesSentToWork called, new value:",
        scoreState.EMPLOYEES_SENT_TO_WORK,
    );
}

export function setIncorrectlyKickedOut(count: number) {
    scoreState.INCORRECTLY_KICKED_OUT = count;
}

export function incrementIncorrectlyKickedOut() {
    scoreState.INCORRECTLY_KICKED_OUT++;
    console.log(
        "incrementIncorrectlyKickedOut called, new value:",
        scoreState.INCORRECTLY_KICKED_OUT,
    );
}

export function setCorrectNoteGiven(given: boolean) {
    scoreState.CORRECT_NOTE_GIVEN = given;
    console.log("setCorrectNoteGiven called with:", given);
}

export function setCodeFixed(fixed: boolean) {
    scoreState.CODE_FIXED = fixed;
    console.log("setCodeFixed called with:", fixed);
}
export function setLevelHasCodeFix(hasCodeFix: boolean) {
    scoreState.LEVEL_HAS_CODE_FIX = hasCodeFix;
    console.log("setLevelHasCodeFix called with:", hasCodeFix);
}
export function setScore(score: number) {
    scoreState.SCORE += score;
    scoreState.TOTAL_SCORE += score;
}
export function setMaxScore(score: number) {
    scoreState.MAX_SCORE = score;
    scoreState.TOTAL_MAX_SCORE += score;
}
