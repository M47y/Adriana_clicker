const mainImage = document.getElementById("mainImg");
const counter = document.getElementById("counter");
const costTextList = document.getElementsByClassName("costText");
const upgradesTextList = document.getElementsByClassName("boughtUpgradesText");
const valueList = document.getElementsByClassName("plusValue");
const progressBar = document.getElementById("progress");
const slunce = document.getElementById("slunicko");
const blueSun = document.getElementById("blueSun");
const tableRowEl = document.getElementsByClassName("color");
const clickPowerEl = document.getElementById("clickPower");
const endingEls = document.getElementsByClassName("konec");

let money = 0;
let multiplier = 1
let progressMultiplier = 1
let moneyPerSecond = 0;

//EVENT LISTENERS
mainImage.addEventListener("click", function click(){
    money += multiplier*progressMultiplier;
    updateColors();
    updateEndingColors();
    const adrianaPlus = document.createElement("img");
    const moneyPlus = document.createElement("p");
    let direction = Math.floor(Math.random()*2);
    let rotation = Math.floor(Math.random()*180+1);
    let topStyle = Math.floor(Math.random()*10 +(rotation >= 90 ? direction === 1 ? 45 : 35 : direction === 1 ? 45 : 35));
    let leftStyle = Math.floor(Math.random()*10 +45);
    counter.textContent = Math.round(money);
    moneyPlus.textContent = "+" +multiplier*progressMultiplier;
    if (progressBar.value >= 85){
        moneyPlus.style.color = "#58c698";
    } else {
        moneyPlus.style.color = "lightslategray";
    }
    progressBar.value += 3;
    assignFlyingPasta(adrianaPlus, direction, topStyle, leftStyle, rotation);
    document.body.insertBefore(adrianaPlus, mainImage);
    document.body.appendChild(moneyPlus);
    animateMoney(moneyPlus, event.clientX, event.clientY);
    animateAdriana(adrianaPlus, rotation, topStyle, leftStyle, direction);
});

mainImage.addEventListener("mouseover", ()=>{
    if (document.getElementById("table").style.display !== "none"){
        mainImage.style.width = "10.5%";
    }
});

mainImage.addEventListener("mouseout", ()=>{
    if (document.getElementById("table").style.display !== "none"){
        mainImage.style.width = "10%";
    }
});

for(let i = 0; i < tableRowEl.length; i++) {
    tableRowEl[i].addEventListener("click", function() {
        if (money >= Number(costTextList[i].textContent) && !((Number(upgradesTextList[i].textContent) === 999) || upgradesTextList[i].textContent === "max")){
            money -= Number(costTextList[i].textContent);
            if (i % 2 === 0){
                multiplier += Number(valueList[i].textContent);
                clickPowerEl.textContent = multiplier*progressMultiplier;
            } else {
                moneyPerSecond += Number(valueList[i].textContent);
                document.getElementById("adrianaPerSecond").textContent = moneyPerSecond + (moneyPerSecond === 1 ? " Adriana za vteřinu" : moneyPerSecond === 2 || moneyPerSecond === 3 || moneyPerSecond === 4 ? " Adriany za vteřinu" : " Adrian za vteřinu");
            }
            counter.textContent = Math.round(money);
            updateColors();
            updateEndingColors();
            upgradesTextList[i].textContent = Number(upgradesTextList[i].textContent) +1;
        } else if (Number(upgradesTextList[i].textContent) === 999){
            upgradesTextList[i].textContent = "max";
            upgradesTextList[i].style.color = "#f4ee9f";
            upgradesTextList[i].style.fontSize = "20px";
        }
    })
}

for(let i = 0; i < endingEls.length; i++) {
    endingEls[i].addEventListener("click", function() {
        if (money >= 1500000000){
            document.getElementById("table").style.display = "none";
            document.getElementsByClassName("clickPowerContainer")[0].style.display = "none";
            document.getElementsByClassName("moneyContainer")[0].style.display = "none";
            document.getElementById("doubleClickValue").style.display = "none";
            document.getElementById("doubleClickLine").style.display = "none";
            progressBar.style.display = "none";
            mainImage.style.animationPlayState = 'paused';
            mainImage.style.top = "50%";
            slunce.style.display = "none";
            blueSun.style.display = "none";
            if (i === 0){
                goodEnding();
            } else {
                badEnding();
            }
        }
    });
}

//NASTAVENÍ SMĚRU LÉTAJÍCÍ ADRIANY
function assignFlyingPasta(adrianaPlus, direction, topStyle, leftStyle, rotation){
    adrianaPlus.src = "/img/funghetto.png";
    adrianaPlus.style.position = "absolute";
    adrianaPlus.style.width = Math.floor(Math.random()*3+1) +"%";
    adrianaPlus.style.transform = "rotate(" +(direction === 1 ? '' : '-')  +rotation +"deg)";
    adrianaPlus.style.top = topStyle + "%";
    adrianaPlus.style.left = leftStyle + "%";
}

