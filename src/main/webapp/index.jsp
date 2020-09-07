
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Web lab 2</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/svg.css">
    <link rel="stylesheet" href="css/mainPage.css">
    <link href="//fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
</head>
<body>
    <jsp:include page="jsp/header.jsp"/>
    <main>
        <div id="graph-and-input-div">
            <div id="svg-div">
                <svg height="600" width="600" viewBox="-35 -35 420 420" xmlns="http://www.w3.org/2000/svg" id="graph">

                    <path d="M175 175 87.5 175 A87.5 87.5 0 0 0 175 262.5Z" class="figure-shape4"/>
                    <path d="M175 175 105 175 A70 70 0 0 0 175 245Z" class="figure-shape3"/>
                    <path d="M175 175 122.5 175 A52.5 52.5 0 0 0 175 227.5Z" class="figure-shape2"/>
                    <path d="M175 175 140 175 A35 35 0 0 0 175 210Z" class="figure-shape1"/>
                    <path d="M175 175 157.5 175 A17.5 17.5 0 0 0 175 192.5Z" class="figure-shape"/>

                    <polygon points="175,175 175,0 262.5,0 262.5,175" class="figure-shape4"/>
                    <polygon points="175,175 175,35 245,35 245,175" class="figure-shape3"/>
                    <polygon points="175,175 175,70 227.5,70 227.5,175" class="figure-shape2"/>
                    <polygon points="175,175 175,105 210,105 210,175" class="figure-shape1"/>
                    <polygon points="175,175 175,140 192.5,140 192.5,175" class="figure-shape"/>

                    <polygon points="175,175 350,175 175,350" class="figure-shape4"/>
                    <polygon points="175,175 315,175 175,315" class="figure-shape3"/>
                    <polygon points="175,175 280,175 175,280" class="figure-shape2"/>
                    <polygon points="175,175 245,175 175,245" class="figure-shape1"/>
                    <polygon points="175,175 210,175 175,210" class="figure-shape"/>

                    <line x1="171" y1="0" x2="179" y2="0" class="figure-axis-dash"/>
                    <line x1="171" y1="35" x2="179" y2="35" class="figure-axis-dash"/>
                    <line x1="171" y1="70" x2="179" y2="70" class="figure-axis-dash"/>
                    <line x1="171" y1="105" x2="179" y2="105" class="figure-axis-dash"/>
                    <line x1="171" y1="140" x2="179" y2="140" class="figure-axis-dash"/>
                    <line x1="171" y1="210" x2="179" y2="210" class="figure-axis-dash"/>
                    <line x1="171" y1="245" x2="179" y2="245" class="figure-axis-dash"/>
                    <line x1="171" y1="280" x2="179" y2="280" class="figure-axis-dash"/>
                    <line x1="171" y1="315" x2="179" y2="315" class="figure-axis-dash"/>
                    <line x1="171" y1="350" x2="179" y2="350" class="figure-axis-dash"/>

                    <polygon points="385,175 370,170 370,180" class="figure-axis-arrow"/>
                    <polygon points="175,-35 180,-20 170,-20" class="figure-axis-arrow"/>

                    <line x1="-35" y1="175" x2="385" y2="175" class="figure-axis"/>
                    <line x1="175" y1="385" x2="175" y2="-35" class="figure-axis"/>

                    <line y1="171" x1="0" y2="179" x2="0" class="figure-axis-dash"/>
                    <line y1="171" x1="35" y2="179" x2="35" class="figure-axis-dash"/>
                    <line y1="171" x1="70" y2="179" x2="70" class="figure-axis-dash"/>
                    <line y1="171" x1="105" y2="179" x2="105" class="figure-axis-dash"/>
                    <line y1="171" x1="140" y2="179" x2="140" class="figure-axis-dash"/>
                    <line y1="171" x1="210" y2="179" x2="210" class="figure-axis-dash"/>
                    <line y1="171" x1="245" y2="179" x2="245" class="figure-axis-dash"/>
                    <line y1="171" x1="280" y2="179" x2="280" class="figure-axis-dash"/>
                    <line y1="171" x1="315" y2="179" x2="315" class="figure-axis-dash"/>
                    <line y1="171" x1="350" y2="179" x2="350" class="figure-axis-dash"/>

                    <text x="182" y="-24" class="figure-axis-text" style="font-size: medium;">y</text>
                    <text x="370" y="167" class="figure-axis-text" style="font-size: medium;">x</text>

                    <text x="185" y="145" class="figure-axis-text">1</text>
                    <text x="185" y="110" class="figure-axis-text">2</text>
                    <text x="185" y="75" class="figure-axis-text">3</text>
                    <text x="185" y="40" class="figure-axis-text">4</text>
                    <text x="185" y="5" class="figure-axis-text">5</text>
                    <text x="185" y="215" class="figure-axis-text">-1</text>
                    <text x="185" y="250" class="figure-axis-text">-2</text>
                    <text x="185" y="285" class="figure-axis-text">-3</text>
                    <text x="185" y="320" class="figure-axis-text">-4</text>
                    <text x="185" y="355" class="figure-axis-text">-5</text>

                    <text x="205" y="167" class="figure-axis-text">1</text>
                    <text x="240" y="167" class="figure-axis-text">2</text>
                    <text x="275" y="167" class="figure-axis-text">3</text>
                    <text x="310" y="167" class="figure-axis-text">4</text>
                    <text x="345" y="167" class="figure-axis-text">5</text>
                    <text x="132" y="167" class="figure-axis-text">-1</text>
                    <text x="97" y="167" class="figure-axis-text">-2</text>
                    <text x="62" y="167" class="figure-axis-text">-3</text>
                    <text x="27" y="167" class="figure-axis-text">-4</text>
                    <text x="-7" y="167" class="figure-axis-text">-5</text>

                </svg>
            </div>
            <div id="input-div">
                <form id="checkForm">
                    <input type="text" id="xText">
                    <select id="ySelect" name="rComboBox">
                        <option>-4</option>
                        <option>-3</option>
                        <option>-2</option>
                        <option>-1</option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                    <input type="checkbox" >
                    <input type="checkbox" >
                    <input type="checkbox" >
                    <input type="checkbox" >
                    <input type="checkbox" >
                </form>
            </div>
        </div>
    </main>
    <jsp:include page="jsp/footer.jsp"/>
</body>
<script src="js/jQuery.js"></script>
<script src="js/index.js"></script>
</html>
