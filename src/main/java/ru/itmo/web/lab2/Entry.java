package ru.itmo.web.lab2;

import java.util.List;

public class Entry {
    private float x;
    private int y;
    private List<Integer> rSet;
    private List<Boolean> resultsList;

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public List<Integer> getRSet() {
        return rSet;
    }

    public void setRSet(List<Integer> rSet) {
        this.rSet = rSet;
    }

    public void generateResults() {
       rSet.forEach(r -> hitCheck(x, y, r));
    }

    private static boolean hitCheck(float x, int y, int r) {
        if (x >= 0 && y >= 0) {
            return x <= r / 2. && y <= r;
        } else if (x >= 0 && y <= 0) {
            return y >= x - r;
        } else if (x <= 0 && y <= 0) {
            return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2., 2);
        } else {
            return false;
        }
    }
}
