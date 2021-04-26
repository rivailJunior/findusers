import React from 'react';
import styles from './header.module.scss'
import { SearchInput } from './searchInput';

type iHeader = {
    userName?: string,
    labelRight?: string,
    handleRight?(): Function
    handleSearch?: Function
}

const Header = ({ userName, labelRight, handleRight, handleSearch }: iHeader): JSX.Element => {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <a href="#default" className={styles.logo}>{userName}</a>
            </div>
            <div className={styles.headerRight}>
                <div>
                    <SearchInput handleSearch={handleSearch} placeholder="Buscar Usuario" />
                    {labelRight && (
                        <div className={styles['header-right']}>
                            <a className={styles.active} onClick={handleRight} >Sair</a>
                        </div>
                    )}
                </div>

            </div>
        </div>

    );
}

export { Header };
