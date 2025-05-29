

export type TodoProps = {
    id: number;
    text: string;
}

export type Actions = 
|{ type: "ADD"; payload: string }
|{ type: "DELETE"; payload: number }

export type Todo = {
    id: number;
    text: string;
}

export type TodoListProps = {
    todos: Todo[];
    dispatch: React.Dispatch<Actions>;
}

export type todoFormProps = { dispatch: React.Dispatch<Actions> }