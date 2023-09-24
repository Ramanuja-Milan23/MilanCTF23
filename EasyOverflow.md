# Easy Overflow

The code:
```
#include <stdio.h>

int main() {
    char admin = 'n';
    char name[12];
    
    printf("Enter name: ");
    fflush(stdout);
    gets(name);
    
    if(admin!='y'){
        printf("I am not giving you the flag\n");
    }
    else {
        system("cat flag");
    }

    return 0;
}

```
The variable name is stored on stack after variable admin, which means name\[13\] is the same memory as admin.
i.e modifying name\[13\] to 'y' will modify admin to 'y'.

We can write to name\[13\] by entering more than 12 'y' charecters. example input:

    yyyyyyyyyyyyyyyyyyyyyyyyyyyyy


Flag: milanCTF{3asy_1sn't_1t_26743}
