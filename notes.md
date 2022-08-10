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
    		"prettier/@typescript-eslint",
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
