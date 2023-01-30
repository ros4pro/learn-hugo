---
title: "Object Detection with tensorflow2"
menu:
  main:
    name: "Object Detection"
    weight: 3
    identifier: "objectDetectionTF2"
    parent: "vision"
---

In this section you learn to use the __Tensorflow Object Detection__ (_a.k.a_ TOD) API which offers:

* a collection of pre-trained networks, specially designed for object detection in images (__Object Detection__),
* a _transfer learning_ mechanism to continue the training of pre-trained networks with your own labeled images,
to obtain the detection of the objects of interest.

__Pros__: Unlike the __Classification__ strategy presented in the section [Classification](<https://learn.e.ros4.pro/en/vision/classification_tf2/>),
the __Object detection__ can directly find the bounding boxes of the targeted objects: it avoids the usage of conventional image processing to extract the sub-images of the targeted objets, then to classify the sub-images. The drawback of the image processing used to create the sub-images to be classified is that it involves some low level (pixel level) pre-processing of the image : thresholding, contour extraction, segmentation, etc... This processing is quite fragile: sensitive to brightness, to the presence or not of a black background ...

An expected advantage of the Object Detection approach is to provide the bounding boxes of the detected objects directly, without going through the image pre-processing step.

__Cons__: The main disadvantages of the __Object Detection__ approach are:

* the complexity of getting started with the _TOD API_, partly due to the incompatibilities between versions 1 and 2 of tensorflow,
* the possibly very long re-training times of the pre-trained networks (neural networks of complex architecture comprising a large number of neurons). In some cases, it is required to use accelerated hardware resources (GPU or TPU) to have acceptable training times (a few hours instead of several tens of hours, etc.).

## Prerequisites

* Undergraduate or more.
* Know some basic Linux commands to work with and modify the file tree.
* Good understanding of Python language and numpy arrays.
* A first experience of neural networks is desirable.

The training of neural networks with the `tensorflow` module will preferably be done within a __Python virtual environment__ (PVE) which allows one to work in a dedicated Python environment, separate from the existing one for working under ROS.

💻 See [Python3: virtual environment](<https://learn.e.ros4.pro/en/faq/python3/venv>) to create an PVE:

* named `tf2`,
* with a version of Python equal to `3.8`.

## Learning path

The course offered in this activity includes a prerequisite and 7 activities to be carried out successively:

Activités |  Description                                                            | Link | Approximate duration| 
:--------:|:------------------------------------------------------------------------|:-----|:---------|
prerequisite| Create/initialize a Python Virtual Environment to work with the TOD API | [Python3: Virtual Environment](https://learn.e.ros4.pro/fr/faq/python3/venv/) | 40 min.<br>_depends on your internet transfert rate_
1| Install the _TensorFlow Oject Detection_ (_TOD_) API                      | [Install the TOD API](tod_install/) | 60 min.<br>_depending on your internet transfert rate and your CPU & RAM_ |
2| Create a multi-projects workspace                  | [Create your workspace](configure_working_tree) | 15 min.| 
3| Download a neural network pre-trained for object detection in images| [Download the pre-trained network](downlod_pre-trained_network/)| 20 min. <br>_depending on your internet transfert rate_|
4| Get images with the robot camera                   | [Get the images from the robot](get_images_from_robot/) | 30 min. |
5| Annotate images and create the training data files | [Annotate the images for supervised training](annotate_images)| 60 min. |
6| Continue the network training using your images    | [Re-train the network](re-train_network) | 1, 2 hours or more<br>depending on your CPU & RAM_|
7| Evaluate the re-trained network performance        | [Evaluate the network](evaluate_network) | 30 minutes<br>depending on your CPU & RAM_|

Once these steps are completed, _all that remains_ is to operate the re-trained neural network in the ROS environment ...

## Documentation

General documention on numpy :
* The summary of the handling of the `ndarray` arrays of the` numpy` module : [Numpy cheatsheet](https://s3.amazonaws.com/assets.datacamp.com/blog_assets/Numpy_Python_Cheat_Sheet.pdf)
* The page _Numpy Quickstart_ : [NumPy quickstart](https://numpy.org/devdocs/user/quickstart.html)

Documentation on the _TOD API_ for `tensorflow2` :
* The full official tutorial : [TensorFlow 2 Object Detection API tutorial](https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/index.html)<br>
This tutorial can be consulted to look for details that are not developed in the proposed activity, but it is best to follow
the instructions in the present document to quickly install and use a recent version of tensorflow2.

* The git repository _TensorFlow Object Detection API_ : [models/research/object_detection](https://github.com/tensorflow/models/tree/master/research/object_detection)<br><br>


