import styled from "styled-components"

const BodyPrincipal = styled.body `
  height: 98vh;
  margin: 0; /* Elimina los márgenes por defecto del body */
  padding: 0; /* Elimina el padding por defecto del body */
  overflow: hidden; /* Evita que haya scroll horizontal o vertical */
  background-image: url("/img/login.jpg");
  background-size: cover;

`;

export default BodyPrincipal;