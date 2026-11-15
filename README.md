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
| Emails | [Web3Forms](https://web3forms.com) (appel `fetch` depuis le navigateur, sans serveur) |
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

## Variable d'environnement

| Variable | Rôle | Si absente |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, og:url, sitemap) | URLs SEO en `localhost` |

---

## Formulaire de contact (Web3Forms)

Toutes les demandes — **contact, demande de devis, inscription à une formation**
— passent par la page `/contact` et sont envoyées à **deux boîtes** :
`directeur@foifoitech.com` et `contact@foifoitech.com`.

L'envoi part directement du navigateur vers Web3Forms (pas de serveur, pas de
variable d'environnement) : la page Contact est une page statique, présente sur
n'importe quel hébergement.

Une clé d'accès Web3Forms est liée à **une seule** adresse. Il faut donc une clé
par boîte, et le site envoie chaque demande une fois par clé :

1. Aller sur [web3forms.com](https://web3forms.com) → **Create your Access Key**.
2. Saisir `directeur@foifoitech.com` : la clé arrive dans cette boîte.
3. Recommencer avec `contact@foifoitech.com`.
4. Coller chaque clé dans `src/config/config.json` :

   ```json
   "web3forms": {
     "endpoint": "https://api.web3forms.com/submit",
     "recipients": [
       { "label": "directeur@foifoitech.com", "access_key": "CLÉ-DIRECTEUR" },
       { "label": "contact@foifoitech.com",   "access_key": "CLÉ-CONTACT" }
     ]
   }
   ```

   Les clés d'accès Web3Forms sont publiques par conception : elles peuvent
   figurer dans le code du site.
5. Pousser sur GitHub, puis envoyer une demande test depuis `/contact` et
   vérifier la réception **dans les deux boîtes**.

Tant qu'aucune clé n'est renseignée, le formulaire affiche un message invitant le
visiteur à écrire à `contact@foifoitech.com` ou à appeler. Si une seule clé est
renseignée, seule cette boîte reçoit les demandes.

Offre gratuite Web3Forms : 250 envois par mois **et par clé**. Pas de pièce
jointe sur l'offre gratuite.

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
| Formulaire de contact fonctionnel | ✅ (validation, anti-spam par pot de miel, envoi Web3Forms vers 2 boîtes) |
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
2. Renseigner `NEXT_PUBLIC_SITE_URL` (**Settings → Environment Variables**).
3. Déployer — build et commande de démarrage sont détectés automatiquement.
4. Brancher le nom de domaine dans **Settings → Domains**.

### Netlify

Le fichier `netlify.toml` est présent. Ajouter le plugin
`@netlify/plugin-nextjs` et la variable d'environnement `NEXT_PUBLIC_SITE_URL`.

### Après mise en ligne

- [ ] Renseigner l'hébergeur retenu dans `src/content/mentions-legales.md`
      (section « Hébergement du site », actuellement à compléter).
- [ ] Vérifier que `NEXT_PUBLIC_SITE_URL` pointe le domaine final, puis
      contrôler `/sitemap.xml` et `/robots.txt`.
- [ ] Soumettre le sitemap dans Google Search Console.
- [ ] Renseigner les deux clés Web3Forms (voir « Formulaire de contact »), puis
      envoyer une demande test et confirmer la réception sur les deux adresses.
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
