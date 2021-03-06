package servlets;

import beans.EntriesBean;

import java.io.IOException;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/mainPage.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            EntriesBean entries = (EntriesBean) getServletContext().getAttribute("entries");
            String clear = req.getParameter("clear");
            if (entries != null && clear != null && clear.equals("true")) {
                entries.getEntries().clear();
                getServletContext().getRequestDispatcher("/mainPage.jsp").forward(req, resp);
                return;
            }

            double x = Double.parseDouble(req.getParameter("x").replace(',', '.'));
            double y = Double.parseDouble(req.getParameter("y").replace(',', '.'));
            String[] rSet = req.getParameterValues("rSet[]");

            if (rSet.length < 1 || rSet.length > 5) {
                throw new IllegalArgumentException();
            }

            /*if (x <= -5 || x >= 3) {
                throw new IllegalArgumentException();
            }

            if (y < -4 || y > 4) {
                throw new IllegalArgumentException();
            }
            int[] intRSet = Stream.of(rSet).mapToInt(Integer::parseInt).toArray();
            if (IntStream.of(intRSet).anyMatch(r -> r > 5 || r < -5)) {
                throw new IllegalArgumentException();
            }*/

            getServletContext().getRequestDispatcher("/areaCheckServlet").forward(req, resp);
        } catch (Exception e) {
            getServletContext().getRequestDispatcher("/mainPage.jsp").forward(req, resp);
        }
    }
}
