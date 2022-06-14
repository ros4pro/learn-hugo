---
title: "🔨 Créer et utiliser un Environnement Virtuel Python"
menu:
  main:
    name: "Env. Virtuel"
    weight: 1
    parent: "python3"
---

## Intérêt

L'état de l'art pour la programmation en Python du Machine Learning consiste à utiliser un __Environnement Virtuel Python__ (EVP) pour encapsuler chaque projet dans un environnment dédié et pérenne. Chaque EVP procure un environnement informatique contenant une installation de Python :

* indépendante des autres installations Python susceptibles de coexister sur la même machine,
* indépendante des mises à jour de l’ordinateur.

Un EVP repose sur la création d’une arborescence disque dédiée qui héberge la version de Python et des modules dont tu as besoin pour ton projet.
Tu peux effacer et re-créer un EVP très facilement, sans impacter les autres installations de Python éventuellement présentes sur ton ordinateur.

## Outils

Deux outils sont le plus souvent rencontrés pour créer EVP :

* La commande `conda`, disponible si tu as installé Python avec [miniconda](https://docs.conda.io/en/latest/miniconda.html) ou [Anaconda](https://www.anaconda.com/products/individual).
* Le module Python `venv` (cf [venv](https://docs.python.org/3/library/venv.html)).

L'intérêt de `miniconda` pour le calcul numérique est que cette distribution installe de façon transparente la bibliothèque [MKL](https://software.intel.com/content/www/us/en/develop/tools/oneapi/components/onemkl.html), qui fournit l'optimisation pour les processeurs Intel des bibliothèques d'algèbre linéaire (BLAS, Lapack...) à la base des performances du module numpy.

## Comment fonctionne un EVP

Quand l'EVP `<nom_evp>` est activé :

* la variable d'environnement `PATH` est modifiée dans ton fichier `.bashrc` pour mentionner en premier :
  * le répertoire contenant la commande `conda` : par exemple `/home/<logname>/miniconda3/condabin/`
  * le répertoire `bin` de l'EVP: par exemple `/home/<logname>/miniconda3/envs/<nom_evp>/bin/`
* toutes les commandes liées à Python (`python`, `conda`, `pip`...) sont recherchées en premier dans ces deux répertoires.
* toute installation d'un module Python par `conda` ou `pip` installe le module dans l'arborescence `/home/<logname>/miniconda3/envs/<nom_evp>/`


## Création d'un EVP avec `conda` sous Ubuntu

1. 📥 Télécharge et installe [miniconda](https://docs.conda.io/en/latest/miniconda.html) sur ton ordinateur en faisant attention à ces points :

    * Tu dois définir un chemin d'installation du répertoire `miniconda3` qui ne comporte __ni espace__, __ni caractère accentué__ <br>
    Sous Ubuntu le chemin d'installation par défaut ressemble à `/home/<logname>/miniconda3/`.
    * À la fin de l'installation réponds `yes` à la question `Do you wish the installer to initialize Miniconda3 by running conda init? [yes|no]`
    * Lance un nouveau terminal ou tape la commande `source ~/.bashrc` pour hériter des modifications du fichier `.bashrc`.
    * Désactive le lancement automatique de l'EVP `(base)` en tapant la commande : `conda config --set auto_activate_base false`.

1. Créer l'EVP avec la commande `conda create -n <nom_evp> python=<version>`

    * `<nom_evp>` : nom (libre) de ton EVP : souvent un nom mnémonique comme `pyml`(pour Python machine learning) ou `tf2` (pour un projet avec  tensorflow2)
    * `<version>` :  version de Python que tu veux installer dans ton EVP : par exmple `3.6` ou `3.6.8` ou `3.8`...<br>
_Nota_: pour utiliser l'API _Tensorflow2 Object Detection_ dans un EVP, la version 3.8 de Python est conseillée.

1. Activer ton EVP avec la commande `conda activate <nom_evp>` :

    * L'activation de l'EVP se traduit par le préfixage du *prompt* avec la chaîne : `(<nom_evp>)`.<br>
    Par exemple si le *prompt* courant est `user@host $`, l'activation de l'EVP nommé `tf2` modifie le prompt qui devient : `(tf2) user@host $`

1. 📥 Charger les modules Python nécessaires à ton projet dans ton EVP __activé__ :

    Avec ton **EVP activé** utilise `conda install <module_name>`  ou `pip install <module_name>` pour installer le module Python `<module_name>`.

    ❓ `conda install...` ou `pip install...` lequel choisir ? le règle est simple :

    * commence par `conda install...`, qui va installer une version optimisée du module Python si elle est connue de `conda`
    * utilise `pip install...` si `conda install...` échoue.
   
## Exemple

### 🔨 Un EVP pour travailler avec `tensorflow2`

Avec `miniconda` installé, créé l'EVP `tf2` pour un travail avec Python en version 3.8, puis active l'EVP :
```bash
user@host $ conda create -n tf2 python=3.8
... some stuff...

user@host $ conda activate tf2
(tf2) user@host $
```
Tu peux ensuite installer des modules Python essentiels au travail avec __tensorflow2__ :

```bash
(tf2) user@host $ conda update -n base -c defaults conda
(tf2) user@host $ pip install tensorflow==2.6
(tf2) user@host $ conda install numpy scipy matplotlib jupyter pandas
(tf2) user@host $ pip install scikit-learn scikit-image seaborn pydot rospkg pyyaml
(tf2) user@host $ pip install opencv-python==4.5.1.48
```

## Commandes utiles

* Afficher les infromations sur la distribution __conda__ : `conda info`

* Lister les EVP connus de __conda__: `conda env list`

* Desactiver l'EVP courant : `conda deactivate`

* Activer l'EVP nommé `<evp>`: `conda activate <evp>`

* Avec ton ** EVP activé**:

   * Lister les modules Python installés dans ton EVP : `conda list` ou` pip list`

   * Trouver les versions d'un module Python pour ton EVP : `conda search <module>`

* Update the __conda__ command: `conda update -n base -c defaults conda`.

