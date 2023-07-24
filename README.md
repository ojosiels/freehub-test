# **Freehub Company Technical Test**

Application developed within a one-week deadline as a technical test for Freehub company.

### Table of Contents

- [How to Run the API](#runApi)
- [How to Run the Web Page](#runWebPage)
- [API Documentation](https://tasty-catboat-531.notion.site/Teste-T-cnico-Api-Doc-93c7ae41230640f6a3de4c6b99991c53)
- [Project's Design](https://www.figma.com/file/rHmELuAQr78AsiilJWZ2UN/Teste-T%C3%A9cnico-Freehub?node-id=0%3A1&t=uVPZ2nlobktZGb7F-1)

<h2 id="runApi">How to run the API</h2>

**Warning: To run the API you need to have latest python's latest version installed [python's official download link](https://www.python.org/downloads/)**

- Open the terminal in the _api_ folder.

- Execute the command `python -m venv venv` to create a virtual environment.

- With the virtual environment created, execute the command `.\venv\Scripts\activate` to activate the virtual environment.

- With the virtual environment active, execute the command `python -m pip install -r requirements.txt` to install the project's packages.

- With all the packages installed, execute the command `python manage.py migrate`. This will create the database.

- With the database created, execute the command `python manage.py runserver` to run the server.

- After that, the server should be running in development at `http://localhost:8000`.

<br/>
<h2 id="runWebPage">How to run the Web Page</h2>

**Warning: To run the WebPage you need to have yarn installed [yarn's official download link](https://classic.yarnpkg.com/lang/en/docs/install)**

- Open the terminal in the "webpage" folder.

- Execute the command `yarn` to install the project's dependencies.

- With the dependencies installed, execute the command `yarn dev`.

- After that, the page will be running at `http://localhost:5172`.
