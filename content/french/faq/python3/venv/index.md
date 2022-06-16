---
title: "🔨 Créer et utiliser un Environnement Virtuel Python"
menu:
  main:
    name: "Env. Virtuel"
    weight: 1
    parent: "python3"
---

## Intérêt

L'état de l'art de la programmation du _Machine Learning_ en Python consiste à utiliser un __Environnement Virtuel Python__ (EVP) pour encapsuler chaque projet dans un environnment dédié et pérenne. Chaque EVP procure un environnement informatique contenant une installation de Python :

* indépendante des autres installations Python susceptibles de coexister sur la même machine,
* indépendante des mises à jour de l’ordinateur.

Un EVP repose sur la création d’une arborescence disque dédiée qui héberge la version de Python et des modules dont tu as besoin pour ton projet.
Tu peux effacer et re-créer un EVP très facilement, sans impacter les autres installations de Python éventuellement présentes sur ton ordinateur.

## Outils

Deux outils sont le plus souvent rencontrés pour créer EVP :

* La commande `conda`, disponible si tu as installé Python avec [miniconda](https://docs.conda.io/en/latest/miniconda.html) ou [Anaconda](https://www.anaconda.com/products/individual).
* Le module Python `venv` (cf [venv](https://docs.python.org/3/library/venv.html)).

L'intérêt de `miniconda` pour le calcul numérique est que cette distribution installe de façon transparente la bibliothèque [MKL](https://software.intel.com/content/www/us/en/develop/tools/oneapi/components/onemkl.html), qui fournit une optimisation poussée pour les processeurs Intel des bibliothèques d'algèbre linéaire (BLAS, Lapack...) à la base des performances de modules comme __numpy__.

## Comment fonctionne un EVP

Quand l'EVP `<nom_evp>` est activé :

* la variable d'environnement `PATH` est modifiée dans ton fichier `.bashrc` pour mentionner en premier :
  * le répertoire contenant la commande `conda` : par exemple `/home/<logname>/miniconda3/condabin/`
  * le répertoire `bin` de l'EVP: par exemple `/home/<logname>/miniconda3/envs/<nom_evp>/bin/`
* toutes les commandes liées à Python (`python`, `conda`, `pip`...) sont recherchées en premier dans ces deux répertoires.
* toute installation d'un module Python par `conda` ou `pip` installe le module dans l'arborescence `/home/<logname>/miniconda3/envs/<nom_evp>/`


## Création d'un EVP avec `conda` sous Ubuntu

* 📥 Télécharge et installe [miniconda](https://docs.conda.io/en/latest/miniconda.html) sur ton ordinateur en faisant attention à ces points :*

    * Tu dois définir un chemin d'installation du répertoire `miniconda3` qui ne comporte __ni espace__, __ni caractère accentué__ <br>
    Sous Ubuntu le chemin d'installation par défaut ressemble à `/home/<logname>/miniconda3/`.
    * À la fin de l'installation réponds `yes` à la question `Do you wish the installer to initialize Miniconda3 by running conda init? [yes|no]`
    * Lance un nouveau terminal ou tape la commande `source ~/.bashrc` pour hériter des modifications du fichier `.bashrc`.
    * Désactive le lancement automatique de l'EVP `(base)` en tapant la commande : `conda config --set auto_activate_base false`.

* Ensuite il ya 3 étapes expliquées ci-dessous, à mettre en oeuvre en suivant l'exemple plus bas :

    1. Créer l'EVP : `conda create -n <nom_evp> python=<version>`
    * `<nom_evp>` est le nom (libre) de ton EVP, souvent un nom mnémonique comme `pyml` (pour "python machine learning") ou `tf2` (pour un projet avec "tensorflow2"),
    * `<version>` donne la version de l'interpréteur Python à installer dans l'EVP : par exmple `3.6` ou `3.6.8` ou `3.8`...<br>
_Nota_ : pour l'API _Tensorflow2 Object Detection_ la version 3.8 de Python est conseillée.
    <br>
    <br>
    2. Activer l'EVP : `conda activate <nom_evp>`
    * L'activation de l'EVP se traduit par le préfixage du *prompt* avec la chaîne : `(<nom_evp>)`.<br>
    Par exemple si le *prompt* courant est `user@host $`, l'activation de l'EVP nommé `tf2` modifie le prompt qui devient : `(tf2) user@host $`
    <br>
    <br>
    3. Charger les modules Python nécessaires à ton projet dans l'EVP __activé__ :<br>
    Avec ton **EVP activé** utilise `conda install <module_name>`  ou `pip install <module_name>` pour installer le module Python `<module_name>`.
  
## Exemple

### 🔨 Un EVP pour travailler avec `tensorflow2`

Avec `miniconda` installé, créé l'EVP `tf2` pour un travail avec Python en version 3.8, puis active l'EVP :
```bash
user@host $ conda create -n tf2 python=3.8
... some stuff...

user@host $ conda activate tf2
(tf2) user@host $
```
📥 Tu peux ensuite installer des modules Python essentiels au travail avec __tensorflow2__ :

```bash
(tf2) user@host $ conda update -n base -c defaults conda  # mise à jour de la commnade conda, au cas où....
(tf2) user@host $ pip install tensorflow==2.9
(tf2) user@host $ conda install numpy scipy matplotlib jupyter pandas
(tf2) user@host $ pip install scikit-learn scikit-image seaborn pydot rospkg pyyaml
(tf2) user@host $ pip install opencv-python==4.6.0.66
```

❓ `conda install...` ou `pip install...` lequel choisir ? le règle est simple :

* commence par `conda install...`, qui va installer une version optimisée du module Python si elle est connue de `conda`
* utilise `pip install...` si `conda install...` échoue.

## Commandes utiles

* Afficher les infromations sur la distribution __conda__ : `conda info`

* Lister les EVP connus de __conda__ : `conda env list`

* Désactiver l'EVP courant : `conda deactivate`

* Activer l'EVP nommé `<evp>` : `conda activate <evp>`

* Avec ton ** EVP activé** :

   * Lister les modules Python installés dans ton EVP : `conda list` ou` pip list`

   * Trouver les versions d'un module Python installable par conda pour ton EVP : `conda search <module>`

* Mettre à jour la commande __conda__ dans l'EVP `base` : `conda update -n base -c defaults conda`.

