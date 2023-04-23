# **Teste Técnico Empresa Freehub**

Aplicação desenvolvida no prazo de uma semana como teste técnico da empresa Freehub

### Indice

- [Como rodar a Api](#runApi)
- [Como rodar a Página da Web](#runWebPage)
- [Documentação da Api](https://tasty-catboat-531.notion.site/Teste-T-cnico-Api-Doc-93c7ae41230640f6a3de4c6b99991c53)
- [Figma do Projeto](https://www.figma.com/file/rHmELuAQr78AsiilJWZ2UN/Teste-T%C3%A9cnico-Freehub?node-id=0%3A1&t=uVPZ2nlobktZGb7F-1)

<h2 id="runApi">Como rodar a Api</h2>

**Atenção: para rodar a api é necessário ter a versão mais recente do python instalado [link do download na página oficial](https://www.python.org/downloads/)**

- Abra o terminal na pasta _api_

- Execute o comando `python venv venv` para criar um ambiente virtual,

- Com o ambiente virtual criado, execute o comando `.\venv\Scripts\activate` para irá ativar o ambiente virtual

- Com o ambiente virtual ativo execute o comando `python -m pip install -r requirements.txt`

- Com todos os pacotes já instalados execute o comando `python manage.py migrate`, isso vai criar o banco de dados

- Com o banco de dados já criado execute o comando `python manage.py runserver`

- Após isso o servidor já deve estar rodando em ambiente de desenvolvimento na porta `http://localhost:8000`

<br/>
<h2 id="runWebPage">Como rodar a Página da Web</h2>

- Abra o terminal na pasta "webpage"

- execute o comando `yarn` para instalar as depêndencias do projeto

- Com as dependências já instaladas execute o comando `yarn dev`

- Após isso a página na vai estar rodando na porta `http://localhost:5172`
