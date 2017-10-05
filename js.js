var solution= new Solution ({
    elem: document.getElementById("solution")
});

function Solution (element) {
    var elem=element.elem;
    var firstTerm=elem.querySelector(".firstTerm");
    var secondTerm=elem.querySelector(".secondTerm");
    var canvasImg=elem.querySelector(".canvasImg").getContext('2d');
    var divinput1=elem.querySelector(".inputFirst");
    var divinput2=elem.querySelector(".inputSecond");
    var divinput3=elem.querySelector(".inputThird");
    var y=157, controlX,controlY,endX;

    /* Задание первоначальных значений */
    var a=getRand(6,9);
    var total=getRand(11,14);
    var b=total-a;
    function getRand(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    }
    firstTerm.innerHTML=a;
    secondTerm.innerHTML=b;

    /*Построение дуги*/
    function draw(startX,s,relocatableElem){
            canvasImg.beginPath();
            canvasImg.moveTo(startX, y);
            endX=s*38.8+37;
            controlX=(endX-startX)/2+startX;
            controlY=endX*0.2;
            canvasImg.quadraticCurveTo(controlX, controlY, endX, y);
            canvasImg.lineWidth=3;
            canvasImg.strokeStyle="#800080";
            canvasImg.stroke();
            canvasImg.closePath();
            relocatableElem.nextElementSibling.style.top=y-15+"px";
            relocatableElem.nextElementSibling.style.left=endX-15+"px";
            relocatableElem.nextElementSibling.style.borderColor="#800080";
            positionElement(relocatableElem ,controlX,controlY);
    }

    /*Позиционирование элемента ввода значения по центру дуги*/
    function positionElement (relocatableElem,controlX,controlY){
        relocatableElem.style.top=Math.ceil(controlY)-14+"px";
        relocatableElem.style.left=Math.ceil(controlX)-3+"px";
    }

    /*Построение первой дуги*/
    draw(37,Number(firstTerm.innerHTML),divinput1);

    /*Обработка вводимых значений*/
    elem.oninput=function(event){
        if(event.target.closest(".inputFirst")){
            if(collation(event,firstTerm)){
                divinput2.classList.toggle("nextStep");
                divinput2.firstElementChild.focus();
                draw(endX,total,divinput2);
            }
        }
        else if(event.target.closest(".inputSecond")){
            if(collation(event,secondTerm)){
                divinput3.classList.toggle("nextStep");
                elem.querySelector(".total").classList.add("nextStep");
                divinput3.firstElementChild.focus();
            }
        }
        if(event.target.closest(".inputThird")){
            if(event.target.value==total){
                event.target.classList.remove("bad");
                event.target.classList.add("nextStep");
                event.target.parentElement.innerHTML=event.target.value;
            } else {
                event.target.classList.add("bad");
            }
        }

        /*Проверка введенных значений*/
        function collation (event,term){
            if(event.target.value==term.innerHTML){
                if (event.target.classList.contains("bad")){
                    event.target.classList.remove("bad");
                    term.classList.remove("yellowColor");
                }
                event.target.classList.add("nextStep");
                event.target.parentElement.innerHTML=event.target.value;
                return true;
            } else {
                event.target.classList.add("bad");
                term.classList.add("yellowColor");
                return false;
            }
        }
    }
}