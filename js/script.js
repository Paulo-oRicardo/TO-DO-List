// <!-- FAZER O CHECK ANTES DE DAR CLEAR ALL -->
 const handleNovoItem = () => {

  const tarefas = JSON.parse(localStorage.getItem('tarefas'))||[];
  const input = document.querySelector('[data-input-todo]');
  const valor = input.value
  const concluida = false
  const visible = true
  const dados = { 
      valor,
      concluida,
      visible
  }

  const tarefasAtualizadas = [... tarefas, dados]


  localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas))
  input.value = " "

  carregaTarefa()
}

const criarTarefa = ({valor,concluida,visible}, id) => {
  const tarefa = document.createElement('li')

  const conteudo = `<label class="radio">
          ${valor}
        </label>`
  ;

  if(concluida){
    tarefa.classList.add('done')
  }
  tarefa.classList.add('task')
  
  // if(!valor){
  //   alert("preencha o campo");
  //   return false
  // }

  tarefa.innerHTML = conteudo
  tarefa.appendChild(BotaoConclui(carregaTarefa, id));
  tarefa.appendChild(BotaoDeleta(carregaTarefa,id));

  return tarefa

}

const carregaTarefa = ()=>{
  //Dedicado a pegar as tarefas no localStorage
  const ul = document.querySelector('[data-ul]');
  const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))||[];
  ul.innerHTML = " "

  tarefasCadastradas.forEach((tarefa,id) =>{
    ul.appendChild(criarTarefa(tarefa,id))
  })
    ul.appendChild(createLastLi())
  


}

const createLastLi = () =>{
  const li = document.createElement('li')
  li.classList.add('des')
  li.classList.add('des-dark')
  const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))
  const conteudo  = `<p>${tarefasCadastradas.length} items left</p> 
    `
    const div = document.createElement('div');
    const des = `<button id="all">All</button><button id="complete">Complete</button>`
    div.classList.add('description')
    div.innerHTML = des
    div.appendChild(buttonActive(carregaTarefa))
    li.innerHTML = conteudo
    li.appendChild(div)
    li.appendChild(buttonClear(carregaTarefa))
    return li 
}


  // Botões DELET E CONCLUI
const BotaoConclui = (atualiza,id) => { 
  const botaoConclui = document.createElement('button')  
  
  botaoConclui.classList.add('check-button')

  // pega a tarefa concluida e se for true, adiciona a class
  const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))
  if(tarefasCadastradas[id].concluida){
    botaoConclui.classList.toggle('check-button-ok')
  }

  botaoConclui.addEventListener('click', () => concluirTarefa(atualiza, id))

  return botaoConclui
}

const concluirTarefa = (atualiza,id) => {
  const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))
  // console.log(tarefasCadastradas[id].concluida)
  // if(tarefasCadastradas[id].concluida)
  tarefasCadastradas[id].concluida = !tarefasCadastradas[id].concluida
 
  //DEvolvendo para o localStorage
  localStorage.setItem('tarefas',JSON.stringify(tarefasCadastradas))
  atualiza()
  
}

const BotaoDeleta = (atualiza, id) => { 
  const botaoDeleta = document.createElement('button')

  botaoDeleta.innerHTML=`X`;
  botaoDeleta.classList.add('button-delete')
  botaoDeleta.addEventListener('click', ()=>deletarTarefa(atualiza, id))

  return botaoDeleta
}

const deletarTarefa = (atualiza, id) => {
  const index = id 
  const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))
    tarefasCadastradas.splice(index,1)

  localStorage.setItem('tarefas',JSON.stringify(tarefasCadastradas))
  atualiza()

}
const buttonActive = (atualiza)=>{
  const buttonActive = document.createElement('button');

  buttonActive.innerHTML="Active"
  buttonActive.classList.add('active');
  buttonActive.addEventListener('click',()=>active(atualiza))

  return buttonActive
  
}
const active = (atualiza)=>{
  const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))
  for(let i =0; i<tarefasCadastradas.length;i++){
    if(tarefasCadastradas[i].concluida){
      console.log(tarefasCadastradas.splice(tarefasCadastradas[i].concluida == true))
      localStorage.setItem('tarefas',JSON.stringify(tarefasCadastradas))

      atualiza()
    }
  }
  console.log(tarefasCadastradas)
  localStorage.setItem('tarefas',JSON.stringify(tarefasCadastradas))

  atualiza()
}

const buttonClear = (atualiza)=>{
  const buttonCompleted = document.createElement('button');

  buttonCompleted.innerHTML="Clear completed"
  buttonCompleted.classList.add('clear');
  buttonCompleted.addEventListener('click',()=>clearCompleted(atualiza))

  return buttonCompleted
  
}
const clearCompleted = (atualiza)=>{
  const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas'))

  tarefasCadastradas.splice(0)
  localStorage.setItem('tarefas',JSON.stringify(tarefasCadastradas))

  atualiza()
}

const newTask = document.querySelector("[data-input-todo]");
newTask.onkeyup = function(e){
    if(e.keyCode == 13){
       handleNovoItem()
    }
}

const novaTarefa = document.querySelector('[data-button-inicio]')
novaTarefa.addEventListener('click', handleNovoItem)

carregaTarefa()


