import filtros from './filtros.json';
import styles from './Filtros.module.scss';
import React from "react";
import classNames from 'classnames';

interface Props {
    filtro: number | null;
    setFiltro: React.Dispatch<React.SetStateAction<number | null>>;
}

// Nova forma de tipagem abaixo com typeof:
type Iopcao = typeof filtros[0];

// Outra forma de tipagem abaixo com interface:
// interface Opcao{
//     id: number;
//     label: string
// }

/*Nosso componente filtro aceita as propriedades filtro e setFiltro que são do tipos Props na interface*/

/* OBS:
os ... <------------ servem pra pegar o valor que tinha antes
*/
export default function Filtros({filtro, setFiltro}: Props) {
    function selecionarFiltro(opcao: Iopcao) {
        if (filtro === opcao.id) return setFiltro(null);
        return setFiltro(opcao.id);
    }

    return <div className={styles.filtros}>
        {filtros.map((opcao) => (
            <button
                className={classNames({
                    [styles.filtros__filtro]: true,
                    [styles['filtros__filtro--ativo']]: filtro === opcao.id
                })}
                key={opcao.id} onClick={() => selecionarFiltro(opcao)}>
                {opcao.label}
            </button>
        ))}
    </div>
}