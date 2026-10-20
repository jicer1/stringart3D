# stringart3D — 1.0.13

Jacinto Costoso · 2026 · https://www.costoso.net

## Ouvrir l’atelier

Double-cliquez sur **Lancer stringart3D.bat**. Le serveur local démarre et ouvre
http://127.0.0.1:8793/ dans votre navigateur. Gardez sa fenêtre ouverte ; Ctrl+C
l’arrête. Le lanceur utilise Node.js présent sur cette machine ou dans le PATH.
Aucune installation de paquets ni connexion à un service distant n’est nécessaire.
Ne lancez pas index.html directement : le chargement des modules et du calcul
nécessite un serveur HTTP.

## Une première exploration

Une seule barre compacte en haut rassemble le projet, la langue et l’aide.
Tisser, le compteur et la vitesse sont placés sous la 3D, avec la progression
du fil. La zone 3D profite de la hauteur libérée.

L’atelier s’ouvre avec tous les panneaux de réglage visibles. Le bouton
**Toute la fenêtre** agrandit la scène 3D. **Réglages** ou la touche **Échap**
retrouvent les panneaux. Le tissage, les couleurs et l’angle de vue restent
les mêmes lorsque vous basculez. À chaque nouvelle ouverture, l’atelier
revient au mode réglages.

Toute la zone blanche sert au volume 3D. Le titre et les boutons sont superposés
à la vue, sans réserver de bande vide. Le cadrage ajuste le volume au plus grand
en le gardant entièrement visible ; la molette permet de zoomer davantage.

Le portrait de Jacinto, créé avec MakerWorld, s’ouvre avec 9 cadres, 528 clous et
2 752 passages. Tout le fil est présent. La coloration **Volume** distingue ses
portions à l’intérieur du modèle ; **Enveloppe** distingue les passages près de
la surface. Les couleurs restent attachées aux mêmes positions sur le fil lorsque
la caméra tourne. La vue **Volume source** affiche séparément le maillage qui a
servi au calcul ; il n’est pas caché sous le tissage.

Glissez avec le **clic gauche** pour tourner et incliner. Maintenez le **clic droit**
et glissez pour déplacer la vue horizontalement et verticalement, sans tourner
le volume. Le déplacement suit la souris, quel que soit le zoom. La molette et
le pincement à deux doigts changent le zoom. Les boutons Face, ¾, Profil G et
Profil D retrouvent les vues principales. La barre du bas range les vues dans
l’ordre : Profil gauche, Face, Profil droit, ¾, puis ↺ pour recentrer.
Le bouton ↺ et le double-clic gauche remettent aussi le déplacement à zéro.
Au clavier, placez le focus sur la scène puis utilisez les flèches, + et −.

**Tisser** déroule les passages ; Pause suspend la lecture. La barre inférieure
choisit exactement le nombre de passages affichés. **Tout voir** retrouve le
résultat complet. Le repère du passage courant souligne le fil entre les deux
clous indiqués sous la barre et montre son alternance de couleurs.

## Un fil 3D à diamètre variable

Le fil possède une section circulaire en 3D. Il reste fin dans le voile et
s’épaissit sur les portions colorées qui dessinent le portrait. Les transitions
se font progressivement à l’intérieur des intervalles colorés, sans coupure.

Dans **Le fil & la lumière** :

- **Diamètre du fil** : section fine, de **0,2 à 2 mm**.
- **Renflement coloré** : facteur de **× 1 à × 10** appliqué au diamètre des
  zones du portrait, en **Volume** comme en **Enveloppe**.

Par exemple, un fil de **0,4 mm** et un renflement **× 3** donnent des portions
colorées de **1,2 mm**. Le diamètre résultant est indiqué sous le curseur.
À **× 1**, le fil est uniforme. Le mode Unicolore utilise la section fine
partout et désactive le renflement.

Les millimètres sont rapportés à la **Hauteur extérieure** de la structure.
Le zoom grossit les sections avec tout le volume : il ne change pas leur diamètre.
Le curseur **Présence du fil** règle leur transparence à l’écran.
Les modifications sont immédiates, sans recalcul du parcours. Le diamètre et le
renflement sont conservés dans les préférences, les projets JSON et le rendu PNG.
Les anciens projets sont convertis vers cette représentation volumétrique.

Cette simulation explore un fil épaissi localement. Elle ne simule pas encore
le dépôt d’une gaine, les collisions entre fils ni les contraintes de fabrication.
Les CSV décrivent toujours le parcours droit et les intervalles de couleur.

