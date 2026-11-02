#!/usr/bin/env python3
"""Plan de test par page sans hugo server. Voir data/test_plan.yaml."""
from __future__ import annotations

import re
import sys
from pathlib import Path


def load_yaml(path: Path) -> dict:
    try:
        import yaml
    except ImportError:
        sys.stderr.write("pip install pyyaml\n")
        sys.exit(1)
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def parse_front_matter(text: str) -> dict:
    m = FM_RE.match(text)
    if not m:
        return {}
    import yaml

    return yaml.safe_load(m.group(1)) or {}


def rel_permalink(content_root: Path, md_path: Path) -> str:
    rel = md_path.relative_to(content_root)
    parts = list(rel.parts)
    if parts[-1] in ("_index.md", "index.md"):
        parts = parts[:-1]
    else:
        parts[-1] = parts[-1].replace(".md", "")
    return "/" if not parts else "/" + "/".join(parts) + "/"


def merge_items(*slices: list) -> list:
    seen: set[str] = set()
    out: list = []
    for sl in slices:
        for item in sl or []:
            iid = item.get("id") or item.get("label")
            if iid in seen:
                continue
            seen.add(iid)
            out.append(item)
    return out


def plan_for_page(data: dict, fm: dict, kind: str, layout: str, path: str) -> tuple[list, list]:
    every = data.get("every") or {}
    a11y = list(every.get("a11y") or [])
    qa = list(every.get("qa") or [])
    for key, field in ((layout, "by_layout"), (kind, "by_kind"), (path, "by_path")):
        bucket = (data.get(field) or {}).get(key) or {}
        a11y = merge_items(a11y, bucket.get("a11y"))
        qa = merge_items(qa, bucket.get("qa"))
    tp = fm.get("test_plan") or {}
    a11y = merge_items(a11y, tp.get("a11y"))
    qa = merge_items(qa, tp.get("qa"))
    for skip in tp.get("a11y_skip") or []:
        a11y = [x for x in a11y if x.get("id") != skip]
    for skip in tp.get("qa_skip") or []:
        qa = [x for x in qa if x.get("id") != skip]
    return a11y, qa


def main() -> int:
    theme_root = Path(__file__).resolve().parent.parent
    site_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else theme_root / "exampleSite"
    site_dir = site_dir.resolve()
    data_path = theme_root / "data" / "test_plan.yaml"
    content = site_dir / "content"
    if not data_path.is_file() or not content.is_dir():
        return 1
    data = load_yaml(data_path)
    print(f"── Plan de test ({len(list(content.rglob('*.md')))} pages) ──\n")
    for md in sorted(content.rglob("*.md")):
        fm = parse_front_matter(md.read_text(encoding="utf-8"))
        path = rel_permalink(content, md)
        layout = fm.get("layout") or ""
        kind = "home" if path == "/" else "page"
        a11y, qa = plan_for_page(data, fm, kind, layout, path)
        print(f"■ {fm.get('title') or md.stem}\n  {path}")
        for item in a11y:
            print(f"    [a11y] {item.get('label')}")
        for item in qa:
            print(f"    [qa]   {item.get('label')}")
        print()
    print("Ensuite : cd exampleSite && HUGO_ENV=dev hugo server")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
