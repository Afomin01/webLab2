function getX(){
    let xValue = $('#xText').val().replace(/\s/g,'').replace(',','.');

    if(xValue==="") xValue="null";
    return xValue;
}
function getY() {
    return $('#ySelect').val();
}
function getSelectedR() {
    let rValues = new Array();
    $("input[name='rCheckbox']:checked+label").each(function () {
        rValues.push($(this).text().replace(/\s/g,''));
    })

    return rValues;
}

function validate(suppressErr=false){
    $('#form-errors').text('');
    if(isNaN(getX())) {
        if(!suppressErr) $("#form-errors").text("X must be a number in range (-5;3)");
        return false;
    }
    if (parseFloat(getX()) >= 3 || parseFloat(getX()) <= -5 ) {
        if(!suppressErr) $("#form-errors").text("X must be number in range (-5;3)");
        return false;
    }
    if(getSelectedR().length===0){
        if(!suppressErr) $("#form-errors").text("You must select at least one R");
        return false;
    }
    return true;
}

function setDots(){

}

$(function () {

    $('#xText').bind('change', function () {
        if(validate()) setDots();
    })
    $("#ySelect").bind('change', function () {
        if(validate()) setDots();
    })
    $("input[name='rCheckbox']").change(function () {
        if(validate()) setDots();
    })

    $('#send').bind('click',function (event) {
        event.preventDefault();
        let isValid = validate();
        let parseConfirmed = true;
        if(isValid===true){
            if((String(parseFloat(getX())) !== getX()) && (parseFloat(getX()).toExponential() !== getX()) && (parseFloat(getX()).toExponential().replace('+','') !== getX()) && !parseFloat(getX()).toExponential().includes('e-') ) {
                let parseErrorConfirm = confirm("Your X value precision is too high, so it is recommended to reduce the precision. X value will be rounded to " + parseFloat(getX()) +".\n Would you like to send request with this rounded value?");
                if(!parseErrorConfirm) parseConfirmed=false;
            }

            if(parseConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "controllerServlet",
                    data: {x: parseFloat(getX()), rSet: getSelectedR(), y: getY()},

                    success: function (data) {
                        var newDoc = document.open("text/html", "replace");
                        newDoc.write(data);
                        newDoc.close()
                    },
                    error: function (xhr, status, error) {
                        alert("Server error: " + xhr.responseText);
                    },

                    timeout: function () {
                        alert("Timeout reached");
                    }
                });
            }
        }
    });

    $('#graph').mousemove((event)=>{
        $('#graph > .generated-circle').remove();
        let svg = document.getElementById('graph');
        let circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle' );
        let pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        pt = pt.matrixTransform(svg.getScreenCTM().inverse());
        circleElement.setAttribute("class", "generated-circle")

        circleElement.setAttribute("r", "4");
        circleElement.setAttribute("cx", Math.round(pt.x));
        circleElement.setAttribute("cy", Math.round(pt.y));
        svg.append(circleElement);
    })

    $('#graph').mouseleave(()=>{
        $('#graph > .generated-circle').remove();
    })

    $('#graph').on("click", (event)=>{
        if(getSelectedR().length===0){
            $("#form-errors").text("You must select at least one R value to interact with graph");
        }else {
            let circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle' );
            let svg = document.getElementById('graph');
            let pt = svg.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            pt = pt.matrixTransform(svg.getScreenCTM().inverse());
            let x = (pt.x - 175) / 35;
            let y = (pt.y - 175) / -35;

            circleElement.setAttribute("class", "placed-circle")

            circleElement.setAttribute("r", "4");
            circleElement.setAttribute("cx", Math.round(pt.x));
            circleElement.setAttribute("cy", Math.round(pt.y));
            svg.append(circleElement);

            $.ajax({
                type: "POST",
                url: "controllerServlet",
                data: {x: x, rSet: getSelectedR(), y: y},

                success: function (data) {
                    var newDoc = document.open("text/html", "replace");
                    newDoc.write(data);
                    newDoc.close();
                },
                error: function (xhr, status, error) {
                    alert("Server error: " + xhr.responseText);
                },

                timeout: function () {
                    alert("Timeout reached");
                }
            });
        }
    })

    $('#1').on('click', ()=>{
        if(!$('#1').is(':checked')){
            $('.figure-shape1').animate({"fill-opacity": "0"}, 600);
        } else {
            $('.figure-shape1').animate({"fill-opacity": "1"}, 600);
        }
    })
    $('#2').on('click', ()=>{
        if(!$('#2').is(':checked')){
            $('.figure-shape2').animate({"fill-opacity": "0"}, 600);
        } else {
            $('.figure-shape2').animate({"fill-opacity": "1"}, 600);
        }
    })
    $('#3').on('click', ()=>{
        if(!$('#3').is(':checked')){
            $('.figure-shape3').animate({"fill-opacity": "0"}, 600);
        } else {
            $('.figure-shape3').animate({"fill-opacity": "1"}, 600);
        }
    })
    $('#4').on('click', ()=>{
        if(!$('#4').is(':checked')){
            $('.figure-shape4').animate({"fill-opacity": "0"}, 600);
        } else {
            $('.figure-shape4').animate({"fill-opacity": "1"}, 600);
        }
    })
    $('#5').on('click', ()=>{
        if(!$('#5').is(':checked')){
            $('.figure-shape5').animate({"fill-opacity": "0"}, 600);
        } else {
            $('.figure-shape5').animate({"fill-opacity": "1"}, 600);
        }
    })
})
