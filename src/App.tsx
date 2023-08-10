import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import Todo from "./Todo";

function App() {
  const todoRef = useRef<Props[] | null>(null);
  const [todos, setTodos] = useState<Props[]>([]);
  const [value, setValue] = useState<string>("");
  const nextId = useRef(1);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const saveStorage = (newTodos: Props[]) => {
    todoRef.current = newTodos;
    localStorage.setItem("todos", JSON.stringify(todoRef.current));
  };

  const regTodo = () => {
    nextId.current += 1;
    const newTodo = [...todos, { id: nextId.current, todo: value }];
    setTodos(newTodo);
    setValue("");
    saveStorage(newTodo);
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim() !== "") {
      regTodo();
    }
  };

  const handleClick = () => {
    regTodo();
  };

  const handleDelete = (id: number) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
    saveStorage(newTodo);
  };

  const handleModify = (id: number, todoText: string) => {
    const modifiedTodo: Props[] = todos.map((todo: Props) =>
      todo.id !== id ? todo : { id, todo: todoText }
    );
    setTodos(modifiedTodo);
    saveStorage(modifiedTodo);
  };

  useEffect(() => {
    try {
      const getData = localStorage.getItem("todos");
      if (!getData) return;
      const initTodos: Props[] = JSON.parse(getData);
      setTodos(initTodos);
      nextId.current = todos.length + 1;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <StatusBoard>
        <TodoInput
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
        <SubmitBtn onClick={handleClick}>제출</SubmitBtn>
      </StatusBoard>
      <TodosUl>
        {todos?.map(({ id, todo }) => (
          <Todo
            key={id}
            id={id}
            todo={todo}
            onDelete={handleDelete}
            onModify={handleModify}
          />
        ))}
      </TodosUl>
    </>
  );
}

export default App;

const StatusBoard = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 100px;
`;

const TodoInput = styled.input``;

const SubmitBtn = styled.button``;

const TodosUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
