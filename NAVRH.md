# Návrh únikové hry — *guihetta*

Tento dokument je návrh (design) únikové hry. Popisuje téma, všechny stránky,
úkoly (hádanky) na nich a grafickou podobu stránek.

---

## 1. Téma

Hra se odehrává ve světě hudebního projektu **YABUJIN** a jeho smyšleného
světa **Azeroy**. Hráč se probudí na poli a nemá paměť. Po někom, kdo zmizel —
po postavě jménem **Guihetta** — zůstaly stopy: bunkr, terminál, archiv fóra,
brána do jiného světa, vysílač a sbírka útržků.

Hráč prochází místnostmi (stránkami), v každé řeší úkol a získá jedno **slovo
(útržek)**. Pět útržků dohromady (**NODE · SIGNAL · AZEROY · BLOOD · RETURN**)
otevře poslední stránku — východ.

Atmosféra: temná, osamělá, „lo-fi internet" / webcore — staré CRT obrazovky,
archivovaná fóra z roku 2019, šum, signál. Příběh je o samotě, o světě, který
žádá příliš mnoho, a o tom, jak mysl skládá smysl z trosek.

**Skrytá vrstva:** napříč stránkami je schované slovo **INTHA** (po jednom
písmenu, téměř neviditelně). Kdo ho najde a na poslední stránce ho napíše,
odemkne skryté zakončení (easter egg).

---

## 2. Seznam stránek

| Soubor        | Místnost        | Úkol                          | Odměna (útržek) |
|---------------|-----------------|-------------------------------|-----------------|
| `index.html`  | Pole            | Klikací pozadí (mapa obrázku) | — (vstup)       |
| `clue1.html`  | Bunkr           | Číselný zámek z nápisů na zdi | (kód 1616)      |
| `clue2.html`  | Terminál        | Skrytý soubor + ROT13 šifra   | **NODE**        |
| `clue3.html`  | Archiv fóra     | Akrostich v příspěvku         | **SIGNAL**      |
| `clue4.html`  | Brána (Azeroy)  | Čtení nápisu z více abeced    | **AZEROY**      |
| `clue5.html`  | Vysílání        | Nápověda ve formě **videa**   | **BLOOD**       |
| `clue6.html`  | Zrcadlo         | Výběr 3 pravých textů z 6     | **RETURN**      |
| `exit.html`   | Východ          | Zadání všech 5 útržků + konec | — (finále)      |

Celkem 8 stránek (požadavek je min. 6).

---

## 3. Úkoly na jednotlivých stránkách

### index.html — Pole
- **Klikací pozadí** (image map): obrázek pole s několika klikatelnými
  oblastmi. Jen jedna (vstup do bunkru) vede dál na `clue1.html`. Ostatní jsou
  slepé uličky — po kliknutí ukážou krátký text (popup), ale nikam nevedou.
- Text úvodu je **zarovnaný na střed**.
- Skryté písmeno **I** ze slova INTHA.

### clue1.html — Bunkr
- Na fotce vnitřku bunkru jsou rozmístěná čísla (graffiti). Některá jsou
  návnady, čtyři tvoří kód **1616**. Nápověda na zdi vysvětluje, že v Azeroy
  „1 a 6 = chaos, 8 = hojnost".
- Hráč zadá kód na klávesnici (keypad). Správně → odemkne se cesta dál.
- Nápověda ve formě **obrázku** (foto bunkru zvenku i zevnitř).
- Skryté písmeno **N**.

### clue2.html — Terminál
- Funkční „terminál" (CRT). Hráč píše příkazy: `ls`, `cat note.txt`, `ls -a`
  (odhalí skrytý soubor `.echo`), `cat .echo` → text `ABQR`.
- `note.txt` prozradí kódování: **caesar+13 (ROT13)**. `ABQR` po ROT13 = **NODE**.
- Hráč zadá `NODE`. Skryté písmeno **T**.

### clue3.html — Archiv fóra
- Archivované fórum z roku 2019. V posledním Guihettině příspěvku je
  **akrostich**: první písmena šesti vět tvoří **SIGNAL**.
- Moderátorská poznámka „unusual structure" hráče navede.
- Skryté písmeno **H**.

