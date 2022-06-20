---
title: "⚙️ Create a Python Virtual Environment"
menu:
  main:
    name: "Virtual Env."
    weight: 1
    parent: "python3"
---
---
    Learning outcomes :
    - How to install Python with miniconda.
    - How to create and use a Python Virtual Environment with the command `conda` under ubuntu.

    Type of the nugge: ⚙️ [task]
    Expected duration: 30-45 minutes (depending on your Internet connexion).
---

## Interest

The state of the art regarding Python programming (Machine Learning, Data processing...) consists in using a __Python Virtual Environment__ (PVE) 
to encapsulate each project in a dedicated and sustainable environment.<br>
Each PVE provides a dedicated computing environment containing a specific installation of Python:
* independent of other Python installs likely to coexist on the same machine,
* independent of computer updates.

A PVE is based on a dedicated disk tree that houses the version of the Python interpreter and modules that you need for your project. 
You can delete and re-create an PVE very easily, without impacting the other Python installations present on your computer.

## Tools

Two tools are most often used to create a PVE:

* the `conda` command, available if you have installed Python  with [miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual)
* the `venv` Python module (see [venv](https://docs.python.org/3/library/venv.html)).

The advantage of `miniconda` for numerical computation is that it transparently installs the [MKL](https://software.intel.com/content/www/us/en/develop/tools/oneapi/components/onemkl.html)
library which provides Intel processors optimization for linear algebra libraries (BLAS, Lapack ...) that determine the performance of the numpy module.

## How a Virtual Environment works

The installation of the miniconda package on your computer modifies your `.bashrc` file: 
the `PATH` environment variable is modified to first mention the directory containing the _conda_ command 
(the default for Ubuntu is `/home/<logname>/miniconda3/condabin/`).<br>
➡️ This mecanism gives you access to the `conda` command in any terminal.

When the PVE <pve_name> is activated with the command `conda activate <pve_name>`:
* the `PATH` environment variable is changed in the current shell interpreter to first mention the bin directory of the PVE:
    for example `/home/<logname>/miniconda3/envs/<pve_name>/bin/`
* All Python-related commands (_python_, _pip_ …) are first searched in this directory.
* Any installation of a Python module with _conda_ or _pip_ will install the module under the root directory `/home/<logname>/miniconda3/envs/<pve_name>/`
of the PVE tree.

## Understanding how to create a PVE with `conda` and Ubuntu


Prior to the creation of a PVE, you must install _miniconda_ on your computer. You will do this in the section <b>Work do to</b>.<br>

Once _conda_ is installed on your computer, you can install & configure as many PVE as you want following the 3 steps procedure explained bellow.<br>
⚠️ Don't do the job now! just understand the commands syntaxe and arguments, the job wil be done for real in the section __Work to do__. 

1. __PVE creation__: `conda create -n <pve_name> pip python=<version>`
    * `<pve_name>` is the (free) name of your PVE, often a mnemonic name like _pyml_ (for _Python machine learning_) 
    or _tf2_ (for working with tensorflow2)…
    * `<version>` is the version of Python you want to install in your PVE (for example _3.6_ or _3.6.8_ or _3.8_…)

2. __PVE activatiion__: `conda activate <pve_name>`
    * Activating PVE results in the prompt being prefixed with: `(<pve_name>)`.<br>
      For example if the current prompt is `user@host $`, activating the PVE named 'pyml' modifies the prompt which becomes: `(pyml) user@host $`

3. __PVE populating__ with Python modules: `conda install <module_name> or pip install <module_name>`

    this command downloads and installs the Python module named `<module_name>` in your PVE. <br>
    ⚠️ The important point is that your PVE must activated!


❓ `conda install...` or `pip install...` ? the rule is simple:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ➡️ preferably start with `conda install...`, which will install an optimized version of the Python module if known to conda<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ➡️ use `pip install...` if conda fails.


## Work to do

### 🔨 Install `miniconda`

Download and install miniconda on your computer from https://docs.conda.io/en/latest/miniconda.html. Pay attention to these points:

* You must define an installation path for the `miniconda3` directory which does not contain spaces or accentuated characters<br>
(the default installation path on Ubuntu looks like `/home/<logname>/miniconda3`)
* At the end of the installation answer _yes_ to the question _"Do you wish the installer to initialize Miniconda3 by running conda init? [yes | no]"_
* Start a new terminal or type the command `source ~/.bashrc` to inherit changes from your `.bashrc` file: the `conda` command becomes available in the terminal.
* Advice: you can disable the automatic launch of the PVE `(base)` by typing the command: `conda config --set auto_activate_base false`.

Now it's done. If you want to check your installation launch a new terminal and try the command `conda info`<br>
You should get no error in return and see a informations on your __miniconda__ installation displayed on the screen.


### 🔨 Create a PVE dedicated to machine learning with `tensorflow2`

With `miniconda` (or `Anaconda`) installed on your computer, create and activate the PVE named `tf2` to work with Python 3.8:
```bash
(base) user@host $ conda create -n tf2 pip python=3.8
...some stuff ... answer 'y'  to proceed to the installation...
...
(base) user@host $ conda update -n base -c defaults conda
... some stuff...

(base) user@host $ conda activate tf2
(tf2) user@host $
```
Then install the main Python modules to work with __tensorflow2__ :
```bash
(tf2) user@host $ pip install --ignore-installed --upgrade tensorflow==2.9
(tf2) user@host $ conda install numpy scipy matplotlib jupyter jupyterlab pandas
(tf2) user@host $ pip install scikit-learn scikit-image seaborn pydot rospkg pyyaml opencv-python==4.6.0.66
```

## Useful commands

| command | description |
|:---|:---|
|`conda info` |Display information about **conda**|
|`conda env list` |List the PVEs known by **conda**|
|`conda deactivate` |Deactivate the current PVE|
|`conda activate <pve_name>` |Activate the PVE named `<pve_name>`|
|`conda list` or `pip list`|List installed packages for current activated PVE|
|`conda search <module>` |Find versions of a Python module for current activated PVE|

