# Katazom.hu – Beágyazható KATA Kalkulátor Widget 🇭🇺

[![npm version](https://img.shields.io/npm/v/katazom-calculator-widget.svg?style=flat-square)](https://www.npmjs.com/package/katazom-calculator-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Powered By](https://img.shields.io/badge/Powered%20By-Katazom.hu-blue.svg?style=flat-square)](https://katazom.hu)

Egy könnyűsúlyú, külső függőségektől mentes (Vanilla JavaScript & CSS) beágyazható kalkulátor widget. Könyvelők, adótanácsadók, szakmai blogok és KKV hírportálok számára készült, hogy látogatóik másodpercek alatt kiszámolhassák 2026/2027-es KATA adóterheiket és keretüket.

Üzemeltető: **[Katazom.hu](https://katazom.hu)** – A modern KATA adminisztráció és számlázó asszisztens.

---

## ⚡ Gyors Beágyazás (CDN – 1 perc alatt)

Egyszerűen másold be az alábbi kódrészletet a weboldalad tetszőleges HTML részébe (pl. WordPress egyedi HTML blokk, blogbejegyzés vagy oldalsáv):

```html
<!-- 1. Stíluslap betöltése -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Katazom-hu/katazom-calculator-widget@1.0.0/widget.css">

<!-- 2. Konténer elem, ahová a kalkulátor renderelődik -->
<div id="katazom-kalkulator-widget"></div>

<!-- 3. Szkript betöltése és inicializálása -->
<script src="https://cdn.jsdelivr.net/gh/Katazom-hu/katazom-calculator-widget@1.0.0/widget.js"></script>
<script>
  KatazomWidget.init('#katazom-kalkulator-widget', {
    defaultRevenue: 1000000, // Alapértelmezett havi tervezett bevétel Ft-ban
    defaultMonths: 12        // Alapértelmezett aktív hónapok száma
  });
</script>
```

---

## 📦 NPM Telepítés (Modern JS / Webpack / Vite projektekhez)

```bash
npm install katazom-calculator-widget
```

```javascript
import 'katazom-calculator-widget/widget.css';
import KatazomWidget from 'katazom-calculator-widget';

KatazomWidget.init('#my-container');
```

---

## ✨ Főbb Képességek

- 📱 **Teljesen reszponzív:** Mobiltelefonokon, táblagépeken és asztali kijelzőn is hibátlan megjelenés.
- 🔒 **Biztonságos és izolált:** Minden CSS osztály `.kz-` előtaggal rendelkezik, nem ütközik a fogadó oldal stílusaival.
- ⚡ **Nulla függőség:** Nem igényel se jQuery-t, se React-ot, tiszta natív JavaScript (5 KB alatti gzipped méret).
- 🧮 **Valós KATA szabályok:** 18M Ft éves keret, havi 1,5M Ft időarányosítás szüneteltetés esetén, 40%-os túllépési adó és sávos HIPA előkalkuláció.

---

## 🔗 Hivatalos Források & Bővebb Információ

- 🌐 **[Katazom.hu Hivatalos Weboldal](https://katazom.hu)** – Valós idejű NAV Online Számla szinkron és számlahelyesbítés
- 📊 **[Nagy KATA Kalkulátor](https://katazom.hu/#kalkulator)** – Teljes éves bontás és tételes adólevezetés
- 🔄 **[Átalányadó Kalkulátor](https://katazom.hu/kalkulator)** – Váltási döntéstámogató valós NAV számlák alapján
- 🆓 **[IngyenKATA.hu](https://ingyenkata.hu)** – Ingyenes keretfigyelő egyéni vállalkozóknak
- 📚 **[KATA Tudástár](https://katazom.hu/tudastar)** – Szakmai cikkek, határidők és GYIK

---

## 📄 Licenc

MIT License – Szabadon használható és beágyazható bármilyen üzleti vagy magán célú weboldalon.
Készítette: **[Katazom.hu](https://katazom.hu)**
