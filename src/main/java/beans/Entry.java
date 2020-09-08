package beans;

public class Entry {
    private float x;
    private int y;
    private int r;
    private boolean isHit;

    public Entry(float x, int y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

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

    public int getR() {
        return r;
    }

    public void setR(int r) {
        this.r = r;
    }

    public boolean isHit() {
        return isHit;
    }

    public void checkHit() {
        if (x >= 0 && y >= 0) {
            isHit = x <= r / 2. && y <= r;
        } else if (x >= 0 && y <= 0) {
            isHit = y >= x - r;
        } else if (x <= 0 && y <= 0) {
            isHit = Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2., 2);
        } else {
            isHit = false;
        }
    }
}
