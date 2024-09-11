const database = require('../database')

module.exports = {
    //metodo para pesquisar todas as Turmas
    searchTurma: () => {
        return new Promise(
            (accepted, rejected) => {
                database.query("SELECT * FROM turma", (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)

                })
            })

    },

        //Método para consultar a turma pela sua referência "id".
        searchTurmaById:(codigo) => {
            return new Promise(
                (accepted, rejected) => {
                    database.query(
                        `SELECT * FROM turma WHERE id = ${codigo}`,
                        (error, results) => {
                            if (error) {
                                rejected(error)
                                return
                            }
                            accepted(results)
                        }
                    )
                }
            )
    
        },

    //Método para criar turma
    createTurma: (nome, descricao, quantidadeDeAlunos) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `INSERT INTO turma (nome, descricao, quantidade_alunos) VALUES 
                ('${nome}', '${descricao}', '${quantidadeDeAlunos}')`,
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
    //Método para atualizar uma turma
    updateTurma: (id, nome, descricao, quantidadeDeAlunos) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `UPDATE turma SET nome = '${nome}', descricao = '${descricao}', quantidade_alunos = '${quantidadeDeAlunos}' WHERE id = ${id}`,
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
    //Método para deletar uma turma
    deleteTurma: (id) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `DELETE FROM turma WHERE id = ${id}`,
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
    //método para adicionar uma turma
    AddAlunos: (id) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `UPDATE turma SET quantidade_alunos = quantidade_alunos + 1 WHERE id = ${id}`,
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

    delAlunos: (id) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `UPDATE turma SET quantidade_alunos = quantidade_alunos - 1 WHERE id = ${id}`,
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