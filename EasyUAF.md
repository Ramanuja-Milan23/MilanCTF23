# Easy UAF

Inspecting the easyuaf.c file, we see that delete_org function does not NULL the pointer after free(), which means it can still be printed by print_card function even if it has been freed.

To exploit it, start with registering a new person\[id = 0, name="p1"\] then a new organisation\[id = 0, name="org1"\].
Then the heap will look like:
    
    orgs[0]    -> org1 [Size:40B]
    persons[0] -> p1   [Size:40B]

Then delete the org1, After which the program will have a dangling pointer to org1.
Heap:

    orgs[0]    -> empty [Size:40B]
    persons[0] -> p1    [Size:40B]

Now we register another new person\[id = 1, name="p2"\], after which the heap becomes:

    orgs[0], persons[1]    -> p2    [Size:40B]
    persons[0]             -> p1    [Size:40B]

Since the bytes orgs\[0\] and persons\[1\] are the same:

    orgs[0]->name = persons[1]->name // 24 bytes
    orgs[0]->id   = persons[1]->id   // 4 bytes
    {padding}     = persons[1]->age  // 4 bytes, there is padding here because the function pointer must be on a 8-byte boundary
    orgs[0]->display = persons[1]->business_num, persons[1]->personal_num // 8 bytes

This means that if we enter the values of business_num and personal_num as the address of ez_flag function.
Which will be executed when we print the organisation card.

By disassembling easyuaf executable, we find ez_flag address is 0x0000000000401276.
Thus **business_num = 0** and **personal_num = 4199030**

Flag: milanCTF{n0t_tha7_3a5y_843083}
