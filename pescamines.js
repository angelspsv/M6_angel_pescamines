let numMinas;
let taulell;
let num;

function iniciarPartida(){
    num = parseInt(prompt("Entra el nombre de files del quadrat del pescamines:")); 

    //condicions del nombre de files introduits per la creació del taulell
    //calcula nombre de mines segons la mida del taulell dins de les proporcions des de 10 fins als 30 files*columnes
    if (num <= 10) {
        num = 10;
        numMinas = Math.floor((num * num) * 0.17);
        crearTabla(num);
        setMines();
    } else if (num >= 30) {
        num = 30;
        numMinas = Math.floor((num * num) * 0.17);
        crearTabla(num);
        setMines();
    } else {
        numMinas = Math.floor((num * num) * 0.17);
        crearTabla(num);
        setMines();
    }
};


//función que crea una tabla NxN
function crearTabla(num){    
    taulell = document.getElementById("taulell");
    for(let i=0; i<num; i++){
        let fila = taulell.insertRow();
        
        for(let j=0; j<num; j++){
            let col = fila.insertCell(j);
        
            //al fer click en un camp, agafa les coordenades
            col.addEventListener("click", function() {
                procesaClick(i, j);
            });
        }
    }
};

function procesaClick(i, j){
    //alert per fer proves
    //alert(`Has hecho clic en la celda (${i + 1}, ${j + 1})`);

    //l'element campo del taulell amb les coordenades
    let camp = taulell.rows[i].cells[j];

    //Evitar procesar clics en celdas ya descubiertas
    if (camp.dataset.mina == "true"){
        alert("¡Boom! Estàs mort.");
        
        //funció que mostra totes les mines al tocar una i fin del joc
        mostrarMinas();
        return;
    }

    //si un camp ja ha estat clickat canvia de color
    if (!camp.classList.contains("clicked")) {
        camp.classList.add("clicked");

        //funció que mostra el nombre de mines adjacents
        mostrarNumerosAdyacentes(i, j);
    }
}


//funció que calcula les mines adjacents
function calculaAdjacents(row, col) {
    let count = 0;
    let campsAdjacents = [{row: row-1, col: col-1}, {row: row-1, col: col}, {row: row-1, col: col+1}, {row: row, col: col-1}, {row: row, col: col+1}, {row: row+1, col: col-1}, {row: row+1, col: col}, {row: row+1, col: col+1}];

    for (let i=0; i<campsAdjacents.length; i++) {
        let coord = campsAdjacents[i];
        let {row, col} = coord;
        let casilla = taulell.rows[row] && taulell.rows[row].cells[col];
        
        if (casilla && casilla.dataset.mina === "true") {
            count++;
        }
    }
    return count;
}


//funció que mostra el nombre de mines properes als camps propers
function mostrarNumerosAdyacentes(row, col) {
    let campsAdjacents = [{row: row-1, col: col-1}, {row: row-1, col: col}, {row: row-1, col: col+1}, {row: row, col: col-1}, {row: row, col: col+1}, {row: row+1, col: col-1}, {row: row+1, col: col}, {row: row+1, col: col+1}];

    for (let i = 0; i < campsAdjacents.length; i++) {
        let coord = campsAdjacents[i];
        let { row, col } = coord;
        let casilla = taulell.rows[row] && taulell.rows[row].cells[col];
        
        if (casilla && !casilla.classList.contains("clicked") && casilla.dataset.mina !== "true") {
            let numMines = calculaAdjacents(row, col);
            if (numMines > 0) {
                casilla.textContent = numMines;
            }
            casilla.classList.add("clicked");
        }
    }
}


//funció que assigna les mines al taulell
function setMines(){
    let random_i = 0;
    let random_j = 0;
    for(let i=0; i<numMinas; i++){
        //agafa posicions random del taulell per assignar les mines
        random_i = Math.floor(Math.random() * num);
        random_j = Math.floor(Math.random() * num);
        EsMina(random_i, random_j); 
    }
}

//true si un camp és una mina
function EsMina(x, y){
    let camp = taulell.rows[x].cells[y];
    camp.dataset.mina = "true";
}

//funció per mostrar totes les mines un cop el jugador hagi tocat una mina
function mostrarMinas(){
    for (let i=0; i<num; i++) {
        for (let j=0; j<num; j++) {
            let camp = taulell.rows[i].cells[j];
            if (camp.dataset.mina == "true") {
                mostrarImagenMina(i, j);
            }
        }
    }
}

//funció que mostra totes les mines quan el jugador ja ha tocat una mina
function mostrarImagenMina(row, col) {
    let imagenMina = 'mina20px.jpg';
    let casilla = taulell.rows[row].cells[col];
    casilla.innerHTML = `<img src="${imagenMina}" alt="mina" class="mina" />`;
}