# App


GymPass style app.

## RFs ( Rquisitos Funcionais )

- [x] Dever ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;


## RNs ( Regras de Negócios ) - sempre vai etsar associadas com um requisito funcional

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado; 
- [x] O usuário não pode fazer dois check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs ( Regras Não Funcionais) - qual banco de dados vou utilizar, paginações ...

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] Todas Listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT ( JSON Web Token );


-> npm install -y
-> npm i typescript @types/node tsx tsup -D
-> npx tsc --init  -> criar o arquivo tsconfig.json
-> tsconfig.json -> mudar o target para "es2020"
-> npm i fastify
-> npm i dotenv
-> npm i zod


No package:

"dev": "tsx watch src/server.ts",  -> rodar em typeScript sem atualizar
"start": "node build/server.js", -> rodar os arquivos em js
"build": "tsup src --out-dir build" -> Criar os arquivos em js

TDD -> Test-drive Develop