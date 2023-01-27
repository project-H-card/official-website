from PIL import Image
import glob
# import shutil

files = glob.glob("docs/images/cards_new/*.png")
print(files)

# files = ["official-website/docs/images/History_top_header_3.png"]
for file in files:
    Image.open(file).convert('RGBA').save(file.split(".")[0] + ".webp")

# for file in glob.glob("1123カード/*.webp"):
#     shutil.copyfile(file, f"official-website/docs/images/cards/{file.split('/')[1]}")