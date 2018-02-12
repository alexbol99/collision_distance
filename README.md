# collision_distance
Algorithm to calculate one-dimensional collision distance between two shapes

Let we have 2 not intersecting arbitrary polygons A and B in 2-d plane so that x-distance between two bounding boxes is d > 0.
We want to find minimal translation vector t(x,0) so that polygon B after translation will collide with polygon A at least in one point.
