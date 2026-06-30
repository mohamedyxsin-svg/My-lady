
const lines = [
    "To my favorite person in the whole world,",
    "To the one I love the most",
    "Nte Jeevante Jeevank",
    "Wait till the countdown finishes"
];

const lineElements = [
    document.getElementById("line1"),
    document.getElementById("line2"),
    document.getElementById("line3"),
    document.getElementById("line4")
];

let delay = 0;

lines.forEach((text, index)=>{

    text.split("").forEach(char=>{

        const span = document.createElement("span");

        if(char===" "){
            span.className="space";
            span.innerHTML="&nbsp;";
        }
        else{
            span.className="letter";
            span.textContent=char;
            span.style.animationDelay=`${delay}s`;
            delay+=0.04;
        }

        lineElements[index].appendChild(span);

    });

    delay+=0.25;

});

const targetDate = new Date(Date.now() + 10000).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if(distance <= 0){

         clearInterval(timer);

   animateDigit("days", "00");
animateDigit("hours", "00");
animateDigit("minutes", "00");
animateDigit("seconds", "00");

    document.getElementById("surpriseBtn").classList.add("show");

    return;

    }

    const days = Math.floor(distance / (1000*60*60*24));

    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds = Math.floor((distance%(1000*60))/1000);

    animateDigit("days", String(days).padStart(2,"0"));
animateDigit("hours", String(hours).padStart(2,"0"));
animateDigit("minutes", String(minutes).padStart(2,"0"));
animateDigit("seconds", String(seconds).padStart(2,"0"));

}

updateCountdown();

const timer = setInterval(updateCountdown,1000);

const music = document.getElementById("bgMusic");

const surpriseBtn = document.getElementById("surpriseBtn");

const heartButton = document.getElementById("heartButton");

surpriseBtn.addEventListener("click", () => {
    console.log("Button clicked!");

    surpriseBtn.disabled = true;

    music.play();

    const countdownPage = document.getElementById("countdown-page");
    const birthdayPage = document.getElementById("birthday-page");

    countdownPage.style.opacity = "0";

    setTimeout(() => {

        countdownPage.style.display = "none";

 birthdayPage.classList.remove("hidden");

birthdayPage.classList.add("show-page");

requestAnimationFrame(() => {

    birthdayPage.style.opacity = "1";

});

    },1000);

});



function animateDigit(id, value) {

    const digit = document.getElementById(id);

    if (digit.innerText !== value) {

        digit.classList.remove("animate");

        void digit.offsetWidth;

        digit.innerText = value;

        digit.classList.add("animate");

    }

}

heartButton.addEventListener("click", () => {

    const birthdayPage = document.getElementById("birthday-page");

    const letterPage = document.getElementById("letter-page");

    birthdayPage.style.opacity="0";

    setTimeout(()=>{

        birthdayPage.style.display="none";

        letterPage.classList.remove("hidden");
        document.querySelector(".letter-container").scrollTop = 0;

       setTimeout(() => {

    letterPage.style.opacity = "1";

    setTimeout(() => {

        document.getElementById("letterTitle").style.animation =
            "titleAppear 1.5s ease forwards";

    },1000);

    setTimeout(() => {

        document.getElementById("letterContent").style.animation =
            "letterAppear 2s ease forwards";

    },2200);

},50);

    },1000);

});

const letterContainer = document.querySelector(".letter-container");

const nextSectionBtn = document.getElementById("nextSectionBtn");

letterContainer.addEventListener("scroll", () => {

    const scrollPosition =
        letterContainer.scrollTop +
        letterContainer.clientHeight;

    const bottom =
        letterContainer.scrollHeight - 20;

    if(scrollPosition >= bottom){

        nextSectionBtn.classList.add("show");

    }

    else{

        nextSectionBtn.classList.remove("show");

    }

});

const questionPage = document.getElementById("kiss-question-page");

nextSectionBtn.addEventListener("click", () => {

    const letterPage = document.getElementById("letter-page");

    // Fade out the letter page
    letterPage.style.opacity = "0";

    setTimeout(() => {

        // Hide the letter page
        letterPage.classList.add("hidden");

        // Show the question page
        questionPage.classList.remove("hidden");

        // Small delay so the browser registers the display change
        setTimeout(() => {

            questionPage.style.opacity = "1";

        }, 50);

        // Show the question
        setTimeout(() => {

            document.getElementById("kissQuestion").style.animation =
                "questionAppear 1.4s ease forwards";

        }, 700);

        // Show the button
        setTimeout(() => {

            document.getElementById("yesBtn").style.animation =
                "yesAppear 1s ease forwards";

        }, 1700);

    },1000);

});

/* --------------------- */
/* PAGE 5 */
/* --------------------- */

const kissPage = document.getElementById("kiss-page");

const kissImage = document.getElementById("kissImage");

const loveText = document.getElementById("loveText");

const yesBtn = document.getElementById("yesBtn");

const kissQuestionPage = document.getElementById("kiss-question-page");

const kissAudios = [

    document.getElementById("kiss1Audio"),

    document.getElementById("kiss2Audio"),

    document.getElementById("kiss3Audio"),

    document.getElementById("kiss4Audio"),

    document.getElementById("kiss5Audio")

];

kissAudios.forEach(audio => {

    audio.preload = "auto";

    audio.load();

});
console.log(kissAudios);

const loveVoice = document.getElementById("loveVoice");

const kissImages = [

    "images/kiss1.jpg",

    "images/kiss2.jpg",

    "images/kiss3.jpg",

    "images/kiss4.jpg",

    "images/kiss5.jpg"

];

yesBtn.addEventListener("click", () => {
    fadeOutMusic(music);

    kissQuestionPage.style.opacity = "0";

    setTimeout(() => {

        kissQuestionPage.classList.add("hidden");

        kissPage.classList.remove("hidden");

        requestAnimationFrame(() => {

            kissPage.style.opacity = "1";
            setTimeout(() => {

    showKiss(0);

},1500);

        });

    },1000);

});

function showKiss(index) {

    kissImage.src = kissImages[index];

    // Restart the animation
    kissImage.style.animation = "none";
    void kissImage.offsetWidth;

    kissImage.style.animation = "kissAppear 1s ease forwards";

    const audio = kissAudios[index];

audio.currentTime = 0;

audio.play()
    .then(() => {

        console.log("✅ Audio started successfully:", index);

    })
    .catch((error) => {

        console.error("❌ Audio could not play:", error);

    });

    // Start fading BEFORE the audio finishes
    const fadeStart = Math.max(0, (audio.duration - 1.2) * 1000);

    setTimeout(() => {

       kissImage.style.animation =
    "kissDisappear 1.2s ease forwards";

    }, fadeStart);

    audio.onended = () => {

        if(index < kissImages.length - 1){

            showKiss(index + 1);

        }else{

            showLoveEnding();

        }



}

function showLoveEnding(){

    loveText.style.animation =
        "loveReveal 1.5s ease forwards";

    loveVoice.currentTime = 0;
    loveVoice.play();

}

}
function fadeOutMusic(audio){

    const originalVolume = audio.volume;

    const targetVolume = originalVolume * 0.30; // Reduce by 15%

    let volume = originalVolume;

    const fade = setInterval(() => {

        if(volume > targetVolume){

            volume -= 0.02;

            if(volume < targetVolume){
                volume = targetVolume;
            }

            audio.volume = volume;

        }else{

            clearInterval(fade);

        }

    },100);

}
