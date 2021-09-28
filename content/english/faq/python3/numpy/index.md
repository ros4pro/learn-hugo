---
title: "🔨 numpy ndarrays tips & tricks "
menu:
  main:
    name: "numpy"
    weight: 2
    parent: "python3"
---

Within this page `numpy` is supposed to be imported as:
```python
>>> import numpy as np
```

## keywords

[argmax](#argmax) &emsp; [indexation](#indexation) &emsp;  [shape](#shape) &emsp;  [slicing](#slicing)

## argmax

`argmax` returns the rank of the max value in the array:

```python
>>> V = np.array([1,1,1,100,1])
>>> V.max()
100
>>> V.argmax()
3
>>> V[V.argmax()]
100
```

When an array has many dimensions `argmax` return the flattened rank of the max value:

```python
>>> V = np.array([[1,2,3], [5,6,100], [8,9,10]]) ; V
array([[  1,   2,   3],
       [  5,   6, 100],
       [  8,   9,  10]])
>>> V.argmax()
5
```
[top](#keywords)

### indexation


[top](#keywords)

### shape

the attribute `shape` of an ndarray object is  _tuple_ that gives the array dimensions:

```python
>>> V = np.array([1,2,3])
>>> V.shape
(3,)                                       # (3) is a scalar but (3,) is a tuple!
>>> V = np.array([[1,2,3],[4,5,6]])
>>> V.shape
(2, 3)
``` 
[top](#keywords)

### slicing

One can extract a sub-array with the slicing syntaxe `start:stop_excluded:step`:

```python
>>> V = np.array([[1,2,3], [4,5,6], [7,8,9], [10,11,12]]) ; V
array([[ 1,  2,  3],
       [ 4,  5,  6],
       [ 7,  8,  9],
       [10, 11, 12]])
>>> V[2:4]             # rows 2 to 4_excluded => 2 & 3
array([[ 7,  8,  9],
       [10, 11, 12]])
>>> V[2:4, 1:3]        # rows 2 & 3, columns 1 to 3_excluded => 1 & 2
array([[ 8,  9],
       [11, 12]])
```

and of course you can mixt _indexation_ and _slicing_:

```python
>>> V[1, 1:3]          # cols 1 & 2 on row 1
array([5, 6])
```

[top](#keywords) 
