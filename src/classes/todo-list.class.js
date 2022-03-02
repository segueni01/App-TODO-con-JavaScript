import { Todo } from './todo.class' 

export class TodoList{

    constructor(){

        // this.todos = [];
        this.cargarLocalStorage();

    }


    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){

        this.todos = this.todos.filter( todo => todo.id != id); //esto regresara un todo y se almacenara en this.todos
        this.guardarLocalStorage();

    }

    marcarCompletado( id ){

        for (const todo of this.todos){

            console.log(id, todo.id)

            if(todo.id == id){
                console.log("entro")
                todo.completado = !todo.completado; // si entra aqui se pasa de false a true o de true a false
                this.guardarLocalStorage();
                break;
            }
        }

    }

    eliminarCompletados(){

        this.todos = this.todos.filter( todo => !todo.completado ); // te devulve los que esten completados
        this.guardarLocalStorage();

    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos)); //el stringify me convierte el arreglo a un JSON comun

    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo'))
                    ? JSON.parse(localStorage.getItem('todo')) //con este .parse pasamos de JSON a arreglos
                    : this.todo = [] ;
        
        this.todos = this.todos.map( obj => Todo.fromJson( obj ) );

    }

}