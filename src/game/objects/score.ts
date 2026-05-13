export let SCORE: number = 0;
export let MAX_SCORE: number = 0;
export let TOTAL_SCORE: number = 0;
export let TOTAL_MAX_SCORE: number = 0;
export let EMPLOYEES_SENT_TO_WORK: number = 0;
export let INCORRECTLY_KICKED_OUT: number = 0;
export let CORRECT_NOTE_GIVEN: boolean = false;
export let CODE_FIXED: boolean = false;
export let LEVEL_HAS_CODE_FIX: boolean = false;

export function resetScore() {
    SCORE = 0;
    MAX_SCORE = 0;
    EMPLOYEES_SENT_TO_WORK = 0;
    INCORRECTLY_KICKED_OUT = 0;
    CORRECT_NOTE_GIVEN = false;
    CODE_FIXED = false;
    LEVEL_HAS_CODE_FIX = false;
}
export function setEmployeesSentToWork(count: number) {
    EMPLOYEES_SENT_TO_WORK = count;
}

export function incrementEmployeesSentToWork() {
    EMPLOYEES_SENT_TO_WORK++;
}

export function setIncorrectlyKickedOut(count: number) {
    INCORRECTLY_KICKED_OUT = count;
}

export function incrementIncorrectlyKickedOut() {
    INCORRECTLY_KICKED_OUT++;
}

export function setCorrectNoteGiven(given: boolean) {
    CORRECT_NOTE_GIVEN = given;
}

export function setCodeFixed(fixed: boolean) {
    CODE_FIXED = fixed;
}
export function setLevelHasCodeFix(hasCodeFix: boolean) {
    LEVEL_HAS_CODE_FIX = hasCodeFix;
}
export function setScore(score: number) {
    SCORE += score;
    TOTAL_SCORE += score;
}
export function setMaxScore(score: number) {
    MAX_SCORE = score;
    TOTAL_MAX_SCORE += score;
}
