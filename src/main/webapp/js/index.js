$(function() {
    $('.rCheck').on('change', function () {
        if (this.checked) {
            $(".figure-shape" + $(this).val()).animate({'fill-opacity': '1'});
        } else {
            $(".figure-shape" + $(this).val()).animate({'fill-opacity': '0'});
        }
    });

    $('#graph').on('click', function (evt) {
        var svg =  document.getElementById("graph");
        var pt = svg.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;

        // The cursor point, translated into svg coordinates
        var cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
        var x = cursorpt.x;
        var y = cursorpt.y;
        x += 35;
        y += 35;
        x -= 210;
        y -= 210;
        x /= 35;
        y /= 35;
        y *= -1
        console.log("(" + x + ", " + y + ")");
    })
});