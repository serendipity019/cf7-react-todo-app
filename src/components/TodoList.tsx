import type { TodoListProps } from '../types';
import { Trash2, Edit, Save, X, Square, SquareCheckBig } from 'lucide-react';
import { useState} from 'react';

const TodoList = ({todos, dispatch, inputRef}: TodoListProps) => {
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>("");
    

    const handleDelete = (id: number) => () => {
        dispatch({ type: "DELETE", payload: id });
        inputRef.current?.focus();
    };

    const handleEdit = (id: number, text: string) => () => {
        setEditId(id);
        setEditText(text);
    }

    const handleCancel = () => {
        setEditId(null);
        setEditText("");
        inputRef.current?.focus();
    }

    const handleSave = (id: number) => () => { 
        if (editText.trim() !== "") {
            dispatch({ type: "EDIT", payload: { id, newText: editText } });
            setEditId(null);
            setEditText("");
            inputRef.current?.focus();
        }
    }

    const handleToggle = (id: number) => () => {
        dispatch({ type: "COMPLETE", payload: id });
        inputRef.current?.focus();
    };
    
    return (
        <>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} 
                    // className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
                    className={`flex justify-between items-center bg-gray-100 p-2 mb-2 rounded
                    ${todo.completed ? "line-through opacity-50 text-gray-500" : ""}`}
                    >
                    {editId === todo.id ? (
                        <>
                        <input 
                            type="text" 
                            className="flex-1 border p-1 rounded mr-2"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button className="text-blue-400" 
                            onClick={handleSave(todo.id)} > <Save size={20}/></button> 
                        <button className="text-cf-dark-red" 
                            onClick={handleCancel} > <X size={20}/></button>  
                        </div>   
                        </>

                    ) : (
                    <> 
                    <div className="flex flex-1 items-center gap-2">
                        <button className='text-green-500' 
                            onClick={handleToggle(todo.id)}>
                        {todo.completed ? <SquareCheckBig size={20} /> : <Square size={20} />}            
                     </button>
                    <span>{todo.text}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="hover:underline text-blue-400" 
                            onClick={handleEdit(todo.id, todo.text)} > <Edit size={20}/></button> 
                        <button className="hover:underline text-cf-dark-red" 
                            onClick={handleDelete(todo.id)} > <Trash2 size={20}/></button>     
                    </div>   
                    </>)
                    }   
                    
                </li>
                ))}
            </ul>
        </>
    );
}

export default TodoList;
