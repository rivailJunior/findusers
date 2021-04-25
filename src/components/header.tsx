import React from 'react';
import styles from './header.module.scss'

type iHeader = {
    userName?: string,
    labelRight?: string,
    handleRight?(): Function
}
const Header = ({ userName, labelRight, handleRight }: iHeader): JSX.Element => {
    return (
        <div className={styles.header}>
            <a href="#default" className={styles.logo}>{userName}</a>
            {labelRight && (
                <div className={styles['header-right']}>
                    <a className={styles.active} onClick={handleRight} >Sair</a>
                </div>
            )}

        </div>

    );
}

export { Header };
