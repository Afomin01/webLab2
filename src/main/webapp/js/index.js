const fixedDigits = 7;
let graph = $('#graph');
let svg = document.getElementById('graph');
let circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle' );
circleElement.setAttribute('class', 'generated-circle')
circleElement.setAttribute('r', "4");
let pt = svg.createSVGPoint();

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

function sendRequest(body, replace = false) {
    $.ajax({
        type: 'POST',
        url: 'controllerServlet',
        data: body,

        success: function (data) {
            if (replace) {
                location.reload();
            } else {
/*              var newDoc = document.open("text/html", "replace");
                newDoc.write(data);
                newDoc.close();*/
                document.write(data);
            }
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
    $('#graph > .generated-form-circle').remove();

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

function setDot(){
    $('#graph > .generated-form-circle').remove();

    if(getSelectedR().length) {
        let x = parseFloat(getX());
        if (!isNaN(x) && x > -5 && x < 3) {
            x = 35 * parseFloat(getX()) + 175;
            let y = 35 * (-parseFloat(getY())) + 175;

            let circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circleElement.setAttribute('class', 'generated-form-circle')
            circleElement.setAttribute('r', "4");
            circleElement.setAttribute('cx', x);
            circleElement.setAttribute('cy', y);
            svg.append(circleElement);
        }
    }
}

function setCirclesColor(){
    $('.placed-circle').each(function (index){
        let x = parseFloat($(this).attr("cx"));
        let y = parseFloat($(this).attr("cy"));
        let r = Math.max.apply(null, getSelectedR())
        let isHit = false;

        x = (x - 175) / 35;
        y = (y - 175) / -35;

        if (x >= 0 && y >= 0) {
            isHit = x <= r / 2. && y <= r;
        } else if (x >= 0 && y <= 0) {
            isHit = y >= x - r;
        } else if (x <= 0 && y <= 0) {
            isHit = Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2., 2);
        } else {
            isHit = false;
        }

        if (isHit) this.setAttribute('style', 'fill: #3b993b;');
        else this.setAttribute('style', 'fill: #cf1a1a;');

    });
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

    setDot();
    setCirclesColor();

    $('#xText').on('change', function () {
        if (validate()) setDot();
        Cookies.set('itmo-web-lab2-x', getX());
    });
    $('#ySelect').on('change', function () {
        if (validate()) setDot();
        Cookies.set('itmo-web-lab2-y', getY());
    });

    $("input[name='rCheckbox']").on('change', function () {
        if (validate()) setDot();
        setCirclesColor();
        if (this.checked) {
            Cookies.set('itmo-web-lab2-r-' + $(this).val(), '1');
            $('.figure-shape' + $(this).val()).animate({'fill-opacity': '1'}, 600);
        } else {
            Cookies.set('itmo-web-lab2-r-' + $(this).val(), '0');
            $('.figure-shape' + $(this).val()).animate({'fill-opacity': '0'}, 600);
        }
    });

    $('#clear').on('click', function (event) {
        sendRequest({clear: 'true'}, true);
    })

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
                sendRequest({x: parseFloat(getX()), y: parseFloat(getY()), rSet: getSelectedR()});
            }
        }
    });

    graph.on('contextmenu', (event) => event.preventDefault());

    graph.on('mousemove',(event) => {
        pt.x = event.clientX;
        pt.y = event.clientY;
        pt = pt.matrixTransform(svg.getScreenCTM().inverse());

        circleElement.setAttribute('cx', Math.round(pt.x));
        circleElement.setAttribute('cy', Math.round(pt.y));
        svg.append(circleElement);
    });

    graph.on('mouseleave', () => {
        circleElement.setAttribute('cx', -40);
        circleElement.setAttribute('cy', -40);
    });

    graph.on('mousedown', (event) => {
        if (event.which === 1) {
            if (getSelectedR().length === 0) {
                $("#form-errors").text('You must select at least one R value to interact with graph');
            } else {
                let circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle' );
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

                sendRequest({x: x.toFixed(fixedDigits), y: y.toFixed(fixedDigits), rSet: getSelectedR()});
            }
        }
    });
})
