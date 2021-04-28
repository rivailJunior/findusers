import React from 'react';
import styles from './informationCard.module.scss';

type iCard = {
    title: string,
    mainText: string,

}
const InformationCard = ({ title, mainText }: iCard) => {
    return (
        <div className={styles.card}>
            <p>{title}</p>
            <h2>{mainText}</h2>
        </div>
    );
}

export { InformationCard };
