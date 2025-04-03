# ⚽ **Soccer Quiz Web**  

Teste seus conhecimentos sobre futebol neste quiz interativo! Responda perguntas e veja seu desempenho em um ranking simples.  

## 📌 **Como funciona?**  

Este projeto é composto por dois módulos principais:  

### 🔹 **Back-end (API e Banco de Dados)**  
- Banco de dados SQLite que **armazena as perguntas** do quiz e **registra os resultados dos jogos**.  
- API desenvolvida com **Flask**, responsável por fornecer as perguntas e salvar a pontuação dos jogadores.  

### 🔹 **Front-end (Interface do Usuário)**  
- Arquivos **HTML, CSS e JavaScript** que criam a interface do jogo.  
- O **JavaScript** faz requisições para o backend para buscar as perguntas e salvar a pontuação.  

📌 **Importante:**  
- **O jogo não possui sistema de login ou autenticação.**  
- O nome digitado pelo jogador é apenas um identificador temporário no ranking.  
- **Não há controle sobre nomes repetidos** – um mesmo jogador pode jogar várias vezes com nomes diferentes.  

## 🛠 **Como instalar e rodar o projeto?**  

### **Pré-requisitos:**  
- **Python 3.7+** instalado na máquina.  

### **Passo a passo:**  

1️⃣ **Clone este repositório** ou faça o download no formato ZIP.  

```bash
git clone https://github.com/pedrochame/Soccer-Quiz-Web.git
cd Soccer-Quiz-Web
```

2️⃣ **Crie e ative um ambiente virtual (venv):**  

```bash
python -m venv venv
```

- **No Windows:**  
  ```bash
  venv\Scripts\activate
  ```
- **No Linux/macOS:**  
  ```bash
  source venv/bin/activate
  ```

3️⃣ **Instale as dependências:**  

```bash
pip install -r requirements.txt
```

4️⃣ **Inicie o servidor Flask:**  

```bash
python app.py
```

5️⃣ **Abra o jogo:**  
- Com o backend rodando, abra o arquivo **"frontend/index.html"** no navegador.  

## 🎮 **Como jogar?**  

1. Na tela inicial, digite seu nome e clique no botão **JOGAR**.  
2. O jogo tem **10 perguntas** sobre futebol, cada uma com **4 alternativas**.  
3. Escolha a alternativa correta clicando no botão correspondente.  
4. No final, veja **quantas questões acertou** e **um ranking com os registros dos últimos jogadores** (data, nome e pontuação).  

💡 **Observação:**  
- O ranking **não é permanente** – ele apenas exibe os registros armazenados no banco de dados.  
- Como **não há login**, um jogador pode jogar várias vezes com nomes diferentes.

## 🚀 **Futuras melhorias**  
✅ Melhorar o design da interface do jogo.
✅ Separar as questões por temas.  
✅ Implementar um sistema de login.