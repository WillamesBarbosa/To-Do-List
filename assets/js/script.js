let input = document.getElementById('input');
let btnAdd = document.getElementById('btnAdd');
let main = document.getElementById('areaLista');
let contador = 0

function addTarefa(){
    let valorInput = input.value;
    
    if((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)){
        
        ++contador;
        
        let novoItem = `<div id="${contador}" class="item">
        <div onclick="marcarTarefa(${contador})" class="itemIcone">
            <i id="icone_${contador}" class="mdi mdi-circle-outline"></i>
        </div>
        <div onclick="marcarTarefa(${contador})" class="itemNome">
            ${valorInput}
        </div>
        <div class="itemBotao">
            <button class="delete" onclick="deletar(${contador})">DELETAR</button>
        </div>
    </div>`;

    //ADICIONA NOVO ITEM NO MAIN
    main.innerHTML += novoItem;

    //ZERA O CAMPO INPUT
    input.value = "";
    input.focus();
    }
}

function deletar(id){

    let tarefa = document.getElementById(id);
    tarefa.remove();
}

function marcarTarefa(id){
    let item = document.getElementById(id);
    let classe = item.getAttribute('class');

    if(classe=="item"){
        item.classList.add('checked');

        let icone = document.getElementById('icone_'+id);
        icone.classList.remove('mdi-circle-outline');
        icone.classList.add('mdi-check-circle');

        item.parentNode.appendChild(item);
        
    }else{
        item.classList.remove('checked');

        let icone = document.getElementById('icone_'+id);
        icone.classList.add('mdi-circle-outline');
        icone.classList.remove('mdi-check-circle');
    }
    
}


input.addEventListener("keyup", function(event){
    // SE TECLOU ENTER
    if(event.keyCode === 13){
        event.preventDefault();
        btnAdd.click();
    }
})