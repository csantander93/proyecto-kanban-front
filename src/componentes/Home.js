import { UserContext } from "./UserContext";
import React, { useContext } from "react";

function Home () {

  const {user} = useContext(UserContext);

  return (
    <body>
      <div>Hola mundo!
        <h1>{user.id}</h1>
        <h1>{user.usuario}</h1>
      </div>
    </body>
  )
}

export default Home