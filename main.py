starting = []
auxilary = []
ending = []
num = 4


def init(num):
  for i in range(num):
    starting.append(num - i)

def printTower():
  for i in range(num):
    try:
      print(starting[num-i-1], end="  ")
    except:
      print(end="   ")
    try:
      print(auxilary[num-i-1], end="  ")
    except:
      print(end="   ")
    try:
      print(ending[num-i-1], end="")
    except:
      pass
    print()
  print("-----------------")
  

def moveTower(disk, source, dest, spare):
  printTower()
  if disk == 0:
    return
  else:
    moveTower(disk - 1, source, spare, dest)
    removed = source.pop()
    dest.append(removed)
    moveTower(disk - 1, spare, dest, source)


init(num)
moveTower(num,starting,ending,auxilary)