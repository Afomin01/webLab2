package ru.itmo.web.lab2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet
public class AreaCheckServlet extends HttpServlet {
    private boolean hitCheck(float x, int y, int r) {
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

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
