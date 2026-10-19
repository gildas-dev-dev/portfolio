# Portfolio — Louis Gildas MEBADA NDZIE

Portfolio professionnel de **MEBADA NDZIE Louis Gildas**, développeur frontend Angular & contrôle qualité chez Advance IT Group (Yaoundé, Cameroun).

Site one-page responsive construit en **HTML5, SCSS et JavaScript vanilla** — sans framework, sans dépendance frontend.

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances (uniquement le compilateur Sass)
npm install

# 2. Compiler le SCSS
npm run build

# 3. Travailler avec recompilation automatique
npm run watch
```

Puis ouvre simplement `index.html` dans ton navigateur, ou lance un petit serveur local :

```bash
npx serve .
# ou
python -m http.server 4173
```

## 📦 Scripts npm

| Script             | Rôle                                  |
| ------------------ | ------------------------------------- |
| `npm run build`    | Compile `scss/main.scss` → `css/main.css` |
| `npm run watch`    | Recompile automatiquement à chaque modification |
| `npm run dev`      | Compile + sert le site sur `localhost:4173` |

## 🗂️ Structure du projet

```
portfolio/
├── index.html              # Page unique (toutes les sections)
├── server.js               # Petit serveur statique de dev (npm run dev)
├── assets/
│   └── img/
│       ├── photo-square.jpg     # Portrait recadré 480×480 (hero)
│       └── portrait-original.jpg # Photo d'origine
├── css/
│   └── main.css            # CSS compilé (ne pas éditer à la main)
├── js/
│   └── main.js             # Nav mobile, apparitions au scroll, machine à écrire
└── scss/                   # Pattern 7-1 simplifié
    ├── main.scss           # Point d'entrée — @use de tous les partials
    ├── abstracts/          # Aucun CSS généré
    │   ├── _variables.scss # Couleurs, typos, rayons, breakpoints ← identité visuelle
    │   ├── _mixins.scss    # container, respond-to, flex, grid-auto…
    │   └── _index.scss     # Re-exporte variables + mixins
    ├── base/
    │   ├── _reset.scss     # Reset cross-navigateur
    │   └── _base.scss      # Body, typographie, utilitaires (.reveal, .container…)
    ├── layout/
    │   ├── _header.scss    # Nav fixe : burger < 1024px, liens inline ≥ 1024px
    │   └── _footer.scss    # Pied de page + bouton retour en haut
    ├── components/
    │   ├── _buttons.scss   # .btn--primary, .btn--ghost, .pill
    │   └── _tags.scss      # .tag (badges techno), .card, .icon-badge
    └── sections/           # Une feuille par section de la page
        ├── _hero.scss
        ├── _about.scss
        ├── _skills.scss
        ├── _experience.scss
        ├── _projects.scss
        ├── _method.scss
        ├── _education.scss
        └── _contact.scss
```

### Changer la photo du hero

Remplace `assets/img/portrait-original.jpg` par ta nouvelle photo, puis régénère le
recadrage carré (visage centré) :

```bash
node -e "require('sharp')('assets/img/portrait-original.jpg').extract({left:192,top:49,width:518,height:518}).resize(480,480).jpeg({quality:84,mozjpeg:true}).toFile('assets/img/photo-square.jpg')"
```

(Adjuste `left/top/width/height` si le cadrage ne convient pas — ce sont des pixels
sur l'image d'origine.)

## 🎨 Personnaliser le thème

Tout l'identité visuelle se règle dans **`scss/abstracts/_variables.scss`** :

- `$color-accent` : couleur principale (vert tech) ;
- `$color-amber` : couleur secondaire (ocre « terre », clin d'œil agropastoral) ;
- `$font-heading` / `$font-body` / `$font-mono` : polices ;
- `$breakpoints` : points de rupture responsive.

Change une variable, recompile, c'est reflété partout.

## ✏️ Champs à compléter avant mise en ligne

- [x] **Photo de profil** — intégrée dans le hero (`assets/img/`) ;
- [x] **E-mail** — `mebadandzielouisgildas@gmail.com` (formulaire + liens directs) ;
- [ ] **LinkedIn / autres liens** : section contact;
- [ ] **Projets** : ajouter des cartes au fur et à mesure des dépôts GitHub publiés.

## 📬 Formulaire de contact (FormSubmit)

Le formulaire de la section Contact n'a **aucun backend** : il poste les messages sur
[formsubmit.co](https://formsubmit.co), qui les relaie sur `mebadandzielouisgildas@gmail.com`.

> ⚠️ **Première utilisation** : le tout premier envoi du formulaire déclenche un
> **e-mail d'activation** de FormSubmit sur ta boîte — clique sur le lien qu'il contient
> (une seule fois). Ensuite, tous les messages du site arrivent directement dans ta boîte.

Pour changer d'adresse e-mail, modifie 3 endroits dans `index.html` :

1. l'attribut `action` du `<form class="contact-form">` ;
2. le lien `mailto:` de la zone « contact-alt » ;
3. la carte « E-mail » des `contact-cards`.

## 🌍 Déploiement

Site 100 % statique : n'importe quel hébergeur statique convient.

- **GitHub Pages** : pousse le dossier sur un dépôt `ton-pseudo.github.io`, ou Settings → Pages;
- **Netlify / Vercel** : glisser-déposer le dossier, rien à configurer;
- Pense à commiter le `css/main.css` compilé pour que l'hébergeur n'ait rien à build.

---

Conçu et codé à Yaoundé 🇨🇲 — *« Allier la terre et la tech pour nourrir l'avenir. »*
