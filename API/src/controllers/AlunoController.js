const AlunoService = require("../services/AlunoService");
const turmaService = require("../services/TurmaService");

module.exports = {

    readyAlunos: async (request, response) => {
        let json = { error: "", result: [] }

        let alunos = await AlunoService.searchAlunos()

        for (let i in alunos) {
            json.result.push({
                id: alunos[i].id,
                nome: alunos[i].nome,
                telefone: alunos[i].telefone,
                dataNascimento: alunos[i].dt_nascimento,
                endereco: alunos[i].endereco,
            })
        }

        response.header("Access-Control-Allow-Origin", "*")
        if (json.result.length == 0) {

            response.status(200).json({
                message: "Nenhuma instância de aluno foi cadastrado!"
            })
        } else {
            response.json(json)
        }
    },


    readyAlunosByCurso: async (request, response) => {
        let json = { error: "", result: [] }

        let id = request.params.codigo

        let alunos = await AlunoService.getAlunosByCurso(id)

        for (let i in alunos) {
            json.result.push({
                id: alunos[i].id,
                nome: alunos[i].nome,
                telefone: alunos[i].telefone,
                dataNascimento: alunos[i].dt_nascimento,
                endereco: alunos[i].endereco,
            })
        }
        response.header("Access-Control-Allow-Origin", "*")
        if (json.result.length == 0) {

            response.status(200).json({
                message: "Nenhuma instância de aluno foi cadastrado!"
            })
        } else {
            response.json(json)
        }

    },

    createAluno: async (request, response) => {

        let json = { error: "", result: {} }

        let nome = request.body.nome
        let telefone = request.body.telefone
        let data = request.body.data
        let endereco = request.body.endereco
        let turma = request.body.turma

        if (nome && telefone && data && endereco && turma) {

            let resultTurma = await turmaService.searchTurmaById(turma)

            if (resultTurma.length == 0) {
                json.error = "Turma não encontrada!"
                response.header("Access-Control-Allow-Origin", "*")
                response.status(400).json(json)
            } else {

                console.log(resultTurma)

                let aluno = await AlunoService.creatAluno(
                    nome,
                    telefone,
                    data,
                    endereco,
                    turma
                )

                await turmaService.AddAlunos(turma)

                json.result = {
                    id: aluno.insertId,
                    nome,
                    telefone,
                    data,
                    endereco,
                    turma
                }
                response.header("Access-Control-Allow-Origin", "*")
                response.status(201).json(json)
            }
        }
        else {
            json.error = "Incoplete Fields!"
            response.header("Access-Control-Allow-Origin", "*")
            response.status(400).json(json)
        }
    },


    updateAluno: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.codigo
        let nome = request.body.nome
        let telefone = request.body.telefone
        let data = request.body.data
        let endereco = request.body.endereco

        if (id) {
            let aluno = await alunoService.getAlunosByCursoId(id)
            if (aluno.length == 0) {
                json.error = "Aluno não foi encontrado!"
                response.header("Access-Control-Allow-Origin", "*")
                    .status(200).json(json)

            }
            await AlunoService.updateAluno(
                id,
                nome,
                telefone,
                data,
                endereco
            )

            json.result = {
                id,
                nome,
                telefone,
                data,
                endereco
            }
        }
        else {
            json.error = "Error ID!"
            response.header("Access-Control-Allow-Origin", "*")
            response.status(400).json(json)
        }

        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    },


    deleteAluno: async (request, response) => {
        let json = { error: "", result: "" }

        let id = request.params.codigo

        if (id) {
            let aluno = await AlunoService.getAlunosByID(id)

            if (aluno.length == 0) {
                json.error = "Aluno não foi encontrado!"
                response.header("Access-Control-Allow-Origin", "*")
                response.status(400).json(json)

            } else {
                await AlunoService.deleteAluno(id)
                await turmaService.delAlunos(aluno[0].fk_turma)
                json.result = `aluno ${id} deletado com sucesso!!!`
                response.header("Access-Control-Allow-Origin", "*")
                response.status(200).json(json)
            }

        } else {
            json.error = "Error ID!"
            response.header("Access-Control-Allow-Origin", "*")
                .status(400).json(json)
        }
    }

}