## Importer un autre volume

Importez un **STL binaire ou ASCII**, un **OBJ** ou un **GLB 2.0** statique.
Les STL de MakerWorld utilisent Z vers le haut : l’application les remet debout
automatiquement. OBJ et GLB utilisent Y vers le haut. Les transformations des
nœuds GLB sont appliquées. Les matériaux et textures ne sont pas utilisés.
Les GLB doivent être sans compression Draco/Meshopt, animation, squelette ou
fichier externe.

L’import accepte jusqu’à **50 Mo**, un million de sommets et un million de
triangles. L’**allègement automatique** vise 80 000 triangles au-delà de ce seuil,
en conservant les proportions et en protégeant les bords ouverts. L’algorithme
peut garder davantage de triangles pour préserver la forme, avec un maximum
final de 100 000 triangles et 100 000 sommets. Si ces limites ne peuvent être
atteintes, l’import est refusé et le volume précédent reste disponible.
Les détails les plus fins peuvent être adoucis. Le bilan indique les nombres
avant et après allègement. Aucun allègement supplémentaire des petits modèles.
Le traitement s’effectue dans le navigateur avec progression et annulation ;
aucun Blender ni logiciel à installer. Annuler conserve le volume et le tissage
précédents. Un fichier invalide ne remplace pas votre travail.

Le volume est centré et ajusté uniformément à la structure extérieure. Les clous
restent sur les cadres et les barres de liaison. Un modèle fermé est préférable
pour distinguer son intérieur et son extérieur. Si des croisements ne peuvent pas
être appariés, l’application le signale ; ces portions ne sont pas classées comme
un intérieur certain.

Choisissez les cadres, les clous par cadre, les passages et la priorité aux profils,
puis **Calculer le tissage**. Ces réglages s’appliquent au prochain calcul.
L’option des barres ajoute 96 clous. Le calcul s’effectue dans un processus du
navigateur, avec une progression et un bouton d’annulation. L’annulation conserve
le résultat précédent. Le calcul peut s’arrêter avant la limite demandée lorsque
les passages supplémentaires n’améliorent plus les projections.

Le portrait par défaut et les nouveaux calculs utilisent cinq vues à une
résolution de 64 pixels pour rester accessibles dans le navigateur. La qualité
du tissage doit être examinée de face et de profil. Rétablir les réglages exacts
du portrait par défaut recharge son calcul préenregistré.

## Obtenir son portrait 3D avec MakerWorld

1. Ouvrez **Make My Statue** : https://makerworld.com/en/makerlab/makeMyStatue
2. Connectez-vous à MakerWorld, puis créez un nouveau projet.
3. Envoyez une photo de face nette, bien éclairée, avec le visage dégagé.
4. Générez le buste et examinez-le en tournant la vue. L’IA peut inventer les
   parties invisibles : vérifiez particulièrement le nez et les profils.
5. Téléchargez le modèle. Si le téléchargement donne un **3MF**, ouvrez-le dans
   **Bambu Studio**, sélectionnez le buste et utilisez l’export **STL**.
6. Revenez dans stringart3D, cliquez sur **Importer un volume 3D** et choisissez
   le STL. L’application le remet debout et l’allège si nécessaire.
7. Examinez le **Volume source**, ajustez vos réglages et cliquez sur
   **Calculer le tissage**. Enregistrez ensuite votre projet JSON.

MakerWorld est un service externe qui nécessite une connexion et un compte ;
les essais et les téléchargements peuvent demander des crédits selon son offre.
Cette création du volume se fait sur MakerWorld. L’application stringart3D ne
lui envoie aucun fichier : ses imports et calculs restent locaux.
Le pilotage Arduino de la coloration n’est pas encore intégré.

## Enregistrer et exporter

**Enregistrer** télécharge un projet JSON contenant le modèle, les clous, les
parcours, les intervalles colorés et l’affichage. **Ouvrir** restaure ce fichier.
Les préférences d’affichage sont enregistrées dans le navigateur pour ce chemin
de l’application. Les projets importés ne sont pas automatiquement sauvegardés.

Les exports utilisent la hauteur extérieure choisie :

- **Image PNG** : vue actuelle avec nom, version, auteur et attribution du modèle.
- **Parcours CSV** : un passage par ligne, clous de départ/arrivée et cumul du fil droit.
- **Coloration CSV** : portions colorées successives, positions locales et cumulées.
- **Position des clous CSV** : coordonnées X/Y/Z en millimètres, origine au centre.

