---
title: "Détection d'objets avec tensorflow2"
menu:
  main:
    name: "Détection d'objets avec tf2"
    weight: 3
    identifier: "objectDetectionTF2"
    parent: "vision"
---

Dans cette section tu vas apprendre à utiliser l'_API_ ___Tensorflow Object Detection___ (_a.k.a_ _TOD_) qui propose :
* des réseaux pré-entraînés spécialisés dans la __détection d'objets dans des images__ (___Object Detection___),
* un mécanisme de ___transfert learning___ pour continuer d'entraîner avec tes propres image un réseau pré-entraîné, afin de détecter les objets qui t'intéressent pour ton projet.

__Avantages__ : Contrairement à la __Classification__ présentée dans la section [Classification tf2](https://learn.e.ros4.pro/fr/vision/classification_tf2/), la __Détection d'objets__ donne directement les boîtes englobantes des objets. On évite ainsi l'étape de pré-traitement de l'image pour extraire les objets, en faire de nouvelles images puis classifier ces nouvelles images. Ce pré-traitement basé sur un traitement conventionnel des pixels de l'image (seuillage, extraction de contour, segmentation...) est relativement fragile (sensible à la luminosité, à la présence ou non d'un fond noir...).

Un avantage attendu de l'approche __Object Detection__ est de fournir directement les boîtes englobantes des objets à détecter, sans passer par l'étape de pré-traitement des images.

__Inconvénients__ - Les principaux inconvénients de l'approche __Object Detection__ sont :
* la complexité de la prise en main de l'API TOD (Tensorflow  Object Detection) liée en partie aux incompatibilités entre les  versions 1 et 2 de tensorflow,
* les temps de ré-entraînement possiblement très longs des réseaux pré-entraînes à la détection d'objets (réseaux à l'architecture complexe comportant un grand nombre de neurones). Dans certains cas, il faut absolument disposer de ressources matérielles accélérées (GPU ou TPU) pour avoir des temps d'entraînement acceptables (quelques heures au lieu de plusieures dizaines d'heures...).


## Prérequis

* BAC+2 et +
* Savoir utiliser les commandes de bases Linux pour utiliser et modifier l'arborescence des fichiers.
* Bonne compréhension de Python et des tableaux multi-dimensionnels de numpy (`ndarray`).
* Première expérience des réseaux de neurones (denses et convolutionnels) est souhaitable.

L'entraînement des réseaux de neurones avec le module `tensorflow` se fait dans un Environnement Virtuel Python (EVP) qui permet de travailler dans un environnement Python dédié, séparé de celui existant pour le travail sous ROS.<br>
💻 L'activité [Python3 : Environnement virtuel](https://learn.e.ros4.pro/fr/faq/python3/venv/) doit être réalisée pour apprendre comment créer un EVP nommé `tf2` avec une version de Python égale à `3.8` et les modules nécessaire au travail avec les réseau de neurones de _tensorflow_.

## Parcours d'apprentissage :

Le parcours proposé dans cette activité comporte un prérequis puis 7 activités à enchaîner successivement :

activités |  contenu                                                                  | lien 
:----:|:--------------------------------------------------------------------------|:---------------
  prérequis   | Créer et initialser un Environnement Virtuel Python pour travailler avec l'_API TOD_ |  [Python3 : Environnement virtuel](https://learn.e.ros4.pro/fr/faq/python3/venv/)
  1   | Installer l'API _TensorFlow Oject Detection_ (_TOD_)                      | [Installer l'API TOD](tod_install/)
  2   | Télécharger un réseau pré-entraîné à la détection d'objets dans des images| [Télécharger un réseau pré-entraîné](downlod_pre-trained_network/)
  3   | Compléter l'arborescence de travail                                       | [Configurer l'arboresecnce de travail](configure_working_tree)
  4   | Obtenir les images avec la caméra du robot                                | [Obtenir les images avec le robot](get_images_from_robot/)
  5   | Annoter les images et créer le fichiers des données d'entraînement        | [Annoter les images pour l'entraînement supervisé](annotate_images)
  6   | Continuer l'entraînement du réseau avec les nouvelles données             |  [Ré-entraîner le réseau](re-train_network)
  7   | Évaluer les inférences du réseau ré-entrainé avec des images de test      | [Évaluer les inférences du réseau ré-entrainé](evaluate_network) 

Une fois ces étapes terminées, "il ne reste plus qu'à" intégrer l'exploitation du réseau ré-trainé dans l'environnement ROS...

## Documentation

Documentation générale sur numpy :
* Le résumé des manipulation des tableaux `ndarray` du module `numpy` : [Numpy cheatsheet](https://s3.amazonaws.com/assets.datacamp.com/blog_assets/Numpy_Python_Cheat_Sheet.pdf)
* La page _Numpy Quickstart_ : [NumPy quickstart](https://numpy.org/devdocs/user/quickstart.html)

Documentation sur l'_API TOD_ pour `tensorflow2` :
* Le tutoriel officiel complet : [TensorFlow 2 Object Detection API tutorial](https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/index.html)<br>
Ce tutoriel peut être consulté pour chercher des détails qui ne sont pas développés dans l'activité proposée, mais il est préferrable de suivre 
les indications du document présent pour installer et utiliser rapidement une version récente de tensorflow2. 
* Le dépôt git _TensorFlow Object Detection API_ : [models/research/object_detection](https://github.com/tensorflow/models/tree/master/research/object_detection)<br><br>


