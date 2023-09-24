# Injection Juggling

After analysing the two php files we realised,

1. home.php was susceptible to a union attack
1. login.php used loose comparison (==) which were sometimes susceptible to type juggling

## Sql injection on home.php
We put 
`1' union select id, passhash from users where '' = '`
into Role

This gives

```
1. 64e4ed4901cd4773c2d766efb36855fd425e9e90fa0a5272315270b76712e018

2. 0e66298694359207596086558843543959518835691168370379069085300385
```

We get the passhash of both Head and Participant. We can differentiate them by id: 1.Participant 2.Head

## Magic Hash

After researching type juggling, we found a magic hash in sha256 (the hashing algorithm used in login.php) which was the same as the passhash of the head.

>TyNOQHUS hashes to 0e66298694359207596086558843543959518835691168370379069085300385

The above hash is special because the it starts with 0e and is followed by numbers which makes php interpret it as scientific notation and thus the hash is treated as a float in comparison operators.


