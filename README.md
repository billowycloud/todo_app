TodoTemplate: 화면을 가운데에 정렬시켜주며, 앱 일정관리를 보여줌. children으로 내부 JSX를 props로 받아와서 렌더링.

TodoInsert: 새로운 항목을 입력하고 추가할 수 있는 컴포넌트. state를 통해 인풋의 상태를 관리.

TodoListItem: 각 할 일 항목에 대한 정보를 보여주는 컴포넌트. todo객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여줌.

TodoList: todos 배열을 props로 받아 온 후, 이를 배열 내장함수 map을 사용하여 여러 개의 TodoListItem 컴포넌트로 변환하여 보여줌.