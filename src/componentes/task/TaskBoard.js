import styled from 'styled-components';
import { useState } from "react";

const DrawerContainer  = styled.div`
  margin: 0;
  padding: 0;
  background-color: #171719;
  border: solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const Item = styled.div`
  color: white;
  width: 200px;
  height: 100px;
  margin: 10px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TaskBoard () {

  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);

  const handleAddItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  return (
    <DrawerContainer>
        {items.map((item, index) => (
          <Item key={index}>{item}</Item>
        ))}
    </DrawerContainer>
  );
}

export default TaskBoard;
