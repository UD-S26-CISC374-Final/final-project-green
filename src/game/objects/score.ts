export let SCORE: number = 0;
export let MAX_SCORE: number = 0;
export let TOTAL_SCORE: number = 0;
export let TOTAL_MAX_SCORE: number = 0;

export function resetScore() {
    SCORE = 0;
    MAX_SCORE = 0;
}
export function setScore(score: number) {
    SCORE += score;
    TOTAL_SCORE += score;
}
export function setMaxScore(score: number) {
    MAX_SCORE = score;
    TOTAL_MAX_SCORE += score;
}

