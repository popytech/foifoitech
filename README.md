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
| Emails | API REST Resend (appel `fetch`, sans dépendance npm) |
| Gestionnaire de paquets | pnpm |

---

## Démarrage

```bash
pnpm install
cp .env.example .env.local   # puis renseigner les variables
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

Toutes décrites dans [`.env.example`](.env.example). En production, **deux sont
indispensables** :

| Variable | Rôle | Si absente |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, og:url, sitemap) | URLs SEO en `localhost` |
| `RESEND_API_KEY` | Envoi des demandes du formulaire | Le formulaire renvoie une erreur au visiteur |
| `CONTACT_FROM_EMAIL` | Expéditeur (domaine vérifié Resend) | Repli sur `onboarding@resend.dev` |
| `CONTACT_TO_EMAILS` | Destinataires | Repli sur les deux emails FÖFÖÏ TECH |

### Configurer Resend

1. Créer un compte sur [resend.com](https://resend.com).
2. **Domains → Add Domain** : ajouter le domaine du site et publier les
   enregistrements DNS (SPF, DKIM) fournis par Resend.
3. **API Keys → Create** : copier la clé dans `RESEND_API_KEY`.
4. Définir `CONTACT_FROM_EMAIL` sur une adresse **de ce domaine vérifié**.

Sans domaine vérifié, l'expéditeur de test `onboarding@resend.dev` fonctionne
mais n'envoie qu'à l'adresse du titulaire du compte Resend — suffisant pour une
recette, pas pour la production.

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
| Formulaire de contact fonctionnel | ✅ (validation, anti-spam, limitation de débit) |
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
2. Renseigner les variables d'environnement (**Settings → Environment Variables**).
3. Déployer — build et commande de démarrage sont détectés automatiquement.
4. Brancher le nom de domaine dans **Settings → Domains**.

### Netlify

Le fichier `netlify.toml` est présent. Ajouter le plugin
`@netlify/plugin-nextjs` et les mêmes variables d'environnement.

### Après mise en ligne

- [ ] Renseigner l'hébergeur retenu dans `src/content/mentions-legales.md`
      (section « Hébergement du site », actuellement à compléter).
- [ ] Vérifier que `NEXT_PUBLIC_SITE_URL` pointe le domaine final, puis
      contrôler `/sitemap.xml` et `/robots.txt`.
- [ ] Soumettre le sitemap dans Google Search Console.
- [ ] Envoyer une demande test via le formulaire et confirmer la réception sur
      les deux adresses.
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
