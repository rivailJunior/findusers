import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { handleRedirect, handleSession } from '../../utils/sessionValidate'
import useSession from '../../context/useSession'
import useRepositories from '../../context/useRepositories'
import { GridContainer, GridContainerItem } from '../../components/gridContainer'
import { ErrorFeedback } from '../../components/errorFeedback'
import Header from '../../components/header'
import { UserDescription } from '../../components/userDescription'
import { useRouter } from 'next/router'
import { InformationCard } from '../../components/informationCard'
import BreadCrumb from '../../components/breadCrumb'
import moment from 'moment'
import styles from './index.module.scss';
import { bread404Titles, breadCrumbTitlesRepository } from '../../utils/breadCrumbTitles'

const Index = (): JSX.Element => {
    const router = useRouter()
    const { user, removeSession } = useSession()
    const { getRepositoryByName, repository } = useRepositories()
    const breadCrumb = breadCrumbTitlesRepository;
    breadCrumb[0].onClick = () => router.back()
    const bread404 = bread404Titles;
    useEffect(() => {
        if (router.query?.repository) {
            const repoName: string | any = router.query?.repository;
            getRepositoryByName(user.login, repoName)
        }
    }, []);

    useEffect(() => {
    }, [repository])

    return (
        <div>
            <Header userName={user?.name} labelRight="Sair" handleRight={() => removeSession()} />
            {!router.query?.repository ? (
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

                    <GridContainerItem size={12}>
                        <div className={styles.informationsDiv}>
                            <span>Repositório: <a target="_blank" href={repository?.html_url}>{repository?.name}</a></span>
                            <span>Branch: {repository?.default_branch}</span>
                            <span>Publ.: {moment(repository?.created_at).format('DD/MM/YYYY')}</span>
                            <span>Atualização: {moment(repository?.updated_at).format('DD/MM/YYYY')}</span>
                        </div>
                    </GridContainerItem>


                    <GridContainerItem size={4}>
                        <InformationCard title="Language" mainText={repository?.language} />
                    </GridContainerItem>
                    <GridContainerItem size={4}>
                        <InformationCard title="Estrelas" mainText={repository?.stargazers_count} />
                    </GridContainerItem>
                    <GridContainerItem size={4}>
                        <InformationCard title="Descrição" mainText={repository?.description} />
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
    try {
        const accessToken = handleSession(req, res);
        if (!accessToken) handleRedirect(req, res);
        return {
            props: {}
        }
    } catch (err) {
        if (err === 'bad_verification_code' || err?.response?.status === 401) {
            handleRedirect(req, res)
        }
        return {
            props: {}
        }
    }
}
export default Index
