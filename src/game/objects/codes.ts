import type person from "./person";

const level2code1 = `int main() {\n    char *people[0] = \"Apple\";\n    char *people[1] = \"Banana\";\n    char *people[2] = \"Cherry\";\n    char *people[3] = \"Date\";\n    char *people[4] = \"Elderberry\";\n    char *people[5] = \"Fig\";\n\n    char **p1 = &people[0];\n    char **p2 = &people[1];\n    char **p3 = &people[2];\n    char **p4 = &people[3];\n    char **p5 = &people[4];\n    char **p6 = &people[5];\n\n    char *temp;\n\n    temp = *p1; *p1 = *p4; *p4 = temp;\n    temp = *p2; *p2 = *p5; *p5 = temp;\n\n    p3 = p6;\n    p6 = &people[2];\n\n    temp = *p3; *p3 = *p6; *p6 = temp;\n\n    temp = *p1; *p1 = *p2; *p2 = temp;\n\n    printf(\"people[0]: %s\\n\", people[0]);\n    printf(\"people[1]: %s\\n\", people[1]);\n    printf(\"people[2]: %s\\n\", people[2]);\n    printf(\"people[3]: %s\\n\", people[3]);\n    printf(\"people[4]: %s\\n\", people[4]);\n    printf(\"people[5]: %s\\n\", people[5]);\n\n    return 0;\n}`;

const level3code1 = "";

const level4code1 = "";

const level5code1 = "";


export const level2codes: string[] = [level2code1];
export const level3codes: string[] = [level3code1];
export const level4codes: string[] = [level4code1];
export const level5codes: string[] = [level5code1];

export function random2Code(people: person[]): string {
    if (!people || people.length < 6) {
        return "Error: Not enough people provided to generate code.";
    }
    const code = `int main() {\n    char *${people[0].codename} = "${people[3].name}";\n    char *${people[1].codename} = "${people[4].name}";\n    char *${people[2].codename} = "${people[5].name}";\n    char *${people[3].codename} = "${people[1].name}";\n    char *${people[4].codename} = "${people[0].name}";\n    char *${people[5].codename} = "${people[2].name}";\n\n    char **p1 = &${people[0].codename};\n    char **p2 = &${people[1].codename};\n    char **p3 = &${people[2].codename};\n    char **p4 = &${people[3].codename};\n    char **p5 = &${people[4].codename};\n    char **p6 = &${people[5].codename};\n\n    char *temp;\n\n    temp = *p1; *p1 = *p4; *p4 = temp;\n    temp = *p2; *p2 = *p5; *p5 = temp;\n\n    p3 = p6;\n    p6 = &${people[2].codename};\n\n    temp = *p3; *p3 = *p6; *p6 = temp;\n\n    temp = *p1; *p1 = *p2; *p2 = temp;\n\n    printf("${people[0].codename}: %s\\n", ${people[0].codename});\n    printf("${people[1].codename}: %s\\n", ${people[1].codename});\n    printf("${people[2].codename}: %s\\n", ${people[2].codename});\n    printf("${people[3].codename}: %s\\n", ${people[3].codename});\n    printf("${people[4].codename}: %s\\n", ${people[4].codename});\n    printf("${people[5].codename}: %s\\n", ${people[5].codename});\n\n    return 0;\n}`;
    return code;
}
export function random3Code(): string {
    const randomIndex = Math.floor(Math.random() * level3codes.length);
    return level3codes[randomIndex];
}
export function random4Code(): string {
    const randomIndex = Math.floor(Math.random() * level4codes.length);
    return level4codes[randomIndex];
}
export function random5Code(): string {
    const randomIndex = Math.floor(Math.random() * level5codes.length);
    return level5codes[randomIndex];
}