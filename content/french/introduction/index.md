---
title: "I. Introduction à Linux, ROS"
menu:
  main:
    name: "I. Introduction à Linux, ROS et ROS-I"
    weight: 2
---

## Prérequis

* Lycée et +
* Notions de programmes informatiques, terminaux et commandes

## Diapositives

{{<pdf src="https://files.ros4.pro/introduction.pdf" >}}

## 1. Démarrer Ubuntu et ROS

Selon votre situation, une clé USB bootable nommée "clé Live" peut vous être fournie.

### Cas 1.A : Une clé USB bootable m'est fournie

Vous devez faire "booter" votre poste de travail sur la clé USB Live fournie en vous aidant si nécessaire de [la procédure dédiée](https://files.ros4.pro/boot.pdf). Votre clé est fournie avec tous les paquets préinstallés pour le workshop. Ainsi, dans les TP vous devrez sauter toutes les étapes précédées du pictogramme "disque" suivant : 📀 car ces étapes ont déjà été réalisées.

Localisez l'application "Terminator" sur votre clé USB Live puis passez directement au titre 2. ci-dessous dès que vous avez réussi à ouvrir un terminal.

### Cas 1.B : Je n'ai pas de clé USB bootable, j'installe Ubuntu et ROS moi-même

Installez Ubuntu 20.04 et ROS Noetic selon [les prérequis](https://files.ros4.pro/prerequis.pdf). Vous aurez également à installer vous-même des éléments supplémentaires tout le long des travaux pratiques : ces étapes d'installation sont signalées par un pictogramme "disque" 📀. Nous recommandons l'installation et l'usage de [Visual Studio Code](https://code.visualstudio.com/Download) comme environnement de développement intégré (optionnel).

Les utilisateurs dans le cas B doivent également configurer leur environnement ROS :

* 1.B.1. en créant un espace de travail dédié à ROS : tous vos packages ROS se trouveront dans le dossier `src` de l'espace de travail nommé `catkin_ws` :

```bash
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
source /opt/ros/noetic/setup.bash
catkin_make
```

* 1.B.2. en plaçant les lignes suivantes à la fin du fichier `~/.bashrc` (commentaires compris) :

```bash
# ROS workspace
source /opt/ros/noetic/setup.bash
source ~/catkin_ws/devel/setup.bash

export TURTLEBOT3_MODEL=burger

# Warning: Choose ROS_HOSTNAME (preferred) *OR* ROS_IP but do not activate both
export ROS_HOSTNAME=$(hostname).local
#export ROS_IP=`ip address|grep inet|grep dynamic|tr ' ' ':'|cut -d':' -f6|cut -d'/' -f1|head -n1`

# CHOOSE A ROS MASTER: local host, Poppy robot or Turtlebot robot
export ROS_MASTER_URI=http://localhost:11311
#export ROS_MASTER_URI=http://poppy.local:11311
#export ROS_MASTER_URI=http://turtlebot.local:11311

```

* 1.B.3. en fermant et rouvrant votre terminal. Vous ne devez visualiser aucune erreur lors de la réouverture du terminal et devez pouvoir taper la commande `roscore` sans erreur (tapez Ctrl+C pour quitter roscore).

Cette configuration est partiellement expliquée dans les diapositives. Pour plus d'information, référez-vous à la documentation ROS concernant [la configuration de l'environnement ROS](http://wiki.ros.org/ROS/Tutorials/InstallingandConfiguringROSEnvironment).

## 2. Prise en main du terminal : le rosier 🌹

⌨️ Pour prendre en main le terminal Linux et les commandes de base, à partir d'un terminal, créez les fichiers et dossiers nécessaires pour réaliser cette hierarchie de fichiers ressemblant à un rosier :

![Hierarchie de fichier du rosier](img/rosier.png)

Vous aurez besoin des commandes suivantes :

* `ls`, pour lister les fichiers et dossiers courants
* `cd <dossier>`, pour changer le dossier courant
* `mkdir <dossier>`, pour créer un nouveau dossier
* `touch <fichier>`, pour créer un nouveau fichier vide
* `nano <fichier>`, pour créer un nouveau fichier et écrire à l'intérieur
* `chmod +x <fichier>` pour passer un fichier exécutable
* `tree`, pour afficher la hierarchie de fichiers (si elle n'est pas installée, tapez `sudo apt install tree` pour ce faire)

## 3. 🧑‍🏫 Tutoriels

Nous allons d'abord utiliser Turtlesim (une simulation 2D de tortue, à ne pas confondre avec le robot Turtlebot). Suivez les tutoriels ROS suivants pour découvrir et tester les concepts de base, sachant que votre distribution ROS s'appelle `noetic` :

* [Understanding ROS Nodes](http://wiki.ros.org/ROS/Tutorials/UnderstandingNodes) : Maîtriser ROS master (`roscore`) et lancer des nœuds (`rosrun`)
* [Understanding ROS Topics](http://wiki.ros.org/ROS/Tutorials/UnderstandingTopics) : Envoyer et recevoir des messages dans un topic (`rostopic`)
* [Understanding ROS Services and Parameters](http://wiki.ros.org/ROS/Tutorials/UnderstandingServicesParams) : Déclarer et appeler un service requête/réponse (`rosservice`, `rossrv`)

## 4. ⚙️ Préparer vos robots

Pour l'un et l'autre de vos 2 robots, réalisez les étapes de préparation suivantes expliquées [dans la FAQ robots](../faq/pi/) :

1. Flasher sa carte SD
2. Connecter le robot en wifi
3. Se connecter via SSH au robot
4. Démarrer les services ROS sur le robot (bringup ou services)

## 5. ❓ Quizz final

❓ [**Quizz** : bien mémoriser les commandes importantes](quizz.pdf)
