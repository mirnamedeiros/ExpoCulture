# ExpoCulture API

### Utilização da API expoculture

API para salvar e manipular os eventos e outras informações do **ExpoCulture** no banco de dados.

### Pré inicialização

Criar um database no mysql, execute o script abaixo no seu banco dados:

CREATE DATABASE expoculture CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Após a criação do database, modifique o arquivo .env com as configurações do banco de dados.

Depois de modificar o arquivo, Execute os scripts abaixo para instalar as dependencias do node e também criar as tabelas no banco da dados no terminal:

npm install

npx sequelize-cli db:migrate

### Inicializar a API

Para iniciar o servidor, execute o script abaixo no terminal:

node app.js
