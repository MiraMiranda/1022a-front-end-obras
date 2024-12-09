# Controle de Estoque - Loja de Peças de Computador

# Descrição do Projeto

# Este projeto tem como objetivo a criação de um sistema de controle de estoque para uma loja especializada em peças de computador, com ênfase em **placas de vídeo**. A aplicação permite gerenciar o estoque de peças, realizar o cadastro de novas peças, bem como registrar e autenticar usuários através de tokens de 1 hora para uso do sistema.

# Funcionalidades Implementadas:
# - **Gerenciamento de Estoque**: Exibição das peças disponíveis no estoque.
# - **Cadastro de Peças**: Funcionalidade para adicionar novas peças ao estoque.
# - **Autenticação de Usuários**: Sistema de login e autenticação com token JWT (válido por 1 hora).
# - **Visualização do Estoque**: Permite aos usuários visualizar todas as peças registradas no sistema.

# Tecnologias Utilizadas

# Frontend:
# - **Vite**: Ferramenta de build rápida para o React.
# - **React**: Biblioteca JavaScript para criação de interfaces de usuário.
# - **TypeScript**: Linguagem baseada em JavaScript com tipagem estática.
# - **ESLint**: Ferramenta para análise estática do código.

# Dependências de Desenvolvimento (devDependencies):
# ```json
# "devDependencies": {
#  "@eslint/js": "^9.9.0",
#  "@types/axios": "^0.9.36",
#  "@types/react": "^18.3.3",
#  "@types/react-dom": "^18.3.0",
#  "@vitejs/plugin-react": "^4.3.1",
#  "eslint": "^9.9.0",
#  "eslint-plugin-react-hooks": "^5.1.0-rc.0",
#  "eslint-plugin-react-refresh": "^0.4.9",
#  "globals": "^15.9.0",
#  "typescript": "^5.5.3",
#  "typescript-eslint": "^8.0.1",
#  "vite": "^5.4.1"
# }
# ```

# Backend:
# - **Express**: Framework web para Node.js.
# - **JWT (JSON Web Token)**: Utilizado para autenticação segura de usuários.
# - **bcryptjs**: Biblioteca para hashing de senhas.
# - **MySQL2**: Driver para banco de dados MySQL.
# - **dotenv**: Gerenciamento de variáveis de ambiente.
# - **multer**: Middleware para upload de arquivos.
# - **cors**: Habilita CORS (Cross-Origin Resource Sharing) para requisições entre diferentes domínios.
  
# Dependências:
# ```json
# "dependencies": {
#  "bcryptjs": "^2.4.3",
#  "cors": "^2.8.5",
#  "dotenv": "^16.4.5",
#  "express": "^4.21.1",
#  "express-validator": "^7.2.0",
#  "jsonwebtoken": "^9.0.2",
#  "multer": "^1.4.5-lts.1",
#  "mysql2": "^3.11.5"
# }
# ```

# Instruções para Rodar o Projeto Localmente

# Pré-requisitos

# Antes de rodar o projeto, verifique se as seguintes ferramentas estão instaladas:

# - **Node.js** (versão 16 ou superior)
# - **MySQL** (instalado e configurado)
# - **npm** ou **yarn** para gerenciar pacotes.

# Backend

# 1. Clone o repositório do backend:
#   ```bash
#   git clone <url-do-repositorio-backend>
#   cd backend
#   ```

# 2. Instale as dependências:
#   ```bash
#   npm install
#   ```

# 3. Crie um arquivo ".env" na raiz do projeto e defina suas variáveis de ambiente:
#   ```env
#   DB_HOST=localhost
#   DB_USER=root
#   DB_PASSWORD=sua-senha
#   DB_NAME=estoque
#   JWT_SECRET=sua-chave-secreta
#   ```

# 4. Execute o servidor backend:
#   ```bash
#   npm start
#   ```

# Frontend

# 1. Clone o repositório do frontend:
#   ```bash
#   git clone <url-do-repositorio-frontend>
#   cd frontend
#   ```

# 2. Instale as dependências:
#   ```bash
#   npm install
#   ```

# 3. Execute o servidor frontend:
   
#   npm run dev
  


# Diagrama de Fluxo de Dados

# Abaixo, segue um diagrama básico que ilustra o fluxo de dados entre o front-end e o back-end do sistema:

# ```plaintext
# +-----------------+       +----------------+      +-----------------------+
# |                 |       |                |      |                       |
# |   Frontend     | <----> |   Backend      | <--> |    Banco de Dados     |
# | (React + Axios)|       | (Express + JWT)|      |   (MySQL)             |
# |                 |       |                |      |                       |
# +-----------------+       +----------------+      +-----------------------+
#       |                        |
#       |                    Requisição
#      v                        |
# +-----------------+      +------------------+
# |                 |      |                  |
# | Autenticação    | ---> |  Validação JWT   |
# | e Cadastro de   |      |  (JWT Secret)    |
# | Peças/Estoque   |      |                  |
# |                 |      +------------------+
# +-----------------+ 
# ```

# Descrição do Fluxo:
# 1. O **frontend** faz requisições HTTP ao **backend** utilizando Axios para comunicar-se com o servidor.
# 2. O **backend** processa as requisições, realiza validações e interage com o **banco de dados** para armazenar ou recuperar dados.
# 3. Para operações que exigem autenticação, o **backend** verifica a validade do **JWT** enviado pelo frontend.
# 4. O **banco de dados** armazena informações sobre o estoque, usuários e logins.
