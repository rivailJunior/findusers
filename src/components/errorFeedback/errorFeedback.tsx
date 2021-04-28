import React from 'react';
import styles from './errorFeedback.module.scss';

type iErrorFeedback = {
    title: string
    subTitle?: string
}
const ErrorFeedback = ({ title, subTitle }: iErrorFeedback) => {
    return (
        <div className={styles.errorContainer}>
            <div>{title}</div>
            {subTitle && <div data-testid="subTitleError" className={styles.subTitle}>{subTitle}</div>}
        </div>
    );
}

export { ErrorFeedback };
