import { Todo, TodoList } from '../classes';
import { todoList } from '../index';



// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed')
const ulfiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = ( todo ) => {

    const htmlTodo =`
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
	    <input class="edit" value="Create a TodoMVC template">
	</li>`; 

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild ); //el firstElementChild lo que hace es que inserta el primer elemento
                                                 // despues del div

    return div;

}


//Eventos

txtInput.addEventListener('keyup', ( event ) =>{ 

    if(event.keyCode === 13 && txtInput.value.length > 0 ){ //aqui se evalua de que le hayan dado enter y no este vacio
        console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value ); //aqui se guarda el texto en un nuevo ToDo
        todoList.nuevoTodo( nuevoTodo ); //aqui se agrega el todo a la lista de todoList

        crearTodoHTML(nuevoTodo); //aqui se agrega el nuevo todo al codigo html
        txtInput.value = ''; //aqui se borra lo que esta escrito en el inputTxt cuando le den enter

    }

});


divTodoList.addEventListener('click', (event)=>{

    const nombreElemento = event.target.localName; //input, label, button 
    const todoElemento   = event.target.parentElement.parentElement;
    const todoID = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input')){ //click en el check
        todoList.marcarCompletado(todoID);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoID); //aqui se borra el todo del arreglo
        divTodoList.removeChild( todoElemento ); //aqui se elimina del HTML
    }
    console.log(todoList);
});


btnBorrar.addEventListener('click', ()=>{

    todoList.eliminarCompletados();  //llamamos el metodo para borrar los completados del arreglo


    for(let i = divTodoList.children.length-1; i >= 0 ; i--){ //este for va del ultimo al primero

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed')){ //verificamos si esta completado
            divTodoList.removeChild( elemento ); //si lo esta, se elimina
        }
    }
    
    
});


ulfiltros.addEventListener('click', (event)=>{

    const filtro = event.target.text;
    if( !filtro ){return};

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed'); //no entiendo
        console.log(elemento.classList.contains('completed'))

        switch( filtro ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;

        }

    }

})

