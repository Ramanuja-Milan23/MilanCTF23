# Hide seek N Repeat

After extracting the .zip file, We removed the blank unicode charecters in execute.py file that prevented python from running the code.

This line in execute.py impiles that the file can be decrypted using these 3 items:

    if user_key not in ['milanCTF23','you_need_me','another_one:|']:

Since the challenge is name hide and seek and repeat, We guessed that we need to decrpt flag.txt with a commbination of keys that is we first decrypt it using 'you_need_me', and then decrpyt this file using 'another_one:|' which gives us the flag.

milanCTF23{y0u_g0t_m3}
