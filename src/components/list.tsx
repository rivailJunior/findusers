import React from 'react';
import { ErrorFeedback } from './errorFeedback';
import styles from './list.module.scss';
import moment from 'moment'

type iList = {
    data: object[],
    handleClick: Function
}

const ListRepositories = ({ data, handleClick }: iList): JSX.Element => {
    return data.length ? (
        <div data-testid="list" className={styles.item}>
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
    ) : (
        <ErrorFeedback title="Nada encontrado" />
    );
}

export { ListRepositories };
