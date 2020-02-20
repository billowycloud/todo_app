import React from "react";
import styled from "styled-components";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline
} from "react-icons/md";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  &:nth-child(odd) {
    background-color: #f8f0fa;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;
const Checkbox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
    color: ${props => (props.checked ? "#22b8cf" : "black")};
  }
`;

const Text = styled.div`
  margin-left: 0.5rem;
  flex: 1;
  color: ${props => (props.checked ? "#adb5df" : "black")};
  text-decoration: ${props => (props.checked ? "line-through" : "none")};
`;

const Remover = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;
  return (
    <Container>
      <Checkbox checked={checked} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <Text checked={checked}>{text}</Text>
      </Checkbox>
      <Remover onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </Remover>
    </Container>
  );
};

export default TodoListItem;
