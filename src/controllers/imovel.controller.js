import { createService, findAllService, countImovel, findByIdService, searchByCidadeService, byUserService, updateService, eraseService } from "../services/imovel.service.js"

export const create = async (req, res) => {

    try {
        const {
            cidade,
            bairro,
            rua,
            numero,
            tipoDeImovel,
            tipoDeNegocio,
            atualDisponibilidade,
            telefoneContato,
            imagemImovel
        } = req.body;

        if (!cidade ||
            !bairro ||
            !rua ||
            !numero ||
            !tipoDeImovel ||
            !tipoDeNegocio ||
            !atualDisponibilidade ||
            !telefoneContato || 
            !imagemImovel) {
            return res.status(400).send({
                message: "Por favor, preencha todos os campos para concluir!",
            })
        }

        await createService({
            cidade,
            bairro,
            rua,
            numero,
            tipoDeImovel,
            tipoDeNegocio,
            atualDisponibilidade,
            telefoneContato, 
            imagemImovel,
            user: req.userId
        })
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

export const findAll = async (req, res) => {
    //PAGINAÇÃO
    try {
        let { limit, offset } = req.query;
        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 5;
        };
        //offset: de onde começa, para não repetir posts já exibidos na tela
        if (!offset) {
            offset = 0;
        };

        const imovel = await findAllService(offset, limit)
        const total = await countImovel();
        const currentUrl = req.baseUrl;

        const next = offset + limit
        const nextUrl =
            next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        // if (imovel.length === 0) {
        //     return res.status(400).send({ message: "Não existe imóveis registrados" })
        // }
        //ENVIAR PARA O CLIENTE PARA MANIPULAÇÃO NO FRONTEND
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: imovel.map((item) => ({
                id: item._id,
                cidade: item.cidade,
                bairro: item.bairro,
                rua: item.rua,
                numero: item.numero,
                tipoDeImovel: item.tipoDeImovel,
                tipoDeNegocio: item.tipoDeNegocio,
                atualDisponibilidade: item.atualDisponibilidade,
                telefoneContato: item.telefoneContato,
                imagemImovel: item.imagemImovel,
                dataAnuncio: item.dataAnuncio
            }))
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

export const findById = async (req, res) => {
    try {
        //NOS MEUS PARÂMETROS VOU TER UM NOME ID, ESSE ID PRECISA SER O MESMO NOME QUE COLOQUEI EM "/:id"
        const { id } = req.params;
        //PROCURAR IMÓVEL: VAI EM SERVICE E TRAZ O ID CAPTURADO NELE, E O DE SERVICE VAI NO BANCO DE DADOS FAZER A BUSCA, POR ISSO O "await"
        const imovel = await findByIdService(id)

        return res.send({
            imovel: {
                id: imovel._id,
                cidade: imovel.cidade,
                bairro: imovel.bairro,
                rua: imovel.rua,
                numero: imovel.numero,
                tipoDeImovel: imovel.tipoDeImovel,
                tipoDeNegocio: imovel.tipoDeNegocio,
                atualDisponibilidade: imovel.atualDisponibilidade,
                telefoneContato: imovel.telefoneContato,
                imagemImovel: imovel.imagemImovel,
                dataAnuncio: imovel.dataAnuncio,
                name: imovel.user.name,
                username: imovel.user.username,
                userAvatar: imovel.user.avatar

            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export const searchByCidade = async (req, res) => {
    try {
        const { cidade } = req.query;
        const imovel = await searchByCidadeService(cidade);

        if (!imovel || imovel.length === 0) {
            return res.status(400).send({ message: "Não existe imóveis cadastrados nessa cidade"});
        }
        return res.send({
            results: imovel.map((item => ({
                id: item._id,
                cidade: item.cidade,
                bairro: item.bairro,
                rua: item.rua,
                numero: item.numero,
                tipoDeImovel: item.tipoDeImovel,
                tipoDeNegocio: item.tipoDeNegocio,
                atualDisponibilidade: item.atualDisponibilidade,
                telefoneContato: item.telefoneContato,
                imagemImovel: item.imagemImovel,
                dataAnuncio: item.dataAnuncio
            })))
        })

    //res.status(200).send({ results });
    } catch (err) {
        //console.error(err)
        res.status(500).send({ message: "Erro interno no servidor" });
    }
};

export const byUser = async (req, res) => {
    try {
        const id = req.userId
        const imovel = await byUserService(id)

        return res.send({
            results: imovel.map((item) => ({
                id: item._id,
                cidade: item.cidade,
                bairro: item.bairro,
                rua: item.rua,
                numero: item.numero,
                tipoDeImovel: item.tipoDeImovel,
                tipoDeNegocio: item.tipoDeNegocio,
                atualDisponibilidade: item.atualDisponibilidade,
                telefoneContato: item.telefoneContato,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
    
            }))
        })  
    } catch (err) {
        res.status(500).send({ message: "Erro interno no servidor" });
    }
}

export const update = async (req, res) => {
    try {
        const { 
            cidade,
            bairro,
            rua,
            numero,
            tipoDeImovel,
            tipoDeNegocio,
            atualDisponibilidade,
            telefoneContato,
            imagemImovel } = req.body;
        const {id} = req.params;

        if (!cidade &&
            !bairro &&
            !rua &&
            !numero &&
            !tipoDeImovel &&
            !tipoDeNegocio &&
            !atualDisponibilidade &&
            !telefoneContato && 
            !imagemImovel) {
            return res.status(400).send({
                message: "Por favor, preencha ao menos um campo para concluir a atualização!",
            })
        }

        const imovel = await findByIdService(id);

        if(String(imovel.user._id) !== req.userId){
            return res.status(400).send({message: "Você não pode atualizar esta postagem!"})
        }

        await updateService(
            id, 
            cidade,
            bairro,
            rua,
            numero,
            tipoDeImovel,
            tipoDeNegocio,
            atualDisponibilidade,
            telefoneContato, 
            imagemImovel)

            return res.send({message: "Imóvel atualizado com sucesso!"})
    } catch (err) {
        res.status(500).send({ message: "Erro interno no servidor" });
    }
}

export const erase = async (req, res) => {
    try {
        
        const {id} = req.params;

        const imovel = await findByIdService(id);
//SE A PESSOA QUE CRIOU ESSE ID É A MESMA QUE ESTÁ LOGADA
        if(String(imovel.user._id) !== req.userId){
            return res.status(400).send({message: "Você não pode deletar esta imóvel!"})
        }

        await eraseService(id);

        return res.send({ message: "Imóvel deletado com sucesso!"})
    } catch (err) {
        res.status(500).send({ message: "Erro interno no servidor" });
}

}