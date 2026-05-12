import type person from "./person";

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
export function random4Code(people: person[]): string {
    const level4code1 = `
#include <stdio.h>

void swap_ptr(char **x, char **y) {
    char *temp = *x;
    *x = *y;
    *y = temp;
}

void rotate3(char **a, char **b, char **c) {
    char *temp = *a;
    *a = *c;
    *c = *b;
    *b = temp;
}

int main() {

    char *${people[0].codename} = "${people[1].characterName}";
    char *${people[1].codename} = "${people[2].characterName}";
    char *${people[2].codename} = "${people[0].characterName}";
    char *${people[3].codename} = "${people[8].characterName}";
    char *${people[4].codename} = "${people[7].characterName}";
    char *${people[5].codename} = "${people[6].characterName}";
    char *${people[6].codename} = "${people[5].characterName}";
    char *${people[7].codename} = "${people[4].characterName}";
    char *${people[8].codename} = "${people[9].characterName}";
    char *${people[9].codename} = "${people[3].characterName}";

    char **p1 = &${people[0].codename};
    char **p2 = &${people[1].codename};
    char **p3 = &${people[2].codename};
    char **p4 = &${people[3].codename};
    char **p5 = &${people[4].codename};
    char **p6 = &${people[5].codename};
    char **p7 = &${people[6].codename};
    char **p8 = &${people[7].codename};
    char **p9 = &${people[8].codename};
    char **p10 = &${people[9].codename};

    swap_ptr(p1, p2);
    swap_ptr(p3, p4);

    rotate3(p5, p6, p7);

    char *temp = *p8;
    *p8 = *p1;
    *p1 = temp;

    temp = *p9;
    *p9 = *p8;
    *p8 = temp;

    swap_ptr(p2, p6);
    swap_ptr(p4, p8);

    rotate3(p7, p9, p10);

    temp = *p5;
    *p5 = *p3;
    *p3 = temp;

    temp = *p10;
    *p10 = *p5;
    *p5 = temp;

    printf("${people[0].codename}: %s\\n", ${people[0].codename});
    printf("${people[1].codename}: %s\\n", ${people[1].codename});
    printf("${people[2].codename}: %s\\n", ${people[2].codename});
    printf("${people[3].codename}: %s\\n", ${people[3].codename});
    printf("${people[4].codename}: %s\\n", ${people[4].codename});
    printf("${people[5].codename}: %s\\n", ${people[5].codename});
    printf("${people[6].codename}: %s\\n", ${people[6].codename});
    printf("${people[7].codename}: %s\\n", ${people[7].codename});
    printf("${people[8].codename}: %s\\n", ${people[8].codename});
    printf("${people[9].codename}: %s\\n", ${people[9].codename});

    return 0;
}
`;
    const level4codes: string[] = [level4code1];
    const randomIndex = Math.floor(Math.random() * level4codes.length);
    return level4codes[randomIndex];
}
export function random5Code(people: person[]): string {
    const level5code1 = `#include <stdio.h>

void swap_ptr(char **x, char **y) {
    char *temp = *x;
    *x = *y;
    *y = temp;
}

void rotate3(char **a, char **b, char **c) {
    char *temp = *a;
    *a = *c;
    *c = *b;
    *b = temp;
}

void mix(char **x, char **y, char *z) {
    char *temp = *x;
    *x = *y;
    *y = z;
    z = temp;
}

int main() {

    char *${people[0].codename} = "${people[9].characterName}";
    char *${people[1].codename} = "${people[6].characterName}";
    char *${people[2].codename} = "${people[10].characterName}";
    char *${people[3].codename} = "${people[4].characterName}";
    char *${people[4].codename} = "${people[1].characterName}";
    char *${people[5].codename} = "${people[0].characterName}";
    char *${people[6].codename} = "${people[2].characterName}";
    char *${people[7].codename} = "${people[5].characterName}";
    char *${people[8].codename} = "${people[7].characterName}";
    char *${people[9].codename} = "${people[3].characterName}";
    char *${people[10].codename} = "${people[8].characterName}";
    char *${people[11].codename} = "${people[11].characterName}";

    char **p1 = &${people[0].codename};
    char **p2 = &${people[1].codename};
    char **p3 = &${people[2].codename};
    char **p4 = &${people[3].codename};
    char **p5 = &${people[4].codename};
    char **p6 = &${people[5].codename};
    char **p7 = &${people[6].codename};
    char **p8 = &${people[7].codename};
    char **p9 = &${people[8].codename};
    char **p10 = &${people[9].codename};
    char **p11 = &${people[10].codename};
    char **p12 = &${people[11].codename};

    swap_ptr(p1, p2);
    swap_ptr(p3, p4);

    rotate3(p5, p6, p7);

    mix(p8, p9, ${people[9].codename});

    printf("${people[7].codename}: %s\\n", ${people[7].codename});

    char *temp = *p10;
    *p10 = *p11;
    *p11 = temp;

    swap_ptr(p12, p1);

    rotate3(p2, p6, p10);

    mix(p3, p7, ${people[4].codename});

    printf("${people[4].codename}: %s\\n", ${people[4].codename});

    temp = *p4;
    *p4 = *p8;
    *p8 = temp;

    swap_ptr(p5, p9);

    rotate3(p11, p1, p6);

    mix(p10, p12, ${people[0].codename});

    printf("${people[0].codename}: %s\\n", ${people[0].codename});
    printf("${people[9].codename}: %s\\n", ${people[9].codename});

    temp = *p2;
    *p2 = *p7;
    *p7 = temp;

    swap_ptr(p3, p11);

    printf("${people[2].codename}: %s\\n", ${people[2].codename});
    printf("${people[10].codename}: %s\\n", ${people[10].codename});

    rotate3(p4, p8, p12);

    mix(p1, p5, ${people[8].codename});

    printf("${people[8].codename}: %s\\n", ${people[8].codename});
    printf("${people[11].codename}: %s\\n", ${people[11].codename});

    swap_ptr(p6, p9);
    swap_ptr(p2, p10);

    printf("${people[5].codename}: %s\\n", ${people[5].codename});
    printf("${people[6].codename}: %s\\n", ${people[6].codename});
    printf("${people[3].codename}: %s\\n", ${people[3].codename});

    temp = *p11;
    *p11 = *p3;
    *p3 = temp;

    printf("${people[1].codename}: %s\\n", ${people[1].codename});

    return 0;
}`;
    const level5codes: string[] = [level5code1];
    const randomIndex = Math.floor(Math.random() * level5codes.length);
    return level5codes[randomIndex];
}

