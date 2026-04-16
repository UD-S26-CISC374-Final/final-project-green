# That's Not My Programmer

## Elevator Pitch

You work at a top secret spy agency. Each day you are given a program, and must use it to identify whether or not your co-workers are who they say they are, or if they are an impostor trying to sneak in. You must trace a variety of programs to determine if you should let the supposed co-worker in, or if you should have security get rid of them. You will also have a variety of tasks you must complete to help the agency track down the rival spies trying to sneak their way in.

## Influences (Brief)

- *That's Not My Neighbor*:
  - Medium: Game
  - Explanation: This is the game the entire project is based on. It is a game where you are the doorman for an apartment building and must use a variety of clues to determine whether or not the people coming into the building are the people who actually live there, or if they are impostors trying to sneak their way in.
- *Papers Please*:
  - Medium: Game
  - Explanation: This game inspires the level progression of our game. Each day, there are more clues and the level gets harder, which is similar to how we want our game to run.


## Core Gameplay Mechanics (Brief)

- *Co-Workers*
  - You will interact with a variety of different co workers every day.
- *Your Clues/Programs*
  - Each day you are given *x* amount of programs/functions. 
- *Making Your Choice*
  - Based on the given evidence you must determine whether or not your co-worker is who they say they are.
- *Miscellaneous Tasks*
  - Each day you may also recieve extra tasks to do. This may include things such as passing notes to employees, fixing a broken system, or tracking down opposing spies.
- *Increasing Difficulty of Levels*
  - Each day your program will get more complex, as well as more co-workers and impostors trying to enter the building.
- *Victory vs Defeat*
  - You lose the game if you make too many mistakes, and win if you make it to the end of the week.

# Learning Aspects

## Learning Domains

- Functions and Function Calls
- Tracing Variables
- Pointers/Adresses

## Target Audiences

Introductory programmers and computer science students (CISC106/108)

## Target Contexts

This can be used in introductory computer science classes, as well as used as a study tool for anyone.

## Learning Objectives

*Remember, Learning Objectives are NOT simply topics. They are statements of observable behavior that a learner can do after the learning experience. You cannot observe someone "understanding" or "knowing" something.*

- *Variable Tracing*: Identify the value of a variable after a variety of function calls and value changes.
- *Pointers*: Correctly determine when a pointer changes the value of the original variable.

## Prerequisite Knowledge

- Explain what a pointer is and how one works.
- Ability to create a basic function with multiple variables.

## Assessment Measures

Can use a pre and post-test to determine improvement of the subject.

### Easy Example Question (level 1)
Given the following program:
```
int main() {
    int x = 2

    x = x + 2
    y = x
    y = y - 1
    printf("%d\n", x);  #Line 7
    x = y * 2
    y = x + 3
    printf("%d\n", y);  #Line 10
    
    return 0;
}
```
1. What is the value printed out by the print statement on line 7?
   - 4
2. What is the value printed out by the print statement on line 10?
   - 9
     
### Medium Example Question (level 2)
Given the following program:
```
int main() {
    int x = 4;
    int y = 3;
    int z = 2;

    int *px = &x;
    int *py = &y;

    *px = *px + 1;    
    *py = *px + 2;    
    z = *py - 1;      

    px = &z;          
    *px = *px + 2;    

    printf("%d\n", x);   // Line 16
    printf("%d\n", y);   // Line 17
    printf("%d\n", z);   // Line 18

    return 0;
}
```
1. What is the value printed out by the print statement on line 16?
   - 5
2. What is the value printed out by the print statement on line 17?
   - 7
3. What is the value printed out by the print statement on line 18?
   - 8

### Hard Example Question (level 3)

Given the following program:
```
int main() {
    int x = 5;
    int y = 2;
    int z = 3;

    int *p = &x;
    int *q = &y;

    *p = *p + *q;     
    q = &z;
    *q = *p * z;      
    z = x;
    *p = *q - *p;     
    p = &y;
    *p = z + *q;      
    x = x + y + z;    

    printf("%d\n", x);  #line 18
    printf("%d\n", y);  #line 19
    printf("%d\n", z);  #line 20
    return 0;
}
```
1. What is the value printed out by the print statement on line 18?
   - 21
