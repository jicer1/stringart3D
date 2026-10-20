// Local, deterministic translations. User model names and file contents are never translated.
export const supportedLanguages=['fr','en','es','ca'];
const localeNames={fr:'fr-FR',en:'en-GB',es:'es-ES',ca:'ca-ES'};
export function resolveLanguage(preferred=[],choice='auto'){
  if(supportedLanguages.includes(choice))return choice;
  for(const code of preferred){const short=String(code).toLowerCase().split(/[-_]/)[0];if(supportedLanguages.includes(short))return short;}
  return 'en';
}
const rows=[
['stringart3D, accueil','stringart3D, home','stringart3D, inicio','stringart3D, inici'],
['STUDIO DE','WOVEN','ESTUDIO DE','ESTUDI DE'],['PORTRAITS TISSÉS','PORTRAIT STUDIO','RETRATOS TEJIDOS','RETRATS TEIXITS'],
['Auteur et version','Author and version','Autor y versión','Autor i versió'],['Aide & crédits','Help & credits','Ayuda y créditos','Ajuda i crèdits'],
['Le visage dans le voile','The face in the veil','El rostro en el velo','El rostre dins el vel'],['Projet','Project','Proyecto','Projecte'],['Langue','Language','Idioma','Llengua'],
['Ouvrir un projet JSON','Open a JSON project','Abrir un proyecto JSON','Obre un projecte JSON'],['Ouvrir','Open','Abrir','Obre'],
['Enregistrer le projet','Save the project','Guardar el proyecto','Desa el projecte'],['Enregistrer','Save','Guardar','Desa'],['Exporter','Export','Exportar','Exporta'],
['Tisser','Weave','Tejer','Teixeix'],['Pause','Pause','Pausa','Pausa'],['Revenir au premier passage','Return to the first pass','Volver a la primera pasada','Torna a la primera passada'],
['passages','passes','pasadas','passades'],['VITESSE','SPEED','VELOCIDAD','VELOCITAT'],['Chargement du portrait…','Loading portrait…','Cargando el retrato…','S’està carregant el retrat…'],
['Source et calcul','Source and calculation','Origen y cálculo','Origen i càlcul'],['Le point de départ','The starting point','El punto de partida','El punt de partida'],
['Un visage, un voile','A face, a veil','Un rostro, un velo','Un rostre, un vel'],['Le buste de Jacinto · autoportrait','Jacinto’s bust · self-portrait','El busto de Jacinto · autorretrato','El bust de Jacinto · autoretrat'],
['Importer un volume 3D','Import a 3D model','Importar un modelo 3D','Importa un model 3D'],['STL, OBJ ou GLB · allègement automatique','STL, OBJ or GLB · automatic simplification','STL, OBJ o GLB · simplificación automática','STL, OBJ o GLB · simplificació automàtica'],
['Tout reste sur cet ordinateur.','Everything stays on this computer.','Todo queda en este ordenador.','Tot es queda en aquest ordinador.'],['VOLUME ACTUEL','CURRENT MODEL','MODELO ACTUAL','MODEL ACTUAL'],
['Portrait de Jacinto','Portrait of Jacinto','Retrato de Jacinto','Retrat de Jacinto'],['Lecture du volume…','Reading the model…','Leyendo el modelo…','S’està llegint el model…'],
['Réglages du tissage','Weaving settings','Ajustes del tejido','Paràmetres del teixit'],['Cadres extérieurs','Outer frames','Bastidores exteriores','Bastidors exteriors'],
['Clous par cadre','Nails per frame','Clavos por bastidor','Claus per bastidor'],['Clous sur les 4 barres de liaison','Nails on the 4 connecting rails','Clavos en las 4 barras de unión','Claus a les 4 barres d’unió'],
['Passages à calculer','Passes to calculate','Pasadas que calcular','Passades per calcular'],['Priorité aux profils','Profile priority','Prioridad de los perfiles','Prioritat dels perfils'],
['Calculer le tissage','Calculate weaving','Calcular el tejido','Calcula el teixit'],['Annuler le calcul','Cancel calculation','Cancelar el cálculo','Cancel·la el càlcul'],
['DE LA PHOTO AU VOLUME','FROM PHOTO TO 3D','DE LA FOTO AL VOLUMEN','DE LA FOTO AL VOLUM'],['Créez votre buste avec','Create your bust with','Crea tu busto con','Crea el teu bust amb'],
[', puis importez son STL ici. Consultez l’aide pour les étapes.',', then import its STL here. See Help for the steps.',', e importa aquí su STL. Consulta los pasos en la ayuda.',', i importa’n l’STL aquí. Consulta els passos a l’ajuda.'],
['Atelier 3D','3D studio','Taller 3D','Taller 3D'],['Volume de fils en 3D. Clic gauche glisser pour tourner et incliner. Clic droit glisser pour déplacer la vue. Flèches du clavier pour tourner, plus et moins pour zoomer.','3D thread model. Left-drag to rotate and tilt. Right-drag to pan. Arrow keys rotate; plus and minus zoom.','Modelo de hilos en 3D. Arrastra con el botón izquierdo para girar e inclinar, y con el derecho para desplazar la vista. Usa las flechas para girar y más o menos para el zoom.','Model de fils en 3D. Arrossega amb el botó esquerre per girar i inclinar, i amb el dret per desplaçar la vista. Les fletxes giren; més i menys ajusten el zoom.'],
['UN SEUL FIL · TOUT UN VOLUME','ONE THREAD · A WHOLE VOLUME','UN SOLO HILO · TODO UN VOLUMEN','UN SOL FIL · TOT UN VOLUM'],['Le visage dans','The face in','El rostro en','El rostre dins'],['le voile.','the veil.','el velo.','el vel.'],
['Le portrait émerge des portions colorées du fil.','The portrait emerges from the coloured sections of thread.','El retrato emerge de los tramos de hilo coloreados.','El retrat emergeix dels trams de fil de color.'],
['Le volume qui sert au calcul des fils.','The 3D model used to calculate the threads.','El modelo 3D utilizado para calcular los hilos.','El model 3D utilitzat per calcular els fils.'],
['Le parcours complet, dans une seule couleur.','The full path in a single colour.','El recorrido completo en un solo color.','El recorregut complet en un sol color.'],
['Affichage','View','Vista','Vista'],['Tissage','Weaving','Tejido','Teixit'],['Volume source','Source model','Modelo de origen','Model d’origen'],
['Afficher la scène dans toute la fenêtre','Fill the window with the 3D scene','Mostrar la escena en toda la ventana','Mostra l’escena a tota la finestra'],['Toute la fenêtre','Full window','Toda la ventana','Tota la finestra'],
['Réglages','Settings','Ajustes','Paràmetres'],['Retrouver les réglages (Échap)','Return to settings (Esc)','Volver a los ajustes (Esc)','Torna als paràmetres (Esc)'],
['Vues du portrait','Portrait views','Vistas del retrato','Vistes del retrat'],['Voir le profil gauche','Show the left profile','Ver el perfil izquierdo','Mostra el perfil esquerre'],['Profil gauche','Left profile','Perfil izquierdo','Perfil esquerre'],
['Voir le portrait de face','Show the front view','Ver el retrato de frente','Mostra el retrat de front'],['Face','Front','Frente','Front'],['Voir le profil droit','Show the right profile','Ver el perfil derecho','Mostra el perfil dret'],['Profil droit','Right profile','Perfil derecho','Perfil dret'],
['Vue de trois quarts','Three-quarter view','Vista de tres cuartos','Vista de tres quarts'],['Recentrer la vue','Recenter view','Centrar la vista','Centra la vista'],
['GAUCHE','LEFT','IZQUIERDO','ESQUERRE'],['TOURNER','ROTATE','GIRAR','GIRA'],['· DROIT','· RIGHT','· DERECHO','· DRET'],['DÉPLACER','PAN','DESPLAZAR','DESPLAÇA'],['MOLETTE','WHEEL','RUEDA','RODETA'],
['Les fils prennent place…','Setting up the threads…','Colocando los hilos…','S’estan col·locant els fils…'],['Apparence et structure','Appearance and structure','Aspecto y estructura','Aspecte i estructura'],['Le fil & la lumière','Thread & light','El hilo y la luz','El fil i la llum'],
['03 / RENDU','03 / RENDER','03 / ASPECTO','03 / ASPECTE'],['Étude du portrait','Portrait study','Estudio del retrato','Estudi del retrat'],['Profils renforcés','Enhanced profiles','Perfiles reforzados','Perfils reforçats'],['Étude initiale','Initial study','Estudio inicial','Estudi inicial'],
['Portrait de Jacinto · cinq vues','Portrait of Jacinto · five views','Retrato de Jacinto · cinco vistas','Retrat de Jacinto · cinc vistes'],['Mon calcul · cinq vues','My calculation · five views','Mi cálculo · cinco vistas','El meu càlcul · cinc vistes'],
['Coloration du fil','Thread colours','Coloración del hilo','Coloració del fil'],['Bicolore · volume','Two colours · volume','Bicolor · volumen','Bicolor · volum'],['Bicolore · enveloppe','Two colours · surface','Bicolor · superficie','Bicolor · superfície'],['Unicolore','Single colour','Un solo color','Un sol color'],
['Portrait','Portrait','Retrato','Retrat'],['Voile','Veil','Velo','Vel'],['Présence du fil','Thread opacity','Presencia del hilo','Presència del fil'],['Diamètre du fil','Thread diameter','Diámetro del hilo','Diàmetre del fil'],['Renflement coloré','Coloured swelling','Engrosamiento de color','Engruiximent de color'],
['CADRER LE VOLUME','FRAME THE MODEL','ENCUADRAR EL MODELO','ENQUADRA EL MODEL'],['Inclinaison','Tilt','Inclinación','Inclinació'],['Voir les cadres et les clous','Show frames and nails','Mostrar bastidores y clavos','Mostra els bastidors i els claus'],['Repérer le passage courant','Highlight the current pass','Resaltar la pasada actual','Ressalta la passada actual'],
['clous','nails','clavos','claus'],['cadres','frames','bastidores','bastidors'],['m de fil droit*','m of straight thread*','m de hilo recto*','m de fil recte*'],['couleur portrait','portrait colour','color del retrato','color del retrat'],['Hauteur extérieure','Overall height','Altura exterior','Alçada exterior'],
['* Sans tours de clous ni marge de tension.','* Excludes wraps around nails and tension allowance.','* Sin vueltas alrededor de los clavos ni margen de tensión.','* Sense voltes als claus ni marge de tensió.'],
['Guide des passages','Pass guide','Guía de pasadas','Guia de passades'],['Lecture du tissage','Weaving playback','Reproducción del tejido','Reproducció del teixit'],['LE PARCOURS DU FIL','THE THREAD PATH','EL RECORRIDO DEL HILO','EL RECORREGUT DEL FIL'],
['Un passage après l’autre','One pass at a time','Una pasada tras otra','Una passada rere l’altra'],['Tout voir','Show all','Ver todo','Mostra-ho tot'],['Nombre de passages affichés','Number of visible passes','Número de pasadas visibles','Nombre de passades visibles'],['Départ','Start','Inicio','Inici'],
['Alternance des couleurs du passage courant','Colour sequence of the current pass','Secuencia de colores de la pasada actual','Seqüència de colors de la passada actual'],['La coloration reste fixée au fil quand la vue tourne.','The colours stay attached to the thread as the view rotates.','Los colores permanecen unidos al hilo al girar la vista.','Els colors es mantenen fixats al fil quan gira la vista.'],
['Démonstration · travail local','Demo · local work','Demostración · trabajo local','Demostració · treball local'],['Fermer l’aide','Close Help','Cerrar la ayuda','Tanca l’ajuda'],
['Faire apparaître un visage.','Bring a face into view.','Hacer aparecer un rostro.','Fes aparèixer un rostre.'],
['Des clous à l’extérieur, un fil continu à l’intérieur. Les portions colorées s’assemblent en portrait au milieu du voile.','Nails on the outside, one continuous thread inside. Its coloured sections form a portrait within the veil.','Clavos por fuera y un hilo continuo por dentro. Los tramos coloreados forman un retrato en medio del velo.','Claus a l’exterior i un fil continu a l’interior. Els trams de color formen un retrat al mig del vel.'],
['1. Explorer','1. Explore','1. Explorar','1. Explora'],
['Glissez avec le clic gauche pour tourner et incliner ; avec le clic droit, déplacez la vue. Les boutons Face, ¾ et Profil retrouvent les vues principales. La molette rapproche le volume ; ↺ recentre la vue. Au clavier : flèches, + et −. Le bouton « Réglages » ou Échap retrouve les panneaux ; « Toute la fenêtre » agrandit la scène.','Left-drag to rotate and tilt; right-drag to pan. Front, ¾ and Profile restore the main views. Use the wheel to zoom and ↺ to recenter. Keyboard: arrows, + and −. Settings or Esc returns to the panels; Full window expands the scene.','Arrastra con el botón izquierdo para girar e inclinar, y con el derecho para desplazar la vista. Frente, ¾ y Perfil recuperan las vistas principales. Usa la rueda para el zoom y ↺ para centrar. Teclado: flechas, + y −. Ajustes o Esc recuperan los paneles; Toda la ventana amplía la escena.','Arrossega amb el botó esquerre per girar i inclinar, i amb el dret per desplaçar la vista. Front, ¾ i Perfil recuperen les vistes principals. La rodeta ajusta el zoom i ↺ centra la vista. Teclat: fletxes, + i −. Paràmetres o Esc recuperen els panells; Tota la finestra amplia l’escena.'],
['2. Choisir le fil','2. Choose the thread','2. Elegir el hilo','2. Tria el fil'],['Volume','Volume','Volumen','Volum'],['colore les portions à l’intérieur du modèle.','colours the sections inside the model.','colorea los tramos del interior del modelo.','dona color als trams de l’interior del model.'],['Enveloppe','Surface','Superficie','Superfície'],['colore les passages près de sa surface.','colours the sections near its surface.','colorea los tramos próximos a la superficie.','dona color als trams propers a la superfície.'],
['garde une couleur sur toute la longueur. Aucune portion du fil n’est effacée. Le fil est un tube 3D. « Diamètre du fil » règle sa section fine en millimètres. « Renflement coloré » multiplie ce diamètre de × 1 à × 10 uniquement dans les zones colorées, en Volume comme en Enveloppe. Le fil s’épaissit puis s’affine progressivement à chaque transition. À × 1, le fil a une épaisseur uniforme. Le diamètre affiché tient compte de la hauteur de la structure ; le zoom permet d’examiner les renflements. Le tissage ne doit pas être recalculé.','uses one colour along the entire thread. No section is erased. The thread is a 3D tube. Thread diameter sets its thin section in millimetres. Coloured swelling multiplies this diameter from × 1 to × 10 only in coloured sections, in both Volume and Surface modes. Each transition gradually thickens and thins the thread. At × 1, its thickness is uniform. The displayed diameter accounts for the frame height; zoom in to inspect the swellings. No weaving recalculation is needed.','mantiene un solo color en toda la longitud. No se borra ningún tramo. El hilo es un tubo 3D. Diámetro del hilo ajusta la sección fina en milímetros. Engrosamiento de color multiplica ese diámetro de × 1 a × 10 solo en los tramos coloreados, tanto en Volumen como en Superficie. El hilo se engrosa y se afina progresivamente en cada transición. A × 1, el grosor es uniforme. El diámetro tiene en cuenta la altura de la estructura; usa el zoom para examinar los engrosamientos. No hace falta recalcular el tejido.','manté un sol color en tota la longitud. No s’esborra cap tram. El fil és un tub 3D. Diàmetre del fil ajusta la secció fina en mil·límetres. Engruiximent de color multiplica aquest diàmetre de × 1 a × 10 només als trams de color, tant en Volum com en Superfície. El fil s’engruixeix i s’afina progressivament a cada transició. A × 1, el gruix és uniforme. El diàmetre té en compte l’alçada de l’estructura; apropa el zoom per examinar els engruiximents. No cal recalcular el teixit.'],
['3. Tisser','3. Weave','3. Tejer','3. Teixeix'],['« Tisser » anime le parcours. La barre du bas revient à n’importe quel passage. Le repère du passage courant permet de retrouver les deux clous concernés.','Weave animates the path. The bottom slider jumps to any pass. The current-pass highlight identifies the two nails involved.','Tejer anima el recorrido. La barra inferior permite ir a cualquier pasada. El resaltado de la pasada actual identifica los dos clavos correspondientes.','Teixeix anima el recorregut. La barra inferior permet anar a qualsevol passada. El ressaltat de la passada actual identifica els dos claus corresponents.'],
['4. Recalculer','4. Recalculate','4. Recalcular','4. Recalcula'],
['Importez un STL, un OBJ ou un GLB statique sans compression. Les volumes détaillés sont allégés automatiquement vers 80 000 triangles, sans bloquer l’atelier. Les STL sont remis debout (Z vers le haut) ; OBJ et GLB utilisent Y vers le haut. Le bouton Annuler conserve votre volume précédent. Ajustez les cadres, les clous, les passages et la priorité aux profils, puis lancez le calcul. Vous pouvez l’annuler ; le résultat précédent reste disponible.','Import an STL, OBJ or uncompressed static GLB. Detailed models are automatically simplified towards 80,000 triangles without blocking the studio. STL files are rotated upright (Z up); OBJ and GLB use Y up. Cancel keeps your previous model. Adjust the frames, nails, passes and profile priority, then calculate. You can cancel while keeping the previous result.','Importa un STL, un OBJ o un GLB estático sin compresión. Los modelos detallados se simplifican automáticamente hacia 80.000 triángulos sin bloquear el taller. Los STL se colocan de pie (Z hacia arriba); OBJ y GLB usan Y hacia arriba. Cancelar conserva el modelo anterior. Ajusta bastidores, clavos, pasadas y prioridad de perfiles, y calcula. Puedes cancelar conservando el resultado anterior.','Importa un STL, un OBJ o un GLB estàtic sense compressió. Els models detallats se simplifiquen automàticament cap als 80.000 triangles sense bloquejar el taller. Els STL es posen drets (Z cap amunt); OBJ i GLB fan servir Y cap amunt. Cancel·la conserva el model anterior. Ajusta bastidors, claus, passades i prioritat dels perfils, i calcula. Pots cancel·lar conservant el resultat anterior.'],
['Le portrait par défaut et vos nouveaux calculs utilisent cinq vues : face, trois quarts et profils. La qualité du tissage reste à comparer visuellement. Un maillage fermé donne une coloration plus fiable.','The default portrait and new calculations use five views: front, three-quarter and profiles. Compare the weaving quality visually. A closed mesh gives more reliable colouring.','El retrato predeterminado y los nuevos cálculos usan cinco vistas: frente, tres cuartos y perfiles. Compara visualmente la calidad del tejido. Una malla cerrada ofrece una coloración más fiable.','El retrat predeterminat i els nous càlculs fan servir cinc vistes: front, tres quarts i perfils. Compara visualment la qualitat del teixit. Una malla tancada dona una coloració més fiable.'],
['5. Conserver','5. Save your work','5. Conservar','5. Desa la feina'],['Le projet JSON conserve le volume, les fils et les couleurs. Exportez une image, les passages, les clous ou les intervalles de couleur. Les longueurs ne comprennent pas les tours de clous.','The JSON project stores the model, threads and colours. Export an image, passes, nails or colour intervals. Lengths exclude wraps around nails.','El proyecto JSON guarda el modelo, los hilos y los colores. Exporta una imagen, las pasadas, los clavos o los intervalos de color. Las longitudes no incluyen las vueltas alrededor de los clavos.','El projecte JSON desa el model, els fils i els colors. Exporta una imatge, les passades, els claus o els intervals de color. Les longituds no inclouen les voltes als claus.'],
['Créer votre portrait 3D avec MakerWorld','Create your 3D portrait with MakerWorld','Crear tu retrato 3D con MakerWorld','Crea el teu retrat 3D amb MakerWorld'],['Ouvrez','Open','Abre','Obre'],['et connectez-vous.','and sign in.','e inicia sesión.','i inicia la sessió.'],
['Choisissez un nouveau projet et envoyez un portrait net, de face, avec une lumière uniforme.','Start a new project and upload a sharp, front-facing portrait with even lighting.','Crea un proyecto nuevo y sube un retrato nítido de frente, con luz uniforme.','Crea un projecte nou i puja un retrat nítid de front, amb llum uniforme.'],
['Générez le buste, vérifiez sa ressemblance sous plusieurs angles et téléchargez le modèle. Le service peut demander des crédits.','Generate the bust, check its likeness from several angles and download the model. The service may require credits.','Genera el busto, comprueba el parecido desde varios ángulos y descarga el modelo. El servicio puede requerir créditos.','Genera el bust, comprova’n la semblança des de diversos angles i descarrega el model. El servei pot requerir crèdits.'],
['Si vous obtenez un 3MF, ouvrez-le dans Bambu Studio et exportez le buste en STL.','If you receive a 3MF, open it in Bambu Studio and export the bust as STL.','Si obtienes un 3MF, ábrelo en Bambu Studio y exporta el busto como STL.','Si obtens un 3MF, obre’l a Bambu Studio i exporta el bust com a STL.'],
['Dans stringart3D : « Importer un volume 3D », sélectionnez le STL, attendez l’allègement puis cliquez sur « Calculer le tissage ».','In stringart3D: choose Import a 3D model, select the STL, wait for simplification, then click Calculate weaving.','En stringart3D: elige Importar un modelo 3D, selecciona el STL, espera la simplificación y pulsa Calcular el tejido.','A stringart3D: tria Importa un model 3D, selecciona l’STL, espera la simplificació i prem Calcula el teixit.'],
['MakerWorld crée le volume par IA et peut inventer les parties invisibles. Cette étape se fait sur son site ; ensuite, l’import et le calcul des fils restent sur votre ordinateur.','MakerWorld generates the model with AI and may invent unseen parts. This step takes place on its website; importing and calculating threads then stay on your computer.','MakerWorld genera el modelo con IA y puede inventar las partes no visibles. Este paso se hace en su web; después, la importación y el cálculo de los hilos permanecen en tu ordenador.','MakerWorld genera el model amb IA i pot inventar les parts no visibles. Aquest pas es fa al seu web; després, la importació i el càlcul dels fils es queden al teu ordinador.'],
['Crédits, version et données','Credits, version and data','Créditos, versión y datos','Crèdits, versió i dades'],['stringart3D · Version','stringart3D · Version','stringart3D · Versión','stringart3D · Versió'],['Conception :','Design:','Diseño:','Disseny:'],
['· 2026. Interface inspirée de Poly et StringArt 2D.','· 2026. Interface inspired by Poly and StringArt 2D.','· 2026. Interfaz inspirada en Poly y StringArt 2D.','· 2026. Interfície inspirada en Poly i StringArt 2D.'],
['Modèle par défaut : portrait fourni par Jacinto Costoso, créé avec','Default model: portrait supplied by Jacinto Costoso, created with','Modelo predeterminado: retrato facilitado por Jacinto Costoso, creado con','Model predeterminat: retrat facilitat per Jacinto Costoso, creat amb'],
['. Maillage allégé et normalisé ; tissage recalculé à partir de ce buste.','. Mesh simplified and normalised; weaving recalculated from this bust.','. Malla simplificada y normalizada; tejido recalculado a partir de este busto.','. Malla simplificada i normalitzada; teixit recalculat a partir d’aquest bust.'],
['Allègement local :','Local simplification:','Simplificación local:','Simplificació local:'],['licence MIT','MIT licence','licencia MIT','llicència MIT'],['Moteur WebGL : Babylon.js, licence Apache 2.0.','WebGL engine: Babylon.js, Apache 2.0 licence.','Motor WebGL: Babylon.js, licencia Apache 2.0.','Motor WebGL: Babylon.js, llicència Apache 2.0.'],['Licence','Licence','Licencia','Llicència'],
['. Le moteur est inclus dans l’application.','. The engine is bundled with the application.','. El motor está incluido en la aplicación.','. El motor està inclòs a l’aplicació.'],['Les préférences d’affichage restent dans ce navigateur. Les projets importés restent en mémoire jusqu’à l’enregistrement dans un fichier.','Display preferences stay in this browser. Imported projects stay in memory until saved to a file.','Las preferencias de visualización quedan en este navegador. Los proyectos importados permanecen en memoria hasta guardarlos en un archivo.','Les preferències de visualització es queden en aquest navegador. Els projectes importats es mantenen en memòria fins que es desen en un fitxer.'],
['Télécharger l’aide','Download Help','Descargar la ayuda','Descarrega l’ajuda'],['Actualiser cette version','Refresh this version','Actualizar esta versión','Actualitza aquesta versió'],['Revenir à l’atelier','Return to the studio','Volver al taller','Torna al taller'],
['Fermer l’export','Close export','Cerrar la exportación','Tanca l’exportació'],['GARDER UNE TRACE','KEEP A RECORD','GUARDAR UNA COPIA','DESA’N UNA CÒPIA'],['Exporter votre tissage.','Export your weaving.','Exportar tu tejido.','Exporta el teu teixit.'],
['Les fichiers utilisent le parcours complet. L’image conserve la vue affichée.','Files use the full path. The image preserves the current view.','Los archivos usan el recorrido completo. La imagen conserva la vista actual.','Els fitxers fan servir el recorregut complet. La imatge conserva la vista actual.'],
['Image PNG','PNG image','Imagen PNG','Imatge PNG'],['La vue actuelle avec son cartouche','Current view with its caption','La vista actual con su leyenda','La vista actual amb la llegenda'],['Parcours CSV','Path CSV','Recorrido CSV','Recorregut CSV'],['Clous, passages et longueurs droites','Nails, passes and straight lengths','Clavos, pasadas y longitudes rectas','Claus, passades i longituds rectes'],
['Coloration CSV','Colour CSV','Coloración CSV','Coloració CSV'],['Les portions successives des deux couleurs','Successive sections of both colours','Los tramos sucesivos de ambos colores','Els trams successius dels dos colors'],['Position des clous CSV','Nail positions CSV','Posiciones de los clavos CSV','Posicions dels claus CSV'],['Les coordonnées des clous en millimètres','Nail coordinates in millimetres','Las coordenadas de los clavos en milímetros','Les coordenades dels claus en mil·límetres'],
['Exports d’étude géométrique. L’accès aux clous, l’enroulement et la tension devront être validés dans une réalisation. Le fichier de coloration ne pilote pas encore un Arduino.','Geometric study exports. Nail access, winding and tension need validation on a physical prototype. The colour file does not yet control an Arduino.','Exportaciones de un estudio geométrico. El acceso a los clavos, el enrollado y la tensión deben validarse en un prototipo físico. El archivo de coloración aún no controla un Arduino.','Exportacions d’un estudi geomètric. L’accés als claus, l’enrotllament i la tensió s’han de validar en un prototip físic. El fitxer de coloració encara no controla un Arduino.'],
['Fermer le guide','Close the guide','Cerrar la guía','Tanca la guia'],['SUIVRE LE FIL','FOLLOW THE THREAD','SEGUIR EL HILO','SEGUEIX EL FIL'],['Le guide des passages.','The pass guide.','La guía de pasadas.','La guia de passades.'],
['Les cadres sont nommés de A à I, de l’arrière vers l’avant. Les clous font le tour en partant du bord inférieur gauche : bas → droite → haut → gauche. Les quatre barres relient les coins ; leurs clous sont numérotés de l’arrière vers l’avant.','Frames are labelled A to I from back to front. Nails run around each frame from the lower-left edge: bottom → right → top → left. The four rails connect the corners; their nails are numbered from back to front.','Los bastidores se nombran de A a I, de atrás hacia delante. Los clavos recorren cada bastidor desde el borde inferior izquierdo: abajo → derecha → arriba → izquierda. Las cuatro barras unen las esquinas; sus clavos se numeran de atrás hacia delante.','Els bastidors s’anomenen de la A a la I, de darrere cap endavant. Els claus recorren cada bastidor des de la vora inferior esquerra: baix → dreta → dalt → esquerra. Les quatre barres uneixen les cantonades; els claus es numeren de darrere cap endavant.'],
['Aller au passage','Go to pass','Ir a la pasada','Ves a la passada'],['Afficher','Show','Mostrar','Mostra'],['Passage','Pass','Pasada','Passada'],['Arrivée','End','Llegada','Arribada'],['Fil droit','Straight thread','Hilo recto','Fil recte'],
['Le tableau montre 21 passages autour de votre sélection. Le CSV contient le parcours entier. Les cadres ont ici une épaisseur nulle ; le passage réel autour des supports reste à valider.','The table shows 21 passes around your selection. The CSV contains the full path. Frames have zero thickness in this study; the actual routing around supports needs validation.','La tabla muestra 21 pasadas alrededor de la selección. El CSV contiene el recorrido completo. Los bastidores no tienen grosor en este estudio; el paso real alrededor de los soportes debe validarse.','La taula mostra 21 passades al voltant de la selecció. El CSV conté el recorregut complet. Els bastidors no tenen gruix en aquest estudi; cal validar el pas real al voltant dels suports.'],
['Activez JavaScript pour ouvrir l’atelier WebGL stringart3D.','Enable JavaScript to open the stringart3D WebGL studio.','Activa JavaScript para abrir el taller WebGL stringart3D.','Activa JavaScript per obrir el taller WebGL stringart3D.'],
];
rows.push(
['Démos','Demos','Demostraciones','Demostracions'],
['Fermer les démos','Close demos','Cerrar las demostraciones','Tanca les demostracions'],
['LES PORTRAITS DE L’ATELIER','STUDIO PORTRAITS','LOS RETRATOS DEL TALLER','ELS RETRATS DEL TALLER'],
['Choisissez un portrait pour explorer son volume et son tissage.','Choose a portrait to explore its model and weaving.','Elige un retrato para explorar su volumen y su tejido.','Tria un retrat per explorar-ne el volum i el teixit.'],
['En cours','Current','Actual','Actual'],
['Cette démonstration est introuvable.','This demo could not be found.','No se encuentra esta demostración.','No es troba aquesta demostració.'],
['Dans la toile','In the web','En la trama','Dins la trama'],
['Portrait d’Anne','Portrait of Anne','Retrato de Anne','Retrat d’Anne'],
['Le portrait d’Anne','Anne’s portrait','El retrato de Anne','El retrat d’Anne'],
['Le buste d’Anne · cheveux longs','Anne’s bust · long hair','El busto de Anne · pelo largo','El bust d’Anne · cabells llargs'],
['Portrait d’Anne · cinq vues','Portrait of Anne · five views','Retrato de Anne · cinco vistas','Retrat d’Anne · cinc vistes'],
['Le portrait d’Anne est introuvable.','Anne’s portrait could not be found.','No se encuentra el retrato de Anne.','No es troba el retrat d’Anne.'],
['Portrait d’Anne : buste préparé ensemble à partir d’une photo, avec cheveux longs attachés. Reconstruction expérimentale locale ; repères et topologie MediaPipe,','Portrait of Anne: bust prepared together from a photo, with long tied hair. Local experimental reconstruction; MediaPipe landmarks and topology,','Retrato de Anne: busto preparado juntos a partir de una foto, con pelo largo recogido. Reconstrucción experimental local; puntos de referencia y topología MediaPipe,','Retrat d’Anne: bust preparat plegats a partir d’una foto, amb cabells llargs recollits. Reconstrucció experimental local; punts de referència i topologia MediaPipe,'],
['licence Apache 2.0','Apache 2.0 licence','licencia Apache 2.0','llicència Apache 2.0'],
['Mon volume','My model','Mi modelo','El meu model'],
['Portrait fourni par Jacinto Costoso · créé avec MakerWorld Make My Statue','Portrait supplied by Jacinto Costoso · created with MakerWorld Make My Statue','Retrato facilitado por Jacinto Costoso · creado con MakerWorld Make My Statue','Retrat facilitat per Jacinto Costoso · creat amb MakerWorld Make My Statue'],
['Cette action n’a pas abouti.','The action could not be completed.','No se ha podido completar la acción.','No s’ha pogut completar l’acció.'],
['Modifications en mémoire · enregistrer pour conserver','Changes in memory · save to keep them','Cambios en memoria · guarda para conservarlos','Canvis en memòria · desa per conservar-los'],
['Fil continu · prêt à tisser','Continuous thread · ready to weave','Hilo continuo · listo para tejer','Fil continu · a punt per teixir'],
['DÉPART','START','INICIO','INICI'],['À calculer','To calculate','Por calcular','Per calcular'],
['Volume importé · lancer le calcul','Model imported · start calculation','Modelo importado · inicia el cálculo','Model importat · inicia el càlcul'],
['Calcul annulé · résultat conservé','Calculation cancelled · result kept','Cálculo cancelado · resultado conservado','Càlcul cancel·lat · resultat conservat'],
['Calcul annulé · volume conservé','Calculation cancelled · model kept','Cálculo cancelado · modelo conservado','Càlcul cancel·lat · model conservat'],
['Import annulé · volume précédent conservé.','Import cancelled · previous model kept.','Importación cancelada · modelo anterior conservado.','Importació cancel·lada · model anterior conservat.'],
['Calcul annulé.','Calculation cancelled.','Cálculo cancelado.','Càlcul cancel·lat.'],
['Le calcul affiné de la démonstration est chargé.','The refined demo calculation is loaded.','Se ha cargado el cálculo afinado de la demostración.','S’ha carregat el càlcul refinat de la demostració.'],
['Préparation du calcul…','Preparing calculation…','Preparando el cálculo…','Preparant el càlcul…'],
['Calcul du tissage en cours…','Calculating weaving…','Calculando el tejido…','Calculant el teixit…'],
['Calcul interrompu','Calculation interrupted','Cálculo interrumpido','Càlcul interromput'],
['Échec du calcul','Calculation failed','Error de cálculo','Error de càlcul'],
['Projet exporté · fichier JSON','Project exported · JSON file','Proyecto exportado · archivo JSON','Projecte exportat · fitxer JSON'],
['Le projet dépasse 20 Mo.','The project exceeds 20 MB.','El proyecto supera los 20 MB.','El projecte supera els 20 MB.'],
['Ce fichier n’est pas un projet stringart3D compatible.','This file is not a compatible stringart3D project.','Este archivo no es un proyecto stringart3D compatible.','Aquest fitxer no és un projecte stringart3D compatible.'],
['Projet retrouvé.','Project restored.','Proyecto recuperado.','Projecte recuperat.'],
['Export CSV prêt.','CSV export ready.','Exportación CSV lista.','Exportació CSV a punt.'],
['Volume importé par l’utilisateur','Model imported by the user','Modelo importado por el usuario','Model importat per l’usuari'],
['L’image n’a pas pu être exportée.','The image could not be exported.','No se ha podido exportar la imagen.','No s’ha pogut exportar la imatge.'],
['Image PNG prête.','PNG image ready.','Imagen PNG lista.','Imatge PNG a punt.'],
['Le volume dépasse 50 Mo.','The model exceeds 50 MB.','El modelo supera los 50 MB.','El model supera els 50 MB.'],
['Choisissez un fichier STL, OBJ ou GLB.','Choose an STL, OBJ or GLB file.','Elige un archivo STL, OBJ o GLB.','Tria un fitxer STL, OBJ o GLB.'],
['Import et allègement du volume…','Importing and simplifying the model…','Importando y simplificando el modelo…','Important i simplificant el model…'],
['Import interrompu · volume précédent conservé','Import interrupted · previous model kept','Importación interrumpida · modelo anterior conservado','Importació interrompuda · model anterior conservat'],
['Volume importé. Ajustez les cadres puis calculez le tissage.','Model imported. Adjust the frames, then calculate the weaving.','Modelo importado. Ajusta los bastidores y calcula el tejido.','Model importat. Ajusta els bastidors i calcula el teixit.'],
['Le portrait de démonstration est chargé.','The demo portrait is loaded.','Se ha cargado el retrato de demostración.','S’ha carregat el retrat de demostració.'],
['La version ne peut pas être vérifiée.','The version could not be checked.','No se puede comprobar la versión.','No es pot comprovar la versió.'],
['L’affichage WebGL est rétabli.','WebGL display restored.','Se ha restablecido la vista WebGL.','S’ha restablert la vista WebGL.'],
['L’affichage WebGL est suspendu. Le navigateur tente de le rétablir.','WebGL display suspended. The browser is trying to restore it.','La vista WebGL está suspendida. El navegador intenta restablecerla.','La vista WebGL està suspesa. El navegador intenta restablir-la.'],
['Le portrait de démonstration est introuvable.','The demo portrait could not be found.','No se encuentra el retrato de demostración.','No es troba el retrat de demostració.'],
['Une mise à jour est disponible. Utilisez « Actualiser cette version » dans l’aide.','An update is available. Use Refresh this version in Help.','Hay una actualización disponible. Usa Actualizar esta versión en la ayuda.','Hi ha una actualització disponible. Fes servir Actualitza aquesta versió a l’ajuda.'],
['Pour ouvrir l’atelier, utilisez « Lancer stringart3D.bat » dans le dossier du projet.','To open the studio, run Lancer stringart3D.bat in the project folder.','Para abrir el taller, ejecuta Lancer stringart3D.bat en la carpeta del proyecto.','Per obrir el taller, executa Lancer stringart3D.bat a la carpeta del projecte.'],
['L’atelier n’a pas pu démarrer','The studio could not start','No se ha podido iniciar el taller','No s’ha pogut iniciar el taller'],
['Recherche des intervalles de couleur…','Finding colour intervals…','Buscando intervalos de color…','Cercant intervals de color…'],
['Préparation des cinq vues du volume…','Preparing five model views…','Preparando las cinco vistas del modelo…','Preparant les cinc vistes del model…'],
['Projection des fils entre les clous…','Projecting threads between nails…','Proyectando hilos entre los clavos…','Projectant fils entre els claus…'],
['Aucun parcours trouvé. Essayez un autre volume ou davantage de clous.','No path found. Try another model or more nails.','No se ha encontrado ningún recorrido. Prueba otro modelo o más clavos.','No s’ha trobat cap recorregut. Prova un altre model o més claus.'],
['Le calcul a échoué.','Calculation failed.','El cálculo ha fallado.','El càlcul ha fallat.'],
['Assemblage des sommets du volume…','Assembling model vertices…','Ensamblando los vértices del modelo…','Muntant els vèrtexs del model…'],
['Le fichier ne contient pas assez de triangles utilisables.','The file does not contain enough usable triangles.','El archivo no contiene suficientes triángulos utilizables.','El fitxer no conté prou triangles utilitzables.'],
['Allègement du maillage, en conservant sa forme…','Simplifying the mesh while preserving its shape…','Simplificando la malla y conservando su forma…','Simplificant la malla i conservant-ne la forma…'],
['Ce navigateur ne permet pas l’allègement automatique (WebAssembly requis).','This browser cannot simplify models automatically (WebAssembly required).','Este navegador no permite la simplificación automática (requiere WebAssembly).','Aquest navegador no permet la simplificació automàtica (cal WebAssembly).'],
['L’allègement ne peut pas conserver un volume fermé. Essayez un export moins détaillé.','Simplification cannot preserve a closed model. Try a less detailed export.','La simplificación no puede conservar un modelo cerrado. Prueba una exportación menos detallada.','La simplificació no pot conservar un model tancat. Prova una exportació menys detallada.'],
['Ce maillage reste trop complexe après allègement. Exportez un volume fermé plus simple (100 000 triangles maximum).','This mesh is still too complex after simplification. Export a simpler closed model (100,000 triangles maximum).','La malla sigue siendo demasiado compleja tras la simplificación. Exporta un modelo cerrado más sencillo (100.000 triángulos como máximo).','La malla encara és massa complexa després de simplificar-la. Exporta un model tancat més senzill (100.000 triangles com a màxim).'],
['Centrage et préparation pour le tissage…','Centering and preparing for weaving…','Centrando y preparando para el tejido…','Centrant i preparant per al teixit…'],
['L’import du volume a échoué.','Model import failed.','Ha fallado la importación del modelo.','La importació del model ha fallat.'],
['WebGL est indisponible. Essayez Edge, Chrome ou Firefox avec l’accélération graphique activée.','WebGL is unavailable. Try Edge, Chrome or Firefox with graphics acceleration enabled.','WebGL no está disponible. Prueba Edge, Chrome o Firefox con la aceleración gráfica activada.','WebGL no està disponible. Prova Edge, Chrome o Firefox amb l’acceleració gràfica activada.'],
['Données binaires trop grandes ou absentes.','Binary data is too large or missing.','Los datos binarios son demasiado grandes o faltan.','Les dades binàries són massa grans o falten.'],
['Données binaires incomplètes.','Incomplete binary data.','Datos binarios incompletos.','Dades binàries incompletes.'],
['Le modèle contient une coordonnée incorrecte.','The model contains an invalid coordinate.','El modelo contiene una coordenada incorrecta.','El model conté una coordenada incorrecta.'],
['Un triangle pointe vers un sommet absent.','A triangle refers to a missing vertex.','Un triángulo hace referencia a un vértice ausente.','Un triangle fa referència a un vèrtex absent.'],
['Le modèle doit avoir un volume dans les trois directions.','The model must have volume in all three directions.','El modelo debe tener volumen en las tres direcciones.','El model ha de tenir volum en les tres direccions.'],
['Normales du modèle incorrectes.','Invalid model normals.','Normales del modelo incorrectas.','Normals del model incorrectes.'],
['Le volume dépasse la structure extérieure.','The model extends beyond the outer frame.','El modelo sobrepasa la estructura exterior.','El model sobrepassa l’estructura exterior.'],
['Coloration du fil absente.','Thread colouring is missing.','Falta la coloración del hilo.','Falta la coloració del fil.'],
['Coloration incompatible avec le parcours.','Colouring does not match the path.','La coloración no es compatible con el recorrido.','La coloració no és compatible amb el recorregut.'],
['Découpage de couleur incorrect.','Invalid colour segmentation.','Segmentación de color incorrecta.','Segmentació de color incorrecta.'],
['Intervalles de couleur incorrects.','Invalid colour intervals.','Intervalos de color incorrectos.','Intervals de color incorrectes.'],
['Nombre de clous incorrect.','Invalid nail count.','Número de clavos incorrecto.','Nombre de claus incorrecte.'],
['Coordonnées de clous incorrectes.','Invalid nail coordinates.','Coordenadas de clavos incorrectas.','Coordenades dels claus incorrectes.'],
['Structure de projet incorrecte.','Invalid project structure.','Estructura del proyecto incorrecta.','Estructura del projecte incorrecta.'],
['Réglages de calcul incorrects.','Invalid calculation settings.','Ajustes de cálculo incorrectos.','Paràmetres de càlcul incorrectes.'],
['Parcours de fil incorrect.','Invalid thread path.','Recorrido del hilo incorrecto.','Recorregut del fil incorrecte.'],
['Le parcours contient un clou incorrect ou un passage nul.','The path contains an invalid nail or a zero-length pass.','El recorrido contiene un clavo incorrecto o una pasada de longitud nula.','El recorregut conté un clau incorrecte o una passada de longitud nul·la.'],
['Sommet OBJ incomplet.','Incomplete OBJ vertex.','Vértice OBJ incompleto.','Vèrtex OBJ incomplet.'],
['Indice de face OBJ incorrect.','Invalid OBJ face index.','Índice de cara OBJ incorrecto.','Índex de cara OBJ incorrecte.'],
['Face OBJ incomplète.','Incomplete OBJ face.','Cara OBJ incompleta.','Cara OBJ incompleta.'],
['Ce volume dépasse la limite de sommets ou triangles.','This model exceeds the vertex or triangle limit.','Este modelo supera el límite de vértices o triángulos.','Aquest model supera el límit de vèrtexs o triangles.'],
['Coordonnée STL incorrecte.','Invalid STL coordinate.','Coordenada STL incorrecta.','Coordenada STL incorrecta.'],
['Le STL dépasse un million de sommets ou triangles.','The STL exceeds one million vertices or triangles.','El STL supera un millón de vértices o triángulos.','L’STL supera un milió de vèrtexs o triangles.'],
['Le STL dépasse un million de triangles.','The STL exceeds one million triangles.','El STL supera un millón de triángulos.','L’STL supera un milió de triangles.'],
['STL binaire incomplet ou STL ASCII incorrect.','Incomplete binary STL or invalid ASCII STL.','STL binario incompleto o STL ASCII incorrecto.','STL binari incomplet o STL ASCII incorrecte.'],
['Faces STL incomplètes.','Incomplete STL faces.','Caras STL incompletas.','Cares STL incompletes.'],
['Une face STL doit contenir trois sommets.','An STL face must contain three vertices.','Una cara STL debe contener tres vértices.','Una cara STL ha de contenir tres vèrtexs.'],
['Fichier GLB 2.0 attendu.','A GLB 2.0 file is required.','Se requiere un archivo GLB 2.0.','Cal un fitxer GLB 2.0.'],
['GLB incomplet.','Incomplete GLB.','GLB incompleto.','GLB incomplet.'],
['Le GLB doit contenir son maillage.','The GLB must contain its mesh.','El GLB debe contener su malla.','El GLB ha de contenir la seva malla.'],
['Exportez un GLB statique, sans animation ni squelette.','Export a static GLB without animation or skeleton.','Exporta un GLB estático, sin animación ni esqueleto.','Exporta un GLB estàtic, sense animació ni esquelet.'],
['GLB compressé ou externe : exportez un maillage simple sans Draco ni Meshopt.','Compressed or external GLB: export a simple mesh without Draco or Meshopt.','GLB comprimido o externo: exporta una malla simple sin Draco ni Meshopt.','GLB comprimit o extern: exporta una malla simple sense Draco ni Meshopt.'],
['Format de sommets GLB non pris en charge.','Unsupported GLB vertex format.','Formato de vértices GLB no compatible.','Format de vèrtexs GLB no admès.'],
['Données GLB trop grandes ou non prises en charge.','GLB data is too large or unsupported.','Datos GLB demasiado grandes o no compatibles.','Dades GLB massa grans o no admeses.'],
['Données GLB hors limites.','GLB data is out of bounds.','Datos GLB fuera de los límites.','Dades GLB fora dels límits.'],
['Maillage GLB absent.','GLB mesh is missing.','Falta la malla GLB.','Falta la malla GLB.'],
['Exportez uniquement des triangles statiques sans compression.','Export only static, uncompressed triangles.','Exporta solo triángulos estáticos sin compresión.','Exporta només triangles estàtics sense compressió.'],
['Indice GLB incorrect.','Invalid GLB index.','Índice GLB incorrecto.','Índex GLB incorrecte.'],
['Hiérarchie GLB incorrecte ou trop complexe.','Invalid or overly complex GLB hierarchy.','Jerarquía GLB incorrecta o demasiado compleja.','Jerarquia GLB incorrecta o massa complexa.'],
['Nœud GLB absent.','GLB node is missing.','Falta un nodo GLB.','Falta un node GLB.'],
['Transformation GLB incorrecte.','Invalid GLB transform.','Transformación GLB incorrecta.','Transformació GLB incorrecta.'],
['longueurs droites sans tours de clous','straight lengths excluding nail wraps','longitudes rectas sin vueltas alrededor de clavos','longituds rectes sense voltes als claus']
);
const catalog=new Map(rows.map(row=>[row[0],row]));
const languageIndex={fr:0,en:1,es:2,ca:3};
export let language='fr';
export const getLocale=()=>localeNames[language];

