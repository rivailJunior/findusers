import React from 'react';
import styles from './header.module.scss'
import { SearchInput } from '../searchInput/searchInput';

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
                <a href="/" className={styles.logo}>{userName}</a>
            </div>
            <div className={styles.headerRight}>
                <div>
                    {handleSearch && <SearchInput handleSearch={handleSearch} placeholder="Buscar Usuario" />}

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
export default Header;
