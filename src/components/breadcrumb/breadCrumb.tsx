import React from 'react';
import styles from './breadCrumb.module.scss'

type Title = {
    onClick(): void,
    label: string,
    active?: boolean
}

type iBread = {
    titles: Title[]
}
const BreadCrumb = ({ titles }: iBread) => {
    return (
        <div className={styles.breadContainer}>
            {titles.map((bread, id) => {
                const isActive = bread.active ? `${ styles.bLabel } ${ styles.active }` : styles.bLabel;
                return <div data-testid="labelBread" key={id} className={isActive} onClick={bread.onClick}>{bread.label}</div>
            })}
        </div>
    );
}

export { BreadCrumb };
export default BreadCrumb;
