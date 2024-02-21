import React, {    useState     } from "react";
import PrincipalBox from "./PrincipalBox";
import { FormDiv, Title, Input, Label } from "./Register";

function formularioProyecto(){
    const [formData, setFormData] = useState({
        idUsuario: '',
        nombre: '',
        descripcion: ''
      });
      
    return(
        <PrincipalBox>
          <FormDiv>
              <form>
                <Title>Crear Cuenta</Title>
  
                <Label>Nombre</Label>
                <Input
                  type="text"
                  name="nombre"
                  placeholder="nombre"
                />
  
                <Label>Descripcion</Label>
                <Input
                  type="text"
                  name="descripcion"
                  placeholder="descripcion"
                />
                 </form>
               </FormDiv>
             </PrincipalBox>
    );
}