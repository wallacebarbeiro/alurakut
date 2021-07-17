

  export default function ButtonActiveForm({setCriarScrap, setCriarComunidade, setCriarDepoimento}) {

    function handleOQueQuerFazer(key) {
        switch (key) {
          case 'Criar comunidade':
            setCriarScrap(false);
            setCriarDepoimento(false);
            setCriarComunidade(true);
            break;
          case 'Escrever depoimento':
            setCriarComunidade(false);
            setCriarScrap(false);
            setCriarDepoimento(true);
          break;
          case 'Deixar um scrap':
            setCriarComunidade(false);
            setCriarDepoimento(false);
            setCriarScrap(true);
          break;
          default:
            break;
        }
      }

     return (
        <div className="btAcoes">
        <button onClick={({target})=> handleOQueQuerFazer(target.innerText)}>Criar comunidade</button> 
        <button onClick={({target})=> handleOQueQuerFazer(target.innerText)}>Escrever depoimento</button> 
        <button onClick={({target})=> handleOQueQuerFazer(target.innerText)}>Deixar um scrap</button>
       </div>
     ) 
  }
  




