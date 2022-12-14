## Instruções

<p>São apenas instuções de uma forma geral sobre a criação do projeto, em seu passo a passo. É a minha forma de não esquecer, e deixar como histórico, para consultas futuras.</p>

<hr>

### Criando o projeto

-   Para iniar um novo projeto Node.js, rodar o comando `npm init` no terminal do VS Code. Esse comando criará o arquivo `package.json`
    -   Se informada a flag `-y`, você pula as perguntar que o Node irá fazer, criando o arquivo instantaneamente. Porém, isso significa que terá que alterar manualmente depois.

<hr>

### Typescript

-   Rodar o comando abaixo no terminal:

    > npm i -D typescript ts-node-dev @types/node

    <br>

    -   Esse comando indica a instalação do `typescript` no projeto, utilizando o `ts-node-dev` como servidor de desenvolvimento.
    -   Além disso, é acrescentada a instrução `@types/node` para já termos as tipagens do Node no projeto.

    <br>

-   Após a instação do Typescript, o comando `tsc` deverá estar diponível no terminal. Vamos usar ele para iniciar o arquivo `tsconfig.json` no projeto. Para isso, rodar o comando abaixo:

    > tsc --init -- rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

    <br>

    -   Tirando o trexo `tsc --init`, as demais instruções são flags que já estou deixando configurado no momento da criação deste arquivo, nada impede de serem feitas manualmente, ou atualizadas.
    -   Em sua grande maioria, são auto-explicativas.

<hr>

### Versionamento usando GIT

-   Para utilização do versionamento do GIT, recomando deixar o arquivo `.gitignore` com as seguintes instruções:
    -   _Ou veja como está o arquivo deste projeto e copie_

```
  .idea/
  .vscode/
  node_modules/
  build/
  temp/
  .env
  coverage
  ormconfig.json
  dist

  uploads/*
  !uploads/.gitkeep
```

<hr>

### Configuração inicial dos scripts do projeto

-   Devemos criar um script para pôr o nosso servidor de pé, e para isso, no arquivo `package.json` crie um novo script:

```
"scripts": {
    "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"
}
```

> A execução se dá pelo comando `npm run dev`

<br>

#### Detalhamento do comando

| Comando          | Descrição                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| dev              | É apenas um apelido para o comando, podendo ser literalmente qualquer coisa                                         |
| ts-node-dev      | É o servidor do Typescript                                                                                          |
| --inspect        | Flag que indica que o comando ficará inspecionando as alterações                                                    |
| --transpile-only | Flag que indica que fará a transpilação do código para Javascript                                                   |
| --ignore-watch   | Flag que indica que deverá ignorar alguma pasta, sendo especificada logo em seguida. Neste caso, é a `node_modules` |
| src/server.ts    | É o end-point, onde que o arquivo do servidor está localizado                                                       |

<br>
<hr>

### Configurações de Lint

1. EditorConfig

    - Precisa ter a extensão `EditorConfig for VS Code` instalada
    - Depois de instalada, é só clicar com o botão direito na raiz do projeto e gerar o `.editorconfig`
    - Normalmente eu gosto dele assim:

    ```
    root = true

    [*]
    indent_style = space
    indent_size = 4
    end_of_line = lf
    charset = utf-8
    trim_trailing_whitespace = false
    insert_final_newline = true
    ```

2. ESLint

    - Precisa ter também a extensão instalada.
    - Rodar o comando abaixo no terminal:
        > npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
    - Criar na raiz do projeto um arquivo `.eslintrc`, com o seguinte conteúdo:

    ```
    {
     "root": true,
     "parser": "@typescript-eslint/parser",
     "plugins": [
       "@typescript-eslint"
     ],
     "extends": [
       "eslint:recommended",
       "plugin:@typescript-eslint/eslint-recommended",
       "plugin:@typescript-eslint/recommended"
     ]
    }
    ```

    - Criar também um arquivo `.eslintignore`, que serve para ignorar alguns arquivos/pastas, com o seguinte conteúdo:

    ```
    node_modules
    dist
    build
    /*.js
    ```

    - Criar também um novo comando script para execução do lint
        - Importante lembrar que esse comando precisa ser executado para as configurações abaixo surtirem seus efeitos.

    ```
    "lint": "eslint . --ext .ts"
    ```

    - E no arquivo `.eslintrc`, criar as regras para a execução do lint. Cada regra deve conter um atributo com os valores `off`, `warn` ou `error`.
    - Então após o atributo `extends`, colocar o código abaixo, que é para disparar um aviso ao usar o comando `console`:

    ```
    "rules": {
      "no-console": "warn"
    }
    ```

