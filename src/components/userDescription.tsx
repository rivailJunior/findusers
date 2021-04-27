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
                {userData?.avatar_url ? (
                    <img src={userData?.avatar_url} alt="Imagem do usuário" />
                ) : (
                    <img src={'/noimg.jpg'} alt="Imagem nao encontrada" />
                )}

            </div>
            <div className={styles.right}>
                <div className={styles.title}>{userData?.email}</div>
                <div className={styles.subTitle}>{userData?.bio}</div>
                <div className={styles.subTitle}>Seguidores: {userData?.followers}</div>
                <div className={styles.subTitle}>Seguindo: {userData?.following}</div>
            </div>
        </div>
    );
}

export { UserDescription };