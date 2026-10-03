# PHONE 229 — site vitrine

Site statique (HTML, CSS, un peu de JavaScript sans dépendance) pour la boutique PHONE 229 à Cotonou.

## Pages
- `index.html` : accueil
- `catalogue.html` : catalogue avec recherche, filtre par marque et par catégorie
- `produit.html?id=...` : fiche produit (une seule page qui affiche le produit demandé)
- `contact.html` : coordonnées, horaires, WhatsApp, carte

## Modifier le contenu
- **Produits** : `js/produits.js` (prix, stockage, RAM, état, description, photo).
- **Coordonnées, WhatsApp, horaires, réseaux sociaux** : `js/boutique.js`. Toutes les pages lisent ces valeurs.
- **Photos** : créer un dossier `images/`, y déposer la photo puis renseigner `image: "images/fichier.jpg"` dans le produit. Sans photo, un visuel provisoire est dessiné.

## Charte graphique
| Rôle | Couleur |
|---|---|
| Bleu lagune (principal) | `#0B3B5B` |
| Jaune zémidjan (étiquettes, accents) | `#FFC629` |
| Encre (texte) | `#0F1B26` |
| Ciment (fond) | `#EEF1F0` |
| Vert WhatsApp / Neuf | `#1A8A4C` |

Polices (Google Fonts) : **Archivo** élargi pour les titres et le logo, **Instrument Sans** pour le texte, **IBM Plex Mono** pour les prix et les caractéristiques.

## Lancer en local
Double-cliquer sur `index.html` suffit. Pour tester dans des conditions proches d'un vrai hébergement :

```bash
npx http-server -p 5229 -c-1
```

Puis ouvrir http://localhost:5229.

## À faire avant la mise en ligne
- Remplacer les coordonnées fictives dans `js/boutique.js`
- Remplacer les avis clients d'exemple dans `index.html`
- Confirmer les durées de garantie (`GARANTIE` dans `js/main.js`) et les services proposés
- Ajouter les vraies photos et vérifier les prix