3. Prettier

    - Instalar a extensão no VS Code
    - Configurar o prettier como formatador padrão do VS Code
        > File >> Preferences >> Settings >> Escreva "default formatter" >> Escolha o Prettier
    - Também marque a opção de formatar ao salvar para aplicar a auto formatação
        > File >> Preferences >> Settings >> Text Editor >> Formatting >> Format on Save Mode
    - Rodar o comando abaixo no terminal:
        > npm i -D prettier
    - Criar o arquivo `.prettierrc` para criar as regras. Segue exemplo:

    ```
    {
        "semi": true,
        "trailingComma": "all",
        "singleQuote": true,
        "printWidth": 80,
        "arrowParens": "avoid"
    }
    ```

    #### Detalhamento

    | Atributo      | Descrição                                                                                                      |
    | ------------- | -------------------------------------------------------------------------------------------------------------- |
    | semi          | Configuração que diz se vai ou não adicionar um ponto e vírgula ao final automaticamente                       |
    | trailingComma | Definido como `all`, significa que o prettier vai colocar vírgulas no final de cada propriedade de um objeto   |
    | singleQuote   | Significa que o prettier utilizará aspas simples ao invés de aspas duplas                                      |
    | printWidth    | Quebra de linha automática quando atingir determinado tamanho                                                  |
    | arrowParens   | Indica se vai adicionar o parenteses em arrow functions com apenas um parâmetro ou não. Opções: avoid e always |

4. Configurar o ESLint com o Prettier

    - Precisamos instalar mais alguns pacotes, segue o comando:

        > npm i -D eslint-config-prettier eslint-plugin-prettier

        - Essas dependências funcionam para desativar as configuraçoes do ESLint que por ventura entrariam em conflito com o Prettier, e transforma as regras do Prettier para funcionarem no ESLint, respectivamente.

    - Agora temos que ajustar o arquivo `.eslintrc`, adicionando os plugins do Prettier. Ao final, o arquivo deve ficar conforme abaixo:
        - Fica mais fácil apenas copiar e colar o trecho abaixo, substituindo todo o conteúdo.

    ```
    {
    	"root": true,
    	"parser": "@typescript-eslint/parser",
    	"plugins": [
    		"@typescript-eslint",
    		"prettier"
    	],
    	"extends": [
    		"eslint:recommended",
    		"plugin:@typescript-eslint/eslint-recommended",
    		"plugin:@typescript-eslint/recommended",
    		"plugin:prettier/recommended"
    	],
    	"rules": {
    		"no-console": "warn",
    		"prettier/prettier": "error"
    	}
    }
    ```

<br>
<hr>

### Erro do servidor: "Error: Cannot find module '@shared/errors/Exception'"

-   Esse erro é causado ao utilizar os paths do tsconfig, mas é simples de resolver.

1. Instalar a dependência do tsconfig-paths, comando abaixo:
    > npm i -D tsconfig-paths
2. Acrescentar o trecho `-r tsconfig-paths/register` ao script `dev` ficando assim:
    > "dev": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/http/server.ts"

<br>
<hr>

### TypeORM

1. Precisa ser instalado os recursos para o uso do `TypeORM`, facilitando a manipulação do banco de dados.

-   Rodar o comando:
    > npm i typeorm reflect-metadata pg

#### Detalhamento

