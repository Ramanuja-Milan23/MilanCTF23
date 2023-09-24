# Pablo's Web

## Flag 1/3

To obtain the first part of the flag, we inspected the site and found a hyperlink hidden in the closed parenthesis character of :)

From there we moved to the root pages of the link
`http://milanctf.kludge.in:5432/contacts/hidden/concealed/cryptic`
TO
`http://milanctf.kludge.in:5432/contacts/hidden/concealed/`

After inspecting this page we find a link element hidden in the head of the page 

`http://milanctf.kludge.in:5432/contacts/hidden/code/`

on this we get a binary string which translates to the first flag

## Flag 2/3

After getting the first flag we get a link to 

`http://milanctf.kludge.in:5432/dark/sus/alias/clouded/`

Upon going to the roots of these pages we get small hints for the future like

> Did you know? : Pablo has an alias -"pabulous"
> 
> Useful fact : light comes after dark

after using the second hint we get the flag in the comments of

`http://milanctf.kludge.in:5432/dark/light/`


## Flag 3/3

After the second part we are given the hint that there is someone disguised inside hidden so we go to

`http://milanctf.kludge.in:5432/contacts/hidden/disguised/`

Here we get an image download hyperlink that has an error.

after inspecting the site we go to the root url of the image and download it from there

Then we run steganography on the image using the password as "pabulous" with reference to the first hint

from this we get a string

`4b4a57585132433250465458555444324a56594536324b424e464b575555544b4a56434545543259504a43584f544b454b553255344d5a514e453d3d3d3d3d3d`

we run a 3 layer decryption in the following order
1. hexadecimal to ascii
    ```
    4b4a57585132433250465458555444324a56594536324b424e464b575555544b4a56434545543259504a43584f544b454b553255344d5a514e453d3d3d3d3d3d
    Becomes
    KJWXQ2C2PFTXUTD2JVYE62KBNFKWUUTKJVCEET2YPJCXOTKEKU2U4MZQNE======
    ```
1. base32 decryption
    ```
    KJWXQ2C2PFTXUTD2JVYE62KBNFKWUUTKJVCEET2YPJCXOTKEKU2U4MZQNE======
    Becomes
    RmxhZygzLzMpOiAiUjRjMDBOXzEwMDU5N30i
    ```
1. base64 decryption
    ```
    RmxhZygzLzMpOiAiUjRjMDBOXzEwMDU5N30i
    Becomes
    Flag(3/3): "R4c00N_100597}"  
    ```




