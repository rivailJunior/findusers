const breadCrumbTitles = [{ label: 'Descrição usuário/', onClick: () => { }, active: true }]
const bread404Titles = [{ label: 'Descrição usuário/', onClick: () => { }, active: true },
{ label: 'Detalhes do repositório/', onClick: null }]

const breadCrumbTitlesRepository = [...breadCrumbTitles].concat({
    label: 'Descrição repositório/', onClick: null, active: false
})

export { bread404Titles, breadCrumbTitles, breadCrumbTitlesRepository }