"""Port itspatmorgan.com's case-study demo folders into the Website system.

- copies .ts/.tsx from each site folder into src/systems/website/components/<folder>/
- prefixes every .tsx with "_" (Studio treats unprefixed .tsx as documented components) and rewrites imports
- rewrites site aliases (@/lib/hooks, @/data/*, ../case-study/...) to system paths
- replaces '/images/...' URLs with static imports of files copied into the system's assets
- drops plain CSS imports; CSS is converted separately by scope-css.mjs

usage: python3 scripts/sync-from-site/port-demos.py [folder ...]   (SITE=<path> for another checkout)
"""
import os, re, shutil, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), *['..'] * 2))
SITE = os.path.join(os.path.abspath(os.environ.get('SITE', os.path.join(ROOT, '..', 'itspatmorgan.com'))), 'src')
SYS = os.path.join(ROOT, 'src/systems/website')
COMP = os.path.join(SYS, 'components')
FOLDERS = sys.argv[1:] or ['query-builder', 'expansion', 'design-studio', 'studio-case']

def code_files(root):
    for dirpath, _, files in os.walk(root):
        for f in files:
            if f.endswith(('.ts', '.tsx')):
                yield os.path.join(dirpath, f)

def private(name):
    return name if not name.endswith('.tsx') or name.startswith('_') else '_' + name

# 1. Copy, renaming .tsx files.
moved = {}  # site abs path without extension -> system abs path without extension
for folder in FOLDERS:
    src_root = os.path.join(SITE, 'components', folder)
    for src in code_files(src_root):
        rel = os.path.relpath(src, src_root)
        parts = rel.split(os.sep)
        parts[-1] = private(parts[-1])
        dst = os.path.join(COMP, folder, *parts)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(src, dst)
        moved[os.path.splitext(src)[0]] = os.path.splitext(dst)[0]

# Site data files the demos import, copied beside their consumers.
DATA = {
    os.path.join(SITE, 'data/design-studio-setup'): os.path.join(COMP, 'design-studio/setup'),
    os.path.join(SITE, 'data/media'): os.path.join(COMP, 'studio-case/media'),
}
for src, dst in DATA.items():
    if os.path.isdir(os.path.dirname(dst)):
        shutil.copyfile(src + '.ts', dst + '.ts')
        moved[src] = dst

HOOKS = os.path.join(COMP, 'theme-hooks')

def resolve_site(spec, src_file):
    if spec.startswith('@/'):
        return os.path.join(SITE, spec[2:])
    if spec.startswith('.'):
        return os.path.normpath(os.path.join(os.path.dirname(src_file), spec))
    return None

def rel_import(from_file, target):
    r = os.path.relpath(target, os.path.dirname(from_file))
    return r if r.startswith('.') else './' + r

images = {}

def image_asset(url):
    """Copy a public image into the system's assets and return its absolute destination."""
    src = os.path.join(os.path.dirname(SITE), 'public', url.lstrip('/'))
    dst = os.path.join(SYS, 'assets', 'images', 'site', url.lstrip('/').removeprefix('images/'))
    if not os.path.exists(dst):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(src, dst)
    return dst

# 2. Rewrite each copied file.
for site_base, dst_base in moved.items():
    ext = '.tsx' if os.path.exists(dst_base + '.tsx') else '.ts'
    dst = dst_base + ext
    src_file = site_base + ext
    text = open(dst).read()

    def fix(match):
        quote, spec = match.group(1), match.group(2)
        if spec == '@/lib/hooks':
            return quote + rel_import(dst, os.path.join(HOOKS, 'theme-hooks')) + quote
        target = resolve_site(spec, src_file)
        if target is None:
            return match.group(0)
        if target in moved:
            return quote + rel_import(dst, moved[target]) + quote
        return match.group(0)

    text = re.sub(r"""^import\s+['"][^'"]+\.css['"];?\n""", '', text, flags=re.M)
    text = re.sub(r"""(?<=from )(['"])([^'"]+)\1""", lambda m: fix(m), text)
    text = re.sub(r"""(?<=import\()(['"])([^'"]+)\1""", lambda m: fix(m), text)

    found = sorted(set(re.findall(r"""['"](/images/[^'"]+)['"]""", text)))
    imports = []
    for i, url in enumerate(found):
        name = 'asset' + str(i)
        asset = image_asset(url)
        imports.append(f"import {name} from '{rel_import(dst, asset)}';")
        text = re.sub(r'=\s*"' + re.escape(url) + '"', '={' + name + '}', text)
        text = re.sub(r"""['"]""" + re.escape(url) + r"""['"]""", name, text)
        images[url] = asset
    if imports:
        lines = text.split('\n')
        last = max((i for i, l in enumerate(lines) if l.startswith('import ')), default=-1)
        # Skip past a multi-line import's closing line.
        while last >= 0 and last + 1 < len(lines) and not re.search(r"""from ['"][^'"]+['"];?\s*$|^import ['"]""", lines[last]):
            last += 1
        lines[last + 1:last + 1] = imports
        text = '\n'.join(lines)
    open(dst, 'w').write(text)

leftover = []
for dst_base in moved.values():
    for ext in ('.tsx', '.ts'):
        p = dst_base + ext
        if os.path.exists(p):
            t = open(p).read()
            for m in re.finditer(r"""from ['"](@/[^'"]+|astro:[^'"]+)['"]""", t):
                leftover.append(f'{os.path.relpath(p, COMP)}: {m.group(1)}')
print('files', len(moved), 'images', len(images))
print('\n'.join(leftover) or 'no site aliases left')
