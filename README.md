# webLab2
Lab work made at ITMO University by Artem Bakin and Dmitry Kupershtein.
![](https://user-images.githubusercontent.com/38016689/104229215-035c3b80-545d-11eb-8e63-f185ac091fa9.png)

## Task
Develop a web application based on servlets and JSPs that determines whether a point on a coordinate plane falls into a
given area.

This area has a variable radius R.

| Var | Type | Valid values | Input   |
| --- | ---- | ------------ | ------- |
| X   |float |(-5,3)        | text    |
| Y   |int   |[-4,3]        | select  |
| R   |int   |[1,5]         | checkbox|

## Multiple radii
The radius of the area is set by checkboxes, which imply multiple selection. Therefore, we decided to display areas
with all possible radii on the graph. This allows to unambiguously determine the position of a point on the chart.

## Denial of responsibility
Some of our technical solutions are dictated by the task, we cannot vouch for their sanity.