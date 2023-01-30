---
title: "Get images from a ROS service"
menu:
  main:
    name: "Get images from a ROS service"
    weight: 4
    parent: "objectDetectionTF2"
---

---
    Targeted learning outcomes:
     - how to obtain images from a robot's camera using a ROS service.
     
    Activity type    : ⚙️ [tâche]
    Expected duration: 60 minutes 
---

## Get images from a ROS service

In our context, the images to be processed are available via the ROS service `/get_image` provided by the robot _Poppy Ergo Jr_.

![image2](img/image001.png)


🤖 Reminders - How to launch the _ROS Master_ and the _ROS services_ on the robot:

* turn on the _Poppy Ergo Jr_ robot,
* connect to the robot's RPi card: `ssh poppy@poppy.local` (pass: `poppy`):
```bash
(tf2) user@host: $ ssh poppy@poppy.local
poppy@poppy.local password:
...
```
* ✅ check that the `ROS_MASTER_URI` environment variable points to `localhost:11311`:
```bash
pi@poppy:~ $ env|grep ROS_MASTER
ROS_MASTER_URI=http://localhost:11311
```	
* if `ROS_MASTER_URI` does not point to the correct target:
    * edit the robot's `~/.bashrc` file,
    * set the correct value, save,
    * then type `source ~\.bashrc`,
    * and check again the value of `ROS_MASTER_URI` ...
* Start the _ROS Master_ and the _ROS services_ on the robot with the command:
```bash
pi@poppy:~ $ roslaunch poppy_controllers control.launch
...
```

💻 Now in another terminal __on your computer__, with the EVP `(tf2)` activated:
* ✅ check that `ROS_MASTER_URI` points to `poppy.local: 11311`

```bash
(tf2) user@host: $ env|grep ROS_MASTER
ROS_MASTER_URI=http://poppy.local:11311
```	
* if `ROS_MASTER_URI` does not point to the correct target:
     * edit the `~/.bashrc` file on your computer,
     * set the correct value, save,
     * then type `source ~\.bashrc`
     * and check again the value of `ROS_MASTER_URI` ...

🐍 You can use the Python program `tod_tf2/get_image_from_robot.py` to save the cube images in files named `imagesxxx.png` 
(`xxx` = `001`, `002` ...). <br>
Pressing any key switches from one image to another, pressing the `Q` key exits the program:

```python
import cv2, rospy
from poppy_controllers.srv import GetImage
from cv_bridge import CvBridge

i=1
while True:
    get_image = rospy.ServiceProxy("get_image", GetImage)
    response  = get_image()
    bridge    = CvBridge()
    image     = bridge.imgmsg_to_cv2(response.image)
    cv2.imwrite(f"image{i:03d}.png", image)
    cv2.imshow("Poppy camera", image)
    key = cv2.waitKey(0)
    if key==ord('q') or key==ord("Q"): break
    cv2.destroyAllWindows()
    i += 1
cv2.destroyAllWindows()
```

⚠️ You must deactivate the __tf2__ VPE to run the program `get_image_from_robot.py`:
* either by launching a new terminal,
* or by typing the command `conda deactivate`

You must collect a few dozen images for re-training the neural network.

Once the images are completed, 90% of the images must be put in the `<project>/images/train` directory 
and the rest in the` <project>/images/test` directory.