2. What is the value printed out by the print statement on line 19?
   - 14
3. What is the value printed out by the print statement on line 20?
   - 7

### Bug-Fixing Question (Potential Task)

Identify the line that causes the following program to crash:
```
int main() {
    int a = 5;
    int b = 2;
    int c = 7;

    int *pa = &a;
    int *pb = &b;

    *pa = *pa + 3;     
    *pb = *pa - 4;     
    c = *pb + 5;       

    pb = &c;           
    *pb = *pb - 2;     

    pa = &a;
    pb = pa;           // both point to a

    *pb = 0;           // a = 0
    *pa = 10 / *pb;    // division by zero (runtime crash / undefined behavior)

    printf("%d\n", a);
    printf("%d\n", b);
    printf("%d\n", c);

    return 0;
}
```
1. What line causes the crash?
  - 20

# What sets this project apart?

- Many introductory computer science students struggle with identifying function calls and when the functions change the value of variables.
- Every programmer must be able to trace a program for coding and bug fixing purposes.
- This game gives students an environment where they can take their time answering the questions and fully understand how tracing the program works.

# Player Interaction Patterns and Modes

## Player Interaction Pattern

This is a one-player game where the player is provided with a program with a variety of variables. The player is then presented with supposed co-workers who will tell the player a value for a certain variable, and must trace through the given program to determine whether or not the value given by the co-worker is correct. The player will then click a button either letting the co-worker in, or kicking them out if they are an impostor. The player may also get approached with a task that needs to be completed. These tasks are completed by actively tracing through more programs, and finding values of variables.

## Player Modes

This game is a single-player game. You will progress through levels until you reach the end of the game.

# Gameplay Objectives

- *Let the co-workers in*:
    - Description: If the given variable value is correct, let the co-worker into the building.
    - Alignment: In order to determine if the value is correct the player must trace through the program and follow the given variable.
- *Kick the impostors out*:
    - Description: If the given variable value is incorrect, kick the impostor out of the building.
    - Alignment: In order to determine if the value is correct the player must trace through the program and follow the given variable.
- *Complete tasks*:
    - Description: Complete the random tasks your boss will assign you throughout the day.
    - Alignment: Keeps the game from being just a true/false quiz, more actively tests the users knowledge.
- *Don't get fired*:
    - Description: Every day, if you let in too many impostors or get rid of too many co-workers, you will be fired. Your job is to avoid this.
    - Alignment: Gives the player a punishment for incorrectly tracing the program.
- *Get Promoted*:
    - Description: At the end of 7 days, if you have not been fired the CEO will congradulate you and give you a promotion.
    - Alignment: Rewards the player for correctly tracing the program.

# Procedures/Actions

The player will have two buttons to click. One will let the co-worker into the building, and the other will kick them out. The player will have a button where they can view and cycle through the given program and its related functions.

Certain tasks will also have certain interactions. This may include clicking the line in a program where it would need to be fixed, or listing all the coworkers that are supposed to be in today.

# Rules

- If the player lets in too many impostors they get fired and lose the game.
- If the player kicks out too many co-workers they get fired and lose the game.
- If the player fails too many tasks they get fired.
- If the player makes it to the end of the week without getting fired, they win the game and get promoted.
- Every day the program will get more complex and the player will be faced with more supposed co-workers
- As the program evolves, it will encorporate the following:
  - Pointers
  - Function calls
  - References
  - Equations

# Objects/Entities

- Your office space (front desk)
- The different co-workers
- There is a clipboard that you click to view the programs
- There are two buttons on the desk thay you click to either let the co-worker in or kick them out
- Different cutscenes for the days/endings
- A queue of co-workers waiting to get in

## Core Gameplay Mechanics (Detailed)

- *Co-Workers*
  - The co-workers are the people that will be attempting to make their way into the building. Each co-worker will have a favorite variable and will tell you a value for that variable when they enter.