### clue4.html — Brána (Azeroy)
- Na bráně je nápis ze **šesti znaků z reálných neлатinских abeced**
  (Starší futhark, hebrejština, řečtina): `ᚨ ז ε ᚱ ᛟ υ` → přečteno = **AZEROY**.
- Hráč musí písmena rozluštit podle skutečných abeced. Žádný klíč na stránce.
- Skryté písmeno **H** (záložní).

### clue5.html — Vysílání
- **Nápověda ve formě videa** (vložené YouTube — YABUJIN „GARDEN").
- Refrén obsahuje text „garden of **blood**". Hráč zadá **BLOOD**.
- Skryté písmeno **A**.

### clue6.html — Zrcadlo
- Šest karet s útržky textů. Tři jsou skutečné texty písně GARDEN, tři jsou
  vymyšlené. Hráč vybere ty tři pravé → získá **RETURN**.
- Při každém špatném pokusu se karty **zamíchají** a hra neprozradí, které
  byly správně (vyšší obtížnost).

### exit.html — Východ
- Hráč zadá všech 5 útržků: **NODE · SIGNAL · AZEROY · BLOOD · RETURN**.
- Správně → epilog (normální, smutné zakončení).
- Skryté: napsat na klávesnici **INTHA** → skryté zakončení (easter egg
  s videem).

---

## 4. Grafický návrh (jak má hra vypadat)

### Barvy
- Pozadí: téměř černá s nádechem modré (`#04040a`).
- Text: tlumeně šedo-fialová (`#b8b8cc`), nadpisy ještě tmavší.
- Akcent: temně červená (`#6e0016`) — rámečky, chyby, odměny.
- Každá místnost má drobně posunutý odstín pozadí (terminál = zelenavý,
  Azeroy = modro-fialový).

### Typografie
- Jednotné **monospace** písmo (Courier) — působí jako stará konzole/terminál.
- Nadpisy malými písmeny, s velkým prostrkáním (letter-spacing), styl `// room_0X //`.
- Zvýraznění textu: **tučně** (`<strong>`) a *kurzívou* (`<em>`) — v příběhu.

### Layout
- Vycentrovaný sloupec obsahu (max. šířka ~820px), hodně volného místa.
- Úvodní stránka: velký klikací obrázek nahoře, vycentrovaný text pod ním.
- Místnosti: nadpis → příběh → „widget" úkolu (keypad / terminál / fórum /
  brána / video / karty) → pole pro odpověď → odměna.
- Tlačítko **„návrat na úvodní stránku"** vlevo nahoře na každé stránce
  (kromě index). Po najetí myší ukáže text „Návrat na úvodní stránku".

### Efekty / atmosféra
- Přes celou obrazovku jemné **CRT scanline** linky (čisté CSS).
- Pulzující kroužek na index obrázku ukazuje, kam kliknout.
- Decentní SVG ozdoby (oko, kříž, signální vlny) v rozích scén.
- Skrytá písmena INTHA: barva skoro splývá s pozadím, jdou jen označit myší.

### Skica rozložení místnosti

```
┌──────────────────────────────────────────┐
│ [← návrat na úvodní stránku]               │
│                                            │
│ // room_0X //                              │
│ příběhový odstavec…                        │
│                                            │
│ ┌─── widget úkolu (obrázek / terminál) ──┐ │
│ │                                        │ │
│ └────────────────────────────────────────┘ │
│ [ pole pro odpověď ] [ odeslat ]           │
│ → po vyřešení: ODMĚNA + odkaz dál          │
└──────────────────────────────────────────┘
```

---

## 5. Technické poznámky

- Čistě statické HTML/CSS/JS, bez build kroku a knihoven.
- Sdílený `style.css` (design tokeny) + drobné úpravy v `<style>` na stránce.
- Odpovědi nejsou ve zdroji v čitelné podobě — porovnává se **SHA-256 otisk**
  (`sha.js`), aby nešlo podvádět přes „zobrazit zdroj".
- Postup hráče se v rámci jedné záložky pamatuje (`sessionStorage`),
  po zavření záložky se resetuje.
- `lang="cs"` na všech stránkách.
