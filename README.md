# Site web FÖFÖÏ TECH

Site vitrine institutionnel de **FÖFÖÏ TECH SARLU** — BTP, informatique et
services techniques, Somaya-Fory, Commune de Coyah, Conakry (Guinée).

> Réalisé par **POPY TECH** — base technique : template Bigspring Light (Next.js),
> intégralement adapté au contenu et à l'identité FÖFÖÏ TECH.

---

## Stack

| Élément | Choix |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styles | Tailwind CSS 4 |
| Contenu | Markdown (`src/content/`) + front-matter |
| Emails | SMTP direct via Nodemailer, depuis la boîte mail de l'entreprise |
| Gestionnaire de paquets | pnpm |

---

## Démarrage

```bash
pnpm install
pnpm dev                     # http://localhost:3000
```

Autres commandes :

```bash
pnpm build     # build de production (génère le thème puis compile)
pnpm start     # sert le build de production
pnpm lint      # ESLint
```

---

## Variables d'environnement

Modèle dans [`.env.example`](.env.example). En production, elles se définissent chez
l'hébergeur (jamais dans le code ni sur GitHub) :

| Variable | Rôle | Si absente |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, og:url, sitemap) | URLs SEO en `localhost` |
| `SMTP_USER` | Boîte mail qui envoie les demandes (`contact@fofoitech.com`) | Le formulaire renvoie une erreur au visiteur |
| `SMTP_PASS` | Mot de passe de cette boîte | Idem |

Facultatives (valeurs par défaut adaptées à la messagerie LWS de fofoitech.com) :
`SMTP_HOST` (`mail.fofoitech.com`), `SMTP_PORT` (`465`), `SMTP_TLS_SERVERNAME`
(`mail.lwspanel.com`), `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAILS`.

---

## Formulaire de contact (envoi par SMTP)

Toutes les demandes — **contact, demande de devis, inscription à une formation**
— passent par la page `/contact`. Chaque demande est envoyée **par email, depuis la
boîte `contact@fofoitech.com`, à `directeur@fofoitech.com` et `contact@fofoitech.com`**.
Aucun service tiers : le site se connecte directement au serveur mail du domaine.

- La page `/contact` est statique (pré-générée) ; seule l'**envoi** passe par la route
  serveur `src/app/api/contact/route.js` (validation, pot de miel anti-robots,
  limitation à 5 envois / 10 min / IP). Il faut donc un hébergeur qui exécute du code
  serveur (Vercel, Netlify…), pas un simple dossier de fichiers statiques.
- En cliquant sur « Répondre » dans la boîte, on écrit directement au visiteur
  (`Reply-To`).
- Le certificat TLS du serveur LWS est émis pour `*.lwspanel.com` et non pour
  `mail.fofoitech.com` : le site valide donc le certificat contre `mail.lwspanel.com`
  (`SMTP_TLS_SERVERNAME`) au lieu de désactiver la vérification.

### Mise en route

1. Chez l'hébergeur du site, ajouter les variables **`SMTP_USER`**
   (`contact@fofoitech.com`) et **`SMTP_PASS`** (le mot de passe de cette boîte).
