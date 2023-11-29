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
        asignarMinas();
    } else if (num >= 30) {
        num = 30;
        numMinas = Math.floor((num * num) * 0.17);
        crearTabla(num);
        asignarMinas();
    } else {
        numMinas = Math.floor((num * num) * 0.17);
        crearTabla(num);
        asignarMinas();
    }
};


//función que crea una tabla NxN
function crearTabla(num){    
    taulell = document.getElementById("taulell");
    for(let i=0; i<num; i++){
        let fila = taulell.insertRow();
        
        for(let j=0; j<num; j++){
            let col = fila.insertCell(j);
            col.innerHTML = "?";
        
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
    let campo = taulell.rows[i].cells[j];

    //Evitar procesar clics en celdas ya descubiertas
    if (campo.dataset.mina == "true"){
        alert("¡Boom! Has muerto.");
        
        //función que muestra todas las minas al ser acertada una
        //por el jugador
        mostrarMinas();
        return;
    }

    //si un camp ja ha estat clickat canvia de color
    if (!campo.classList.contains("clicked")) {
        campo.classList.add("clicked");

        mostrarNumerosAdyacentes(i, j);
    }
}


//función que calcula las minas adyacientes
function calcularMinasAdyacentes(row, col) {
    let count = 0;
    let casillasAdyacentes = [{ row: row - 1, col: col - 1 }, { row: row - 1, col: col }, { row: row - 1, col: col + 1 }, { row: row, col: col - 1 }, { row: row, col: col + 1 }, { row: row + 1, col: col - 1 }, { row: row + 1, col: col }, { row: row + 1, col: col + 1 }];

    for (let i = 0; i < casillasAdyacentes.length; i++) {
        let coord = casillasAdyacentes[i];
        let { row, col } = coord;
        let casilla = taulell.rows[row] && taulell.rows[row].cells[col];
        
        if (casilla && casilla.dataset.mina === "true") {
            count++;
        }
    }
    return count;
}


//funció que mostra el nombre de mines properes als camps propers
function mostrarNumerosAdyacentes(row, col) {
    let casillasAdyacentes = [{ row: row - 1, col: col - 1 }, { row: row - 1, col: col }, { row: row - 1, col: col + 1 }, { row: row, col: col - 1 }, { row: row, col: col + 1 }, { row: row + 1, col: col - 1 }, { row: row + 1, col: col }, { row: row + 1, col: col + 1 }];

    for (let i = 0; i < casillasAdyacentes.length; i++) {
        let coord = casillasAdyacentes[i];
        let { row, col } = coord;
        let casilla = taulell.rows[row] && taulell.rows[row].cells[col];
        
        if (casilla && !casilla.classList.contains("clicked") && casilla.dataset.mina !== "true") {
            let numMines = calcularMinasAdyacentes(row, col);
            if (numMines > 0) {
                casilla.textContent = numMines;
            }
            casilla.classList.add("clicked");
        }
    }
}


//funció que assigna les mines al taulell
function asignarMinas(){
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
    let campo = taulell.rows[x].cells[y];
    campo.dataset.mina = "true";
}

//función para mostrar todas las minas una vez el jugador acierte una
function mostrarMinas(){
    for (let i=0; i<num; i++) {
        for (let j=0; j<num; j++) {
            let campo = taulell.rows[i].cells[j];
            if (campo.dataset.mina == "true") {
                campo.classList.add("mina");
            }
        }
    }
}