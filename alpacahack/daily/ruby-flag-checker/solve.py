target = b"Coufhlj@bixm|UF\\JCjP^P<"
gen = [2, 3]
n = 4

while len(gen) < 23:
    if n % 2 != 0 and n % 3 != 0:
        gen.append(n)

    n += 1

flag = bytes([target[i] ^ gen[i] for i in range(len(target))])

print(flag)
