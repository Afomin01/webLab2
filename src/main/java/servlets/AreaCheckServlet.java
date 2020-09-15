package servlets;

import beans.EntriesBean;
import beans.Entry;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@WebServlet("/areaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        double x = Double.parseDouble(req.getParameter("x").replace(',', '.'));
        double y = Double.parseDouble(req.getParameter("y").replace(',', '.'));
        ArrayList<Entry> results = new ArrayList<>();

        List<Integer> rSet =  Stream.of(req.getParameterValues("rSet[]"))
                .map(Integer::valueOf)
                .collect(Collectors.toList());

        EntriesBean entries = (EntriesBean) getServletContext().getAttribute("entries");
        if (entries == null) {
            entries = new EntriesBean(new ArrayList<>());
            getServletContext().setAttribute("entries", entries);
        }

        for (int r : rSet) {
            Entry entry = new Entry(x, y, r, checkHit(x, y, r));
            entries.getEntries().add(entry);
            results.add(entry);
        }
        req.setAttribute("results", results);

        getServletContext().getRequestDispatcher("/jsp/secondPage.jsp").forward(req, resp);
    }

    private boolean checkHit(double x, double y, int r) {
        if (x >= 0 && y > 0) {
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
