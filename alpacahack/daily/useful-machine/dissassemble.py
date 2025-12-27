import sys

filename = sys.argv[1]

with open(filename, "rb") as f:
    code = f.read()

ops = {
    0: "INPUT   ",
    1: "MOV_IMM ",
    2: "MOV_MEM ",
    3: "ADD     ",
    4: "MUL     ",
    5: "XOR     ",
    6: "NOT     "
}

for i in range(0, len(code), 3):
    if i + 2 >= len(code):
        break
    op = code[i]
    o1 = code[i+1]
    o2 = code[i+2]

    op_name = ops.get(op, f"UNKNOWN({op})")
    print(f"{i:04x}: {op_name} mem[{o1:02x}], {
          o2:02x} (mem[{o2:02x}] if mem op)")
