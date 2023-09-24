Category: Web

Sign of Flask

Challenge description: A secret guards the flag. http://milanctf.kludge.in:5000

Tools used: kirsle.net (Flask session cookie decoder), flask-unsign

Opening the provided website gives us the message that 'Only users with "Kludge Browser" are allowed'. From this, it was clear that we'd need to 'use' another browser to access the required info, however this could easily be done by changing the user agent of the browser being used to "Kludge Browser". On firefox this was achieved by opening a tab to about:config and entering general.useragent.override into the search box at the top of the preferences table, picking string and then adding an agent titled "Kludge Browser".

Refreshing the page now gives us the message "Welcome Participant!!! Onle 'Head' gets the flag. BTW, have you heard of flask unsign?". Pressing f12 to inspect the page and heading to the storage tab allowed us to see the cookies and their data. Going to kirsle.net which is a flask session cookie decoder, copying and pasting the value of the cookie named session, yielded the following message:-

{

"role": "participant",

"secret": "MilanRocks"

}

Considering the page's message that only 'Head' gets the flag, it becomes clear that we need to manipulate the cookie to store 'Head' as the role. To do so we need the random key used to encrypt cookies, also called the 'secret' key which conveniently is included in the session cookies data. The command:-

$ flask-unsign --sign --cookie '{"role": "Head", "secret": "MilanRocks"}' --secret 'MilanRocks'

gives us another flask session cookie, which when decoded on kirsle.net, now shows:-

{

"role": "Head",

"secret": "MilanRocks"

}

Pasting this value in the value of the session cookie back on the webpage and then refreshing gives us the flag which is

MilanCTF{I\_r3s1gn\_tak3\_th3\_s1gn\_634728}

