fixedDigits = 7;
function getX() {
    let xValue = $('#xText').val().replace(/\s/g,'').replace(',','.');

    if (xValue === '') xValue = 'null';
    return xValue;
}

function getY() {
    return $('#ySelect').val();
}

function getSelectedR() {
    let rValues = [];
    $("input[name='rCheckbox']:checked+label").each(function () {
        rValues.push($(this).text().replace(/\s/g,''));
    });

    return rValues;
}

function sendRequest(x, y, rSet) {
    $.ajax({
        type: 'POST',
        url: 'controllerServlet',
        data: {x: x.toFixed(fixedDigits), rSet: rSet, y: y.toFixed(fixedDigits)},

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

function validate(suppressErr= false) {
    $('#form-errors').text('');
    if (isNaN(getX())) {
        if (!suppressErr) $('#form-errors').text('X must be a number in range (-5;3)');
        return false;
    }
    if (parseFloat(getX()) >= 3 || parseFloat(getX()) <= -5 ) {
        if (!suppressErr) $('#form-errors').text('X must be number in range (-5;3)');
        return false;
    }
    if (getSelectedR().length===0) {
        if (!suppressErr) $('#form-errors').text('You must select at least one R');
        return false;
    }
    return true;
}

function setDots(){

}

$(function () {
    let x =  parseFloat(Cookies.get('itmo-web-lab2-x'));
    if (!isNaN(x) && x > -5 && x < 3) $('#xText').val(x);

    let y = parseInt(Cookies.get('itmo-web-lab2-y'));
    if (!isNaN(y) && y >= -4 && y <= 4) $('#ySelect').val(y);

    for (let r = 1; r < 6; r++) {
        let status = Cookies.get('itmo-web-lab2-r-' + r);
        if (status !== undefined && status === '1') {
            $('#' + r).attr('checked', status === '1');
            $('.figure-shape' + r).animate({'fill-opacity': '1'}, 600);
        }
    }

    $('#xText').on('change', function () {
        if (validate()) setDots();
        Cookies.set('itmo-web-lab2-x', getX());
    });
    $('#ySelect').on('change', function () {
        if (validate()) setDots();
        Cookies.set('itmo-web-lab2-y', getY());
    });

    $("input[name='rCheckbox']").on('change', function () {
        if (validate(true)) setDots();
        if (this.checked) {
            Cookies.set('itmo-web-lab2-r-' + $(this).val(), '1');
            $('.figure-shape' + $(this).val()).animate({'fill-opacity': '1'}, 600);
        } else {
            Cookies.set('itmo-web-lab2-r-' + $(this).val(), '0');
            $('.figure-shape' + $(this).val()).animate({'fill-opacity': '0'}, 600);
        }
    });

    $('#send').on('click',function (event) {
        event.preventDefault();
        let isValid = validate();
        let parseConfirmed = true;
        if (isValid === true) {
            if((String(parseFloat(getX())) !== getX()) && (parseFloat(getX()).toExponential() !== getX())
                && (parseFloat(getX()).toExponential().replace('+','') !== getX())
                && !parseFloat(getX()).toExponential().includes('e-') ) {
                let parseErrorConfirm = confirm('Your X value precision is too high, so it is recommended to reduce the precision.' +
                    ' X value will be rounded to ' + parseFloat(getX()) + '.\nWould you like to send request with this rounded value?');
                if (!parseErrorConfirm) parseConfirmed = false;
            }

            if (parseConfirmed) {
                sendRequest(parseFloat(getX()), parseFloat(getY()), getSelectedR());
            }
        }
    });

    let graph = $('#graph');

    graph.on('mousemove',(event) => {
        $('#graph > .generated-circle').remove();
        let svg = document.getElementById('graph');
        let circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle' );
        let pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        pt = pt.matrixTransform(svg.getScreenCTM().inverse());
        circleElement.setAttribute('class', 'generated-circle')

        circleElement.setAttribute('r', "4");
        circleElement.setAttribute('cx', Math.round(pt.x));
        circleElement.setAttribute('cy', Math.round(pt.y));
        svg.append(circleElement);
    });

    graph.on('mouseleave', () => {
        $('#graph > .generated-circle').remove();
    });

    graph.on('click', (event) => {
        if (getSelectedR().length === 0) {
            $("#form-errors").text('You must select at least one R value to interact with graph');
        } else {
            let circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle' );
            let svg = document.getElementById('graph');
            let pt = svg.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            pt = pt.matrixTransform(svg.getScreenCTM().inverse());
            let x = (pt.x - 175) / 35;
            let y = (pt.y - 175) / -35;

            circleElement.setAttribute('class', 'placed-circle')

            circleElement.setAttribute('r', '4');
            circleElement.setAttribute('cx', Math.round(pt.x));
            circleElement.setAttribute('cy', Math.round(pt.y));
            svg.append(circleElement);

            sendRequest(x, y, getSelectedR());
        }
    });
})
