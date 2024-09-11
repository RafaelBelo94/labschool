const database = require('../database')

module.exports = {
    //metodo para pesquisar todos os alunos
    searchAlunos: () => {
        return new Promise(
            (accepted, rejected) => {
                database.query("SELECT * FROM aluno", (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)

                })
            })

    },


    //metodo para pesquisar os alunos por curso
    getAlunosByCurso: (codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(`SELECT * FROM aluno WHERE fk_turma = ${codigo}`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })
    },


    //Método para pesquisar um aluno pelo seu ID
    getAlunosByID: (id) => {
        return new Promise((accepted, rejected) => {
            database.query(`SELECT * FROM aluno WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })

    },

    //Método para cadastrar um aluno
    creatAluno: (nome, telefone, data, endereco, turma) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `INSERT INTO aluno (nome, telefone, dt_Nascimento, endereco, fk_turma) VALUES 
                ('${nome}', '${telefone}', '${data}', '${endereco}', ${turma})`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })
    },
    //Método para atualizar um aluno
    updateAluno: (id, nome, telefone, data, endereco) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `UPDATE aluno SET nome = '${nome}', telefone = '${telefone}', dt_Nascimento = '${data}', endereco = '${endereco}' WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })
    },
    //Método para deletar um aluno
    deleteAluno: (id) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `DELETE FROM aluno WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })
    }
}