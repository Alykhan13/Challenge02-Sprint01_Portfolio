const sliderBtnsContainer = document.getElementById("slider__btns__container");
const sliderUl = document.getElementById("slider__ul");
const sliderBtns = document.querySelectorAll(".slider__btn");

const heroMediaBtns = document.getElementById("hero__media-links");
const footerMediaBtns = document.getElementById("footer__media-links");

const projectContainer = document.getElementById("main__projects");

const inputs = document.querySelectorAll(".contact__input");
const contactBtn = document.getElementById("contact__btn");


const imgs = 4;
let position = 0;
let sliderCounter = imgs;

let validEmail = false;
let validForm = false;


function restartActiveSliderImg() {
    for(let i=0;i<sliderBtns.length;i++) {
        sliderBtns[i].classList.remove("slider--active");
    }
}

function clickingSliderBtn() {
    for(let i=0;i<sliderBtns.length;i++){
        sliderBtns[i].onclick = function() {
            let sliderActive = document.querySelector(".slider--active");

            if(sliderBtns[i] === sliderActive) {
            } else {
                restartActiveSliderImg();
                sliderBtns[i].classList.add("slider--active");
                sliderUl.style.marginLeft = (-100 * i) + '%';
                position = i;
                sliderCounter = i;
            }
        };
    }
}

function changeImgSlider() {
    sliderBtns[position].classList.add("slider--active");

    setInterval(function(){
        restartActiveSliderImg();
        sliderBtns[position].classList.add("slider--active");
        sliderUl.style.marginLeft = (-100 * position) + '%';
        // console.log('img: ' + position + ' value: ' + (-100 * position) + '%');
        sliderCounter++;
        position = sliderCounter%imgs;
    },5000);
}

function hearingProjectsBtns() {
    const demoBtns = document.querySelectorAll(".project__btn__demo");
    const repoBtns = document.querySelectorAll(".project__btn__repo");

    const destinyURLs_demo = [
        "https://alykhan13.github.io/Challenge1-Sprint01_Codificador/",
        "https://alykhan13.github.io/Challenge1-Sprint02_Ahorcado/"
    ];

    const destinyURLs_repo = [
        "https://github.com/Alykhan13/Challenge1-Sprint01_Codificador",
        "https://github.com/Alykhan13/Challenge1-Sprint02_Ahorcado"
    ];

    for(let i=0;i<demoBtns.length;i++) {
        demoBtns[i].onclick = function() {
            open(destinyURLs_demo[i], "_blank");
        };
    }

    for(let i=0;i<repoBtns.length;i++) {
        repoBtns[i].onclick = function() {
            open(destinyURLs_repo[i], "_blank");
        };
    }
}

function hearingMediaBtns() {
    const mediaLinksItems = document.querySelectorAll(".media-links__item");

    const mediaURLs= [
        "https://github.com/Alykhan13",
        "https://www.linkedin.com/in/aglez-kp/",
        "https://www.instagram.com/aglezkp/"
    ];

    for(let i=0; i<mediaLinksItems.length; i++) {
        mediaLinksItems[i].onclick = function() {
            open(mediaURLs[i%3],"_blank");
        };
    }
}

function activateInput(e) {
    const input = e.target;
    input.parentElement.querySelector(".lbl").classList.add("contact__label--active");
}

function validateEmail(e) {
    const input = e.target;
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    validEmail = false;

    if(emailFormat.test(input.value)) {
        validEmail = true;
    } else {
        validEmail = false;
    }
}

function sendForm(e) {
    const form = document.getElementById("form");
    e.preventDefault();

    for(let i=0;i<inputs.length;i++) {
        console.log(inputs[i]);
        validateInput(inputs[i]);
    }

    if(validForm) {
        form.submit();
    }
    else {
        alert("Formato no valido");
    }
    
}

function checkFormErrors(form, inputType, input) {
    let errorMsgs = [];
    form.querySelector(".error__message").classList.remove("error--active");
    form.querySelector(".error__message").innerHTML = "";
    validForm = false;

    if(input.value.length==0) {
        errorMsgs.push(`El campo ${inputType} no debe estar vacío`);
        form.querySelector(".error__message").classList.add("error--active");
    }
    if(inputType=="Nombre" || inputType=="Asunto") {
        if(input.value.length>50) {
            errorMsgs.push(`El ${inputType} no debe exceder de 50 caracteres`);
            form.querySelector(".error__message").classList.add("error--active");
        }
    }
    if(inputType=="Email") {
        if(!validEmail && input.value.length>0) {
            errorMsgs.push(`El ${inputType} no presenta un formato válido`);
            form.querySelector(".error__message").classList.add("error--active");
        }
    }
    if(inputType=="Mensaje") {
        if(input.value.length>300) {
            errorMsgs.push(`El ${inputType} no debe exceder de 300 caracteres`);
            form.querySelector(".error__message").classList.add("error--active");
        }
    }
    
    if(errorMsgs.length>0)
        form.querySelector(".error__message").innerHTML = errorMsgs[0];

    console.log(errorMsgs);
}

function validateInput(e) {
    const input = e.target;
    const inputType = input.dataset.type;
    console.log(input);
    const form = document.getElementById("form");

    if(input.value.length==0) {
        input.parentElement.querySelector(".lbl").classList.remove("contact__label--active");
    }

    if(inputType == "email") {
        if(!validEmail) {
            input.classList.add("contact__input--invalid");
            input.parentElement.querySelector(".lbl").classList.add("contact__label--invalid");
            showError(input, inputType);
        } else {
            input.classList.remove("contact__input--invalid");
            input.parentElement.querySelector(".lbl").classList.remove("contact__label--invalid");
        }
    } else {
        if(!input.validity.valid) {
            input.classList.add("contact__input--invalid");
            input.parentElement.querySelector(".lbl").classList.add("contact__label--invalid");
        } else {
            input.classList.remove("contact__input--invalid");
            input.parentElement.querySelector(".lbl").classList.remove("contact__label--invalid");
        }
    }

    checkFormErrors(form, inputType, input);

}

addEventListener("load", changeImgSlider);
addEventListener("load", clickingSliderBtn);
addEventListener("load", hearingMediaBtns);
addEventListener("load", hearingProjectsBtns);

heroMediaBtns.addEventListener("click", hearingMediaBtns);
footerMediaBtns.addEventListener("click", hearingMediaBtns);
sliderBtnsContainer.addEventListener("click", clickingSliderBtn);
projectContainer.addEventListener("click", hearingProjectsBtns);
contactBtn.addEventListener("click", sendForm);

for(let i=0; i<inputs.length; i++) {
    inputs[i].addEventListener("focus", activateInput);
    inputs[i].addEventListener("blur", validateInput);
}