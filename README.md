# powernight.fr

Site statique (HTML/CSS/JS) des soirées Power Night, organisé par My Pitch Academy.

- `index.html` : page d'accueil (Cyber Power Night, 10/12/2026 19h, compte à rebours)
- `mentions-legales.html` : mentions légales
- `assets/` : styles, scripts, polices (Poppins hébergée localement), images

## Mise en ligne (OVH)
Déposer tout le contenu du dossier dans le dossier racine du multisite `powernight.fr`
(FTP ou déploiement Git OVH).

## Liens de paiement
Remplacer `href` des boutons portant l'attribut `data-payment` par le lien Stripe / SumUp / PayPal.

## Éditions passées (editions.html)
1. Déposer photos/vidéos dans `assets/events/<edition>/`
2. Les déclarer dans `assets/js/events-data.js` (exemples commentés dans le fichier)
3. Nouvelle édition : copier un bloc `{ ... }` en haut de la liste
