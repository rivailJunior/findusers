import React, { useState } from 'react';
import styles from './searchInput.module.scss'
type iSearch = {
    handleSearch: Function,
    placeholder: string
}
const SearchInput = ({ handleSearch, placeholder }: iSearch) => {
    const [name, setName] = useState("");

    const handleChangeName = (evt) => {
        const value = evt.target.value;
        setName(value);
    }

    const search = () => {
        handleSearch(name)
    }
    return (
        <div className={styles.inputContainer}>
            <input className={styles.inputField} onChange={handleChangeName} type="text" name="" data-testid="searchInput" placeholder={placeholder} />
            <button disabled={!name.length} className={!name.length ? styles.disabled : ''} onClick={search}>OK</button>
        </div>
    );
}

export { SearchInput };
