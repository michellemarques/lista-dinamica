const tarefa = document.querySelector('.inputTarefa');
const botaoAdd = document.querySelector('.btn-add');
const lista = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
};

tarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!tarefa.value) return;
        criaTarefa(tarefa.value);
    }
});

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoRem = document.createElement('button');
    botaoRem.innerText = "Apagar";
    botaoRem.setAttribute('class', 'apagar'); // seta um atributo
    botaoRem.setAttribute('title', 'Apagar');
    li.appendChild(botaoRem);
}

function limpaInput(){
    tarefa.value = '';
    tarefa.focus();
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    lista.appendChild(li);
    criaBotaoApagar(li);
    limpaInput();
    salvarTarefas();
}

botaoAdd.addEventListener('click', function () {
    if (!tarefa.value) return;
    //console.log(tarefa.value); //<- Pega o valor que é digitado no input
    criaTarefa(tarefa.value);
});

document.addEventListener('click', function(e){
    const el = e.target; // <- retorna o que é clicado

    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    };
});

function salvarTarefas(){
    const liTarefas = lista.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();// <- remove espaço
     listaDeTarefas.push(tarefaTexto); 
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    // criou-se uma string de array
    localStorage.setItem('tarefas', tarefasJSON);
};

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); // conversão para um objeto

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
};
adicionaTarefasSalvas();