2. Redéployer le site (les variables ne sont prises en compte qu'à un nouveau déploiement).
3. Envoyer une demande test depuis `/contact` et vérifier la réception **dans les deux
   boîtes** (penser au dossier spam la première fois).
4. En local : copier `.env.example` en `.env.local` et renseigner les mêmes variables.
   Sans elles, la demande s'affiche dans la console au lieu d'être envoyée.

Si l'envoi échoue, le visiteur voit un message avec le téléphone et WhatsApp, et la
cause exacte est écrite dans les journaux de l'hébergeur (préfixe `[contact]`).

---

## Structure

```
src/
├── app/                  routes App Router
│   ├── page.js           accueil
│   ├── [regular]/        pages de contenu (à propos, services, équipe, contact, mentions légales)
│   ├── api/contact/      réception du formulaire
│   ├── sitemap.js        sitemap.xml
│   └── robots.js         robots.txt
├── content/              contenu éditable en Markdown
├── config/               config.json, menu.json, social.json, theme.json
├── layouts/              gabarits de page et composants
└── lib/                  parsing du contenu, envoi email, utilitaires
```

### Modifier le contenu

Les textes vivent dans `src/content/` — aucune intervention dans le code n'est
nécessaire. Une page = un fichier `.md`. Le `layout:` du front-matter choisit le
gabarit (`default`, `contact`, `equipe`).

Ajouter une page : créer le `.md`, puis ajouter l'entrée dans
`src/config/menu.json`. La route et le sitemap se génèrent automatiquement.

### Modifier la charte graphique

Le bleu institutionnel est défini **à un seul endroit** :
`src/config/theme.json` → `theme_color.primary` (actuellement `#0A4B8C`).
Le script `scripts/themeGenerator.mjs` propage la valeur dans le CSS au build.

---

## Conformité au cahier des charges

| Exigence CDC | État |
|---|---|
| 5 pages (Accueil, À propos, Services, Contact, Mentions légales) | ✅ + page Équipe dédiée |
| RCCM en pied de page sur toutes les pages | ✅ |
| NIF en mentions légales | ✅ |
| Formulaire de contact fonctionnel | ✅ (validation, anti-spam par pot de miel, limitation de débit, envoi SMTP vers 2 boîtes) |
| Bouton WhatsApp flottant | ✅ toutes pages → `wa.me/224625573434` |
| Carte Google Maps | ✅ embed sans clé API + lien itinéraire |
| Responsive mobile / tablette / desktop | ✅ |
| SEO (metas, H1/H2, sitemap.xml, favicon) | ✅ |
| Optimisation images / lazy loading | ✅ via `next/image` |
| Aucun contenu résiduel du template | ✅ purge complète |

---

## Déploiement

### Vercel (recommandé)

1. Importer le dépôt sur [vercel.com](https://vercel.com).
2. Renseigner `NEXT_PUBLIC_SITE_URL`, `SMTP_USER` et `SMTP_PASS` (**Settings → Environment Variables**).
3. Déployer — build et commande de démarrage sont détectés automatiquement.
4. Brancher le nom de domaine dans **Settings → Domains**.

### Netlify

Le fichier `netlify.toml` est présent. Ajouter le plugin
`@netlify/plugin-nextjs` et les variables d'environnement `NEXT_PUBLIC_SITE_URL`, `SMTP_USER`, `SMTP_PASS`.

### Après mise en ligne

- [ ] Renseigner l'hébergeur retenu dans `src/content/mentions-legales.md`
      (section « Hébergement du site », actuellement à compléter).
- [ ] Vérifier que `NEXT_PUBLIC_SITE_URL` pointe le domaine final, puis
      contrôler `/sitemap.xml` et `/robots.txt`.
- [ ] Soumettre le sitemap dans Google Search Console.
- [ ] Renseigner `SMTP_USER` / `SMTP_PASS` chez l'hébergeur (voir « Formulaire de contact »),
      puis envoyer une demande test et confirmer la réception sur les deux adresses.
- [ ] Vérifier que le +224 625 57 34 34 est bien actif sur WhatsApp Business.

---

## En attente du client

Éléments non fournis à ce jour, à intégrer avant la livraison finale :

- Photos de l'équipe (5 portraits) — des avatars à initiales sont affichés en
  attendant. Déposer les fichiers dans `public/images/` puis renseigner `img:`
  pour chaque membre dans `src/content/equipe.md`.
- Logo haute résolution (`public/images/logo.png` est provisoire).
- Validation des textes « Vision & Mission » et « Mot du Directeur Général ».
- Visuels de réalisations BTP, le cas échéant.
- Comptes de réseaux sociaux — à renseigner dans `src/config/social.json`
  (les champs vides ne s'affichent pas).

---

## Contacts projet

| Rôle | Contact |
|---|---|
| Agence — POPY TECH | Popy Traoré — +224 612 960 453 — popytech76@gmail.com |
| Client — Directeur Général | Nicolas KOUNDOUNO — FÖFÖÏ TECH |
| Emails opérationnels client | nicochristoine91@gmail.com · fofoitech22@gmail.com |
