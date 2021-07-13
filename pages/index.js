import MainGrid from '../src/components/MainGrid';
import Box, {BoxTheme} from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { useEffect, useState } from 'react';


function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      { propriedades.githubUser && <img src={`https://github.com/${propriedades.githubUser}.png`} alt=""  style={{borderRadius: '8px'}}/>}
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>      
      <hr />
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function SocialSidebar(propriedades) {  
  return (
    <ProfileRelationsBoxWrapper theme={BoxTheme}>
      <h2 className="smallTitle" >
        {propriedades.socialTitle} ({propriedades.socialList && propriedades.socialList.length})
      </h2>
      <ul>
        {propriedades.socialList && propriedades.socialTitle === 'Amigos' ? propriedades.socialList.slice(0, 6).map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/users/${itemAtual.login}`}>
                  <img src={`https://github.com/${itemAtual.login}.png`} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            ) }) :  propriedades.socialList && propriedades.socialList.slice(0, 6).map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={itemAtual.link}>
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}          
      </ul>
      {propriedades.socialList && propriedades.socialList.length > 6 && <div><hr/><p><a className="vertodos">Ver todos</a></p></div>}
    </ProfileRelationsBoxWrapper>  
  )
}

export default function Home() {

  const githubUser = 'wallacebarbeiro';
  const [amigos, setAmigos] = useState(null);
  const [comunidades, setComunidades] = useState([{
    id: '12',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    link : "#",
  }])

  const [validarForm, setValidarFrom] = useState(false);

  useEffect(() => {
    async function getSeguidores(usuario) {
      try {
        const response = await fetch(`https://api.github.com/users/${usuario}/followers`);
        const data = await response.json();
        setAmigos(data);
        return data;    
      } catch (error) {
        return error.message;
      }
    }
    getSeguidores(githubUser);
  },[]);

  function handleCriaComunidade(e) {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);
    const comunidade = {
      id: new Date().toISOString,
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image') ? dadosDoForm.get('image') : `https://picsum.photos/200?${Math.floor(Math.random() * 999)}`,
      link: dadosDoForm.get('link'),
    } 
    if(comunidade.titulo || comunidade.link){
      const comunidadesAtualizadas = [...comunidades, comunidade];
      setComunidades(comunidadesAtualizadas);
      setValidarFrom(false);
    }else{ 
      setValidarFrom(true);
    }
  }

  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>
            <OrkutNostalgicIconSet confiavel={3} legal={2} sexy={1}/>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCriaComunidade}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usar de capa ou deixe com a gente :)" 
                name="image" 
                aria-label="Coloque uma URL para usar de capa ou deixe com a gente :)"               
                />
              </div>
              <div>
                <input 
                placeholder="Insira o link da comunidade" 
                name="link" 
                aria-label="Insira o link da comunidade"               
                />
              </div>
              {validarForm && <p className="atencaoValidacao">Atenção os campos Nome e Link são obrigatórios.</p>}
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>     
          <SocialSidebar socialList={amigos} socialTitle="Amigos" />
          <SocialSidebar socialList={comunidades} socialTitle="Comunidades" />    
        </div>
      </MainGrid>
    </>
  )
}
