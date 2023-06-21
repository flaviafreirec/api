# SQL Query Builder 
> É um construtor de consulta;
> Permite que a gente gere instruções SQL independente do banco de dados;

> utilizando a sintaxe da querybuilder nos escrevemos, e o query gera o código para o banco q eu pedir para ele gerar, permitindo a alteração futura;

# Knex.js
> Query Builder

npm install knex --save;
npx knex init (gera o arquivo knexfile.js);

configurar aquivo knexfile.js 
criar pasta e index para o knex e conecta-lo com o arquivo knexfile.js p/ exportar


# Migrations
É uma forma de versionar a base de dados;
Migrations trabalha na manipulação da base de dados: criando, alterando ou removendo.
Similar ao sentido do git, pois mantém o registro das alterações p/ poder ser editado
> Dois métodos
  >> UP 
  ~> criar ou alterar algo no nosso banco de dados;
  >> DOWN
  ~> responsável pelo rollback, ou seja, desfazer as alterações realizadas pelas migrations;

  npx knex migrate:make createNotes

  
exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
  table.integer("user_id").references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("notes");


# NPM
> Node Package Manager é o gerenciador de pacotes padrão para Node.js;
> Os pacotes e módulos necessários no projeto node são instalados usando npm;
> e também usamos para executar scripts e bibliotecas instaladas;

# NPX
> Node Package Execute e vem com o npm acima da versão 5.2;
> É um executador de pacotes npm que pode executar qualquer pacote que vc quiser do registro npm sem necessariamente estar instalado no nosso projeto;
> é mais focado em executar;

# Primary Key e Foreign Key
> Primária é um campo único dentro da tabela, não existe possibilidade de ser duplicado (geralmente ID, por ex);
> Chave estrangeira é gerada em outra tabela, por ex, na tabela de notas temos o ID que foi gerado na tabela de usuarios ou na tabela de tags tem o id do user E da nota, para vincular com a nota certa;

# Cardinalidade
> É a frequência que uma tabela se relaciona com outra;
> "PÉ de galinha" ou letras/números para representar uma relação frequente, por ex um user pode ter várias notas
> Duas direções (de onde vem e onde fecha)


# WhereLike
> wherelike ajuda a buscar por valores que contenham dentro da palavra

    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`) //usamos dessa forma para buscar palavras similares
        .orderBy("title");
    }

# Where 
.where({ user_id }): Esta linha aplica uma cláusula WHERE na consulta, filtrando os resultados com base no valor da variável user_id. A sintaxe { user_id } é uma forma abreviada de { user_id: user_id }, onde o valor da variável user_id é usado para filtrar os registros com o mesmo valor nessa coluna.


# Busca na tabela
notes = await knex("notes"): Nesta linha, a variável notes está sendo atribuída com o resultado de uma consulta ao banco de dados usando o objeto knex. A função knex("notes") indica que estamos acessando a tabela chamada "notes".


# Inner Join 
> Serve para fazer a junção de 2 tabelas e trazer um resultado conjunto desses dados.
> Não irá unir de fato, mas irá selecionar os resultados das 2 em uma única consulta.
> Verifica os registros em comum entre as 2
> Ex:
tabela tags       |  tabela notes 
id  name  noteid  | id tittle
1   tag1  1       -> 1  nota1
2   tag2  1       ^ 


# Função map e filter
const tags = [
  {id: 1, name: "node", note_id: 1},
  {id: 2, name: "express", note_id: 1},
  {id: 3, name: "react", note_id: 1},
  {id: 4, name: "javascript", note_id: 2},
  {id: 5, name: "frontend", note_id: 2},
];


/*MAP é uma função do javascript para percorrer cada elemento do array e ele devolve um novo array*/ 

/* const newArray = tags.map(tag => {
  return {...tag,
  date: new Date()}
});

console.log(newArray); */

/*FILTER quer filtrar o conteudo do seu array */

const newArray = tags.filter(tag => tag.note_id === 1);
console.log(newArray)


