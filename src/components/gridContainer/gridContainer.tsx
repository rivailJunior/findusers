import React, { Children } from 'react';
import styles from './container.module.scss'
type iContainer = {
    children?: JSX.Element[] | JSX.Element
}
const GridContainer = ({ children }: iContainer): JSX.Element => {
    return (
        <div data-testid="gridContainer" className={styles.mainContainer}>
            {Children.map(children, (child) => {
                return child
            })}
        </div>
    );
}

type iItem = {
    size: number,
    children?: JSX.Element[] | JSX.Element
}
const GridContainerItem = ({ size, children }: iItem): JSX.Element => {
    const itemSize = `containerItem${ size }`
    return (
        <div data-testid="gridContainerItem" className={styles[itemSize]}>
            {Children.map(children, (child) => {
                return child
            })
            }</div>
    )
}

export { GridContainer, GridContainerItem };
