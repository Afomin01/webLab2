# webLab2
Web programming lab work made at ITMO University by Artem Bakin and Dmitry Kupershtein.
![](https://user-images.githubusercontent.com/38016689/104229215-035c3b80-545d-11eb-8e63-f185ac091fa9.png)

## Task
Develop a web application based on servlets and JSPs that determines whether a point on a coordinate plane falls into a
given area. User can enter point's coordinates by using form input fields or by clicking with a mouse on the graph. The radius
of the figure can be set by checking one o several checkboxes.

This area has a variable radius R.

| Var | Type | Valid values | Input   |
| --- | ---- | ------------ | ------- |
| X   |float |(-5,3)        | text    |
| Y   |int   |[-4,3]        | select  |
| R   |int   |[1,5]         | checkbox|

## Multiple radii
A group of checkboxes allows user to pick several radii. Due to that, we decided to display areas
with all possible radii on the graph. Selected areas are filled with a solid color,  Selected areas are filled with a solid color, and unselected areas are displayed with lines.

## Denial of responsibility
Some of our technical solutions were dictated by the task, so we had no opportunity to improve them.