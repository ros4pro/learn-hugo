---
title: "Create a multi-projects workspace to work on Object Detection"
menu:
  main:
    name: "Create your workspace"
    weight: 2
    parent: "objectDetectionTF2"
---

---
    Targeted learning outcomes:
    - how to organize and create the working tree to support several projects for the detection of objects in images 

    Activity type:      : ð ïž [task]
    Expected duration: 15 minutes
---

## The multi-project work tree

The proposed generic tree structure makes it easy to develop as many Object Detection projects as you want:

	tod_tf2
	âââ <project>
	â   âââ images
	â   â   âââ test
	â   â   â   âââ *.jpg, *.png ... *.xml
	â   â   âââ train
	â   â   â   âââ *.jpg, *.png ... *.xml
	â   â   âââ *.csv
	â   â
	â   âââ training
	â       âââ <pre-trained_net>
	â       âââ train.record
	â       âââ test.record
	â       âââ label_map.txt
	âââ pre_trained
	â	âââ <pre_trained-net>
    â	
	âââ models
	    âââ research
	        âââ object_detection
	
Each project that you work on has its own `project` directory

*  The `<project>/imges` directory contains for each project:
    * the subdirectories `test` and `train` which each contain:
        * the images PNG, JPGâŠ to process
        * The XML annotation files created with the `labelImg` software: they give for each object the coordinates of the bounding box and the label of the object.
    * the CSV annotation files (content of XML files converted to CSV format), which in turn will be converted to _`tensorflow record`_.

* For each project the directory `<project>/training` contains:

	* `<pre_trained_net>` directory for each pre-trained network used: you can thus try several pre-trained networks to see their performances. The weight files of the network trained by you are stored in the `<pre-trained_net>` directory.
	* `train.reccord`  and `test.reccord` files: training and test labeled data in _tensorflow record_ format.
	* `l:abel_map.txt` file: lists the labels corresponding to the objects to be detected.

* The `pre-trained/` directory contains a sub-directory for each of the pre-trained networks used which stores the various files necessary for their use.
	
## Example
	
	
Let's consider the detection of hand-written digits on the faces of cubes in images given by the robot's camera:<br>
![cube_faces.png](img/cube_faces.png)

The `<project>` directory is named `cube_faces`, which gives the tree structure:

	tod_tf2
	âââ cube_faces
	â   âââ images
	â   â   âââ test
	â   â   â   âââ *.jpg, *.png ... *.xml
	â   â   âââ train
	â   â   â   âââ *.jpg, *.png ... *.xml
	â   â   âââ *.csv	â   â
	â   âââ training
	â       âââ <pre-trained_net>
	â       âââ train.record
	â       âââ test.record
	â       âââ label_map.txt
	âââ pre-trained
	â	âââ <pre-trained_net>
	âââ models
	    âââ research
	        âââ object_detection

A few shell commands suffice to create the first levels of the tree:

```bash	
# From within tod_tf2
(tf2) user@host $ mkdir -p cube_faces/images/test
(tf2) user@host $ mkdir -p cube_faces/images/train
(tf2) user@host $ mkdir -p cube_faces/training
(tf2) user@host $ mkdir pre-trained
```
Let's check:

```bash	
# From within tod_tf2
(tf2) user@host $ tree -d . -I models  # current directory tree excluding the 'models' directory
.
âââ cube_faces
âÂ Â  âââ images
âÂ Â  âÂ Â  âââ test
âÂ Â  âÂ Â  âââ train
âÂ Â  âââ training
âââ pre-trained
âââ tod_tf2_tools
```

