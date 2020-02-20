import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Input = styled.input`
  outline: none;
  border: none;
  background-color: #495057;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: white;
  flex: 1;
  &::placeholder {
    color: #dee2e6;
  }
`;
const Button = styled.button`
  background-color: none;
  outline: none;
  border: none;
  background-color: #868e96;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background-color ease-in;
  &:hover {
    background-color: #adb5bd;
  }
`;

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);
  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue("");
      e.preventDefault(); //새로고침 방지
    },
    [onInsert, value] //userState를 통해 관리하고 있는 value값을 파라미터로 넣어서 호출
  );
  return (
    <Form onSubmit={onSubmit}>
      <Input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <Button type="submit">
        <MdAdd />
      </Button>
    </Form>
  );
};

export default TodoInsert;
