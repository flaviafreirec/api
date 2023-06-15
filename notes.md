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