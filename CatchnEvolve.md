Category: Forensics

CatchnEvolve

Challenge description: Welcome to the Pokemon World!!! Catch these pokemons.. But only one will lead you to the flag... Good luck..!!

Tools used: exiftool, Stegosuite, Aperisolve (steghide)

The file downloaded off the challenge page was a zip file named pokemons.zip. On extraction, it reveals 9 png images of 9 different pokemons. The first step was to check the metadata of each one using exiftool to see if that gave any indication to which Pokemon was the 'one' to lead us to the flag.

8 Pokemon pngs revealed comments stating that the Pokemon either escaped or was not the one, all except the png of Ghastly which lacked a user comment. Running it through stegosuite extracted a file called QR code.png which as it's titled, contained the image of a qr code. The code on scanning, revealed a link that contained a png image of the Pokemon Haunter.

Running this png through stegosuite once again revealed a file, this time a jpg image of the Pokemon Gengar. Checking this jpg's metadata using exiftool revealed a comment stating that "Gengar can use 'visualize' attack to see hidden objects". This clearly implied that the word 'visualize' would be a passphrase of some sort. Uploading the file on aperisolve.com, an online platform which performs layer analysis on images, with the password 'visualize' revealed that Steghide could extracted data on a file titled flag.txt using the password.

Opening the file revealed the flag which was milanCTF23{4r3\_gh05t5\_5t3gh1dd3n}.
