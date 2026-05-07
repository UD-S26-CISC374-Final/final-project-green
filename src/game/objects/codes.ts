import type person from "./person";

const level4code1 = "";

const level5code1 = "";



export function random2Code(people: person[]): string {
    const level2code1 = `int main() {\n    char *${people[0].codename} = "${people[3].characterName}";\n    char *${people[1].codename} = "${people[4].characterName}";\n    char *${people[2].codename} = "${people[5].characterName}";\n    char *${people[3].codename} = "${people[1].characterName}";\n    char *${people[4].codename} = "${people[0].characterName}";\n    char *${people[5].codename} = "${people[2].characterName}";\n\n    char **p1 = &${people[0].codename};\n    char **p2 = &${people[1].codename};\n    char **p3 = &${people[2].codename};\n    char **p4 = &${people[3].codename};\n    char **p5 = &${people[4].codename};\n    char **p6 = &${people[5].codename};\n    char *temp;\n    temp = *p1; *p1 = *p4; *p4 = temp;\n    temp = *p2; *p2 = *p5; *p5 = temp;\n    p3 = p6;\n    p6 = &${people[2].codename};\n    temp = *p3; *p3 = *p6; *p6 = temp;\n    temp = *p1; *p1 = *p2; *p2 = temp;\n\n    printf("${people[0].codename}: %s\\n", ${people[0].codename});\n    printf("${people[1].codename}: %s\\n", ${people[1].codename});\n    printf("${people[2].codename}: %s\\n", ${people[2].codename});\n    printf("${people[3].codename}: %s\\n", ${people[3].codename});\n    printf("${people[4].codename}: %s\\n", ${people[4].codename});\n    printf("${people[5].codename}: %s\\n", ${people[5].codename});\n\n    return 0;\n}`;
    const level2codes: string[] = [level2code1];
    const randomIndex = Math.floor(Math.random() * level2codes.length);
    return level2codes[randomIndex];
}
export function random3Code(people: person[]): string {
    const level3code1 = `int main() {\n    char *${people[0].codename} = "${people[5].characterName}";\n    char *${people[1].codename} = "${people[0].characterName}";\n    char *${people[2].codename} = "${people[2].characterName}";\n    char *${people[3].codename} = "${people[4].characterName}";\n    char *${people[4].codename} = "${people[6].characterName}";\n    char *${people[5].codename} = "${people[1].characterName}";\n    char *${people[6].codename} = "${people[3].characterName}";\n\n    char **p1 = &${people[0].codename};\n    char **p2 = &${people[1].codename};\n    char **p3 = &${people[2].codename};\n    char **p4 = &${people[3].codename};\n    char *temp;\n    temp = ${people[0].codename};\n    ${people[0].codename} = ${people[4].codename};\n    ${people[4].codename} = temp;\n    temp = *p2;\n    *p2 = ${people[5].codename};\n    ${people[5].codename} = temp;\n\n    printf("${people[1].codename}: %s\\n", ${people[1].codename});\n\n    p3 = &${people[6].codename};\n    temp = *p3;\n    *p3 = ${people[2].codename};\n    ${people[2].codename} = temp;\n    temp = ${people[3].codename};\n    ${people[3].codename} = ${people[1].codename};\n    ${people[1].codename} = temp;\n    p1 = &${people[4].codename};\n    temp = *p1;\n    *p1 = ${people[6].codename};\n    ${people[6].codename} = temp;\n\n    printf("${people[6].codename}: %s\\n", ${people[6].codename});\n\n    temp = ${people[0].codename};\n    ${people[0].codename} = ${people[5].codename};\n    ${people[5].codename} = temp;\n    temp = *p4;\n    *p4 = ${people[2].codename};\n    ${people[2].codename} = temp;\n\n    printf("${people[0].codename}: %s\\n", ${people[0].codename});\n    printf("${people[2].codename}: %s\\n", ${people[2].codename});\n    printf("${people[3].codename}: %s\\n", ${people[3].codename});\n    printf("${people[4].codename}: %s\\n", ${people[4].codename});\n    printf("${people[5].codename}: %s\\n", ${people[5].codename});\n\n    return 0;\n}\n`;
    const level3codes: string[] = [level3code1];
    const randomIndex = Math.floor(Math.random() * level3codes.length);
    return level3codes[randomIndex];
}
export function random4Code(): string {
    const level4codes: string[] = [level4code1];
    const randomIndex = Math.floor(Math.random() * level4codes.length);
    return level4codes[randomIndex];
}
export function random5Code(): string {
    const level5codes: string[] = [level5code1];
    const randomIndex = Math.floor(Math.random() * level5codes.length);
    return level5codes[randomIndex];
}