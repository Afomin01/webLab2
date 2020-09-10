package beans;

public class Entry {
    private double x;
    private double y;
    private int r;
    private boolean hitResult;

    public Entry(double x, double y, int r, boolean hitResult) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hitResult = hitResult;
    }

    public boolean isHitResult() {
        return hitResult;
    }

    public void setHitResult(boolean hitResult) {
        this.hitResult = hitResult;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getR() {
        return r;
    }

    public void setR(int r) {
        this.r = r;
    }
}
