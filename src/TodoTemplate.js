import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import TodoInsert from "TodoInsert";
import TodoList from "TodoList";

const Container = styled.div`
  width: 512px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;

const Title = styled.div`
  background-color: #22b8cf;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoTemplate = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "밥먹자", checked: true },
    { id: 2, text: "씻자", checked: true },
    { id: 3, text: "놀자", checked: false }
  ]);

  /*id값은 렌더링되는 정보가 아니기도하고, 이 값이 바뀐다고 컴포넌트가 리렌더링될 필요도 없다. */
  const nextId = useRef(4);
  /* props로 전달해야 할 함수를 만들 시, useCallback을 사용해 컴포넌트 성능을 아낄 수 있다. */
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );

  const onRemove = useCallback(
    id => {
      /* id를 받아와서 같은 아이디일경우 삭제 */
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  return (
    <>
      <Container>
        <Title>일정 관리</Title>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </Container>
    </>
  );
};

export default TodoTemplate;
