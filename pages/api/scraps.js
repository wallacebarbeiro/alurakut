import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST'){
        const TOKEN = '540a5ef1ac203422af47a555d98e23';
        const client = new SiteClient(TOKEN);
        const registroCriado = await client.items.create({
            itemType: "972757",
            ...request.body,
        })
    
        response.json({
            dados : 'Algum item criado',
            registroCriado : registroCriado,
        });
        return;
    }

    response.status(404).json({
        message : 'Ainda não temos nada no GET, mas no POST tem!'
    })    
}