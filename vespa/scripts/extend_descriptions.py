#!/usr/bin/env python3
"""Extend `description` fields in a JSONL Vespa dataset to 5 Norwegian sentences.

Reads:  vespa/dataset/rema_dataset_big.jsonl
Writes: vespa/dataset/rema_dataset_big_extended.jsonl
"""
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / 'dataset' / 'rema_dataset_big.jsonl'
OUTPUT = ROOT / 'dataset' / 'rema_dataset_big_extended.jsonl'


def ensure_period(s: str) -> str:
    s = s.strip()
    if not s:
        return ''
    if s[-1] in '.!?':
        return s
    return s + '.'


def infer_attr(name: str, desc: str) -> str:
    txt = (name + ' ' + desc).lower()
    if 'organisk' in txt or 'økolog' in txt:
        return 'økologisk kvalitet'
    if 'modn' in txt:
        return 'moden og søt smak'
    if 'sprø' in txt or 'sprøst' in txt or 'crispy' in txt:
        return 'sprø tekstur'
    if 'saft' in txt or 'saftig' in txt:
        return 'saftig konsistens'
    if 'krem' in txt or 'kremet' in txt:
        return 'kremet konsistens'
    if 'salt' in txt or 'saltet' in txt:
        return 'saltet smak'
    if 'mild' in txt:
        return 'mild smak'
    if 'fullkorn' in txt or 'grovt' in txt or 'fiber' in txt:
        return 'høyt fiberinnhold'
    if 'paner' in txt or 'panert' in txt:
        return 'sprø panering'
    return 'god smak'


def infer_pairing(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['brød', 'bagett', 'rundstyk', 'polar', 'tortilla']):
        return 'som pålegg, ost eller syltetøy til frokost og lunsj'
    if any(k in n for k in ['melk', 'yoghurt', 'smør', 'rømme', 'cottage', 'ost', 'jarlsberg', 'norvegia']):
        return 'i frokostblandinger, på brød eller i matlaging'
    if any(k in n for k in ['eple', 'banan', 'mango', 'jordbær', 'blåbær', 'pære', 'anana', 'sitron', 'avokado']):
        return 'som snack, i salater eller desserter'
    if any(k in n for k in ['kylling', 'svin', 'bacon', 'kjøtt', 'laks', 'torsk', 'skinke', 'reker', 'lam']):
        return 'til middag, stekt eller grillet sammen med grønnsaker'
    if any(k in n for k in ['boks', 'på boks', 'kikerter', 'bønner', 'mais', 'tomater']):
        return 'i gryteretter, salater eller varme retter'
    return 'i mange ulike retter og måltider'


def infer_categories(name: str, desc: str):
    n = (name + ' ' + (desc or '')).lower()
    cats = set()
    mapping = [
        (['ost', 'jarlsberg', 'norvegia', 'gouda', 'cheddar'], 'ost'),
        (['melk', 'yoghurt', 'skummet', 'helm', 'rømme', 'cottage', 'yoghurt'], 'melk'),
        (['kylling', 'svin', 'bacon', 'kjøtt', 'lam', 'skinke', 'karbonadedeig', 'kjøttdeig', 'pølser'], 'kjøtt'),
        (['laks', 'torsk', 'reker', 'sild', 'tunfisk', 'makrell', 'fisk'], 'fisk'),
        (['egg'], 'egg'),
        (['brød', 'bagett', 'rundstyk', 'knekkebrød', 'polar', 'tortilla', 'spelt'], 'brød'),
        (['frukt', 'eple', 'banan', 'mango', 'jordbær', 'blåbær', 'pære', 'anan', 'sitron', 'avokado'], 'frukt'),
        (['grønnsak', 'gulrøtte', 'potet', 'agurk', 'tomat', 'brokkoli', 'salat', 'løk', 'paprika'], 'grønnsaker'),
        (['ris', 'pasta', 'spaghetti', 'basmati', 'jasmin', 'havre', 'mel', 'hvetemel'], 'korn'),
        (['nøtter', 'mandler', 'peanøtt', 'hasselnøtt', 'valnøtt'], 'nøtter'),
        (['sjokolade', 'is', 'godteri', 'lakris', 'kake', 'kakao'], 'søtt'),
        (['boks', 'på boks', 'kikerter', 'bønner', 'mais'], 'konserves'),
    ]
    for keys, cat in mapping:
        for k in keys:
            if k in n:
                cats.add(cat)
                break
    if not cats:
        cats.add('annet')
    return sorted(cats)


def serving_suggestion(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['brød', 'bagett', 'rundstyk', 'polar']):
        return 'server gjerne ferskt, ristet eller med smør og ost'
    if any(k in n for k in ['melk', 'yoghurt', 'smør', 'rømme']):
        return 'nyt kaldt eller bruk i baking og matlaging'
    if any(k in n for k in ['eple', 'banan', 'mango', 'jordbær', 'blåbær', 'pære']):
        return 'spis friskt eller bruk i fruktsalat'
    if any(k in n for k in ['kylling', 'svin', 'bacon', 'kjøtt', 'laks', 'torsk', 'reker']):
        return 'tilbered etter ønske og server varm'
    return 'nytes best fersk'


def expand_description(name: str, desc: str) -> str:
    # Ensure base sentence
    base = ensure_period(desc) if desc else f'{name}.'
    # Make five sentences in Norwegian using simple templates
    attr = infer_attr(name, desc)
    pairing = infer_pairing(name)
    serving = serving_suggestion(name)

    sentences = []
    # Sentence 1: keep or slightly expand original
    if base:
        sentences.append(base)
    else:
        sentences.append(f'{name} er et smakfullt produkt.')

    # Sentence 2: attribute
    sentences.append(f'{name} er kjent for sin {attr}.')

    # Sentence 3: pairing
    sentences.append(f'Den passer godt {pairing}.')

    # Sentence 4: serving suggestion
    sentences.append(f'{serving} for best resultat.')

    # Sentence 5: closing
    sentences.append('Et sunt og smakfullt valg som mange liker.')

    # Join and ensure spacing
    out = ' '.join(s.strip() for s in sentences if s)
    # Clean multiple spaces
    out = re.sub(r'\s+', ' ', out).strip()
    return out


def process(input_path: Path, output_path: Path):
    input_path = Path(input_path)
    output_path = Path(output_path)
    with input_path.open('r', encoding='utf-8') as inf, output_path.open('w', encoding='utf-8') as outf:
        for line in inf:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except Exception:
                # If the file contains non-json lines (e.g., fences), skip
                continue
            fields = obj.get('fields') or obj.get('fields', {})
            # Support both top-level 'fields' or nested under 'put' object
            if 'fields' in obj:
                f = obj['fields']
            else:
                # fallback: try to find nested structure
                f = obj.get('put') and obj.get('fields') or obj

            if isinstance(f, dict) and 'description' in f:
                name = f.get('name', '')
                desc = f.get('description', '')
                new_desc = expand_description(name, desc)
                cats = infer_categories(name, desc)
                f['description'] = new_desc
                f['categories'] = cats
                obj['fields'] = f

            outf.write(json.dumps(obj, ensure_ascii=False) + '\n')


if __name__ == '__main__':
    if not INPUT.exists():
        print(f'Input file not found: {INPUT}')
        raise SystemExit(1)
    print(f'Processing {INPUT} -> {OUTPUT}')
    process(INPUT, OUTPUT)
    print('Done.')