// Dynamic message templates, including progress sent by local Web Workers.
const rules=[];
function rule(pattern,en,es,ca){rules.push({pattern,values:{en,es,ca}});}
rule(/^(\d+) fils\/s$/,'$1 threads/s','$1 hilos/s','$1 fils/s');
rule(/^(.+) clous accessibles sur la structure extérieure\.$/,'$1 nails accessible on the outer frame.','$1 clavos accesibles en la estructura exterior.','$1 claus accessibles a l’estructura exterior.');
rule(/^Portions colorées : (.+) mm · transitions progressives en 3D\.$/,'Coloured sections: $1 mm · gradual 3D transitions.','Tramos coloreados: $1 mm · transiciones progresivas en 3D.','Trams de color: $1 mm · transicions progressives en 3D.');
rule(/^PASSAGE (.+)$/,'PASS $1','PASADA $1','PASSADA $1');
rule(/^(.+) sommets · ([^·]+) triangles( · allégé depuis (.+) triangles)?$/,'$1 vertices · $2 triangles','$1 vértices · $2 triángulos','$1 vèrtexs · $2 triangles');
rule(/^· allégé depuis (.+) triangles$/,'· simplified from $1 triangles','· simplificado desde $1 triángulos','· simplificat des de $1 triangles');
rule(/^Tissage calculé\. (.+) fils ont un croisement non apparié : vérifiez que le maillage est fermé\.$/,'Weaving calculated. $1 threads have an unpaired intersection: check that the mesh is closed.','Tejido calculado. $1 hilos tienen una intersección sin pareja: comprueba que la malla esté cerrada.','Teixit calculat. $1 fils tenen una intersecció sense parella: comprova que la malla estigui tancada.');
rule(/^(.+) passages calculés et colorés\.$/,'$1 passes calculated and coloured.','$1 pasadas calculadas y coloreadas.','$1 passades calculades i acolorides.');
rule(/^Projet ouvert · (.+)$/,'Project opened · $1','Proyecto abierto · $1','Projecte obert · $1');
rule(/^Structure : (.+) × (.+) × (.+) cm · (.+) cadres espacés de (.+) cm · (.+) clous\. Coordonnées exactes disponibles dans l’export\.$/,'Frame: $1 × $2 × $3 cm · $4 frames spaced $5 cm apart · $6 nails. Exact coordinates are available in the export.','Estructura: $1 × $2 × $3 cm · $4 bastidores separados $5 cm · $6 clavos. Coordenadas exactas disponibles en la exportación.','Estructura: $1 × $2 × $3 cm · $4 bastidors separats $5 cm · $6 claus. Coordenades exactes disponibles a l’exportació.');
rule(/^Volume allégé : (.+) → (.+) triangles\. Prêt à calculer\.$/,'Model simplified: $1 → $2 triangles. Ready to calculate.','Modelo simplificado: $1 → $2 triángulos. Listo para calcular.','Model simplificat: $1 → $2 triangles. A punt per calcular.');
rule(/^cadre (.+) · (.+)$/,'frame $1 · $2','bastidor $1 · $2','bastidor $1 · $2');
rule(/^barre (.+) · (.+)$/,'rail $1 · $2','barra $1 · $2','barra $1 · $2');
rule(/^clou (.+)$/,'nail $1','clavo $1','clau $1');
rule(/^hauteur extérieure (.+) cm$/,'outer height $1 cm','altura exterior $1 cm','alçada exterior $1 cm');
rule(/^Jacinto Costoso · 2026 · v(.+) · (.+) passages$/,'Jacinto Costoso · 2026 · v$1 · $2 passes','Jacinto Costoso · 2026 · v$1 · $2 pasadas','Jacinto Costoso · 2026 · v$1 · $2 passades');
rule(/^Calcul : (.+) \/ (.+) passages$/,'Calculating: $1 / $2 passes','Cálculo: $1 / $2 pasadas','Càlcul: $1 / $2 passades');
rule(/^Coloration : (.+) \/ (.+) passages$/,'Colouring: $1 / $2 passes','Coloración: $1 / $2 pasadas','Coloració: $1 / $2 passades');
rule(/^Maillage attendu : de 4 à (.+) sommets, au plus (.+) triangles\.$/,'Expected mesh: 4 to $1 vertices, at most $2 triangles.','Malla esperada: de 4 a $1 vértices, como máximo $2 triángulos.','Malla esperada: de 4 a $1 vèrtexs, com a màxim $2 triangles.');
for(const [prefix,translations] of [['Le calcul a échoué : ',{en:'Calculation failed: ',es:'El cálculo ha fallado: ',ca:'El càlcul ha fallat: '}],['L’import a échoué : ',{en:'Import failed: ',es:'La importación ha fallado: ',ca:'La importació ha fallat: '}]]){
  rule(new RegExp('^'+prefix+'(.+)$'),(...m)=>translations.en+translateText(m[1],'en'),(...m)=>translations.es+translateText(m[1],'es'),(...m)=>translations.ca+translateText(m[1],'ca'));
}