//UPDATE BARVY ŘÁDKŮ TABULKY
function updateColors(){
    const cursorImageEl = document.getElementsByClassName("cursorImage");
    const smallAdrianaEl = document.getElementsByClassName("smallAdriana");
    for (let i = 0; i < cursorImageEl.length; i++) {
        if (money >= Number(costTextList[i].textContent)){
            cursorImageEl[i].style.filter = "grayscale(0)";
            smallAdrianaEl[i].style.filter = "grayscale(0)";
            tableRowEl[i].style.backgroundColor = "#6ad0ff";
        } else {
            cursorImageEl[i].style.filter = "grayscale(100%)";
            smallAdrianaEl[i].style.filter = "grayscale(100%)";
            tableRowEl[i].style.backgroundColor = "#92ddff";
        }
    }
}

function updateEndingColors(){
    for (let i = 0; i < 2; i++) {
        if (money >= 1500000000){
            endingEls[i].style.filter = (i === 0 ? "hue-rotate(100deg) " : "hue-rotate(290deg)") +"grayscale(0)";
            document.getElementsByClassName("konce")[0].style.backgroundColor = "#6ad0ff";
        } else {
            endingEls[i].style.filter = (i === 0 ? "hue-rotate(100deg) " : "hue-rotate(290deg)") +"grayscale(100%)";
            document.getElementsByClassName("konce")[0].style.backgroundColor = "#92ddff";
        }
    }
}

//KONCE
function goodEnding(){
    const kubikel = document.createElement("img");
    const rpgEl = document.createElement("img");
    kubikel.src = "/img/goodEnding/kubik.png";
    rpgEl.src = "/img/goodEnding/pifpaf.png";
    kubikel.className = "kubik";
    rpgEl.className = "pifpaf";
    document.body.appendChild(kubikel);
    document.body.appendChild(rpgEl);
    animateRpgHead(rpgEl, kubikel);
}
async function badEnding(){
    const polakEl = document.createElement("img");
    const brana = document.createElement("img");
    polakEl.src = "/img/badEnding/polak.png";
    brana.src = "/img/badEnding/weddingArch.png";
    polakEl.className = "polak";
    brana.className = "brana";
    mainImage.style.top = "61%";
    mainImage.style.left = "57%";
    document.body.appendChild(polakEl);
    document.body.insertBefore(brana, mainImage);
    await new Promise(resolve => setTimeout(resolve, 1000));
    animateWedding(polakEl);
}

//ANIMACE
function animateMoney(moneyPlus, x, y){
    moneyPlus.id = "moneyPlus";
    y -= 50;
    const startY = y;
    moneyPlus.style.top = y + "px";
    moneyPlus.style.left = (x+Math.floor(Math.random() * 21) - 10) + "px";
    let opacity = 1;
    let frameId;
    const speed = 5;
    function frame() {
        if (opacity <= 0) {
            moneyPlus.remove();
            cancelAnimationFrame(frameId);
            return;
        }
        opacity -= 0.02;
        if (startY - y >= 100){
            y -= speed/2;
        } else {
            y-= speed;
        }
        moneyPlus.style.top = y +"px";
        moneyPlus.style.opacity = opacity;
        frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);
}

function animateAdriana(adrianaPlus, rotation, y, x, direction) {
    let opacity = 1;
    let frameId;
    const speed = 0.8;
    const radians = rotation * (Math.PI / 180);
    const dx = Math.cos(radians) * speed;
    const dy = Math.sin(radians) * speed;
    function frame() {
        if (x < -20 || x > 120 || y < -20 || y > 120 || opacity <= 0) {
            adrianaPlus.remove();
            cancelAnimationFrame(frameId);
            return;
        }
        x += (direction === 1 ? dx : -dx);
        y += (direction === 1 ? dy : -dy);
        opacity -= 0.03;
        adrianaPlus.style.left = x + '%';
        adrianaPlus.style.top = y + '%';
        adrianaPlus.style.opacity = opacity;
        frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);
}

async function animateRpgHead(rpgEl, kubikel){
    const rpgHead = document.createElement("img");
    await new Promise(resolve => setTimeout(resolve, 500));
    rpgHead.src = "/img/goodEnding/pifpafHead.png";
    rpgHead.className = "rpgHead";
    document.body.appendChild(rpgHead);
    rpgEl.src = "/img/goodEnding/pifpafNoHead.png";
    let x = 17;
    let frameId;
    const speed = 0.5;
    async function frame() {
        if (x === 44) {
            cancelAnimationFrame(frameId);
            rpgHead.remove();
            mainImage.style.display = "none";
            await new Promise(resolve => setTimeout(resolve, 10));
            mainImage.src = "/img/goodEnding/explosion.png";
            mainImage.style.width = "20%";
            mainImage.style.display = "block";
            await new Promise(resolve => setTimeout(resolve, 500));
            mainImage.remove();
            rpgEl.remove();
            x = 10;
            frameId = requestAnimationFrame(animateKubik);
            return;
        }
        x += speed;
        rpgHead.style.left = x + "%";
        frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);

    function animateKubik() {
        if (x === 50) {
            cancelAnimationFrame(frameId);
            kubikel.style.width = "8%";
            const winningText = document.createElement("h1");
            winningText.textContent = "Spravedlnost byla vykonána!";
            winningText.className = "winningText";
            document.body.appendChild(winningText);
            return;
        }
        x += speed;
        kubikel.style.left = x + "%";
        frameId = requestAnimationFrame(animateKubik);
    }
}

