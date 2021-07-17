import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";

export default function ProfileSidebar(propriedades) {
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
    );
}