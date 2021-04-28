import React from 'react';
import styles from './informationCard.module.scss';

type iCard = {
    title: string,
    mainText: string,
    isDescription?: boolean

}
const InformationCard = ({ title, mainText, isDescription }: iCard) => {
    return (
        <div className={styles.card}>
            <p>{title}</p>
            {isDescription ?
                (
                    <div className={styles.description}>
                        {mainText}
                    </div>
                ) : (
                    <h2>{mainText}</h2>
                )}

        </div>
    );
}

export { InformationCard };
