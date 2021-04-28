import React, { useState } from 'react';
import { ErrorFeedback } from '../errorFeedback/errorFeedback';
import styles from './list.module.scss';
import moment from 'moment'
import { GridContainer, GridContainerItem } from '../gridContainer/gridContainer';


type iList = {
    data: object[],
    handleClick: Function
}

const ListRepositories = ({ data, handleClick }: iList): JSX.Element => {
    const [showReverse, setShowReverse] = useState(false);

    const listStyle = showReverse ? `${ styles.item } ${ styles.listReverse }` : styles.item;
    return data.length ? (
        <div>
            <div className={styles.listTitlesInformations}>
                <div className={styles.stars}>
                    <label htmlFor="">Estrelas</label>
                </div>
                <div className={styles.description}>
                    <label htmlFor="">Description</label>
                </div>
                <div className={styles.button}>
                    <button data-testid="btnReverse" className={styles.btnReverse} onClick={() => setShowReverse(!showReverse)}>Sort</button>
                </div>
            </div>


            <div data-testid="list" className={listStyle}>

                {data.map((item: any, index) => {
                    return (
                        <div key={index} className={styles.itemLi} onClick={() => handleClick(item)} data-testid="listItem">
                            <div className={styles.left}>
                                {item.stargazers_count}
                            </div>
                            <div className={styles.right}>
                                <div className={styles.rightTitle}>
                                    {item?.name}
                                </div>
                                <div className={styles.rightSub}>
                                    <div>{moment(item.created_at).format('DD/MM/YYYY')}</div>
                                    <div> <a href={item.clone_url} target="_blank" rel="noopener noreferrer">{item.clone_url}</a></div>
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    ) : (
        <ErrorFeedback title="Nada encontrado" />
    );
}

export { ListRepositories };
