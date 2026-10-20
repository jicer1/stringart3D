# stringart3D — 1.0.13

**Jacinto Costoso · 2026** — Atelier WebGL de portraits en fils continus.

Double-cliquer sur **Lancer stringart3D.bat**. Le lanceur démarre le serveur sur
**http://127.0.0.1:8793/** et ouvre le navigateur. Garder sa fenêtre ouverte.
Node.js est nécessaire ; le lanceur retrouve le runtime déjà présent sur cette
machine ou utilise le Node.js du PATH. Aucun paquet à installer.

L’interface reprend l’ambiance de **Poly** et les réglages de **StringArt 2D**.
Le moteur WebGL Babylon.js est inclus dans `vendor` : aucun CDN nécessaire.

- Portrait de Jacinto créé avec MakerWorld : 9 cadres, 528 clous, 2 752 passages, coloration bicolore.
- Vue à 360°, inclinaison, zoom, profils gauche/droit et volume source séparé.
- Clic droit glissé pour déplacer la vue ; recentrage et sauvegarde du déplacement.
- Agrandissement de la scène à la demande ; bouton Réglages et touche Échap pour retrouver les panneaux.
- Lecture du parcours, guide des clous, coloration volume/enveloppe/unicolore.
- Fil 3D à section circulaire : diamètre de 0,2 à 2 mm et renflement coloré de × 1 à × 10.
- Import STL binaire/ASCII, OBJ et GLB ; allègement local vers 80 000 triangles, avec annulation.
- Projet JSON complet et exports PNG, parcours CSV, coloration CSV, clous CSV.
- Bouton Démos et fenêtre de choix : autoportrait de Jacinto et buste d’Anne aux cheveux longs ; liste extensible.
- Démarrage avec tous les panneaux de réglage visibles.
- En-tête compact unique ; lecture et vitesse regroupées avec la progression, sous la 3D.
- Un seul accès Aide & crédits ; version dans l’en-tête, l’aide et le titre de l’onglet.
- Français, anglais, espagnol et catalan : détection automatique, sélecteur et aide traduite.

L’aide explique comment créer son buste avec MakerWorld Make My Statue,
puis importer son STL. La conversion photo → volume se fait sur MakerWorld ;
le pilotage Arduino n’est pas encore intégré. Les exports donnent des longueurs droites ; les tours de clous,
la tension, les collisions et l’épaisseur des supports restent à valider.

Voir **AIDE.md** pour les formats, les commandes et les limites du calcul.
Voir **CREDITS.txt** pour les attributions et les licences.

## Installer depuis GitHub

Le dépôt public est https://github.com/jicer1/stringart3D.
Cloner le dépôt ou utiliser **Code → Download ZIP**, puis extraire le dossier.
Le dépôt contient directement l’application et les deux démonstrations.
Les photos sources, études intermédiaires et archives locales ne sont pas incluses.

Installer Node.js si nécessaire, puis double-cliquer sur **Lancer stringart3D.bat**.
Sur les autres systèmes, lancer `node server.cjs` dans le dossier et ouvrir
http://127.0.0.1:8793/.

Pour préparer tous les fichiers destinés à un hébergement statique :
`node tools/preparer-publication.cjs`. Le dossier `serveur_externe/` est généré
localement. Avec Python 3, `python tools/preparer-maj.py --complet` prépare
également un paquet complet, y compris depuis un clone sans anciennes archives.

## Dossier à transférer sur un serveur

**serveur_externe/** contient la copie statique des fichiers publics et les
paquets de mise à jour. Pour une première installation, utiliser l’archive
complète **stringart3D-1.0.13-serveur-externe.zip**, ou copier les fichiers publics
listés dans `publication-manifest.json`, avec `assets/`, `vendor/` et `.htaccess`.
Les placer à la racine ou dans un sous-dossier d’un hébergement web.
Les dossiers `MAJ_*`, leurs ZIP et les notices de transfert restent sur cette
machine. Les caches et les outils de développement sont exclus du paquet public.

Régénérer ce dossier après une modification :

```text
node tools/preparer-publication.cjs
```

Pour mettre à jour une installation existante, double-cliquer sur
**Preparer MAJ serveur.bat**, puis lire **serveur_externe/MISE_A_JOUR_SERVEUR.txt**.
Le lanceur utilise Python et Node.js déjà disponibles sur cette machine.
La même préparation peut être lancée avec :

```text
python tools/preparer-maj.py --complet
```

Comme pour Exodus, cette préparation crée un dossier **MAJ_1.0.13/** et un ZIP
dans `serveur_externe/`. Ce paquet est complet : tous les fichiers publics
sont recopiés, y compris le moteur, les portraits de Jacinto et d’Anne, les
traductions, les ressources et les licences. Aucune ancienne mise à jour
n’est nécessaire ; ce paquet convient aussi à une première installation.
Copier les fichiers indiqués par `TRANSFERT.txt` dans le dossier distant existant,
sans envoyer le dossier `MAJ_*` lui-même ni ses deux notices.
Le programme vérifie les empreintes et simule la mise à jour depuis chacune des
versions précédentes dont l’archive complète est disponible localement.

Ces programmes préparent uniquement les fichiers ; ils ne publient rien sur Internet.
La version de référence est dans **version.json**. Une nouvelle version doit
aligner l’en-tête, le lanceur, les imports et les liens des ressources.

## Sources et études

`app.js` gère les commandes ; `scene.js` le rendu WebGL ; `geometry.js` les
modèles et les intervalles ; `calculator.worker.js` le calcul en arrière-plan.
`assets/demo.json` contient la démo optimisée. Les calculs historiques et leurs
caches Python ont été conservés, ainsi que l’ancien prototype dans `etudes/`.
Ils ne sont pas nécessaires pour lancer l’application.

`tools/preparer-demo.py` régénère la démo compacte depuis les études existantes
(Python, NumPy et Pillow). `tools/verifier-app.cjs` vérifie les principales
interactions avec le navigateur Edge installé et le Playwright du runtime local.

`tools/preparer-portrait-defaut.cjs` régénère le portrait actuel et son tissage
avec le même import et le même calcul que le navigateur. Le STL original reste
dans Téléchargements. `tools/preparer-demo.py` concerne uniquement l’ancienne démo.
