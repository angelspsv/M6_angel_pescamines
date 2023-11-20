function iniciarPartida(){
    let num = parseInt(prompt("Entre el nombre de files del quadrat del pescamines:"));
    if (num <= 10) {
        num = 10;
        crearTaulell(num);
    } else if (num >= 30) {
        num = 30;
        crearTaulell(num);
    } else {
        crearTaulell(num);
    }
};


//función que crea una tabla NxN
function crearTaulell(num){
    //formación de la tabla de NxN dimensiones
    let taulell = document.getElementById("taulell");
    for(let i=0; i<num; i++){
        let fila = taulell.insertRow();
        
        for(let j=0; j<num; j++){
            let col = fila.insertCell(j);
            col.innerHTML = "?";
        
            col.addEventListener("click", function() {
                alert(`Has hecho clic en la celda (${i + 1}, ${j + 1})`);
            });
        }
    }
};