---
title: "⚙️ Créer et utiliser un Environnement Virtuel Python (EVP)"
menu:
  main:
    name: "Env. Virtuel"
    weight: 1
    parent: "python3"
---
---
    Acquis d'apprentissages visés :
    - Savoir installer miniconda.
    - Savoir créer et utiliser un Environement Virtuel Python avec la commande conda sous ubuntu.

    Type d'activité : ⚙️ [tâche]
    Durée prévue : 15-20 minutes (dépend du débit internet disponible).
---

## Intérêt

L'état de l'art de la programmation Python en _Machine Learning_ consiste à utiliser un __Environnement Virtuel Python__ (EVP) pour encapsuler chaque projet dans un environnment dédié et pérenne. Chaque EVP procure un environnement informatique contenant une installation de Python :

* indépendante des autres installations Python susceptibles de coexister sur la même machine,
* indépendante des mises à jour de l’ordinateur.

Un EVP repose sur la création d’une arborescence disque dédiée qui héberge la version de Python et des modules dont tu as besoin pour ton projet.<br>
Tu peux effacer et re-créer un EVP très facilement, sans impacter les autres installations de Python éventuellement présentes sur ton ordinateur.

## Outils

Deux outils sont le plus souvent rencontrés pour créer EVP :

* La commande `conda`, disponible si tu as installé Python avec [miniconda](https://docs.conda.io/en/latest/miniconda.html) ou [Anaconda](https://www.anaconda.com/products/individual).
* Le module Python `venv` (cf [venv](https://docs.python.org/3/library/venv.html)).

L'intérêt de `conda` est d'installer de façon transparente la bibliothèque [MKL](https://software.intel.com/content/www/us/en/develop/tools/oneapi/components/onemkl.html), qui fournit une optimisation poussée pour les processeurs Intel des bibliothèques d'algèbre linéaire (BLAS, Lapack...) à la base des performances de modules comme __numpy__.

## Comment fonctionne un EVP

L'installation du package _miniconda_ sur ton ordinateur modifie ton fichier `.bashrc` : la variable d'environnement `PATH` est modifiée pour mentionner en premier le répertoire contenant la commande conda (la valeur par défaut pour Ubuntu est /home/<logname>/miniconda3/condabin/).
➡️ Ce mécanisme vous donne accès à la commande conda dans n'importe quel terminal.

Lorsque le EVP <pve_name> est activé avec la commande `conda activate <pve_name>` :

* la variable d'environnement `PATH` est modifiée dans l'interpréteur shell courant pour mentionner en premier le répertoire bin du PVE : par exemple `/home/<logname>/miniconda3/envs/<pve_name>/bin/`
* Toutes les commandes liées à Python (_python_, _pip_…) sont d'abord recherchées dans ce répertoire.
* Toute installation d'un module Python avec _conda_ ou _pip_ installera le module sous le répertoire racine `/home/<logname>/miniconda3/envs/<pve_name>/` de l'arborescence de l'EVP.


## Comprendre comment créer un EVP avec `conda`

Avant la création d'un EVP, if faut installer _miniconda_ sur ton ordinateur. Tu feras ce travail dans la section <b>Travail à faire, pour le moment </b>.<br>

Une fois _miniconda_ installé, tu peux créer et configurer autant d'EVP que tu le souhaite en suivant la procédure en 3 étapes expliquée ci-dessous.<br>
⚠️ Ne fais pas le boulot maintenant ! <br>
il suffit pour le moment de comprendre la syntaxe et les arguments des commandes, le travail sera fait plus loin dans la section [Travail à faire](#work_to_do).

1. __Créer l'EVP__ : `conda create -n <nom_EVP> python=<version>`
     * `<nom_EVP>` est le nom (libre) de ton EVP, souvent un nom mnémonique comme _pyml_ (pour _Python machine learning_)
     ou _tf2_ (pour travailler avec tensorflow2)…
     * `<version>` est la version de Python que tu souhaites installer avec cet EVP (par exemple _3.6_ ou _3.6.8_ ou _3.8_…)

2. __Activer l'EVP__ : `conda activate <nom_EVP>`
     * L'activation de l'EVP entraîne le préfixage du _prompt_ par le nom de l'EVP : `(<nom_EVP>)`.<br>
       Par exemple si le prompt en cours est `user@host $`, l'activation de l'EVP nommé __pyml__ modifie le prompt qui devient : `(pyml) user@host $`

3. __Installer des modules Python dans l'EVP__ : `conda install <nom_module> ou pip install <nom_module>`

     cette commande télécharge et installe __dans l'EVP courant__ le module Python nommé `<nom_module>`. <br>
     ⚠️ Le point important est d'avoir activé l'EVP voulu !


❓ `conda install...` ou `pip install...` ? la règle est simple :<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ➡️ commence de préférence par `conda install...`, qui installera une version optimisée du module Python si elle est connue de conda<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ➡️ utilise `pip install...` si conda échoue.

## Travail à faire : <a name="work_to_do"></a>

### 🔨 Installer `miniconda`

📥 Télécharge et installe miniconda en suivant la page https://conda.io/projects/conda/en/stable/user-guide/install/linux.html en portant  attention à ces points :

  * Tu dois définir un chemin d'installation du répertoire `miniconda3` qui ne comporte __ni espace__, __ni caractère accentué__ <br>
    (le chemin d'installation par défaut sous ubuntu est `/home/<logname>/miniconda3/`).
  * À la fin de l'installation réponds `yes` à la question `Do you wish the installer to initialize Miniconda3 by running conda init? [yes|no]`
  * Lance un nouveau terminal ou tape la commande `source ~/.bashrc` pour hériter des modifications de ton fichier `.bashrc` : la commande `conda` est maintenant accessible dans le terminal.
  * Désactive le lancement automatique de l'EVP `(base)` en tapant la commande : `conda config --set auto_activate_base false`.
  * Relance un nouveau terminal : le prompt ne doit plus mentionner l'EVP `(base)`.
  * Pour finir, mets à jour la commande `conda` avec la commande : `conda update -n base -c defaults conda`.

### 🔨 Créer un EVP dédié au machine learning avec `tensorflow2`

Maintenant que la commande `conda` est accesible dans un terminal tu peux créer et configurer un EVP nommé `tf2` pour travailler avec `tenssorflow2` et Python 3.8 :

```bash
user@host $ conda create -n tf2 python=3.8
... some stuff...  (répondre 'y' pour installer les modules Python)

user@host $ conda activate tf2
(tf2) user@host $
```
Installe ensuite les principaux modules Python pour travailler avec __tensorflow2__ :
```bash
(tf2) user@host $ pip install tensorflow==2.11.0
(tf2) user@host $ pip install scipy==1.9.0 matplotlib==3.6.0 kiwisolver==1.4.0
(tf2) user@host $ pip install scikit-learn scikit-image seaborn jupyter jupyterlab pydot rospkg chardet labelimg
```

## Commandes utiles

| commande | descriptif |
|:---|:---|
|`conda info` |Afficher des informations sur **conda**|
|`conda env list` |Liste des EVP connus par **conda**|
|`conda deactivate` |Désactiver l'EVP courant|
|`conda activate <nom_EVP>` |Active l'EVP nommé `<nom_EVP>`|
|`conda list` ou `pip list`|Liste des packages installés pour l'EVP courant|
|`conda search <module>` |Trouver les versions d'un module Python pour l'EVP courant|
