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
├── merci.html              # Page de confirmation après envoi du formulaire
├── server.js               # Petit serveur statique de dev (npm run dev)
├── assets/
│   ├── cv/
│   │   └── MEBADA_NDZIE_LOUIS_GILDAS_CV.pdf  # CV téléchargé depuis le hero
│   └── img/
│       ├── photo-square.jpg     # Portrait recadré 480×480 (hero)
│       ├── og-image.png         # Aperçu 1200×630 des partages (og:image)
│       └── portrait-original.jpg # Photo d'origine (non affichée par le site)
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

Toute l'identité visuelle se règle dans **`scss/abstracts/_variables.scss`** :

- `$color-accent` : couleur principale (vert tech) ;
- `$color-amber` : couleur secondaire (ocre « terre », clin d'œil agropastoral) ;
- `$font-heading` / `$font-body` / `$font-mono` : polices ;
- `$breakpoints` : points de rupture responsive.

Change une variable, recompile, c'est reflété partout.

## ✏️ Reste à faire

- [x] **Photo de profil** — intégrée dans le hero (`assets/img/`) ;
- [x] **E-mail** — `mebadandzielouisgildas@gmail.com` (formulaire + liens directs) ;
- [x] **CV téléchargeable** — `assets/cv/` + bouton dans le hero ;
- [x] **Aperçu de partage** — `og-image.png` 1200×630 + balises Open Graph / Twitter ;
- [ ] **LinkedIn** — le bouton est prêt mais commenté dans `index.html` (section Contact,
      bloc `contact-alt`) : renseigner l'URL puis décommenter ;
- [ ] **Descriptions des projets** — les 3 cartes « SnapFace / Argent Bank / Gestion des
      tâches » ont été décrites à partir de la structure des dépôts, pas du code lui-même :
      à relire et enrichir (capture d'écran, ce que le projet fait vraiment) ;
- [ ] **READMEs GitHub** — aucun dépôt n'a de description ni de README : c'est la première
      chose qu'un recruteur regarde sur le profil.

### Régénérer l'image d'aperçu

`og-image.png` est générée par un script (`sharp` + SVG). À relancer si le portrait ou le
titre changent :

```bash
node tools/make-og.js
```

## 📬 Formulaire de contact (Netlify Forms)

Le formulaire de la section Contact n'a **aucun backend** : il est pris en charge nativement
par Netlify. Le `<form>` porte `data-netlify="true"`, un `name="contact"` et une redirection
`action="/merci.html"` vers la page de confirmation.

> ⚠️ **Prérequis, une seule fois** : dans Netlify, *Forms* → **Enable form detection**,
> puis **redéployer**. Sans cette activation, l'envoi renvoie une page 404.
>
> Ensuite : les messages arrivent dans *Forms → Submissions*, et par e-mail si vous ajoutez
> une notification via *Forms → Submission notifications → Add notification*.

Ce choix remplace **FormSubmit**, qui exigeait une activation par e-mail au premier envoi —
tant que ce lien n'était pas cliqué, toutes les soumissions étaient silencieusement perdues.

Limite de l'offre Netlify : 100 soumissions par mois. Le formulaire ne fonctionne que sur
**Netlify** (pas sur GitHub Pages).

Pour changer d'adresse e-mail, modifie 2 endroits dans `index.html` :

1. le lien `mailto:` de la zone « contact-alt » ;
2. la carte « E-mail » des `contact-cards`.

(L'adresse de réception des messages se règle dans les notifications Netlify, pas dans le HTML.)

## 🌍 Déploiement

Site 100 % statique, hébergé en **production sur Netlify** :
<https://portfolio-gildas.netlify.app> (c'est cette URL qui sert de `canonical` et d'URL
Open Graph).

- **Netlify** — hébergement actuel, redéploiement automatique depuis le dépôt GitHub ;
- **GitHub Pages** — un workflow (`.github/workflows/deploy-pages.yml`) publie aussi le
  site à chaque push sur `main`. ⚠️ Il nécessite **une seule activation manuelle** :
  *Settings → Pages → Source = « GitHub Actions »*. Sans ce réglage, le workflow échoue à
  l'étape « Configurer Pages » (le jeton d'action n'a pas le droit d'activer Pages lui-même).
- Pense à commiter le `css/main.css` compilé pour que l'hébergeur n'ait rien à builder.

---

Conçu et codé à Yaoundé 🇨🇲 — *« Allier la terre et la tech pour nourrir l'avenir. »*
