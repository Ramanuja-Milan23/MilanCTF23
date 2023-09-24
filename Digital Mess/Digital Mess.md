### Digital Mess

## Extracting the zip:

After Extracting the Zip, we get [DigitalMess.pdf](files/DigitalMess.pdf)

upon checking the entropy of the pdf file with binwalk

```
binwalk -e DigitalMess.pdf
```

we get all the extracted data into ```_DigitalMess.pdf.extracted```

now upon checking this folder we have random data in it.

Lets go through the files which can be opened.

And on opening script.js file

Violla!!

We have the flag!!

## Flag (finally!!!):

```
milanCTF{4nD_th3y_l1ved_h4pp1ly_3v3r_4fter}
```