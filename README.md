# Gerenciamento de ONGs, Voluntários e Oportunidades

Este projeto é a interface frontend para um sistema de gerenciamento de ONGs, voluntários e oportunidades. Ele permite que as ONGs registrem oportunidades, os voluntários se candidatem e gerenciem seus interesses, e todas as entidades possam ser visualizadas e manipuladas de maneira intuitiva.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [API](#api)
- [Apresentação](#apresentação)
- [Contribuições](#contribuições)

## Requisitos

Para rodar o frontend deste projeto corretamente, é necessário ter a API backend em funcionamento, já que grande parte das funcionalidades depende da comunicação com a base de dados via API. A API gerencia ONGs, oportunidades e voluntários, possibilitando a criação, edição e remoção dessas entidades.

**Pré-requisitos**:
- Node.js (v14 ou superior)
- API backend em funcionamento (consulte o repositório da API [aqui](https://github.com/VictorCDS-p/ong-api))
  
## Instalação

1. Clone este repositório para a sua máquina local:
   ```bash
   git clone https://github.com/VictorCDS-p/ong-frontend
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd ong-frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Certifique-se de que a URL da API está corretamente configurada em `services` do frontend. Exemplo de configuração:
   ```
   API_URL = "http://localhost:3000"
   ```

5. Inicie o projeto:
   ```bash
   npm run dev
   ```

6. O frontend será iniciado em `http://localhost:5173/`, ou na porta configurada no seu ambiente.

## Uso

Após a instalação e execução, o frontend oferece as seguintes funcionalidades:

- Listagem de ONGs, oportunidades e voluntários.
- Criação e edição de ONGs, oportunidades e voluntários.
- Visualização detalhada de cada entidade.
- Exclusão de entidades com aviso de confirmação.

### Funcionalidades principais

- **ONGs**: Cadastro de ONGs com detalhes sobre a organização.
- **Oportunidades**: As ONGs podem cadastrar e listar oportunidades de voluntariado.
- **Voluntários**: Os voluntários podem se candidatar e gerenciar seus interesses nas oportunidades disponíveis.

## API

Este projeto se conecta à API para realizar operações CRUD (criação, leitura, atualização e exclusão) de ONGs, oportunidades e voluntários. As principais rotas consumidas pelo frontend são:

- `/ongs` - Para listagem, criação e remoção de ONGs.
- `/opportunities` - Para gerenciar oportunidades de voluntariado.
- `/volunteers` - Para registrar e listar voluntários.

Certifique-se de que a API está rodando corretamente e que o arquivo `.env` contém a URL correta para o backend.

### Documentação da API

Para mais detalhes sobre como configurar e utilizar a API, consulte a documentação [aqui](https://github.com/VictorCDS-p/ong-api).

## Apresentação

Aqui estão algumas imagens de exemplo do projeto rodando:

### Página Inicial
![Página Inicial](./assets/homepage.png)

### Listagem de ONGs
![Listagem de ONGs](./assets/ong-list.png)

### Formulário de Cadastro de Oportunidades
![Cadastro de Oportunidades](./assets/opportunity-form.png)

> **Nota**: Substitua as imagens acima pelas capturas de tela reais do projeto.

## Contribuições

Se você deseja contribuir com este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request. Todos os tipos de contribuição são bem-vindos.
