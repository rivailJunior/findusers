import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import useSession from '../../context/useSession'
import useRepositories from '../../context/useRepositories'
import { GridContainer, GridContainerItem } from '../../components/gridContainer/gridContainer'
import { ErrorFeedback } from '../../components/errorFeedback/errorFeedback'
import Header from '../../components/header/header'
import { UserDescription } from '../../components/userDescription/userDescription'
import { useRouter } from 'next/router'
import { InformationCard } from '../../components/informationCard/informationCard'
import BreadCrumb from '../../components/breadcrumb/breadCrumb'
import moment from 'moment'
import styles from './index.module.scss';
import { bread404Titles, breadCrumbTitlesRepository } from '../../utils/breadCrumbTitles'
import { validateSession } from '../../utils/validateUserWithNoSession'

const Index = (): JSX.Element => {
    const router = useRouter()
    const { user, removeSession, loggedUser } = useSession()
    const { getRepositoryByName, repository } = useRepositories()
    const breadCrumb = breadCrumbTitlesRepository;
    breadCrumb[0].onClick = () => router.push('/user')
    const bread404 = bread404Titles;
    useEffect(() => {
        if (router.query?.repository && router.query?.owner) {
            const repoName: string | any = router.query?.repository;
            getRepositoryByName(user.login, repoName)
        }
    }, []);

    return (
        <div>
            <Header userName={loggedUser?.name} labelRight="Sair" handleRight={() => removeSession()} />
            {!router.query?.repository && !repository?.id ? (
                <GridContainer>
                    <GridContainerItem size={12}>
                        <BreadCrumb titles={bread404} />
                    </GridContainerItem>
                    <GridContainerItem size={12}>
                        <ErrorFeedback title="Você precisa selecionar um repositório" />
                    </GridContainerItem>
                </GridContainer>
            ) : (
                <GridContainer>
                    <GridContainerItem size={12}>
                        <BreadCrumb titles={breadCrumb} />
                    </GridContainerItem>

                    <GridContainerItem size={12}>
                        <UserDescription userData={user} />
                    </GridContainerItem>

                    <GridContainerItem size={3}>
                        <div className={styles.informationsDiv}>
                            <span>Repositório: <a target="_blank" style={{ fontStyle: 'italic' }} href={repository?.html_url}>{repository?.name}</a></span>
                        </div>
                    </GridContainerItem>
                    <GridContainerItem size={3}>
                        <div className={styles.informationsDiv}>
                            <span>Branch: <span className={styles.informations}>{repository?.default_branch} </span></span>
                        </div>
                    </GridContainerItem>
                    <GridContainerItem size={3}>
                        <div className={styles.informationsDiv}>
                            <span>Publ.: <span className={styles.informations}>{moment(repository?.created_at).format('DD/MM/YYYY')}</span></span>

                        </div>
                    </GridContainerItem>
                    <GridContainerItem size={3}>
                        <div className={styles.informationsDiv}>
                            <span>Atuali.: {moment(repository?.updated_at).format('DD/MM/YYYY')}</span>
                        </div>
                    </GridContainerItem>


                    <GridContainerItem size={6}>
                        <InformationCard title="Language" mainText={repository?.language} />
                    </GridContainerItem>
                    <GridContainerItem size={6}>
                        <InformationCard title="Estrelas" mainText={`${ repository?.stargazers_count }`} />
                    </GridContainerItem>
                    <GridContainerItem size={12}>
                        <InformationCard title="Descrição" isDescription mainText={repository?.description} />
                    </GridContainerItem>
                </GridContainer >
            )}
        </div >
    )
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
}) => {
    return await validateSession(req, res)
}
export default Index
