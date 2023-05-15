import React from "react";

const HomePage = ({ username }) => {
  return (
    <div>
      <h1>Bem-vindo, {username}!</h1>
      <p>Esta é a página inicial do sistema.</p>
    </div>
  );
};

export default HomePage;
