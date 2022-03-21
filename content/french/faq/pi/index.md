---
title: "FAQ robots basés sur Raspberry Pi"
menu:
  main:
    name: "Robots basés sur Raspberry Pi"
    weight: 1
    parent: "faq"
---

## 🔔 Mon Turtlebot bipe

🔋 **Il s'agit du signal de batterie faible et il ne doit pas être ignoré.**

Turtlebot est alimenté par une batterie puissante de type Li-Po. Ce type de batterie rend dangereux leur utilisation lorsque la charge est très faible. Dans un cas extrême elle pourrait chauffer et prendre feu. **Mettre en charge rapidement la batterie lorsque Turtlebot bipe.**

## 📥 Flasher la carte SD

Note préliminaire : la carte SD du robot ne se comporte pas tout-à-fait comme une carte SD "normale". Elle ne permet pas de stocker des fichiers dessus ; il est également normal qu'une carte SD insérée dans votre ordinateur n'apparaisse pas dans le Poste de Travail avant de l'avoir flashée.

Téléchargez ces images ROS en vue de remettre à zéro les cartes SD des robots pour ROS4PRO (⚠️⏳ Optimisez votre temps, le téléchargement peut prendre 1 heure) :

* [Image du Turtlebot pour ROS4PRO](https://github.com/ros4pro/turtlebot3_ros4pro/releases/download/v1.1/2021-10-24-turtlebot.img.7z)
* [Image de Poppy Ergo Jr pour ROS4PRO](https://github.com/poppy-project/poppy-ergo-jr/releases/download/4.0.1/2021-10-20-poppy-ergo-jr.img.7z)

Pour flasher l'une de ces images sur une carte SD :

* extrayez le fichier compressé **.zip** ou **.7z** (généralement clic droit > Extraire) dans un dossier de votre ordinateur (pas sur la carte SD) : vous obtenez un fichier d'extension **.img**
* ⚠️ **ne faîtes pas** de glisser-déposer ni de copier-coller de cette image vers la carte SD comme s'il s'agissait d'une clé USB : Il est nécessaire d'utiliser un logiciel de flash comme Etcher ou dd
* 📀 Tapez la commande `etcher` dans le terminal Ubuntu pour ouvrir l'utilitaire de flash préinstallé (ou bien [téléchargez Etcher](https://www.balena.io/etcher/) s'il n'existe pas encore)
* Dans Etcher, "Flash from file", sélectionnez le fichier image ainsi que la destination (la carte SD) et validez
* Le flash de la carte SD est en cours ... ⚠️⏳ Optimisez votre temps, la copie dure environ 15 minutes. Dès qu'Etcher a terminé, votre carte SD est prête à être configurée pour le Wifi et/ou insérée dans le robot

⚠️ Si votre ordinateur n'arrive pas à lire la carte SD, vous pouvez essayer la procédure suivante :

1. Fermer tous les terminaux ouverts et réessayer
2. Ouvrir un terminal et exécuter les 2 commandes suivantes. Redémarrer l'ordinateur et réessayer
```bash
sudo apt-get install --reinstall udisks2
sudo apt-get install exfat-fuse exfat-utils
```
## 📡 Connecter le robot en Wifi
### Utiliser votre smartphone comme point d'accès
Utilisez votre smartphone comme hotspot réseau. Tous les smartphones ne se valent pas. En particulier :
* Vérifiez que vous pouvez configurer le **SSID du réseau (son nom)** et le **mot de passe** : pour simplifier utiliser des noms simples sans espace ni caractère spécial
* Vérifiez que vous pouvez configurer la bande 2.4GHz vs 5GHz. **Priorisez le 5GHz** mais uniquement si vos deux robots ont une Raspberry Pi 3B+ (car Raspberry Pi 3B est seulement compatible 2.4GHz)
* Vérifiez que vous pouvez visualiser la **liste des postes connectés** : vos robots doivent apparaître
* Dans une pièce où le nombre de réseaux Wifi est dense, le vôtre pourrait se faire "écraser" par les autres. Utilisez un autre smartphone si besoin.

### Poppy Ergo Jr

Utilisez le câble réseau une première fois en vue de configurer le Wifi du robot :
* Connectez en Ethernet votre robot à votre ordinateur sous Ubuntu
* Configurez le réseau d'Ubuntu en mode **Local Seulement** (*Link-Local Only*)
* Chargez l'interface du robot [poppy.local](http://poppy.local) dans votre navigateur
* Quittez la page de démarrage du robot (*elle s'affiche uniquement si c'est le tout premier démarrage du robot*)
* Dans les réglages du robot :
  * Désactivez le hotspot
  * Activez le Wifi
  * Entrez le nom du réseau Wifi et le mot de passe de votre hotspot smartphone
* Faîtes redémarrer la Raspberry Pi du robot
* Débranchez le câble réseau
* Vérifiez dans un terminal que `ping poppy.local` renvoie une réponse chaque seconde plutôt qu'une erreur, avant de poursuivre le TP

⚠️ Il est possible d'utiliser le robot avec le câble plutôt qu'en Wifi, cependant pour utiliser ROS le robot doit pouvoir synchroniser son horloge en se connectant à Internet. Si vous décidez d'utiliser un câble Ethernet direct ne donnant pas accès à Internet, suivez la procédure de synchronisation d'horloge ci-dessous.  

### Turtlebot 3
⚠️ Cette procédure ne fonctionne qu'avec le Turtlebot **éteint** et la carte SD **hors du robot**.

1. Télécharger le fichier [50-cloud-init.yaml](https://files.ros4.pro/50-cloud-init.yaml) et modifiez-le pour renseigner le bon login et mot de passe wifi dans les `WIFI_SSID` et `password`. **Respectez scrupuleusement l'indentation ! Ne rajoutez pas d'espaces ou de sauts de lignes et n'utilisez pas des tabulations (l'indentation se fait avec 4 espaces)** Il est facile de faire une erreur sur ce fichier et il n'y aura aucun message d'erreur puisque c'est lui qui détermine si le robot va réussir à s'appairer au réseau. 

2. Insérer la carde SD du robot en question dans votre poste de travail (pas dans votre robot)

3. Ouvrir un terminal et copier le fichier avec cette commande :

```bash
sudo cp ~/Téléchargements/50-cloud-init.yaml /media/$(whoami)/writable/etc/netplan/
```

5. Vérifier dans `/media/$(whoami)/writable/etc/netplan` si le fichier a correctement été copié.

[Aide dans la documentation](https://emanual.robotis.com/docs/en/platform/turtlebot3/sbc_setup/#configure-the-raspberry-pi-2) (en cas de problème)

## 🖧 Se connecter via SSH à un robot

SSH (Secure SHell) permet d'ouvrir un terminal à distance sur une autre machine que celle sur laquelle on tape les commandes (par exemple le robot, qui n'a ni clavier ni écran pour interagir avec un terminal). Il est nécessaire de connaître :

* Le nom de la machine distante (par ex `poppy.local` ou `turtlebot.local`)
* Le nom d'utilisateur propriétaire de la session sur laquelle ouvrir un terminal (`poppy` pour Poppy ou `ubuntu` pour Turtlebot)
* Le mot de passe de cette session (cf mots ce passe par défaut ci-dessous)

La commande est l'une des suivantes, à taper dans un terminal sur Ubuntu :

```bash
ssh poppy@poppy.local
ssh ubuntu@turtlebot.local
```

Taper `yes` pour confirmer la connexion puis taper le mot de passe (`turtlebot` pour Turtlebot ou `poppy` pour Poppy). Votre invite de commande devrait désormais indiquer `poppy@poppy.local~$` ou `ubuntu@turtlebot.local~$` : toute commande tapée dans ce terminal sera exécutée par le robot. En cas d'erreur, consultez la procédure de diagnostic ci-dessous.

### 🔑 Mots de passe par défaut

#### Turtlebot

* Nom d'utilisateur `ubuntu`
* Nom de machine `turtlebot` (ajouter `.local` dans les commandes : `turtlebot.local`)
* Mot de passe `turtlebot`

#### Poppy

* Nom d'utilisateur `poppy`
* Nom de machine `poppy` (ajouter `.local` dans les commandes : `poppy.local`)
* Mot de passe `poppy`

### 🕗 Synchronisation d'horloge

Si vous obtenez l'erreur `Received JointState is XXXXXX.XXXXXX seconds old` ou tout autre erreur en relation avec le temps, il se peut que l'horloge de votre robot et de votre PC soit désynchronisée.

Vérifiez avec la commande `date` que l'horloge ne dérive pas exagérément.

Vérifiez qu'il est connecté à Internet via la 4G, le réseau Ethernet ou le wifi, puis tapez sur votre PC et/ou en SSH sur le robot :
```
ssh <usename>@<hostname>.local
sudo timedatectl set-ntp off
sudo timedatectl set-time "2021-09-30 18:00"   # Mettre ici une date et une heure approximative
sudo timedatectl set-ntp on
```
**Note :** `ntpdate` est osbolète et n'est plus installé sur Ubuntu

### 💽 Espace disque insuffisant sur les robots

**Si votre carte SD fait 8Go**, vous devez forcément libérer de l'espace disque. Supprimez les archives APT du robot `rm -fr /var/cache/apt/archives/*`. Si ce n'est pas suffisant, la suppression de fichiers doit être vue au cas par cas.

**Si votre carte SD fait + de 8Go** : Les images des robots sont conçues pour des cartes SD 8 Go, elles n'utilisent pas tout l'espace disponible de la carte SD. Si vous avez besoin de plus d'espace disque et que la carte SD a bien une effectivement supérieure à 8 Go, il est nécessaire d'étendre la partition au maximum. Pour cela, insérez la carte SD du robot dans votre station de travail et utilisez l'outil GParted pour la redimensionner :

```bash
sudo apt install gparted
sudo gparted
```

Ensuite :
1. sélectionner la carte SD dans la liste déroulante (⚠️ GParted peut redimensionner n'importe quelle partition de n'importe quel disque, assurez vous de ne pas vous tromper dans la liste déroulante)
2. faites clic droit sur la ext4 (la partition la plus à droite) et sélectionnez "Redimensionner"
3. Glisser le curseur de fin de la partition au maximum à droite. Validez ensuite l'opération de redimensionnement.


### 🔧 Procédure de diagnostic

💻 Dans un terminal taper `ping poppy.local` (pour Poppy) ou `ping turtlebot.local` (pour Turtlebot) :

* **Si 1 ligne s'affiche chaque seconde** avec des statistiques et que la première ligne s'affiche en moins de 2 secondes ➡️ Test réseau réussi (1). Vous avez peut-être oublié de démarrer le roscore ou bien `ROS_MASTER_URI` dans le fichier `~/.bashrc` pointe vers le mauvais robot ou bien `ROS_HOSTNAME` est incorrect 
* **Si une erreur survient** et la commande s'arrête ➡️ Test réseau échoué. Vérifiez que la LED verte ACT de la Raspberry Pi vacille pendant environ 45 secondes lorsque vous venez de brancher l'alimentation :
  * **Si `ACT` vacille** en 🟢 ➡️ Votre Raspberry Pi démarre correctement mais la configuration réseau est incorrecte. Vérifiez que vous n'avez pas fait d'erreur  dans le fichier de configuration Wifi (`50-cloud-init.yaml`) ou réessayez ; ou bien connectez-vous avec un câble RJ45 sur un routeur
  * **Si `ACT` ne vacille pas** ➡️ Votre Raspberry Pi ne démarre pas correctement. La LED rouge `PWR` s'allume-t-elle ?
    * **Si `PWR` s'allume** en 🔴 ➡️ Votre Raspberry Pi est fonctionnelle mais la carte SD ne possède pas une image valable. Recommencez la procédure de flash ci-dessus.
    * **Si `PWR` ne s'allume pas** ➡️ Votre Raspberry Pi  n'est pas fonctionnelle. Vous avez peut-être mal branché la Pixl (Poppy) ou bien le câble rouge-noir (Turtlebot)
    * 
(1) si toutefois les délais de réponse excèdent environ 100ms, consultez la section "Wifi trop lent ou saturé".

#### 🐌 Wifi trop lent ou saturé
Si vos commandes ROS sont lentes voire échouent de façon désorganisée sous la forme de divers timeouts, votre réseau Wifi peut être trop dégradé pour que le système foncitonne convenablement. Quelques pistes :
* Utilisez un autre smartphone comme point d'accès qui pourrait avoir un meilleur point d'accès Wifi (souvent la meilleure option)
* Branchez votre point d'accès au secteur et mettez-le au plus près de vos robots
* Isolez-vous dans un espace avec peu de monde (les salles de classe sont souvent saturées par de nombreux réseaux Wifi différents)
* Si cela persiste utilisez une connexion câblée avec votre robot

#### ❌ Erreur `Unable to connect to move_group action server 'move_group' within allotted time (30s)`

Cette erreur peut survenir si :
* La variable d'environnement `ROS_HOSTNAME` n'est pas correctement définie sur votre poste de dévéloppement ou bien votre robot
* Il y a un mélange de `ROS_HOSTNAME` et `ROS_IP` sur les différentes machines
* L'IP de la machine n'est plus à jour dans son `ROS_IP`
* La qualité du réseau est mauvaise ou bien qu'un pare-feu ralentir les requêtes mDNS, ce qui ne permet pas de démarrer MoveIt correctement. Consultez la section "Wifi trop lent ou saturé". Ne négligez pas cette option, il est **fréquent** que la qualité du réseau soit problématique.

#### ❌ Erreur `Unable to ping my own server at XXXXX.local`

Cela peut survenir lors d'un changement de la configuration réseau. Exécutez :
```
sudo service avahi-daemon restart
```

### 📥 Mettre à jour l'openCR du Turtlebot

Si vous avez une erreur à propos d'une openCR incompatible, voici la méthode pour mettre à jour le firmware.

Tapez les commandes suivantes sur la raspberry pi (donc en SSH depuis votre PC):

```bash
cd ./opencr_update
./update.sh /dev/ttyACM0 burger_noetic.opencr
```

Puis testez la mise à jour :

1. Placer le robot sur un sol plat dans un espace libre

2. Appuyer longuement sur le bouton `PUSH SW 1` pendant quelque secondes, le robot devrait aller tout droit pendant 30 centimètres

3. Appuyer longuement sur le bouton `PUSH SW 2` pendant quelque secondes, le robot devrait tourner de 180 degrées sur place

![OpenCR](./img/opencr_models.png)

## 📡 Comment effectuer un scan pour trouver l'adresse IP de la raspberry pi ?
Normalement vous n'avez pas besoin d'utiliser les adresses IP en dur, à la place on utilise avahi-daemon (déjà installé) pour effectuer la résolution des noms. Mais si vous voulez quand même le faire, voici comment précéder. Ouvrir un terminal et exécuter les commandes suivantes :
```bash
sudo apt install arp-scan
```
```bash
sudo arp-scan --localnet
```
Les machines connectées à votre réseau devraient apparaître avec un nom qui permet de les discriminer.

