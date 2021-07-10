import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import * as S from "./styled";

function Home(props) {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);

  function handleSearch(e) {
    axios
      .get(`https://api.github.com/users/${user}/repos`)
      .then((res) => {
        const repositories = res.data;
        const repositoriesNames = [];
        repositories.map((repository) => {
          return repositoriesNames.push(repository.name);
        });
        localStorage.setItem(
          "repositoriesName",
          JSON.stringify(repositoriesNames)
        );
        setError(false);
        history.push("/repositories");
      })
      .catch((err) => {
        setError(true);
      });
  }
  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input
          type="text"
          placeholder="Informe o usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <S.Button type="button" onClick={handleSearch}>
          Pesquisar
        </S.Button>
      </S.Content>
      {error ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : ""}
    </S.HomeContainer>
  );
}

export default Home;
