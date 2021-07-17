import MainGrid from '../src/components/MainGrid';
import jwt from 'jsonwebtoken';
import Box from '../src/components/Box';
import nookies from 'nookies';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { useEffect, useState } from 'react';
import ButtonActiveForm from '../src/components/ButttonActiveForm';
import Form from '../src/components/Form';
import ScrapsBox from '../src/components/ScrapsBox';
import ProfileSidebar from '../src/components/ProfileSidebar';
import SocialSidebar from '../src/components/SocialSidebar';




export default function Home(props) {

  // const githubUser = 'wallacebarbeiro';
  const githubUser = props.githubUser;
  const pessoasFavoritas = [
    {'id': 1, 'login': 'juunegreiros'},
    {'id': 2, 'login': 'omariosouto'},
    {'id': 3, 'login':'peas'},
    {'id': 4, 'login':'rafaballerini'},
    {'id': 5, 'login':'marcobrunodev'},
    {'id': 6, 'login':'felipefialho'}
  ]
  const [amigos, setAmigos] = useState(null);
  const [criarComunidade, setCriarComunidade] = useState(false);
  const [criarDepoimento, setCriarDepoimento] = useState(false);
  const [criarScrap, setCriarScrap] = useState(false);
  const [comunidades, setComunidades] = useState([])
  const [scraps, setScraps] = useState([])
  const [validarFormComunidade, setValidarFormComunidade] = useState(false);
  const [validarFormScrap, setValidarFormScrap] = useState(false);

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

    // API GRAPHQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers :{
        'Authorization': '79813eaf01695b232afb92067854a7',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body : JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          link
          creatorSlug
        }
      }`})    
    })
    .then(response => response.json())
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers :{
        'Authorization': '79813eaf01695b232afb92067854a7',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body : JSON.stringify({ "query": `query {
        allScraps {
          id
          scrapText
          usuario
          imageurl
          datetime
        }
      }`})    
    })
    .then(response => response.json())
    .then((respostaCompleta) => {
      const scrapsVindosDoDato = respostaCompleta.data.allScraps;
      setScraps(scrapsVindosDoDato);
    });
  },[]);

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

          <ButtonActiveForm 
          setCriarScrap={setCriarScrap} 
          setCriarComunidade={setCriarComunidade}  
          setCriarDepoimento={setCriarDepoimento} />
         
          {criarComunidade  && 
          <Form 
          comunidades={comunidades} 
          setComunidades={setComunidades} 
          validarFormComunidade={validarFormComunidade}
          setValidarFormComunidade={setValidarFormComunidade}
          githubUser={githubUser}
          criarComunidade={criarComunidade}
          />}

          {criarScrap  && 
          <Form
          scraps={scraps}
          setScraps={setScraps}  
          validarFormScrap={validarFormScrap} 
          setValidarFormScrap={setValidarFormScrap}
          criarScrap={criarScrap}
          />}
                      
          </Box>
          {scraps.length > 0 && <ScrapsBox lista={scraps} />}         
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>     
          <SocialSidebar socialList={amigos} socialTitle="Amigos" />
          <SocialSidebar socialList={pessoasFavoritas} socialTitle="Pessoas da comunidade" />
          <SocialSidebar socialList={comunidades} socialTitle="Comunidades" />    
        </div>

      </MainGrid>
    </>
  )
}
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  // const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
  //   headers: {
  //       Authorization: token
  //     }
  // })
  // .then((resposta) => resposta.json())

  const { githubUser } = jwt.decode(token);

  const isAuthenticated = await fetch(`https://github.com/${githubUser}/`)
  .then(async(resposta)=> {
    if(resposta.status === 404){
      return false;
    }else{
      return true;
    }
  });


  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }



  
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 