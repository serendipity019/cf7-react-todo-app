import type { TodoListProps } from '../types';
import { Trash2 } from 'lucide-react';

const TodoList = ({todos, dispatch}: TodoListProps) => {
    
    const handleDelete = (id: number) => () => {
        dispatch({ type: "DELETE", payload: id });
    };
    
    return (
        <>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded">
                    <span>{todo.text}</span>
                    <button className="hover:underline text-cf-dark-red flex" 
                            onClick={handleDelete(todo.id)} > <Trash2 size={20}/></button>
                </li>
                ))}
            </ul>
        </>
    );
}

export default TodoList;