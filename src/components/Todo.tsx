import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useEffect, useReducer } from "react";
import type { TodoProps, Actions } from "../types";

const todoReducer = (state: TodoProps[], action: Actions): TodoProps[] => {
    switch (action.type) {
        case "ADD":
            const newTodo: TodoProps = {
                id: Date.now(),
                text: action.payload,
                completed: false
            };
            return [...state, newTodo];
        case "DELETE":
            return state.filter(todo => todo.id !== action.payload);
        case "EDIT": 
            return state.map(todo => 
                todo.id === action.payload.id 
                ? { ...todo, text: action.payload.newText } 
                : todo
            );
        case "COMPLETE":       
            return state.map(todo => 
                todo.id === action.payload 
                ? { ...todo, completed: !todo.completed } 
                : todo
            );
        case "CLEAR_ALL":
            return [];    
        default:
            return state;
    }
}

const getInitialTodos = (): TodoProps[] => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
}



const Todo = () => { 
    const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);
    console.log(todos);

    const totalTasks: number = getInitialTodos().length;
    const completedTasks: number = getInitialTodos().filter(todo => todo.completed).length;
    const activeTasks: number = totalTasks - completedTasks;

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    

    return ( 
        <>
            <div className="max-w-sm max-auto p-6">
                <h1 className="text-center text-2xl">To-Do List</h1>
                <TodoForm dispatch={dispatch}/>
                <TodoList todos={todos} dispatch={dispatch}/>
                {todos.length > 0 && (
                   <>
                   <div className="flex justify-between items-center mt-4 border-t pt-4 text-cf-gray">
                    <span>Total: {totalTasks}</span>
                    <span>Active: {activeTasks}</span>
                    <span>Completed: {completedTasks} </span>
                   </div>
                    <div className="text-end mt-4">
                        <button className="bg-cf-dark-red py-2 rounded px-4 border border-black">
                            <span className="text-white" onClick={() => dispatch({ type: "CLEAR_ALL" })}>
                            Clear All
                            </span>
                        </button>
                    </div>
                   </>
                )}
                
                
            </div>

        </>
    )
}

export default Todo;