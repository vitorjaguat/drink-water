const smallCups = document.querySelectorAll('.cup-small');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

let selected_lang = 'en';

updateBigCup();

smallCups.forEach((cup, idx) => { 
    cup.addEventListener('click', () => {
        highlightCups(idx);
        playSound();
    })
})

function playSound() {
    const soundSource = "sounds/bubble.wav";
            let sound = new Audio(soundSource);
            sound.play();
}

function highlightCups(idx) {
    if(smallCups[idx].classList.contains('full') && ! smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--
    }

    smallCups.forEach((cup, i) => {
        if(i <= idx) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    })
    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;
    const liters = document.getElementById('liters');

    if(fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = 'visible';
        percentage.style.height = `${ fullCups / totalCups * 330}px`;
        percentage.innerText = `${fullCups / totalCups * 100}%`;
    }

    if(fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
        liters.innerText = `${2 - (250 * fullCups / 1000)}${liters.dataset[selected_lang]}`
    }

}


//Translation:
// const btnEn = document.getElementById('btn-en');
// const btnPt = document.getElementById('btn-pt');
// const btnZh = document.getElementById('btn-zh');
const btns = document.querySelectorAll('.btn');

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        selected_lang = e.target.dataset.lang;
        translateDataset(selected_lang);
        updateBigCup();
    })
})

function translateDataset(language) {
    if(selected_lang === 'en') {
        remained.innerHTML = '<span id="liters" data-zh="公升" data-pt="L" data-en="L"></span><small data-pt="Faltando" data-zh="还差">Remaining</small>'
    }
    if(selected_lang === 'zh') {
        remained.innerHTML = '<small>还差</small><span id="liters" data-zh="公升" data-pt="L" data-en="L"></span>'
    }
    if(selected_lang === 'pt') {
        remained.innerHTML = '<small>Faltando</small><span id="liters" data-zh="公升" data-pt="L" data-en="L"></span>'
    }

    const texts = document.querySelectorAll(`[data-${language}]`);
    texts.forEach(text => text.textContent = text.dataset[language]);
    updateBigCup();
}

//Translation buttons
const transBtns = document.querySelectorAll('.btn');

transBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        selected_lang = btn.dataset['lang'];
        updateBigCup();
    })
})