---
title: "FAQ Ubuntu"
menu:
  main:
    name: "Trucs & astuces Ubuntu"
    weight: 2
    identifier: "ubuntu"
    parent: "faq"
---

## Afficher le pourcentage d'occupation disque

La commade `df` montre l'occupation des disques (y compris les *pseudo disques* apparaissant comme des périphériques `/dev/loop...`). 

Pour limiter la sortie de la commande `df` aux disques physiques on peut utiliser l'option `-t` pour ne garder que les types de *filesystem*   `ext4` ou `vfat` par exemple.

Exemple sur un portable avec 2 disques SSD NVME (Non-Volatile Memory Express):

    users@host $ df -h -t ext4 -t vfat
    Sys. de fichiers blocs de 1K   Utilisé Disponible Uti% Monté sur
    /dev/nvme1n1p2     230541528  89495496  129265424  41% /
    /dev/nvme1n1p1        523248      3412     519836   1% /boot/efi
    /dev/nvme0n1p1     960380628 829289832  131074412  87% /home


## Faire de la place sur le disque

1. Nettoyer le cache APT : `sudo apt-get clean`

enlève les fichiers `*.deb` des paquets installés par `apt install` qui sont stockés dans le dossier `var\cache\apt\`.


2. Nettoyer le cache PIP : `rm ~/.cache/pip/*`

efface les archives des paquets Python installés par `pip install` qui restent dans le dossier`~/.cache/pip/`.

3. Nettoyer le cache CONDA : `conda clean -a`

efface les archives des paquets Python installés avec la commande `conda install`.

## Ajouter du swap

Le swap est un espace disque qui permet à Linux d'étendre la capacité mémoire.

1. Ajouter une partition *swap* d'une clef USB, par exemple pour `dev/sdc1` tape : `sudo swapon /dev/sdc1`

- Pour créer une partition *swap* sur une clef USB on peut utiliser l'utilitaire **gparted** installé avec la commande `sudo apt install gparted`.
- Pour voir les disques (disque dur, SSD, clef USB...) accessible sur la machine : `lsblk | grep -v loop`.

2. Si tu veux retirer la clé de swap, tape d'abord `sudo swapoff /dev/sdc1`
