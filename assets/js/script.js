const input = document.querySelector('.input');
const areaTarefas = document.querySelector('.tarefas');

function criarDiv(){
    const tarefa = document.createElement('div');
    tarefa.classList.add('tarefa');
    return tarefa;
}

function criarTarefa(textoInput){
    const tarefa = criarDiv();
    criarImg(tarefa);
    criarTexto(tarefa, textoInput);
    criarBotaoApagar(tarefa);
    areaTarefas.appendChild(tarefa);
    zerarInput()
    salvarTarefas()
}

function zerarInput(){
    input.value = '';
    input.focus();
}

function criarImg(tarefa){
    let img = document.createElement('div');
    img.classList.add('img');
    tarefa.appendChild(img);
}

function criarTexto (tarefa,textInput){
    let p = document.createElement('p');
    p.classList.add('texto');
    p.innerText = textInput;
    tarefa.appendChild(p);
}

function criarBotaoApagar(tarefa){
    let botao = document.createElement('button');
    botao.classList.add('apagar');
    botao.innerText = 'Apagar';
    tarefa.appendChild(botao)
}


function salvarTarefas(){
    const todasAsTarefas = document.querySelectorAll('.tarefa');
    const tarefas = [];

    for(let tarefa of todasAsTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        tarefas.push(tarefaTexto);
    }

    const tarefasJson = JSON.stringify(tarefas);
    localStorage.setItem('tarefas', tarefasJson);
}

function adicionarTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas){
        criarTarefa(tarefa);
    }
}

input.addEventListener('keypress',function(evento){
    if(evento.keyCode === 13){
        if (!input.value) return;
        criarTarefa(input.value);
    }
})

document.addEventListener('click', function(event){
    const elemento = event.target;
    
    if(elemento.classList.contains('btnAdicionar')){
        if (!input.value) return;
        criarTarefa(input.value);
    }
    
    if(elemento.classList.contains('apagar')){
        elemento.parentElement.remove();
        salvarTarefas()
    }

    if(elemento.classList.contains('img') || elemento.classList.contains('texto')){
        if(elemento.parentElement.classList.contains('tarefa')){
            const pai = elemento.parentElement;
            const img = pai.querySelector('.img');
            const texto = pai.querySelector('.texto');
            pai.classList.toggle('checked')
            texto.classList.toggle('checked')
            img.classList.toggle('checked')
        }
    }
    
})

adicionarTarefasSalvas()