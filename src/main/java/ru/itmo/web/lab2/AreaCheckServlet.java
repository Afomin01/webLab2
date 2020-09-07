package ru.itmo.web.lab2;

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

@WebServlet
@SuppressWarnings("unchecked")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        float x = Float.parseFloat(req.getParameter("x").replace(',', '.'));
        int y = Integer.parseInt(req.getParameter("y"));
        List<Integer> rSet =  Stream.of(req.getParameterValues("rSet"))
                .map(Integer::valueOf)
                .collect(Collectors.toList());

        Entry entry = new Entry(x, y, rSet);
        entry.generateResults();

        if (req.getSession().getAttribute("entries") == null) {
            EntriesBean entries = new EntriesBean(new ArrayList<>());
            req.getSession().setAttribute("entries", entries);
        }
        ((List<Entry>) req.getSession().getAttribute("entries")).add(entry);

        getServletContext().getRequestDispatcher("/secondary-page.jsp").forward(req, resp);
    }
}
