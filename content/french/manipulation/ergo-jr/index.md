---
title: "Robotique de manipulation avec Poppy Ergo Jr"
menu:
  main:
    name: "Poppy Ergo Jr"
    weight: 2
    parent: "manipulation"
---

La robotique de manipulation regroupe la manipulation d'objets avec des robots. Dans ce TP nous utilisons un robot opensource [Poppy Ergo Jr](https://www.poppy-project.org/fr/robots/poppy-ergo-jr/) qui peut être 100% imprimé en 3D à la maison ou à l'école.

## Prérequis

* Lycée et +
* Notions de commandes dans un terminal et d'adressage IP
* Notions de Python
* Notions de géométrie 3D
* Le [TP d'introduction](../introduction)

## Diapositives

{{<pdf src="https://files.ros4.pro/manipulation.pdf" >}}

## 1. Préparer le matériel (avec un robot réel)

### 1.1. Préparer la carte SD

📥 Si nécessaire, flashez la carte SD fournie avec l'image ROS en utilisant [la procédure de la FAQ](/fr/faq/pi/). 

### 1.2. Assembler Poppy Ergo Jr

🔧 Pour assembler votre robot s'il est démonté, veuillez suivre [le guide d'assemblage](https://docs.poppy-project.org/fr/assembly-guides/ergo-jr/), en suivant les étapes faîtes pour ROS le cas échéant.
  
👀 Comparez minutieusement chaque pièce par rapport à son montage sur les photos pour vérifier leur orientation car il est très facile d'assembler ce robot à l'envers même s'il a au final la même allure.
  
### 1.3. Se connecter à Poppy Ergo Jr

Connectez votre robot en Wifi via [la procédure de la FAQ](/fr/faq/pi/). 

### 1.4. Démarrage de ROS sur Poppy Ergo Jr
  
Suivez la documentation pour [démarrer votre ROS en mode ROS](https://docs.poppy-project.org/fr/programming/ros.html#utiliser-poppy-sous-ros). Consultez les journaux (logs) de Poppy pour vérifier si ROS a correctement démarré : Vous devriez voir apparaître `Connection successful`. La caméra est automatiquement désactivée si elle ne fonctionne pas ⚠️ Ne jamais (dé)brancher la caméra lorsque l'alimentation secteur est branchée : **risques de dommages**. Si l'erreur `"Connection to the robot can't be established"` est affichée, alors vos moteurs n'ont pas été configurés correctement. La suite de ce message d'erreur indique quel(s) moteur(s) pose(nt) problème pour vous aider à le résoudre. Fermez avec Ctrl+C puis utilisez de nouveau Poppy Configure si un moteur est mal configuré.

* **PRISE EN MAIN :** Suivez la prise en main du robot proposée sur la documentation pour prendre une image caméra, changer la compliance du robot, et actionner l'effecteur puis revenez ici pour le démarrage des TP.

**Remarque :** Si vos moteurs clignotent en rouge : votre code a créé une collision et ils se sont mis en alarme. Pour désactiver l'alarme il faut débrancher et rebrancher l'alimentation, ce qui fera aussi redémarrer le robot
  
## 2. Travaux pratiques

### 2.1. Comprendre la représentation d'un robot ROS

Un robot intégré à ROS est composé d'au minimum :

* un descripteur URDF
* un contrôleur qui gère les E/S avec le robot

#### 2.1.1. Comprendre le descripteur URDF

💻📀 Clonez le package ROS Poppy Ergo Jr Description sur votre PC, il contient le fichier de description URDF du robot :

```bash
git clone https://github.com/poppy-project/poppy_ergo_jr_description.git
```

💻 Compilez votre workspace puis sourcez votre `.bashrc`, enfin rdv dans le dossier `urdf` de ce package, puis exécutez la commande `urdf_to_graphiz` qui convertit un fichier URDF en représentation graphique dans un PDF :

```bash
sudo apt install liburdfdom-tools ros-noetic-plotjuggler-ros
roscd poppy_ergo_jr_description/urdf
urdf_to_graphiz poppy_ergo_jr.urdf
```

Ouvrez le PDF obtenu puis déterminez :

* Que représentent les rectangles ?
* Que représentent les bulles ?
* Que représentent les flèches et surtout les valeurs `xyz` et `rpy` associées ?

![URDF de Poppy Ergo Jr](https://raw.githubusercontent.com/poppy-project/poppy_ergo_jr_description/master/doc/img/rviz.png)

#### 2.1.2. Comprendre les E/S du contrôleur

🤖 Le contrôleur se trouve déjà sur le robot. Vous pouvez directement vous connecter au robot et le démarrer :

```bash
ssh poppy@poppy.local      # password poppy
# Effacer éventuellement l'ancienne clé ECDSA si vous avez un message d'erreur
roslaunch poppy_controllers control.launch
```

💻 Sur votre PC, faîtes pointer votre `ROS_MASTER_URI` sur `poppy.local`. Rappel :

```bash
nano ~/.bashrc      # Pour changer votre ROS_MASTER_URI
source ~/.bashrc    # Pour charger votre .bashrc et donc le nouveau master
```

##### 2.1.2.a. Topics du robot

✍ Avec l'utilitaire `rostopic`, lister les topics disponibles puis consultez celui qui décrit l'état courant des joints, en particulier :

* Quel est son nom ?
* Quel est le type de message qu'il transmet ?
* A quelle fréquence (en Hertz) est-ce qu'il met à jour l'état des joints ?

##### 2.1.2.b. Services du robot

✍ Avec les utilitaires `rosservice` et `rossrv`, listez les services disponibles puis consultez celui qui met le robot en mode **compliant**. En particulier :

* Quel est le nom de topic du service mettant le robot en compliant ?
* Quel est le type de ce service ?
* Consultez le détail des champs. Quels sont les champs de la **requête** de ce service ?
* Consultez le détail des champs. Quels sont les champs de la **réponse** de ce service ?
* Appelez ce service pour activer et désactiver le mode compliant et essayez de faire bouger votre robot à la main à chaque fois. Que déduisez-vous de la signification du **mode compliant** ? *Conseil :* aidez-vous de l'autocomplétion avec la touche `TAB`.

##### 2.1.2.c. Tracer la courbe des positions des moteurs en temps réel

✍  Mettez votre robot en mode compliant. Démarrez `rosrun plotjuggler plotjuggler`, démarrez le streaming `ROS Topic Subscriber`, et sélectionnez `/joint_states`. Sélectionnez la position et la vitesse angulaire du moteur `m6` puis faîtes-les glisser sur le graphe. Bougez les moteurs à la main et vérifiez que les valeurs sont tracées en temps réel.

### 2.2. Cinématique, et planification avec le Jumeau Numérique MoveIt dans RViz (Digital Twin)

#### 2.2.1. Démarrer avec MoveIt en simulation

Si et seulement si vous ne pouvez pas utiliser de robot réel foncitonnel, une partie du TP suivant peut être réalisée en simulation : dans ce cas, changez votre `ROS_MASTER_URI` pour `localhost` (`nano ~/.bashrc`, faites la modification, enregistrez, puis `source ~/.bashrc`) puis, dans les commandes du TP, passez l'argument `fake_execution` à `true`.

#### 2.2.1. Démarrer avec MoveIt avec un robot réel

💻📀 Installez MoveIt puis clonez le package ROS **Poppy Ergo Jr MoveIt Configuration**, il contient le code nécessaire pour que ce robot fonctionne avec MoveIt :

```bash
sudo apt install ros-noetic-moveit
git clone https://github.com/poppy-project/poppy_ergo_jr_moveit_config.git
```

💻 Compilez votre workspace puis sourcez votre `.bashrc`. Démarrez MoveIt avec `roslaunch` avec le paramètre `fake_execution` à false pour se connecter au vrai robot :

```bash
roslaunch poppy_ergo_jr_moveit_config demo.launch fake_execution:=false gripper:=true
```

Rviz doit démarrer avec un Poppy Ergo Jr en visu correspondant à l'état de votre robot en temps réel. ⚠️ **Vérifiez impérativement** à ce stade que la posture de votre robot dans RViz correspond à la posture courante du robot réel : les angles des moteurs, et l'emplacement des rivets doivent **correspondre en tout point** à votre robot réel. Il est fréquent que les robots soient incorrectement assemblés, dans ce cas fermez MoveIt et reprenez pas-à-pas [le guide d'assemblage](https://docs.poppy-project.org/fr/assembly-guides/ergo-jr/) pour corriger avant de continuer.

⚠️ Les encodeurs ne sont capables de mesurer que des angles entre -170° et +170° : ne réalisez pas de trajectoires qui font sortir les moteurs de cet intervalle angulaire car cela causera des "téléportations" intempestives.

![MoveIt avec Poppy Ergo Jr](https://raw.githubusercontent.com/poppy-project/poppy_ergo_jr_moveit_config/36ffb295cf115a080b81aa6475ae512e88c9957a/doc/img/MoveIt.gif)

#### 2.2.2. Planification

💻 Dans l'onglet Planning, section **Query** puis **Planning group**, sélectionnez le groupe `arm_and_finger`, bougez le goal (la sphère 3D bleue) en position et en orientation puis cliquez sur **Plan**.

✍ Trois représentations 3D de robots se superposent, déterminez le rôle de chacun d'entre eux en testant également la fonctionnalité **Plan and Execute** :

* Que désigne le robot gris parfois mobile mais lent ?
* Que désigne le robot orange (fixe) ?
* Que désigne le robot gris qui répète infiniment un mouvement rapide ?
* Dans RViz, activer l'affichage du modèle de collision dans `Displays`, `Scene Robot`, `Show Robot Collision`, quelle est la forme de ce modèle utilisé par OMPL pour simplifier le calcul des collisions ?

#### 2.2.3. Planning groups

💻✍ Testez également le groupe `arm` en plus du premier `arm_and_finger` et lancez des planifications de mouvement pour tester :

* Quelle est la différence entre ces 2 groupes ?
* Quel est le groupe pour lequel le goal est le plus facilement manipulable ?
* Pourquoi ce groupe est-il plus facilement manipulable que l'autre ?
* Déduisez-en ce que désigne exactement un `planning group`

#### 2.2.4. Interroger l'arbre des transformations `tf` en ligne de commande

Nous allons visualiser et interroger l'arbre des transformations nommé `tf`.

💻✍ Démarrer MoveIt puis dans un autre terminal lancer `rosrun tf2_tools view_frames.py`. Un fichier PDF nommé `frames.pdf` a été créé : les `frames` (repères géométriques) qu'ils contient sont les mêmes que ceux dessinés par Rviz en rouge-vert-bleu.

* Comment est nommé le repère de base ?
* Comment sont nommés les deux effecteurs finaux possibles ?
* La commande `rosrun tf2_tools echo.py frameA frameB` renvoie la transformation actuelle de frameB dans frameA. Modifiez cette commande pour déterminer quelle est la position actuelle d'un des effecteurs dans le repère de base. Ses coordonnées peuvent vous servir par la suite, pour les définir comme cible à atteindre.

### 2.3. Ecrire un noeud Python ROS pour l'Ergo Jr

#### 2.3.1. Créer un nouveau package et un nouveau noeud Python

💻 Nous allons créer un nouveau package ROS nommé **ros4pro_custom** sur votre laptop de développement, qui contient notre code:

```bash
cd ~/catkin_ws/src
catkin_create_pkg ros4pro_custom             # Cette commande créé le package
mkdir -p ros4pro_custom/src                  # On créé un dossier src dans le package
touch ros4pro_custom/src/manipulate.py       # On créé un noeud Python "manipulate.py"
chmod +x ros4pro_custom/src/manipulate.py    # On rend ce noeud exécutable pour pouvoir le lancer avec rosrun
```

💻🐍 Bien que vous devriez avoir compris comment créer un noeud ROS en Python dans les tutoriels d'introduction, voici un rappel de noeud ROS minimal qui boucle toutes les secondes en Python :

```python
#!/usr/bin/env python3

import rospy

rospy.init_node('ros4pro_custom_node')
rate = rospy.Rate(1)

while not rospy.is_shutdown():
    rospy.loginfo("Hello world from our new node!")
    rate.sleep()
```

💻 Compilez votre workspace puis sourcez votre `.bashrc`. Exécutez votre noeud avec rosrun :

```bash
cd ~/catkin_ws
catkin_make
rosrun ros4pro_custom manipulate.py
```

Votre noeud doit afficher un message toutes les secondes, vous pouvez le tuer avec Ctrl+C. Nous allons ajouter du code petit à petit. Attention à l'ajouter au bon endroit pour créer un script cohérent.

#### 2.3.2. Planifier et exécuter des mouvements avec MoveIt

Le `MoveGroupCommander` est le commandeur de robot de MoveIt, il suffit de lui indiquer quel est le nom du groupe à commander puis donner une cible et appeler la fonction `go()` pour l'atteindre en évitant les obstacles. Cette cible peut être dans l'espace cartésien ou dans l'espace des joints :

##### 2.3.2.a. 🐍 Cible dans l'espace des joints (sans évitement de collision)

Il est possible de définir une cible dans l'espace des joints en fournissant une liste des 6 angles moteurs en radians. Dans ce cas il n'y a pas d'évitement de collision. Par exemple, mettre tous les moteurs en position zéro radian :

```python
commander.set_joint_value_target([0, 0, 0, 0, 0, 0])
commander.go()
```

Utiliser une cible dans l'espace des joints ne peut échouer que si les valeurs demandées sont en dehors de l'intervalle angulaire autorisé par les moteurs.

##### 2.3.2.b. 🐍 Cible dans l'espace cartésien

MoveIt accepte également des cibles dans l'espace cartésien. Donner une cible cartésienne à un robot fait appel à l'IK qui peut échouer si cette cible ne peut être atteinte, ou même de façon aléatoire du fait que les algorithmes d'IK sont généralement randomisés, ceci se traduit par une erreur **[ABORTED] No motion plan found** dans le temrinal MoveIt. Assurez-vous de la faisabilité de votre cible avant de demander au robot de l'atteindre.


Définir une cible cartésienne consiste à passer un objet `Pose` (= position + orientation) à `set_joint_value_target`.

Démarrez MoveIt d'abord, puis dans un autre terminal, testez le code Python ci-après. Il commande au groupe **arm_and_finger** comprenant 6 moteurs de déplacer son effecteur (`moving_tip`) à la pose cible spécifiée en coordonnées.

```python
#!/usr/bin/env python3
from geometry_msgs.msg import Pose
from moveit_commander.move_group import MoveGroupCommander

commander = MoveGroupCommander("arm_and_finger", wait_for_servers=20)

pose = Pose()
pose.position.x = 0.032
pose.position.y = -0.161
pose.position.z =   0.161
pose.orientation.x = 0.787
pose.orientation.y = 0.118
pose.orientation.z = -0.084
pose.orientation.w = -0.600

commander.set_joint_value_target(pose)
commander.go()
```

Si on sélectionne le groupe `arm` comprenant 5 moteurs au lieu de `arm_and_finger` qui en comprend 6, l'effecteur dont on fournit les coordonnées cibles est `fixed_tip`. Dans les 2 cas, ces coordonnées sont exprimées dans la base du robot `base_link`.

⚠️ Hormis certains quaternions remarquables comme l'identité `[0, 0, 0, 1]` ou les rotations de 180°, n'essayez pas de modifier les valeurs d'un quaternion au hasard, votre quaternion résultant serait invalide à coup sûr : pour le modifier il vaut mieux le faire par le calcul mathématique ou par la mesure en direct avec `rosrun tf2_tools echo.py`.

##### 2.3.2.c. ✍ Mise en pratique de la planification de trajectoire avec MoveIt

✍  **Mise en pratique n°1** : A l'aide des fonctions et commandes vues en 2.2.4. et 2.3.2.a., vérifiez que vous savez prendre les coordonnées cartésiennes courantes et les définir comme cible puis l'atteindre, càd :
  1. Passer votre robot en compliant
  2. Le bouger dans une configuration cible
  3. Utiliser `echo.py` pour obtenir les coordonnées cartésiennes courantes de l'effecteur
  4. Indiquer ces coordonnées comme cible cartésienne dans votre script Python
  5. Bouger votre robot dans une nouvelle configuration quelconque puis repasser en non-compliant 
  6. Exécuter votre script : observez que l'effecteur est dans la même position et orientation que demandée, sauf que les angles moteurs peuvent être différents

✍  **Mise en pratique n°2** : A l'aide des fonctions et commandes vues en 2.1.2.a. et 2.3.2.b., vérifiez que vous savez prendre les positions des joints courantes et les définir comme cible puis l'atteindre, càd :
  1. Passer votre robot en compliant
  2. Le bouger dans une configuration cible
  3. Lire le topic `/joint_states` pour obtenir les angles moteurs courants
  4. Indiquer ces angles comme cible dans l'espace des joints dans votre script Python
  5. Bouger votre robot dans une nouvelle configuration quelconque puis repasser en non-compliant 
  6. Exécuter votre script : observez que l'effecteur est dans la même position et orientation que demandée, et également les angles moteurs

✍  **Mise en pratique n°3** :
A l'aide du mode compliant, prendre les coordonnées cartésiennes de l'effecteur et et les positions des joints pour deux configurations différentes du robot : points A et point B (par exemple A = effecteur vers le haut et B = effecteur vers le bas). Faîtes bouger le robot infiniement entre les cibles cartésiennes A et B.

#### 2.3.3. Déclarer des obstacles

Afin que les algorithmes de planification de trajectoire d'OMPL (tels que `RRTConnect`) puissent éviter les obstacles, il est nécessaire que MoveIt ait connaissance de leur position et leur forme. Il est possible d'utiliser une caméra de profondeur (aka caméra RGB-D, mais nous n'en avons pas ici) ou bien déclarer les objets depuis le code Python grâce à l'interface `PlanningSceneInterface`.

🐍 Par exemple, ce code déclarer une boite de céréales comme objet de collision en spécifiant sa position et son orientation sous forme d'objet `PosteStamped` ainsi que sa taille en mètres :

```python
from geometry_msgs.msg import PoseStamped
from moveit_commander.planning_scene_interface import PlanningSceneInterface

scene = PlanningSceneInterface()
rospy.sleep(1)

ps = PoseStamped()
ps.header.frame_id = "base_link"
ps.pose.position.x = 0.15
ps.pose.position.y = 0
ps.pose.position.z = 0.15
ps.pose.orientation.w = 1
scene.add_box("boite_de_cereales", ps, (0.08, 0.24, 0.3))

rospy.sleep(1)
```

Les coordonnées des objets de collision sont données sous la forme d'objet `PoseStamped` incluant la `position`, l'`orientation` et le repère `frame_id`, et la taille est donnée sous forme de tuple (longueur, largeur, hauteur).

* Modifier l'obstacle "boite_de_cereales" proposé en exemple afin qu'un obstacle viennent perturber le mouvement entre les deux poses de votre programme en 3.2.2. et vérifiez que MoveIt contourne toujours ces obstacles sans jamais les collisionner.

**Note**: Accessoirement, il est possible d'attacher et de détacher les objets de collision au robot, ceci permet par exemple de simuler la saisie et la dépose d'objets physique dans RViz avec MoveIt. cf [la documentation MoveIt pour Python](https://ros-planning.github.io/moveit_tutorials/doc/move_group_python_interface/move_group_python_interface_tutorial.html) ou même [le code de `PlanningSceneInterface`](https://github.com/ros-planning/moveit/blob/melodic-devel/moveit_commander/src/moveit_commander/planning_scene_interface.py#L56)

#### 2.3.4. Interroger et publier l'arbre des transformations `tf` en Python
  
✍ Grâce au [module `tf`](http://wiki.ros.org/tf/Tutorials), nous allons lire et écrire l'arbre des transformations pour calculer une nouvelle cible cartésienne via le code :
* Déclarer un transform listener, puis récupérer la position cartésienne actuelle de `moving_tip` dans le repère `base_link`
* Créer une nouvelle variable 5cm en dessous de la position actuelle sur l'axe des `z`
* Déclarer un transform broadcaser puis publier un nouveau repère nommé `target` : assurez-vous de le visualiser dans RViz (attention, il expire 15s après sa publication). Nous l'utiliserons dans la question suivante.
  
**Note** : Le module Python `tf.transformations` fournit des fonctions permettant d'effectuer diverses opérations sur les transformations : multiplication matricielle, rotations, transformations inverses. Ce module possède un nombre assez limité d'opérations, en pratique selon les besoins il est possible de les combiner aussi avec `numpy` et `scipy` pour le calcul numérique et `sympy` ou même `Maxima` pour du calcul formel.
  
#### 2.3.5. Appeler les services de cinématique directe (FK) ou inverse (IK)
  
MoveIt fournit la cinématique directe et inverse du robot via le services génériques `/compute_fk` et `/compute_ik`. Ils sont parfois utilisés automatiquement sans que vous n'y fassiez explicitement appel : les fonctions de planification de trajectoires utilisées jusqu'alors ont elles-même appelé l'IK lorsque nécessaire.

Dans certains situations vous pourriez cependant nécessiter d'obtenir une configuration moteurs pour atteindre un point cartésien sans pour autant générer de trajectoire ni l'exécuter :
  
Vous devez dans ce cas appeler explicitement `/compute_ik` avec une requête de type [`GetPositionIK`](https://docs.ros.org/en/api/moveit_msgs/html/srv/GetPositionIK.html) qui comprend au minimum :
* l'horodatage et le repère de référence dans l'en tête
* la "seed" pour initialiser le calcul ; généralement l'état actuel du robot
* le nom du groupe de joints
* la position carétienne à atteindre
  
👀 Remarquez la possibilité d'envoyer également des contraintes pour contraindre le résultats sur les joints, la position cartésienne, l'orientation cartésienne ou la visibilité.

✍ Réalisez un calcul de cinématique inverse puis l'affichage de la configuration résultante :
* Avec l'aide du tutoriel décrivant l'[appel de service via un client Python](https://wiki.ros.org/ROS/Tutorials/WritingServiceClient(python)), créer une requête pour obtenir une configuration permettant d'atteindre le point `target` de la question précédente
* Récupérer le résultat de la requête et, si l'appel est réussi, le publier sur un nouveau topic de votre choix, par exemple `/computed_state`
* Afficher `/computed_state` dans RViz avec un nouveau `display`  : `Add`, `By display type` puis `RobotState`
  
Ces deux questions vous ont permis de calculer puis visualiser à l'aide de RViz de nouvelles cibles cartésiennes.
  
#### 2.3.6. Enregistrer et rejouer un mouvement de pick-and-place

L'enregistrement et rejeu de mouvements nécessite que votre noeud ROS s'exécute **sur le robot** uniquement (en vous connectant via SSH) et nécessite **que `poppy_controllers` ne soit PAS démarré**.
  
Ce premier extrait de code enregistre un mouvement de 5 secondes dans un fichier : 
```python
import time
from pypot.creatures import PoppyErgoJr
from pypot.primitive.move import MoveRecorder, Move, MovePlayer

ergo = PoppyErgoJr()

move_recorder = MoveRecorder(ergo, 50, ergo.motors)

ergo.compliant = True

move_recorder.start()
time.sleep(5)
move_recorder.stop()

with open('my_nice_move.move', 'w') as f:
    move_recorder.move.save(f)
```

Ce second extrait de code permet de charger ce fichier et jouer le mouvement à l'identique :
```python
with open('my_nice_move.move') as f:
    m = Move.load(f)

ergo.compliant = False

move_player = MovePlayer(ergo, m)
move_player.start()
```
  
Faîtes quelques essais avec plusieurs mouvements qui s'alternent, en jouant également avec la compliance, pour bien comprendre le fonctionnement.

✍  Enregistrez un mouvement de pick-and-place pour attraper un cube et le déposer à un autre endroit



## Documentation

* [Tutoriaux de MoveIt](https://ros-planning.github.io/moveit_tutorials/)
* [Code du MoveIt Commander Python](https://github.com/ros-planning/moveit/tree/master/moveit_commander/src/moveit_commander)
* [Documentation de l’API MoveIt en Python](http://docs.ros.org/noetic/api/moveit_python/html/namespacemoveit__python.html)
* [Documentation de Poppy Ergo Jr](https://docs.poppy-project.org/fr/assembly-guides/ergo-jr/)
