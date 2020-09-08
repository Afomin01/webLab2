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
        float x = Float.parseFloat(req.getParameter("x").replace(',', '.'));
        int y = Integer.parseInt(req.getParameter("y"));
        ArrayList<Entry> results = new ArrayList<>();

        List<Integer> rSet =  Stream.of(req.getParameterValues("rSet[]"))
                .map(Integer::valueOf)
                .collect(Collectors.toList());

        EntriesBean entries = (EntriesBean) req.getSession().getAttribute("entries");
        if (entries == null) {
            entries = new EntriesBean(new ArrayList<>());
            req.getSession().setAttribute("entries", entries);
        }

        for (int r : rSet) {
            Entry entry = new Entry(x, y, r);
            entry.checkHit();
            entries.getEntries().add(entry);
            results.add(entry);
        }
        req.setAttribute("results", results);

        getServletContext().getRequestDispatcher("/jsp/secondPage.jsp").forward(req, resp);
    }
}
