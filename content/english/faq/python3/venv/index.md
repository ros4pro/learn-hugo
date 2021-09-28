---
title: "🔨 Create and use a Python Virtual Environment"
menu:
  main:
    name: "virt. env"
    weight: 1
    parent: "python3"
---

## Interest

A Python Virtual Environment (PVE) provides a dedicated computing environment containing an installation of Python:

* independent of other Python environments likely to coexist on the same machine,

* independent of computer updates.

An PVE is based on dedicated disk tree that houses the version of Python and modules you need for your project.

You can delete and re-create an PVE very easily, without impacting the Python distribution installed with your Ubuntu system.

When you activate a PVE on Linux, the PATH environment variable is changed so that the Python interpreter and all modules are searched for in the tree dedicated to that PVE.

## Create Virtual Environment with `conda`

Several tools exist to create PVE, in particular:

* the `conda` command, available if you have installed Python with the [miniconda](https://docs.conda.io/en/latest/miniconda.html) distribution
* the `venv` Python module which allows you to create an PVE (see [venv](https://docs.python.org/3/library/venv.html)).

The advantage of `miniconda` for numerical computation is that it transparently installs the [MKL](https://software.intel.com/content/www/us/en/develop/tools/oneapi/components/onemkl.html) library which provides optimization for Intel processors of linear algebra libraries (BLAS, Lapack ...) at the base of the performance of the numpy module.

## Steps for creating a Virtual Environment with `conda`

1. Download and install the [miniconda](https://docs.conda.io/en/latest/miniconda.html) distribution...

    * The only precaution is to install the `miniconda3` installation directory in a path that does not contain spaces or accented characters.
    * Usually the path looks like `/home/<logname>/miniconda3/`.
    * At the end of the installation answer `yes` to the question `Do you wish the installer to initialize Miniconda3 by running conda init? [yes | no]`
    * Start a new terminal or type the command `source ~/.bashrc` to inherit changes from the `.bashrc` file.
    * Once `miniconda3` installed, disable the automatic launch of the PVE `(base)` by typing the command: `conda config --set auto_activate_base false`.

1. Create the PVE with the command `conda create -n <pev_name> python=<version>`

    * `<pev_name>`: (free) name of your PVE: for example `pyml` (for Python mechine learning ;-) )
    * `<version>`: version of Python you want to install in your PVE: for example `3.6` or` 3.6.8` or `3.8` ...

1. Activate your PVE with the command `conda activate <pev_name>`:

    * Activating PVE results in the prompt being prefixed with the string: `(<pve_name>)`.
    For example if the current prompt is `user@host $`, activating the PVE named `pyml` modifies the prompt which becomes:` (pyml) user@host $ `

1. Load the Python modules into your **activated** PVE

    With your **PVE ectivated** use `conda install <module>` or `pip install <module>` to install the Python module `<module>`.

    ❓ `conda install ...` or `pip install ...` the rule is simple:

    * preferably starts with `conda install ...`, which will install an optimized version of the Python module if known to `conda`
    * if `conda install ...` fails, then use `pip install ...`

## 🔨 How a Virtual Environment works

When the PVE `<pve_name>` is activated:

* the `PATH` environment variable is changed to mention first:
  * the directory allowing access to the `conda` command: for example `/home/<logname>/miniconda3/condabin/`
  * the directory associated with the environment `<pve_name>`: for example `/home/<logname>/miniconda3/envs/<pve_name>`
* all Python-related commands (`python`,` conda`, `pip` ...) are searched first in these two directories.
* any installation of a Python module by `conda` or` pip` installs the module in the `/home/<logname>/miniconda3/envs/<pve_name>/...` tree

## 🔨 Which Python modules should I install in my PVE for training neural networks?

Taking the example of an EVP named `(tf2)` created with the option `python=3.8`, the installation of Python modules essential to working with __tensorflow2__ is done as shown below:

```bash
(tf2) user@host $ conda update -n base -c defaults conda
(tf2) user@host $ conda install tensorflow == 2.4.1
(tf2) user@host $ conda install numpy scipy matplotlib jupyter pandas
(tf2) user@host $ pip install scikit-learn scikit-image seaborn pydot rospkg pyyaml
(tf2) user@host $ pip install opencv-python == 4.5.1.48 
```

## 🔨 PVE: useful commands

* Display distribution information **conda**: `conda info`

* List the PVE known by **conda**: `conda env list`

* Deactivate the current PVE: `conda deactivate`

* Activate the PVE named `<pve_name>`: `conda activate <pve_name>`

* With your **PVE activated**:

  * List installed packages for this PVE: `conda list` or `pip list`

  * Find versions of a Python module for the current PVE activated:

    * `conda search <module>`: search 

