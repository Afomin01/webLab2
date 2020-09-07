
$('#graph').mouseleave( ()=>{

})

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
    let svg = document.getElementById('graph');
    let pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());
    let x = (pt.x - 175)/35;
    let y = (pt.y - 175)/-35;
    let circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle' );

    circleElement.setAttribute("class", "generated-circle");

    circleElement.setAttribute("r", "4");
    circleElement.setAttribute("cx", Math.round(pt.x));
    circleElement.setAttribute("cy", Math.round(pt.y));
    svg.append(circleElement);



})