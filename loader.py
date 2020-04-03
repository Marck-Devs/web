import json
lib = {}
print("Adding library")
print("*"*10)
lib["url"] = input("url: ")
lib["name"] = input("name (enter to get from file): ")
lib["desc"] = input("description: ")
if(lib["name"] == None or lib["name"] == ""):
    url = lib["url"]
    startIndex = url.find("/")
    if startIndex == -1:
        startIndex = 0
    lib["name"] = url[startIndex: url.index(".")]
print("="*20)
print("Library info")
print(json.dumps(lib,indent=4,sort_keys=True))
f = open("libs.conf")
data = json.load(f)
f.close()
last = data["libs"].pop()
data["libs"].append(lib)
data["libs"].append(last)
f = open("libs.conf", "w")
f.write(json.dumps(data,indent=4,sort_keys=True))
f.close()
print("=" * 20)
print("Done")