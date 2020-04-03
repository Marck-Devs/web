import json
import os
print("Add new component\n");
print("*"*30)
comp = {
    "name" : None,
    "tag" : None
}
comp["name"] = input("\nName: ")
comp["tag"] = input("Tag for component (enter to get from name): ")
if comp["tag"] == None or comp["tag"] == "":
    comp["tag"] = comp["name"]
f = open("./components.json")
data = json.load(f)
data["components"].append(comp)
print("New component:")
print(comp)
f.close()
os.mkdir(".{}{}".format(data["config"]["baseUrl"], comp["name"]))
print("="*30)
print("Creando archivos...")
path = ".{}{}/{}".format(data["config"]["baseUrl"], comp["name"], comp["name"])
exts = ["js", "css", "html"]
for ex in exts:
    tmp = open("{}.{}".format(path,ex),"w")
    tmp.write("// Archivo %s" % ex)
    tmp.close()
f = open("./components.json", "w")
f.write(json.dumps(data, indent=4, sort_keys=True))
f.close()
print("--| Done!")