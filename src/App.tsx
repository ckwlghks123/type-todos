import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState<Props[]>(() => {
    const getData = localStorage.getItem("todos");
    if (!getData) return [];
    return JSON.parse(getData);
  });

  const [value, setValue] = useState<string>("");
  const nextId = useRef(todos.length);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextId.current += 1;
    const newTodo = [...todos, { id: nextId.current, todo: value }];
    setTodos(newTodo);
    setValue("");
  };

  const handleDelete = (id: number) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  const handleModify = (id: number, todoText: string) => {
    const modifiedTodo: Props[] = todos.map((todo: Props) =>
      todo.id !== id ? todo : { id, todo: todoText }
    );
    setTodos(modifiedTodo);
  };

  useEffect(() => {
    // console.log("컴포넌트 마운트");
    // const getData = localStorage.getItem("todos");
    // if (!getData) return;
    // const initTodos: Props[] = JSON.parse(getData);
    // if (initTodos.length > 0) {
    //   setTodos(initTodos);
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <StatusBoard onSubmit={handleSubmit}>
        <TodoInput value={value} onChange={handleChange} />
        <SubmitBtn type="submit">제출</SubmitBtn>
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

const StatusBoard = styled.form`
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
