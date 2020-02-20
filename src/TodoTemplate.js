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

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({ id: 1, text: `할 일 ${i}`, checked: false });
  }
  return array;
}

const TodoTemplate = () => {
  const [todos, setTodos] = useState(createBulkTodos); /* Big Data */

  /*id값은 렌더링되는 정보가 아니기도하고, 이 값이 바뀐다고 컴포넌트가 리렌더링될 필요도 없다. */
  const nextId = useRef(4);
  /* props로 전달해야 할 함수를 만들 시, useCallback을 사용해 컴포넌트 성능을 아낄 수 있다. */
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    setTodos(todos => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    /* id를 받아와서 같은 아이디일경우 삭제 */
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const onToggle = useCallback(id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);

  /*
  [2-1: UseState의 함수형 업데이트]
  setTodos를 사용할때 그 안에 todos =>를 추가한 후 useCallback 두번째 파라미터내용을 지운다. 
  */

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
