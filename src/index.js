import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';
import './styles.css';

export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHTML(todo));

// const newTodo = new Todo ('Aprender javascript');
// -todoList.nuevoTodo( newTodo );

console.log('todos:', todoList.todos);

