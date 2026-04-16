
# Example Question 1:
```
int main() {
  char *Jane_Doe = "Hannah";
  char *ScareCrow = "James";
  char *Drifter = "Eve";
  char *tmp;

  tmp = Jane_Doe;
  Jane_Doe = ScareCrow;
  ScareCrow = tmp;

  tmp = Drifter;
  Drifter = Jane_Doe;
  Jane_Doe = tmp;

  printf("%s\n", Jane_Doe);
  printf("%s\n", ScareCrow);
  printf("%s\n", Drifter);
  return 0;
}
```

# Example Question 2:
```
int main() {
    char *NIGHTFALL = "Ethan";
    char *BLACKOUT  = "Austin";
    char *SPECTER   = "Catie";

    char *ORACLE    = NIGHTFALL;
    char *FALCON    = BLACKOUT;
    char **OVERLORD = &ORACLE;   

    ORACLE = FALCON;             
    *OVERLORD = SPECTER;         
    FALCON = NIGHTFALL;          
    OVERLORD = &FALCON;          
    *OVERLORD = SPECTER;         
    NIGHTFALL = ORACLE;          
    ORACLE = BLACKOUT;           
    OVERLORD = &NIGHTFALL;       
    *OVERLORD = FALCON;         

    printf("%s\n", NIGHTFALL);  
    printf("%s\n", BLACKOUT);   
    printf("%s\n", SPECTER);    

    return 0;
}
```
