package beans;

public class Entry {
    private float x;
    private int y;
    private int r;
    private boolean hitResult;

    public Entry(float x, int y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean isHitResult() {
        return hitResult;
    }

    public void setHitResult(boolean hitResult) {
        this.hitResult = hitResult;
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

    public void checkHit() {
        if (x >= 0 && y >= 0) {
            hitResult = x <= r / 2. && y <= r;
        } else if (x >= 0 && y <= 0) {
            hitResult = y >= x - r;
        } else if (x <= 0 && y <= 0) {
            hitResult = Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2., 2);
        } else {
            hitResult = false;
        }
    }
}
