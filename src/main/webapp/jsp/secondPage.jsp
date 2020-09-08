<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Weblab 2</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/inputs.css">
    <link rel="stylesheet" href="css/secondPage.css">
    <link href="//fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
</head>
    <body>
        <jsp:include page="header.jsp"/>
        <main>
            <div>
                <table id="result-table">
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                    <c:forEach var="entry" items="${results}">
                        <tr>
                            <td>${entry.x}</td>
                            <td>${entry.y}</td>
                            <td>${entry.r}</td>
                            <c:if test="${entry.hitResult}"><td style="color: #3b993b">${entry.hitResult}</td></c:if>
                            <c:if test="${not entry.hitResult}"><td style="color: #cf1a1a">${entry.hitResult}</td></c:if>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
            <div>
                <button onclick="location.reload();">Go to main page</button>
            </div>
        </main>
        <jsp:include page="footer.jsp"/>
    </body>
</html>