function animateWedding(polakEl){
    let polakX = 27;
    let adrianaX = 57;
    let rotation = 0;
    let frameId;
    const kubikEl = document.createElement("img");
    const badEndingText = document.createElement("h1");
    const speed = 0.1;
    async function frame() {
        if (polakX+9 >= adrianaX-9) {
            cancelAnimationFrame(frameId);
            kubikEl.src = "/img/goodEnding/kubik.png";
            kubikEl.className = "badKubik";
            document.body.appendChild(kubikEl);
            await new Promise(resolve => setTimeout(resolve, 300));
            polakEl.style.left = "30%";
            mainImage.style.left = "55%";
            await new Promise(resolve => setTimeout(resolve, 500));
            badEndingText.textContent = "Kubíku čau!";
            badEndingText.className = "badEndingText";
            document.body.appendChild(badEndingText);
            await new Promise(resolve => setTimeout(resolve, 1000));
            rotateKubik(kubikEl);
            return;
        }
        polakX += speed;
        adrianaX -= speed;
        polakEl.style.left = polakX + "%";
        mainImage.style.left = adrianaX + "%";
        frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);

    let y = 20;
    async function rotateKubik(){
        if (rotation === 90){
            cancelAnimationFrame(frameId);
            await new Promise(resolve => setTimeout(resolve, 1000));
            polakEl.style.display = "none";
            mainImage.style.display = "none";
            badEndingText.style.display = "none";
            moveKubik();
            return;
        }
        rotation += 2;
        y -= 0.15;
        kubikEl.style.transform = "rotate(" +rotation +"deg)";
        console.log(y);
        kubikEl.style.bottom = y +"%";
        frameId = requestAnimationFrame(rotateKubik);
    }

    let kubikX = 17;
    let kubikSize = 4;
    async function moveKubik(){
        if (kubikX >= 47) {
            cancelAnimationFrame(frameId);
            const endOfWeddingText = document.createElement("h1");
            endOfWeddingText.textContent = "Kubík toto trauma nedokázal unést a zemřel!";
            endOfWeddingText.className = "endOfWeddingText";
            document.body.appendChild(endOfWeddingText);
            kubikEl.style.filter = "grayscale(60%)";
            document.getElementsByClassName("brana")[0].style.filter = "grayscale(75%)";
            return;
        }
        kubikX += 0.2;
        kubikSize += 0.01;
        kubikEl.style.right = kubikX + "%";
        kubikEl.style.width = kubikSize + "%";
        frameId = requestAnimationFrame(moveKubik);
    }
}

//FUNKCE V POZADÍ
async function update() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (document.getElementById("table").style.display === "none"){
            break;
        }
        money += moneyPerSecond/10;
        counter.textContent = Math.round(money);
        updateColors();
        updateEndingColors();
    }
}

async function updateSun(){
    let rotation = 0
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 10));
        if (rotation === 360){
            rotation = 0;
        }
        if (document.getElementById("table").style.display === "none"){
            break;
        }
        slunce.style.transform = "translate(-50%, -50%) rotate(" +rotation +"deg)";
        blueSun.style.transform = "translate(-50%, -50%) rotate(" +(-0.5*rotation) +"deg)";
        rotation++;
    }
}

async function updateProgress(){
    const doubleClickEl = document.getElementById("doubleClickValue");
    const progressDivEl = document.getElementById("progressDiv");
    const clickLine = document.getElementById("doubleClickLine");
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (progressBar.value !== 0 && document.getElementById("table").style.display !== "none"){
            progressDivEl.style.display = "block";
            progressBar.style.display = "block";
            clickLine.style.display = "block";
            progressBar.value -= 1.2;
            if (progressBar.value >= 85){
                progressMultiplier = 2;
                clickPowerEl.textContent = multiplier*progressMultiplier;
                slunce.style.width = "34%";
                blueSun.style.display = "block";
                progressBar.style.setProperty('--progress-color', '#f9db47');
                doubleClickEl.style.display = "block";
            } else {
                progressMultiplier = 1;
                clickPowerEl.textContent = multiplier*progressMultiplier;
                slunce.style.width = "33%";
                blueSun.style.display = "none";
                progressBar.style.setProperty('--progress-color', '#f4ee9f');
                doubleClickEl.style.display = "none";
            }
        } else if (document.getElementById("table").style.display !== "none"){
            progressDivEl.style.display = "none";
            progressBar.style.display = "none";
            clickLine.style.display = "none";
        } else {
            break;
        }
    }
}