- *Your Clues/Programs*
  - Each day you are given *x* amount of programs/functions. It is your job to click through each and trace the variables to determine whether the co-worker's given value is the value that would be printed out by the print statement or if they are incorrect.
- *Making Your Choice*
  - Based on the given evidence you must determine whether your co-worker is who they say they are, and let them in, or that they are an impostor trying to sneak their way in, and reject them from entering. You have two buttons to make this choice, one for each option.
- *Miscellaneous Tasks*
  - Each day you may also recieve extra tasks to do. This may include things such as passing notes to employees, fixing a broken system, or tracking down opposing spies. In order to complete these task you may have to trace, debug, or finish programs.
- *Increasing Difficulty of Levels*
  - Each day your program will get more complex, as well as more co-workers and impostors trying to enter the building. This increases the difficulty as the game goes on.
- *Victory vs Defeat*
  - If you let too many impostors into the building or get rid of too many co-workers, the impostors will steal all the company's code and you will be executed by the CEO. If you make very few mistakes in 7 days, the company will finish their top secret project and the CEO will be happy with you. If you make it through 7 days without a single mistake, you win the game and get promoted to become the new CEO.

    
## Feedback

- The player will be able to visually see the queue of co-workers waiting to get in so they know how many are left in the day.
- At the end of each day, the player will be able to see which co-workers they incorrectly assessed, as well as view the program for the day so they can go back and look at it now knowing the correct answer.
- When you lose the game, you get fired.
- When you win the game, you get promoted.

# Story and Gameplay

## Presentation of Rules

On day 1, the recently-promoted security guard will guide you through the job and how it all works while also assisting you with your choices. You will then be let loose on day 2 to play the rest of the game on your own.

## Presentation of Content

The game does not teach the player about functions and pointers. The player is expected to know that meterial before playing. The game's only purpose is to help the player trace a program.

## Story (Brief)

You are a new hire at a top-secret spy agency. Your job is to make sure everyone entering the building is actually someone who works there, and not an impostor trying to sneak their way in. Every day you are given a program to help you determine who is supposed to be there for the day, and who is not. Your job is to trace through the program to identify whether or not the co-worker is who they say they are, and if they are supposed to be there. As well, your boss may occasionally give you tasks to complete to help the agency with their research. Every day as the company gets closer to the deadline for the project, more co-workers will be coming in, and the program you are given will get more complex. At the end of the week, if you haven't been fired yet, you will be promoted by the CEO.

## Storyboarding

![Main Menu](Assets/Title-Screen-Storyboard.png)
![Game Screen](Assets/Game-Screen-Storyboard.png)
![Code Viewer](Assets/Program-Viewer.PNG)
![End of Day Screen](Assets/End-Of-Day-Storyboard.png)

# Assets Needed

## Aethestics

The game has a darkish and gloomy aethestic, similar to *Papers Please*, but more office building-esque. The environment feels very secretive and protected.

## Graphical

- Characters List
  - Big Boss CEO: Will interact with you whenever you get fired/promoted
  - Boss (Steve): Will help guide you on day 1 and occasionally give you tasks to complete
  - The Variety of Co-workers/impostors
    - Kevin
    - James
    - Andrew
    - Joanna
    - Austin
    - Greg
    - Deborah
    - Ada
    - etc... (w.i.p)
- Textures:
  - Buttons
  - Clipboard
  - Monitor with queue
- Environment Art/Textures:
  - Wall in the background
  - Desk


## Audio


- Music List (Ambient sound)
  - Music: Darker and deeper, but not intense https://open.spotify.com/track/1QJflymJaad3iQ5DQhk8p1?si=966e4456dba749a7, https://open.spotify.com/track/3m8UfZwPMMbiWfGR8Lg2cR?si=72da290d5b25461b
  

- Sound List (SFX)
  - End of day: typewriter sound effect while text appears on screen
  - Loss Sound effect: Dark and death
  - Win sound effect: Victory and happy
  - New Person Arrives: Doorbell ding
  - Button press: button is pressed


# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
