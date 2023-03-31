import { useEffect, useState, useCallback } from "react";
import Item from "./Item";
import cardapio from "./itens.json";
import styles from "./Itens.module.scss";

interface Props {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

export default function Itens(props: Props) {
  const [lista, setLista] = useState(cardapio);
  const { busca, filtro, ordenador } = props;
  const testaBusca = useCallback(
    (title: string) => {
      const regex = new RegExp(busca, "i");
      return regex.test(title);
    },
    [busca]
  );

  const testaFiltro = useCallback(
    (id: number) => {
      if (filtro !== null) return filtro === id;
      return true;
    },
    [filtro]
  );

  const ordenar = useCallback(
    (novaLista: typeof cardapio) => {
      switch (ordenador) {
        case "porcao":
          return novaLista.sort((a, b) => (a.size > b.size ? 1 : -1));
        default:
          return novaLista;
      }
    },
    [ordenador]
  );

  /*Sempre que busca e filtro mudarem, o useEffect vai rodar*/
  useEffect(() => {
    const novaLista = cardapio.filter(
      (item) => testaBusca(item.title) && testaFiltro(item.category.id)
    );
    setLista(ordenar(novaLista));
  }, [busca, filtro, ordenador, ordenar, testaFiltro, testaBusca]);

  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
