import { useState } from "react";
import Input from "../Input";

export default function Form(props){

    const [criando, setCriando] = useState(false);

if(props.criarScrap) {
    function handleCriaScrap(e) {
        e.preventDefault();
        const dadosDoForm = new FormData(e.target);
        const scrap = {      
          scrap_text: dadosDoForm.get('scrapText'),
          usuario: dadosDoForm.get('usuario'),
          imageurl: `https://github.com/${dadosDoForm.get('usuario')}.png`,
          datetime: new Date()
        } 
        if(scrap.scrap_text || scrap.usuario){
          setCriando(true);    
          fetch('/api/scraps', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(scrap)
          })
          .then( async (response)=>{
            const dados = await response.json();
            const scrapsAtualizados = [...props.scraps, dados.registroCriado];
           
            props.setScraps(scrapsAtualizados);
            props.setValidarFormScrap(false);
            setCriando(false);
          })     
        }else{ 
            props.setValidarFormScrap(true);
            setCriando(false);
        }
      }
    return (
        <form onSubmit={handleCriaScrap}>
            <Input 
            placeholder="Qual vai ser o scrap?" 
            name="scrapText" 
            ariaLabel="Qual vai ser o scrap?"
            type="text"
            />
            <Input 
            placeholder="Qual o seu usuário?" 
            name="usuario" 
            ariaLabel="Qual o seu usuário?"
            type="text"
            />                            
            {props.validarFormScrap && <p className="atencaoValidacao">Atenção os campos são obrigatórios.</p>}
            {criando ? <button disabled>Criando...</button> :  props.criarScrap && <button>Criar scrap</button>}            
        </form>
    )
    } else if(props.criarComunidade){
        function handleCriaComunidade(e) {
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);
            const comunidade = {      
              title: dadosDoForm.get('title'),
              image_url: dadosDoForm.get('image') ? dadosDoForm.get('image') : `https://picsum.photos/200?${Math.floor(Math.random() * 999)}`,
              link: dadosDoForm.get('link'),
              creatorSlug: props.githubUser,
            } 
            if(comunidade.title || comunidade.link){  
              setCriando(true);      
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then( async (response)=>{
                const dados = await response.json();
                const comunidadesAtualizadas = [...props.comunidades, dados.registroCriado];
                console.log(comunidadesAtualizadas)
                props.setComunidades(comunidadesAtualizadas);
                props.setValidarFormComunidade(false);
                setCriando(false); 
              })     
            }else{ 
                props.setValidarFormComunidade(true);
                setCriando(false); 
            }
        }
        return (
            <form onSubmit={handleCriaComunidade}>
              <Input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              ariaLabel="Qual vai ser o nome da sua comunidade?"
              type="text"
              />
              <Input 
              placeholder="Coloque uma URL para usar de capa ou deixe com a gente :)" 
              name="image" 
              ariaLabel="Coloque uma URL para usar de capa ou deixe com a gente :)" 
              type="text"              
              />
              <Input 
              placeholder="Insira o link da comunidade" 
              name="link" 
              ariaLabel="Insira o link da comunidade"
              type="text"  
              />
            {props.validarFormComunidade && <p className="atencaoValidacao">Atenção os campos Nome e Link são obrigatórios.</p>}
            {criando ? <button disabled>Criando...</button> : props.criarComunidade && <button>Criar comunidade</button>}        
          </form>
        )
    }
    return false;    
}