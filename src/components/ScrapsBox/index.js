import Box from "../Box";

export default function ScrapsBox({lista}) {
    return (
        <Box>
        <h2 className="smallTitle" >
            Recados ({lista && lista.length})
        </h2>
        <ul className="scrapsBox">
        {lista && lista.map((itemAtual) => {
            let data = new Date(itemAtual.datetime);
                return (
                <li key={itemAtual.id}>               
                    <img src={`https://github.com/${itemAtual.usuario}.png`} />
                    <div>
                        <span>
                        <b>{`${itemAtual.usuario} escreveu:`} </b>
                        <br/>
                        <i>{`${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`}</i>
                        </span>
                        <span>{itemAtual.scrapText}</span>                    
                    </div>                   
                </li>
                )})
            }
        </ul>     
        </Box>
    );
}