-   `typeorm`: é o mapeamento do objeto relacionamento que será utilizado, trazendo várias funcionalidades e facilidades para o manuseio dos dados.
-   `reflect-metadata`: pacote exigido pelo TypeORM quando utilizado com Typescript
-   `pg`: biblioteca para conexão em banco PostgreSql

<br>

2. Ao finalizar, precisa ser configurado no arquivo `server.ts` a importação do metadata. Também é necessário criar na raiz do projeto um arquivo chamado `ormconfig.json`, ele conterá os dados de configuração do TypeORM no projeto.

<br>
<hr>

### Migrações

-   Para criar novas migrações, usar o comando `npm run typeorm migration:create -- -n NomeDesejado`

    -   Esse arquivos será criado em `src » shared » typeorm » migrations`

<br>

-   Para rodar a migração no banco, usar o comando `npm run typeorm migration:run`
-   Para rodar um rollback, usar o comando `npm run typeorm migration:revert`

<br>
<hr>

### Celebrate

É o middleware para o Express para validação dos parâmetros recebidos nas requisições já nas rotas, antes de chegar no backend. Essa biblioteca usa implementações do pacote Joi, com ajustes para funcionar em parceria com o Express.

É possível validar dados vindos no corpo, no cabeçalho e até cookies.

Instale o `celebrate` com o comando:

> npm i celebrate

E as tipagens:

> npm i -D @types/joi

#### Segments

Permite definir qual o segmento que queremos validar, seja o corpo, cabeçalho, cookies, etc.

-   Utilizado nos arquivos de rotas

#### Joi

Permite validar de forma bem aprofundada cada parâmetro que a rota receberá, definindo suas tipagens, obrigatoriedades e validações adicionais.

-   Utilizado nos arquivos de rotas

#### Errors

É a função que exibe os erros de validação, em caso de uma rota receber uma parâmetro inválido. Neste projeto, essa função está sendo utilizada no arquivo `server.ts`, pois é nele que está todo o tratamento de erros.

<br>
<hr>

### Criptografia de Senhas

Para a criptografia de senhas, podemos usar a bibioteca `bcryptjs` que é bem comum e fácil de utilizar.

> npm i bcryptjs

E seus tipos:

> npm i -D @types/bcryptjs

#### Criação da Sessão

Verificando no serviço de criação da sessão, receberemos o e-mail e a senha do usuário e para saber se existe combinação possível, executamos o passo-a-passo:

1.  Identificar o usuário pelo E-mail

    -   Retornando erro caso não encontrado

2.  Usando o método `compare` da biblioteca podemos verificar se a senha sem criptografia recebida, é equivalente à que está criptografada.

    -   Retornando erro caso não encontrado

3.  Além disso, será adicionado ao retorno o token de autenticação daquele usuário, para que ele consiga manter sua comunicação com a API sem a necessidade de logins constantes.

#### Token com JWT

Instalar a biblioteca jsonwebtoken

> npm i jsonwebtoken

Instalar os tipos:

> npm i -D @types/jsonwebtoken

Utilizando o método `sign` desta biblioteca, conseguimos criar o token facilmente. Os parâmetros esperados são:

1. Payload
2. Secret
3. Configurações:
    - `subject`: pode ser usado para retornar dados do usuário, como o ID
        - Nunca retornar dados sensíveis
    - `expiresIn`: tempo de validade do token

<br>
<hr>

### Upload de imagem do avatar

Usaremos a biblioteca do `Multer` para fazer isso. Instalação:

> npm i multer

E os tipos:

> npm i -D @types/multer

Com isso feito, criar um arquivo de configuração para o Multer, determinando o diretório que as imagens serão salvas.

<br>
<hr>

### Trabalhando com Datas

Para essa tarefa, será utilizada a biblioteca `date-fns`

<br>
<hr>

### Envio de E-mail Fake para Ambiente de Desenvolvimento

O envio dessa funcionalidade será utilizando o `nodemailer`, instalar via comando:

> npm i nodemailer

Instalar a definição de tipos:

> npm i -D @types/nodemailer