Le CSV emploie le point décimal et le point-virgule comme séparateur. Les couleurs
sont données en hexadécimal. Toutes les portions complémentaires du voile sont
présentes ; il n’y a pas de découpe dépendant de l’angle de vue.

Les longueurs sont celles des segments droits. Elles ne comprennent ni les tours
de clous, ni les nœuds, ni les marges, ni l’élasticité. L’épaisseur des cadres, les
collisions entre fils, l’accès à la main et la tension ne sont pas simulés. Ces
exports sont une étude géométrique, à valider avec un prototype physique avant
de préparer un fil teinté ou de construire à grande échelle.

## Versions et cache

Le nom de l’application est en haut. À droite de « Studio de portraits tissés »,
le texte indique l’auteur, l’année et la version, avec l’accès à l’aide et aux crédits.
Le cartouche du bas a été retiré.
Les ressources sont locales et portent un numéro de version dans leurs liens.
Le serveur demande une revalidation des fichiers ; aucun service worker n’est
installé. **Actualiser cette version** vérifie version.json puis recharge la page,
sans supprimer les caches ou les données d’autres applications. Enregistrez
votre travail avant de recharger.

## Hébergement externe

Le dossier **serveur_externe** contient les fichiers publics ainsi que les
paquets de mise à jour MAJ_version et leurs notices. Pour une mise à jour, suivez
MISE_A_JOUR_SERVEUR.txt. Le paquet MAJ_1.0.13 contient tous les fichiers,
même inchangés : aucune ancienne mise à jour n’est nécessaire.
Pour une première installation, utilisez aussi ce paquet ou le ZIP complet
sur un hébergement statique, à la racine ou dans un sous-dossier. Aucun Node.js
n’est nécessaire sur l’hébergement. Servez JavaScript avec le type
`text/javascript` et JSON avec `application/json`. Le fichier .htaccess fourni
configure Apache ; sur Nginx, configurez une revalidation équivalente. Aucun
transfert ni publication n’est réalisé par l’application.

## Les deux portraits de démonstration

Le bouton « Démos », dans Le point de départ, ouvre la liste des portraits.
Choisissez Jacinto ou Anne : la fenêtre se ferme et le tissage est chargé.
Échap ou Revenir à l’atelier ferme la fenêtre sans changer le portrait.
Les prochains modèles seront ajoutés à cette même liste.
Le portrait d’Anne utilise le buste préparé ensemble depuis sa photo,
avec cheveux longs attachés.
Ses 2 777 passages sont déjà calculés sur cinq vues. Le bouton Tisser anime
le fil ; Volume source montre le buste. L’entrée de Jacinto retrouve le
portrait initial. Chaque carte rétablit les réglages de calcul de son portrait.
Le modèle d’Anne est une reconstruction expérimentale à partir d’une photo.

L’application démarre toujours avec les panneaux de réglage visibles.
« Toute la fenêtre » agrandit la scène ; « Réglages » ou Échap revient à l’atelier.

## Langue de l’atelier

Français, anglais, espagnol et catalan : la langue est détectée automatiquement
à partir des préférences du navigateur. Le sélecteur de l’en-tête permet de
choisir une langue ; ce choix reste dans ce navigateur. Choisissez Auto pour
revenir à la détection. Sans langue prise en charge, l’anglais est utilisé.
L’aide, les commandes, les messages et le guide suivent la langue choisie.
Le téléchargement de l’aide suit également cette langue. Les noms de modèles
personnels et les données des projets restent conservés.

## Crédits

Modèle par défaut : **portrait fourni par Jacinto Costoso**, créé avec
**MakerWorld · Make My Statue**. STL allégé et orienté, puis tissage recalculé
sur cinq vues. Les conditions de MakerWorld s’appliquent au modèle généré.

Allègement : **meshoptimizer 1.1**, Arseny Kapoulkine, licence MIT.
Source : https://github.com/zeux/meshoptimizer/tree/v1.1
Licence locale : vendor/LICENSE.meshoptimizer.md.

Rendu : **Babylon.js**, licence Apache 2.0 (vendor/LICENSE.babylon.md).
Conception : **Jacinto Costoso**. Ambiance graphique inspirée de Poly et des
commandes de StringArt 2D, projets du même atelier.
