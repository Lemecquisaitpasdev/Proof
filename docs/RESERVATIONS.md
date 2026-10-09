# Réservations — test de marché sans paiement

Avant la première production, le site ne vend pas : il **réserve**. Le
visiteur choisit 1 à 3 flacons, laisse son e-mail, s'engage sur le prix
(« I commit to buy at $85 per bottle when Batch 017 ships ») et reçoit un
**numéro de réservation** tiré au sort entre 001 et 500.

- Aucune carte, aucun paiement : pas besoin d'opérateur ni de société.
- Le numéro est aléatoire, jamais le rang réel, et **unique** : il ne peut
  pas être attribué deux fois, même à deux réservations simultanées.
  Au-delà de 500, la série suivante s'ouvre (Batch 018, de nouveau 001–500).
- Un même e-mail garde toujours son numéro ; s'il revient, seule la quantité
  est mise à jour.
- Anti-abus : un champ piège invisible pour les robots, et 8 envois au plus
  par connexion et par heure.

Parcours : bouton « Reserve your protocol » (fiche du gel, card de l'accueil,
panier) → `/reserve` → certificat « Reservation Nº 247 · Batch 017 ».

## Activer (5 minutes, gratuit)

Sans stockage, la page s'affiche mais répond « Reservations open in a
moment » : rien n'est perdu, rien n'est enregistré.

1. **Stockage** — Vercel → le projet → **Storage** → **Create Database** →
   **Upstash (Redis)** ou **Redis (Redis Cloud)**, offre gratuite, région
   proche des visiteurs (ex. Washington D.C. / us-east-1 pour les
   États-Unis) → Create. Puis **Connect Project** : projet `proof`,
   environnements **Production et Preview** (et Development si besoin).
   Le préfixe proposé (ex. `STORAGE`) peut rester tel quel : le code
   reconnaît les deux familles de variables, quel que soit le préfixe :
   - Upstash : `KV_REST_API_URL` + `KV_REST_API_TOKEN` (ou
     `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`) ;
   - Redis Cloud : une URL `redis://` ou `rediss://` (`REDIS_URL`, ou
     `STORAGE_URL` avec le préfixe).
2. **Clé d'export** — Settings → **Environment Variables** → ajouter
   `RESERVATIONS_ADMIN_KEY`, une longue chaîne aléatoire connue de toi seul,
   pour les trois environnements.
3. **Redéployer** — Deployments → le plus récent → « ⋯ » → **Redeploy** :
   les variables ne s'appliquent qu'aux déploiements suivants.
4. **Tester** — faire une réservation sur `/reserve`, puis ouvrir le lien
   d'export (ci-dessous) : elle doit y figurer. Pour l'effacer ensuite,
   voir « Données personnelles ».

## Suivre et exporter

- **Liste complète (CSV)** :
  `https://<ton-site>/api/reserve/export?key=<RESERVATIONS_ADMIN_KEY>`
  Colonnes : reservation, batch, email, quantity, product, created_at.
  Garde ce lien privé : il donne accès aux e-mails.
- En direct : la console de la base (Upstash : Data Browser ; Redis Cloud :
  Redis Insight), clé `proof:reservations`.

## E-mail de confirmation (facultatif)

Sans configuration, le numéro s'affiche à l'écran (et reste sur l'appareil
du visiteur). Pour envoyer aussi une confirmation par e-mail :

1. Créer un compte **Resend** et y vérifier ton nom de domaine.
2. Ajouter dans Vercel :
   - `RESEND_API_KEY`
   - `RESERVE_FROM_EMAIL`, ex. `Proof <reserve@ton-domaine.com>`
   - `RESERVE_REPLY_TO` (facultatif), l'adresse qui reçoit les réponses
3. Redéployer. Un envoi raté ne bloque jamais une réservation.

## Le jour du lancement

1. Exporter le CSV.
2. Envoyer à la liste l'e-mail de lancement avec le lien de paiement (Stripe
   Payment Link, une fois la société et le compte créés). La réservation tient
   **48 h** après cet e-mail.
3. Fermer les réservations : `open: false` dans `lib/reserve.ts`. Les boutons
   reviennent au panier.

## Données personnelles

Seuls l'e-mail, la quantité, le numéro et la date sont conservés (pas d'IP).
Pour supprimer quelqu'un sur demande : dans la console de la base, clé
`proof:reservations`, supprimer le champ de son e-mail.

## Où est le code

| Fichier | Rôle |
|---|---|
| `lib/reserve.ts` | Réglages : série, taille du lot, quantité max, durée de maintien |
| `lib/reservations-store.ts` | Stockage Redis (Upstash ou Redis Cloud), tirage des numéros, anti-abus |
| `lib/reservations-mail.ts` | E-mail de confirmation (Resend), facultatif |
| `app/api/reserve/route.ts` | API de réservation |
| `app/api/reserve/export/route.ts` | Export CSV protégé |
| `components/ReserveForm.tsx` | Formulaire et certificat |
