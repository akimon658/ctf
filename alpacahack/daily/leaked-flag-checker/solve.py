xor_flag = "Fkwfdf|krdl~z"
flag = ""

for i in range(len(xor_flag)):
    flag += chr(ord(xor_flag[i]) ^ 7)

print(flag)
