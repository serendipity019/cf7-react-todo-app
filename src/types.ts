

export type TodoProps = {
    id: number;
    text: string;
    completed: boolean;
    
}

export type Actions = 
|{ type: "ADD"; payload: string }
|{ type: "DELETE"; payload: number }
|{ type: "EDIT"; payload: { id: number; newText: string } }
|{ type: "COMPLETE"; payload: number}
|{ type: "CLEAR_ALL" };


export type Todo = {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoListProps = {
    todos: Todo[];
    dispatch: React.Dispatch<Actions>;
}

export type todoFormProps = { dispatch: React.Dispatch<Actions> }