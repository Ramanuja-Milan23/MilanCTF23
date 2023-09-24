# Bitlock

```
in_password = input("enter password: ")
password = int(stringToBinary(in_password),2)
checkPass = int(intToBinary(pass1)+intToBinary(password), 2)
i = 0
while i<=len(in_password):
    checkPass = int(stringXOR(intToBinary(checkPass), pass2),2)
    checkPass>>=i
    i+=1

if(checkPass==pass1):
    f=open('flag.txt', 'r')
    print(f.read())
else:
    print("Password is Incorrect")
```

In this code, checkPass is initialy set to 'int(intToBinary(pass1) + intToBinary(password))' and after the loop it becomes 'int(intToBinary(pass1))'.

In the loop checkPass is right shifted by 'i', totally it is shifted by s(s+1)/2 where s is the number of charecters in password.

The last two statements imply that len(intToBinary(password)) = s(s+1)/2.

Since the first charecter of the password has be atleast \x01, 8(s - 1) + 1 \<= len(intToBinary(password)) and,
The last charecter of the password has to have at most 8s,     8s >= len(intToBinary(password))

That is: **8s - 7 \<= len(intToBinary(password) \<= 8s**

which implies: **8s - 7 \<= s(s+1)/2 \<= 8s**

Which has only one integral solution, **s = 1**. Thus **len(intToBinary(password)) = 1**.

This means the password must be **'\x01'**.

## Sending input to program

We can send the input to program(while preserving the non-printable charecters) using [pwntools](https://docs.pwntools.com/en/stable/fmtstr.html).

```
    from pwn import *

    p = process('./sa2')

    p.sendline('\x01')
    print(p.recvall()) # prints the output of the program


    p.close()
```
To send this input to the kludge server to get the flag:

```
    from pwn import *

    p = remote('milanctf.kludge.in',6000)

    p.sendline('\x01')
    print(p.recvall()) # prints the output of the program

    p.close()
```

milanCTF23{X0R_s3_d44L0_244327}
