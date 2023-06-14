### Middlewares

É uma função que tem como interceptar uma requisição;
Ele tem acesso a requisição e ao destino da req;

São funções que tem acesso ao objeto de solicitação (requisição), o objeto de resposta(response) e a próxima função de middleware no ciclo solicitação resposta do aplicativo. A próxima função middleware é comumente denotada por uma variável chamada next.


function myMiddleware(request, response, next) {
  console.log('Voce passou pelo middleware')

  if(!request.body.isAdmin) {
    return response.json({message: "user unauthorized"})
  }

  next();
}
usersRoutes.use(myMiddleware) //ex
usersRoutes.post("/", myMiddleware, usersController.create)


### Controlers
 /*
        *um controller pode ter 5 métodos no maximo;
        > função de index - GET para listar vários registros.
        > show - get para exibir um registro específico.
        > create - POST para criar um registro.
        > update - PUT para atualizar um registro
        > delete - delete para remover um registro
    */

# SQL 
Inserindo dados: 
INSERT INTO users
(name, email, password)
VALUES
('birobirobiro', 'birobirobiro@email.com', '123');

Buscando registros na tabela users: 
SELECT * FROM users;

Atualizando registros
UPDATE users SET
avatar = 'birobirobiro.png'
WHERE id = 1

Deletando registros: 
DELETE FROM users 
WHERE id = 3