O receptor das mensagens fake de testes será o [Ethereal](https://ethereal.email/)

#### Configuração Nodemailer

O arquivo de configuração foi criado na pasta `config/email`. O arquivo de configuração possui uma classe que fará o envio do e-mail de testes utilizando o `nodemailer`.

1. Precisamos importar o nodemailer
2. Utilizando o método `createTestAccount` criasse uma conta fake
3. Utilizando o método `createTransport`, criamos o transportador que fará o envio do e-mail. Esse método recebe um objeto com as configurações necessárias.
4. Após isso, enviamos o e-mail propriamente dito.
    - Aqui, a propriedade `from` recebe um e-mail fake para os testes, mas em um ambiente de produção, esse deve ser o e-mail da empresa/loja/entidade que é responsável pelo e-commerce.

Esse objeto então é utilizado pelo service `SendForgotPasswordEmailService`.

#### Template para o E-mail

Para criação do template e deixar o e-mail com uma aparência mais correta, será utilizado o `handlebars`, uma biblioteca que permite a criação de HTML com variáveis, muito semelhante ao `mustache`.

Começamos com a instalação

> npm i handlebars

A classe `HandlebarsMailTemplate` dentro da pasta de `config/email` é a responsável pela configuração e parse do template para o e-mail. É um processamento muito simples, ela compila o template e seta as variáveis nela. Com isso foram criadas duas interfaces, separadas no arquivo `interfaces.ts` para reutilização também na classe `EtherealMail`.

A classe `EtherealMail` também sofrerá algumas alterações para melhor funcionamento. Todos os parâmetros de entrada no seu método agora condizem com as necessidades do `nodemailer`, de forma que a classe fica totalmente livre para ser utilizada em qualquer parte do software.

A interface que antes recebia uma string como template, apenas para teste, deve na verdade receber um arquivo. Assim na classe `HandlebarsMailTemplate`, utilizando o pacote `fs`, o conteúdo do arquivo deverá ser lido e enviado para o `handlebars`.

Agora no serviço de envio do e-mail, os dados enviados para o arquivo de configuração do ethereal foram ajustados para respeitar as interfaces e argumentos que a função pede. O arquivo de template será pego utilizando o pacote `path`, para identificação do caminho relativo do template.

<br/>
<hr>

### Profile Management

Para a gestão do perfil do usuário, foram criados os serviço `ShowProfileService` e `UpdateProfileService`, bem como um controller para gerenciar o uso destes serviços, e um arquivo de rotas.

Esse arquivo de rotas tem algumas peculiaridades. Por exemplo, a implementação do middleware diretamente no objeto de rotas, desta forma ele é aplicado a todas as rotas definidas neste objeto. Também a rota de `put` tem algumas validações a mais para os parâmetros de senha que podem (ou não) serem enviados.

```
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
                is: Joi.exist(),
                then: Joi.required(),
            }),
        },
    }),
    controller.update,
);
```

1. O parâmetro `old_password` é simples, apenas definido como string;
2. O parâmetro `password` não pode ser obrigatório, então para isso é utilizado o `optional()`;
3. O parâmetro `password_confirmation` é a confirmação do `password`, o que garante que o usuário informou a senha corretamente. Esse parâmetro já teve existência na rota de redefinição da senha, mas aqui ele possui um pouco de lógica a mais.
    - Igual na rota de redefinição, aqui ele utiliza o `valid` que faz referência à outro campo já definido, neste caso, o campo `password`;
    - Utiliza o modificador `when`, que verifica outro campo e aplica alguma lógica sobre ele. Aqui, é verificado o campo `password`, com o `is: Joi.exist()` que verifica se esse parâmetro veio do front-end, e se veio, aplica o `then: Joi.required()`, ou seja, torna o parâmetro `password_confirmation` obrigatório quando o parâmetro `password` é informado.
        - Essa validação é necessária porque como explicado, naturalmente o `password` não é obrigatório, porém quando essa informação vier, ela deve vir com a sua confirmação.
