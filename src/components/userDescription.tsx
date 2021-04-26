import React from 'react';
import { User } from '../model/user';
import styles from './userDescription.module.scss'

type iDescription = {
    userData: User
}
const UserDescription = ({ userData }: iDescription): JSX.Element => {
    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <img src={userData?.avatar_url} alt="" />
            </div>
            <div className={styles.right}>
                <div className={styles.title}>{userData?.email}</div>
                <div className={styles.subTitle}>{userData?.bio}</div>
                <div className={styles.subTitle}>Followers: {userData?.followers}</div>
                <div className={styles.subTitle}>Following: {userData?.following}</div>
            </div>
        </div>
    );
}

export { UserDescription };