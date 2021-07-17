import { ProfileRelationsBoxWrapper } from "../ProfileRelations";
import { BoxTheme } from "../Box";

export default function SocialSidebar(propriedades) {  
    return (
      <ProfileRelationsBoxWrapper theme={BoxTheme}>
        <h2 className="smallTitle" >
          {propriedades.socialTitle} ({propriedades.socialList && propriedades.socialList.length})
        </h2>
        <ul>
          {propriedades.socialList && propriedades.socialTitle !== 'Comunidades' ? propriedades.socialList.slice(0, 6).map((itemAtual) => {
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
                  <a href={`/comunities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
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