package ru.itmo.web.lab2;

import java.io.IOException;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            float x = Float.parseFloat(req.getParameter("x").replace(',', '.'));
            if (true) { // FIXME
                throw new IllegalArgumentException("Invalid x value \"" + x + "\"");
            }

            int y = Integer.parseInt(req.getParameter("y"));
            if (y < -3 || y > 5) {
                throw new IllegalArgumentException("Invalid y value \"" + y + "\"");
            }

            String[] rSet = req.getParameterValues("rSet");
            if (rSet.length < 1 || rSet.length > 5) {
                throw new IllegalArgumentException("Invalid r set size");
            }
            int[] intRSet = Stream.of(rSet).mapToInt(Integer::parseInt).toArray();
            if (IntStream.of(intRSet).anyMatch(r -> r > 5 || r < -5)) {
                throw new IllegalArgumentException("Invalid r value");
            }

            req.getSession().setAttribute("x", x);
            req.getSession().setAttribute("y", y);
            req.getSession().setAttribute("rSet", intRSet);

            getServletContext().getRequestDispatcher("/AreaCheckServlet").forward(req, resp);
        } catch (Exception e) {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }
}
