const turmaService = require("../services/TurmaService");

module.exports = {

    readyTurma: async (request, response) => {
        let json = { error: "", result: [] }

        let turma = await turmaService.searchTurma()

        for (let i in turma) {
            json.result.push({
                id: turma[i].id,
                nome: turma[i].nome,
                descricao: turma[i].descricao,
                quantidadeDeAlunos: turma[i].quantidade_alunos
            })
        }
        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    },

    createTurma: async (request, response) => {

        let json = { error: "", result: {} }

        let nome = request.body.nome
        let descricao = request.body.descricao
        let quantidadeDeAlunos = request.body.quantidadeDeAlunos

        if (nome && descricao && quantidadeDeAlunos) {
            let turma = await turmaService.createTurma(
                nome,
                descricao,
                quantidadeDeAlunos
            )

            json.result = {
                id: turma.insertId,
                nome,
                descricao,
                quantidadeDeAlunos
            }
        }
        else {
            json.error = "Incoplete Fields!"
        }

        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    },

    updateTurma: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.codigo
        let nome = request.body.nome
        let descricao = request.body.descricao
        let quantidadeDeAlunos = request.body.quantidadeDeAlunos

        if (id) {
            await turmaService.updateTurma(
                id,
                nome,
                descricao,
                quantidadeDeAlunos
            )

            json.result = {
                id,
                nome,
                descricao,
                quantidadeDeAlunos
            }
        }
        else {
            json.error = "Error ID!"
        }

        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    },

    deleteTurma: async (request, response) => {
        let json = { error: "", result: "" }

        let id = request.params.codigo
        if (id) {
            await turmaService.deleteTurma(
                id
            )

            json.result = `turma ${id} deletada com sucesso!!!`
        }else {
            json.error = "Error ID!"
        }
        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    }


}