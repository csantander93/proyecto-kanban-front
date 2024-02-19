import { MdOutlineLibraryAdd } from "react-icons/md";
import styled from "styled-components";

const ButtonAddProject = styled(MdOutlineLibraryAdd) `
  margin-left: 42%;
  font-size: 30px;
  color: white;
  cursor: pointer;
  &:hover {
    font-size: 33px;
    transition: ease-in-out 0.1s;
  }
`;


export default ButtonAddProject;