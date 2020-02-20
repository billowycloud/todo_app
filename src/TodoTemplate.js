import React, { useReducer, useRef, useCallback } from "react";
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

function todoReducer(todos, action) {
  switch (action.type) {
    case "INSERT": //새로 추가
      //{type: 'INSERT', todo: {id: 1, text: 'todo', checked: false}}
      return todos.concat(action.todo);
    case "REMOVE": //제거
      //{type: 'REMOVE', id: 1}
      return todos.filter(todo => todo.id !== action.id);
    case "TOGGLE": //토글
      //{type: 'TOGGLE', id: 1}
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    default:
      return todos;
  }
}
/*
  2-2: useReducer 사용
*/

const TodoTemplate = () => {
  const [todos, dispatch] = useReducer(
    todoReducer,
    undefined,
    createBulkTodos
  ); /* Big Data */

  /*id값은 렌더링되는 정보가 아니기도하고, 이 값이 바뀐다고 컴포넌트가 리렌더링될 필요도 없다. */
  const nextId = useRef(2501);
  /* props로 전달해야 할 함수를 만들 시, useCallback을 사용해 컴포넌트 성능을 아낄 수 있다. */
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    dispatch({ type: "INSERT", todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    /* id를 받아와서 같은 아이디일경우 삭제 */
    dispatch({ type: "REMOVE", id });
  }, []);

  const onToggle = useCallback(id => {
    dispatch({ type: "TOGGLE", id });
  }, []);

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
