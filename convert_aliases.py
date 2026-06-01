import os
import re

def convert_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Calcular profundidade relativa a client/src
    rel_path = os.path.relpath(os.path.dirname(filepath), os.path.join(os.getcwd(), 'client/src'))
    if rel_path == '.':
        replacement = './'
    else:
        depth = len(rel_path.split(os.sep))
        replacement = '../' * depth
        
    new_content = re.sub(r'from "@/(.*?)"', f'from "{replacement}\\1"', content)
    new_content = re.sub(r'import\("@/(.*?)"\)', f'import("{replacement}\\1")', new_content)
    
    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Converted {filepath}")

for root, dirs, files in os.walk('client/src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            convert_file(os.path.join(root, file))
