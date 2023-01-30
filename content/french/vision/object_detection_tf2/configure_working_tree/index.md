---
title: "Créer l'arborescence de travail pour plusieurs projets de détection d'objets dans des images"
menu:
  main:
    name: "Configurer l'arborescence"
    weight: 2
    parent: "objectDetectionTF2"
---

---
    Acquis d'apprentissage visés :
    - Savoir organiser et construire l'arborescence de travail pour supporter plusieurs projets de détection d'objets dans des images

    Durée approximative : 5 minutes
---

## Principe de l'arborescence de travail multi-projets

L'arborescence générique proposée est la suivante :

	tod_tf2
	├── <project>
	│   ├── images
	│   │   ├── test
	│   │   │   └── *.jpg, *.png ... *.xml
	│   │   ├── train
	│   │   │   └── *.jpg, *.png ... *.xml
	│   │   └── *.csv
	│   │
	│   └── training
	│       ├── <pre-trained_net>
	│       ├── train.record
	│       ├── test.record
	│       └── label_map.txt
	├── pre_trained
	│	└── <pre_trained-net>
    │	
	└── models
	    └── research
	        └── object_detection
	
* À chaque projet correspond un répertoire `<project>` spécifique.

* Le dossier `<project>/images` contient pour chaque projet :
	* les dossiers `test` et `train` qui contiennent chacun :
		* les images PNG, JPG... à analyser,
		* les fichiers d'annotation XML créés avec le logiciel `labelImg` : ils donnent, pour chacun des objets d'une image, les coordonnées de la boîte englobant l'objet et le label de l'objet.
    * les fichiers d'annotation CSV (contenu des fichiers XML convertis au format CSV), qui seront à leur tour convertis au format _`tensorflow record`_.
* Le dossier `<project>/training` contient pour chaque projet :
	* Un dossier `<pre_trained_net>` pour chaque réseau pré-entrainé utilisé : tu peux ainsi essayer plusieurs réseaux pré-entraînés pour comparer leurs performances.<br>
	C'est dans le dossier `<pre-trained_net>` que sont stockés :
	    * les fichiers des poids du réseau pré-entraîné téléchargés depuis Internet,
	    * les fichiers des nouveaux poids du réseau pré-entraîné ré-entraîné par tes soins.
	* les fichiers `train.reccord`  et `test.reccord` : données labelisées d'entraînement et de test au format _tensorflow record_,
	* le fichier `label_map.txt` : contient la liste les labels correspondants aux objets à détecter.

* Le dossier `pre-trained/` contient un sous-dossier pour chacun des réseaux pré-entrainés utilisé qui stocke les différents fichiers nécessaires à leur utilisation.
	
## Exemple : chiffres manuscrits sur les faces de cubes 
	
Considérons des images fournies par la caméra du robot montarnt des chiffres manuscrits sur les faces de cubes :<br>
![cube_faces.png](img/cube_faces.png)

Le dossier `<project>` folder est appelé par exeme `faces_cubes`, ce qui donne l'arborescence :

	tod_tf2
	├── faces_cubes
	│   ├── images
	│   │   ├── test
	│   │   │   └── *.jpg, *.png ... *.xml
	│   │   ├── train
	│   │   │   └── *.jpg, *.png ... *.xml
	│   │   └── *.csv
	│   └── training
	│       ├── <pre-trained_net>
	│       ├── train.record
	│       ├── test.record
	│       └── label_map.txt
	├── pre-trained
	│	└── <pre-trained_net>
	└── models
	    └── research
	        └── object_detection

Quelques commandes shell suffisent pour créer les premiers niveaux de cette arborescence :

```bash	
# From within tod_tf2
(tf2) user@host $ mkdir -p faces_cubes/images/test
(tf2) user@host $ mkdir -p faces_cubes/images/train
(tf2) user@host $ mkdir -p faces_cubes/training
(tf2) user@host $ mkdir pre-trained
```
Vérifions :

```bash	
# From within tod_tf2
(tf2) user@host $ tree -d . -I models  # arbre du dossier courant en excluant le dossier 'models'
.
├── faces_cubes
│   ├── images
│   │   ├── test
│   │   └── train
│   └── training
├── pre-trained
└── tod_tf2_tools
```

