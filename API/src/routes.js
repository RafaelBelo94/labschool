const express = require('express');
const routes = express.Router();
const alunoController = require("./controllers/AlunoController");
const turmaController = require("./controllers/TurmaController");
const cors = require("cors");

routes.options("*", cors)


//endpints - alunos
routes.get('/alunos', alunoController.readyAlunos); //READY
routes.get('/alunos/:codigo', alunoController.readyAlunosByCurso); //READY
routes.post('/aluno', alunoController.createAluno); //CREATE
routes.put('/aluno/:codigo', alunoController.updateAluno); //UPDATE
routes.delete('/aluno/:codigo', alunoController.deleteAluno); //DELETE


//endpoints - turma
routes.get('/turma', turmaController.readyTurma); //READY
routes.post('/turma', turmaController.createTurma); //CREATE
routes.put('/turma/:codigo', turmaController.updateTurma); //UPDATE
routes.delete('/turma/:codigo', turmaController.deleteTurma); // DELETE


module.exports = routes;