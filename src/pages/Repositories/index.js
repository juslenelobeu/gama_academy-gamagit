import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as S from "./styled";

export default function Repositories() {
  const history = useHistory();
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    let repositoriesName = localStorage.getItem("repositoriesName");
    if (repositoriesName !== null) {
      repositoriesName = JSON.parse(repositoriesName);
      setRepositories(repositoriesName);
      localStorage.clear();
    } else {
      history.push("/");
    }
  }, [history]);
  return (
    <S.Container>
      <S.Title>Repositories</S.Title>
      <S.List>
        {repositories.map((repository) => {
          return <S.ListItem>Repositório: {repository}</S.ListItem>;
        })}
      </S.List>
      <S.LinkHome to="/">Voltar</S.LinkHome>
    </S.Container>
  );
}
