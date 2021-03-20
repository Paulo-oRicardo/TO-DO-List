const light = (event)=>{
   event.preventDefault();
   const button = document.querySelector('[data-button-light]');
   //header
   document.querySelector('[data-header]').classList.toggle('header-light')
   //button
   button.classList.toggle('button-light')
   button.classList.toggle('button-dark')
   //main
   document.querySelector('[data-meio]').classList.toggle('meio-light')
   document.querySelector('[data-meio]').classList.toggle('meio-dark')
   //Input início
   document.querySelector('[data-input-todo]').classList.toggle('inserir-dark')
   document.querySelector('[data-input-todo]').classList.toggle('inserir-light')
   //button início 
   document.querySelector('[data-button-inicio]').classList.toggle('button-inicio-light')
   // As li's
   const li=document.getElementsByTagName('li')
   
   //pega um vetor, então precisa ser lido com um for
   for (i = 0; i < li.length; i++) {
     li[i].classList.toggle('task-light');
     
    }
    document.querySelector('.des').classList.toggle('des-dark')
    document.querySelector('.mobile').classList.toggle('mobile-light')
    document.querySelector('.mobile').classList.toggle('mobile-dark')
 
 
   document.querySelector('.radio').classList.toggle('radio-light')
   


}

const buttonLight = document.querySelector('[data-button-light]');

buttonLight.addEventListener("click",light)