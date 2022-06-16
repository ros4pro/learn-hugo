---
title: "Obtenir les images avec le robot"
menu:
  main:
    name: "Obtenir les images"
    weight: 4
    parent: "objectDetectionTF2"
---

---
    Acquis d'apprentissage visés :
    - Savoir obtenir avec ROS les images d'une caméra placée sur un robot.

    Type d'activité     : ⚙️ [tâche]
    Durée approximative : 60 minutes 
---

## Obtenir les images avec la caméra d'un noeud ROS

Les images à traiter sont obtenues en utilisant le service _ROS_ `/get_image` proposé par le robot _Poppy Ergo Jr_.

image001.png               |  image002.png
:-------------------------:|:-------------------------:
![image1](img/image000.png)   |  ![image2](img/image001.png)


🤖 Rappels - Lancement du _ROS Master_ et des services _ROS_ sur le robot :
 
* allumer le robot _Poppy Ergo Jr_,
* se connecter à la carte _RPi_ du robot : `ssh poppy@poppy.local` (mdp: `poppy`) 
* ✅ vérifier que `ROS_MASTER_URI` pointe bien vers `http://poppy.local:11311` 
```bash
(tf2) user@host: $ ssh pi@poppy.local
poppy@poppy.local password:
...

poppy@poppy:~ $ env|grep ROS_MASTER
ROS_MASTER_URI=http://poppy.local:11311
```	
* si `ROS_MASTER_URI` ne pointe pas sur la bonne cible :
    * édite le fichier `~/.bashrc` du robot, 
    * mets la bonne valeur, sauvegarde,
    * puis tape `source ~\.bashrc`,
    * et vérifie de nouveau la valeur de `ROS_MASTER_URI`...


* Lance le _ROS Master_ et les services _ROS_ utiles avec la commande : 
```bash
poppy@poppy:~ $ roslaunch poppy_controllers control.launch
...
```

💻 Maintenant dans un terminal sur ton ordinateur, avec l'EVP `(tf2)` activé :
* ✅ vérifie que `ROS_MASTER_URI` pointe bien vers `http://poppy.local:11311` 
```bash
(tf2) user@host: $ env|grep ROS_MASTER
ROS_MASTER_URI=http://poppy.local:11311
```	
* si `ROS_MASTER_URI` ne pointe pas sur la bonne cible :
    * édite le fichier `~/.bashrc` de ton ordinateur, 
    * mets la bonne valeur, sauvegarde,
    * puis tape `source ~\.bashrc`
    * et vérifie de nouveau la valeur de `ROS_MASTER_URI`...


🐍 Tu peux utiliser maintenant le programme Python `get_image_from_robot.py` du dossier `tod_tf2` pour enregistrer les images des cubes dans des fichiers nommées `imagesxxx.png` (`xxx` = `001`, `002`...). <br>
Un appui sur une touche clavier permet de passer d'une image à l'autre, un appui sur la touche `Q` permet de quitter le programme :

```python
import cv2, rospy
from poppy_controllers.srv import GetImage
from cv_bridge import CvBridge

i=1
while True:
    get_image = rospy.ServiceProxy("get_image", GetImage)
    response  = get_image()
    bridge    = CvBridge()
    image     = bridge.imgmsg_to_cv2(response.image)
    cv2.imwrite(f"image{i:03d}.png", image)
    cv2.imshow("Poppy camera", image)
    key = cv2.waitKey(0)
    if key==ord('q') or key==ord("Q"): break
    cv2.destroyAllWindows()
    i += 1
cv2.destroyAllWindows()
```

📍  En cas de conflit grave entre _ROS_, l'EVP tf2 et _PyQT_ avec le programme `get_image_from_robot.py` tu peux désactiver temporairement l'EVP tf2 :
* soit en lançant un nouveau terminal,
* soit en tapant la commande `conda deactivate`

Tu dois collecter quelques dizaines d'image pour l'entraînement du réseau de neurones.

Une fois les images collectées, il faut mettre environ 90 % des images dans le dossier `<project>/images/train` et le reste dans le dossier `<project>/images/test`.