export function translateText(source,target=language){
  if(typeof source!=='string'||target==='fr')return source;
  const text=source.trim(),entry=catalog.get(text);
  if(entry)return source.replace(text,()=>entry[languageIndex[target]]);
  for(const item of rules){const match=text.match(item.pattern);if(match){const template=item.values[target];let value=typeof template==='function'?template(...match):template.replace(/\$(\d+)/g,(_,n)=>match[Number(n)]??'');if(match[4]&&item.pattern.source.includes('sommets ·'))value+=translateText(' · allégé depuis '+match[4]+' triangles',target);return source.replace(text,()=>value);}}
  return source;
}

if(typeof document!=='undefined'){
  const key=`stringart3d:${new URL('.',location.href).pathname}:language`,sources=new WeakMap(),attributes=new WeakMap();
  const picker=document.getElementById('languageSelect');let choice='auto';
  try{const saved=localStorage.getItem(key);if(saved==='auto'||supportedLanguages.includes(saved))choice=saved;}catch{}
  const excluded=node=>node.parentElement?.closest('script,style,noscript,textarea,svg,#languageSelect,#modelName,#projectTitle,#anchorFrom,#anchorTo');
  function textNode(node){
    if(excluded(node)||!node.data.trim())return;
    let record=sources.get(node);if(!record||node.data!==record.translated)record={source:node.data};
    record.translated=translateText(record.source);sources.set(node,record);if(node.data!==record.translated)node.data=record.translated;
  }
  const attributeNames=['title','aria-label','placeholder','alt'];
  function element(node){
    if(node.matches('script,style,svg'))return;
    let saved=attributes.get(node);if(!saved){saved={};attributes.set(node,saved);}
    for(const name of attributeNames)if(node.hasAttribute(name)){
      const current=node.getAttribute(name);let record=saved[name];if(!record||current!==record.translated)record={source:current};
      record.translated=translateText(record.source);saved[name]=record;if(current!==record.translated)node.setAttribute(name,record.translated);
    }
  }
  function walk(root){
    if(root.nodeType===Node.TEXT_NODE){textNode(root);return;}
    if(root.nodeType!==Node.ELEMENT_NODE&&root.nodeType!==Node.DOCUMENT_NODE)return;
    if(root.nodeType===Node.ELEMENT_NODE)element(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let node;
    while(node=walker.nextNode()){if(node.nodeType===Node.TEXT_NODE)textNode(node);else element(node);}
  }
  function apply(){
    language=resolveLanguage(navigator.languages?.length?navigator.languages:[navigator.language],choice);
    document.documentElement.lang=language;document.documentElement.dataset.language=language;
    if(picker)picker.value=choice;
    walk(document);
    const auto=picker?.querySelector('[value="auto"]');if(auto)auto.textContent=`Auto · ${language.toUpperCase()}`;
    window.dispatchEvent(new CustomEvent('stringart-language-change',{detail:{language}}));
  }
  const observer=new MutationObserver(records=>{
    for(const record of records){if(record.type==='characterData')textNode(record.target);else if(record.type==='attributes')element(record.target);else for(const node of record.addedNodes)walk(node);}
  });
  apply();observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:attributeNames});
  picker?.addEventListener('change',()=>{choice=picker.value;try{localStorage.setItem(key,choice);}catch{}apply();});
  window.addEventListener('languagechange',()=>{if(choice==='auto')apply();});
  document.querySelector('#helpDialog a[download]')?.addEventListener('click',event=>{
    if(language==='fr')return;
    event.preventDefault();walk(document.getElementById('helpDialog'));
    const dialog=document.getElementById('helpDialog'),version=dialog.querySelector('.help-version').textContent;
    const lines=[`# stringart3D ${version}`,`Language: ${language}`];
    for(const node of dialog.querySelectorAll('h2,h3,p,li,summary')){const prefix=/^H[23]$/.test(node.tagName)?'## ':node.tagName==='LI'?'- ':'';lines.push(prefix+node.textContent.trim());}
    lines.push('MakerWorld: https://makerworld.com/en/makerlab/makeMyStatue','Jacinto Costoso · https://www.costoso.net');
    const blob=new Blob([lines.join('\n\n')],{type:'text/markdown;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`stringart3D-help-${language}.md`;link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
  });
}