export function random3bugfix() {
    const level3bugfix1 = `#include <stdio.h>

int main() {
    int a = 15;
    int b = 5;
    int c = 2;

    int sum = a + b + c;
    printf("sum: %d\\n", sum);

    float avg = sum / 3;
    printf("avg: %f\\n", avg);

    int x = 8;
    float y = 2.5;

    int result = x + y;

    printf("result: %d\\n", result);

    int final = result * 2;
    printf("final: %d\\n", final);

    return 0;
}`;

    const correctline = [17]
    const level3bugfix: string[] = [level3bugfix1];
    const randomIndex = Math.floor(Math.random() * level3bugfix.length);
    
    const problem = level3bugfix[randomIndex];
    const answer = correctline[randomIndex]

    return { problem , answer };
}

export function random4bugfix() {
    const level4bugfix1 = `#include <stdio.h>

int* getPtr(int x) {
    int temp = x;
    return &temp;
}

int main() {
    int a = 10;
    int b = 20;
    int c = 30;

    int *p1 = &a;
    int *p2 = &b;
    int *p3 = &c;

    *p1 = *p2 + *p3;

    int *p4 = getPtr(50);

    printf("a: %d\\n", a);
    printf("b: %d\\n", b);
    printf("c: %d\\n", c);
    printf("p4: %d\\n", *p4);

    return 0;
}`;

    const correctline = [5]
    const level4bugfix: string[] = [level4bugfix1];
    const randomIndex = Math.floor(Math.random() * level4bugfix.length);
    
    const problem = level4bugfix[randomIndex];
    const answer = correctline[randomIndex]

    return { problem , answer };
}

export function random5bugfix() {
    const level5bugfix1 = `#include <stdio.h>

int sumArray(int arr[], int size) {
    int total = 0;
    for (int i = 0; i < size; i++) {
        total += arr[i];
    }
    return total;
}

void printArray(int arr[], int size) {
    for (int i = 0; i <= size; i++) { 
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
}

int main() {
    int data[6] = {10, 20, 30, 40, 50, 60};

    int result1 = sumArray(data, 6);
    printf("Sum: %d\\n", result1);

    printArray(data, 6);

    int filtered[3];
    for (int i = 0; i < 3; i++) {
        filtered[i] = data[i] * 2;
    }

    printf("Filtered values:\\n");
    for (int i = 0; i < 3; i++) {
        printf("%d ", filtered[i]);
    }
    printf("\\n");

    int finalCheck = filtered[0] + filtered[1] + filtered[2];
    printf("Final check: %d\\n", finalCheck);

    return 0;
}`;
    const level5bugfix2 = `#include <stdio.h>

int adjust(int x) {
    static int factor = 1;
    factor = factor + x % 3;
    return x * factor;
}

int transform(int a, int b) {
    int result = 0;

    for (int i = 0; i < b; i++) {
        result = adjust(a + i);
    }

    return result;
}

int main() {
    int data[4] = {2, 4, 6, 8};

    int x = transform(data[1], 3);
    int y = transform(data[2], 2);

    int combined = x + y;

    printf("combined: %d\\n", combined);

    int check = adjust(data[0]) + adjust(data[0]);

    printf("check: %d\\n", check);

    return 0;
}`;
    const correctline = [12, 5]
    const level5bugfix: string[] = [level5bugfix1, level5bugfix2];
    const randomIndex = Math.floor(Math.random() * level5bugfix.length);
    
    const problem = level5bugfix[randomIndex];
    const answer = correctline[randomIndex]

    return { problem , answer };
}