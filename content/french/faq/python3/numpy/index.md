---
title: "🔨 numpy ndarrays tips & tricks "
menu:
  main:
    name: "numpy"
    weight: 2
    parent: "python3"
---

Dans toute l apage, on suppose que `numpy` est importé selon :
```python
>>> import numpy as np
```

## mot_clefs
[argmax](#argmax) &emsp; [indexation](#indexation) &emsp;  [shape](#shape) &emsp;  [slicing](#slicing)

## argmax

La méthode `argmax` renvoie le rang de la valeur max du tableau:

```python
>>> V = np.array([1,1,1,100,1])
>>> V.max()
100
>>> V.argmax()
3
>>> V[V.argmax()]
100
```
Quand un tableau a plusieurs dimensions, `argmax` renvoie le rang dans le tableau "mis à plat" :
```python
>>> V = np.array([[1,2,3], [5,6,100], [8,9,10]]) ; V
array([[  1,   2,   3],
       [  5,   6, 100],
       [  8,   9,  10]])
>>> V.argmax()
5
```

[top](#mot_clefs)

### indexation


[top](#mot_clefs)


### shape

L'attribut `shape` d'un tableau `ndarray` est un _tuple_ qui donne les dimensions du tableau:

```python
>>> V = np.array([1,2,3])
>>> V.shape
(3,)                                       # (3) est un scalaire mais (3,) is a tuple!
>>> V = np.array([[1,2,3],[4,5,6]])
>>> V.shape
(2, 3)
``` 
[top](#mot_clefs)



### slicing

On peut extraire un sous-ensemble d'un tableau `ndarray` avec la syntaxe `start:stop_exclu:step` applicable à n'importe laquelle des dimension du tableau:

```python
>>> V = np.array([[1,2,3], [4,5,6], [7,8,9], [10,11,12]]) ; V
array([[ 1,  2,  3],
       [ 4,  5,  6],
       [ 7,  8,  9],
       [10, 11, 12]])
>>> V[2:4]             # les lignes 2 à 4_exclu => 2 et 3
array([[ 7,  8,  9],
       [10, 11, 12]])
>>> V[2:4, 1:3]        # les lignes 2 et 3, colonnes 1 à 3_exclu => 1 et 2
array([[ 8,  9],
       [11, 12]])
```
et on peut bien sûr mélanger _indexation_ et _slicing_:
```python
>>> V[1, 1:3]          # les colonnes 1, 2 de la ligne 1
array([5, 6])
```

[top](#mot_clefs) 
