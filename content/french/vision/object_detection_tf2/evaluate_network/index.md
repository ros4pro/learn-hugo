---
title: "Évaluer les inférences du réseau ré-entrainé"
menu:
  main:
    name: "Évaluer le réseau ré-entraîné"
    weight: 7
    parent: "objectDetectionTF2"
---

---
    Acquis d'apprentissage visés :
    - Savoir exploiter un réseau TOD ré-entraîné.

    Durée approximative : 20 minutes (dépend des ressources CPU & RAM de ton ordinateur).
---

## Évaluer les inférences du réseau ré-entrainé

Le but de cette activité est de Vérifier que le réseau entraîné est bien capable de détecter les faces des cubes en classant correctement les numéros écrits sur les faces.

Le script Python `plot_object_detection_saved_model.py` permet d'exploiter le réseau de neuronnes ré-entraîné.
* Les arguments obligatoires sont :
    * `-l` : le chemin du fichier `label_map.txt`
    * `-s` : le chemin du dossier `saved_model/` contenant les fichiers des poids du réseau ré-entraîné
    * `-i` : le chemin __du dossier des images__ ou le chemin __du fichier image__ à analyser
* Les argumenst optionnels sont :
    * `-n` : le nombre max d'objets à détecter (valeur par défaut : 4)
    * `-t` : le seuil (_threshold_) de détection exprimé en % (valeur par défaut : 50 %).

![tree.png](img/tree.png)

Par exemple pour faire la détection des cubes des images de test avec le réseau ré-entraîné :

```bash
# From within tod_tf2
(tf2) user@host: $ source config_tf2
(tf2) user@host: $ python plot_object_detection_saved_model.py -l faces_cubes/training/label_map.txt -s $PTN_DIR/saved_model1/saved_model -i faces_cubes/images/test/
Loading model...Done in 6.56 seconds
Running inference for image <faces_cubes/images/test/image.png>... [2 2 1 1]
[0.9998948 0.9995417 0.9990502 0.9978729]
[[0.45760542 0.53661    0.6969234  0.7183084 ]
 [0.4539451  0.27809587 0.69157326 0.46450177]
 [0.45307213 0.76109356 0.7182864  0.96689934]
 [0.43293783 0.03515252 0.6828682  0.23790947]]
Running inference for image <faces_cubes/images/test/image016.png>... [2 1 2 1]
[0.99985933 0.9998574  0.99966705 0.99942625]
[[0.4033991  0.12390069 0.6380827  0.30582437]
 [0.39657718 0.5598919  0.6364023  0.73766536]
 [0.4053073  0.7683293  0.6442755  0.9593663 ]
 [0.40017924 0.33384678 0.63733757 0.51233685]]
```

Exemples d'images produites par le script Python :

|   image.png           |   image016.png               
:-------------------------:|:----------------------------:
![1](img/infere_img01.png) |  ![2](img/infere_img02.png)  

Pour chaque image traitée on a :
* la liste des 4 labels des objets trouvés (`1` ou `2`)
* la liste des 4 probabilités correspondant aux objets trouvés
* la liste des 4 jeux de coordonnées normalisées des boîtes englobantes des objets trouvés : [y, x] coin-haut-gauche puis [y, x] coin-bas-droit. 

⚠️ Note que les listes sont données dans __l'ordre des probabilités de détection décroissantes__ : 
* pour trier les listes dans l'ordre de gauche à droite dans l'image, tu peux exploiter les abcisses `x` des boites englobantes,
* pour trier les listes dans l'ordre de haut en bas dans l'image, tu peux exploiter l'ordonnée `y` des boites englobantes.

Dans tous les cas, la fonction __numpy__ `argsort` est ton amie... (tu peux voir un exemple d'implémentation dans le fichier `plot_object_detection_sorted_saved_model.py`.)

## La suite ....

Quelques idées à bien garder en tête :

* ⚠️  l'EVP `(tf2)` doit être utilisé __UNIQUEMENT pour entraîner le réseau de neurones__.
* Pour le travail avec ROS dans l'environnement Python standard :
    * ⚠️  l'EVP `(tf2)` __ne doit pas être utilisé__ pour exploiter le réseau de neurone ré-entrainé.
    * Pour ajouter des modules, utilise `sudo apt install python3-...`, ou `pip3 install ...` ou encore `sudo pip3 install ...`
    * Tu dois installer le module _tensorflow_ dans l'environnement Python standard de ta machine : `pip3 install tensorflow==2.11.0` devrait faire le job.
    * Pour instancier le réseau ré-entraîné que tu as sauvegardé, utilise la fonction `saved_model.load` du module _tensorflow_ (cf fichier `nn.py`) : 

* Le fichier `nn.py` dans le dossier `tod_tf2` montre un exemple d'exploitation du réseau ré-entraîné :
    * Exécute le fichier dans l'environnement Python standard (mêmes arguments `-l` et `-s` que `plot_object_detection_saved_model.py`: <br>
     `user@host:~/catkin_ws/tod_tf2$ python3 nn.py -l faces_cubes/training/label_map.txt -s $PTN_DIR/saved_model1/saved_model -v`
    * Installe les modules Python manquants si besoin.l'environnement Python standard de ta machine avec la commande `pip3 install xxxx`.
