import styled from "styled-components";
import { useState } from "react";

const Todo = ({ id, todo, onDelete, onModify }: handleProps) => {
  const [mode, setMode] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo);

  const handleDelete = () => {
    if (!onDelete) return;
    onDelete(id);
  };

  const handleCancel = () => {
    setText(todo);
    handleMode();
  };

  const handleMode = () => {
    setMode(!mode);
  };

  const handleModify = () => {
    if (!onModify) return;
    onModify(id, text);
    setMode(false);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setText(target.value);
  };

  return (
    <TodoWrapper>
      {mode ? (
        <>
          <TodoModiInput value={text} onChange={handleChange} />
          <TodoBtn onClick={handleModify}>완료</TodoBtn>
          <TodoBtn onClick={handleCancel}>취소</TodoBtn>
        </>
      ) : (
        <>
          <TodoLi>{todo}</TodoLi>
          <TodoBtn onClick={handleMode}>수정</TodoBtn>
          <TodoBtn onClick={handleDelete}>삭제</TodoBtn>
        </>
      )}
    </TodoWrapper>
  );
};

export default Todo;

const TodoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const TodoLi = styled.li`
  margin-right: 20px;
`;

const TodoBtn = styled.button``;

const TodoModiInput = styled.input``;
