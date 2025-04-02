// Configuração: Rotas da API
API_PATH_QUESTOES = "https://soccer-quiz-web.onrender.com/questoes";
API_PATH_REGISTROS = "https://soccer-quiz-web.onrender.com/registros";

// Configuração do jogo: Número de questões
NUM_QUESTOES = 5;

//Código HTML a ser exibido na área de Início
DIV_INICIO = "<div class='container' id='areaInicio'><div class='p-3'><input type='text' class= 'form-control' id='nome' placeholder='Digite seu nome'></div><div class='p-3 d-flex justify-content-center'><input class='btn btn-primary btJogar' type='submit' id='btEnviarNome' value='JOGAR'></input></div></div>";

//Código HTML a ser exibido na área de jogo
DIV_JOGO = "<div class='container' id='areaJogo'>";
["progresso","questao"].forEach(i => {
  DIV_JOGO += "<p id=\""+i+"\"></p>";
});

for(let i=0;i<4;i++){
DIV_JOGO+="<div><input type='button' class='w-100 btn alternativa' id='alternativa"+i+"'></div>";
}

DIV_JOGO += "</div>";

//Código HTML a ser exibido quando o jogo termina
DIV_FIM = "<div class='container align-items-center' id='areaFim'>";
DIV_FIM += "<div class='d-flex justify-content-center'><b id='txtFim'>FIM DE JOGO!</b></div>";
DIV_FIM += "<div class='d-flex justify-content-center'><p id='areaAcertos'></p></div>";
DIV_FIM += "<div class='d-flex justify-content-center'><input class='btn btn-primary btJogar'type='button' id='btJogarNovamente' value='JOGAR NOVAMENTE'></div>";
DIV_FIM += "</div>";



//Código HTML a ser exibido quando não é possível consultar a API
DIV_ERRO = "<div class='container d-flex justify-content-center' id='areaErro'><div class='text-black p-3 w-90 text-break'><p>Não foi possível consultar a API de questões!</p></div></div>";

// Função que faz a requisição à API e retorna um JSON com as questões
async function ConsultaAPI() {

  try {
    const response = await fetch(API_PATH_QUESTOES);
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    
    const dados = await response.json(); // Aguarda a conversão para JSON
    
    return dados;

  } catch (error) {
    console.error("Erro ao buscar os dados da API:", error);
  }
}

// Função que recebe um vetor e devolve outro com os valores embaralhados
function embaralhaVetor(vetor){
  let tam = vetor.length;
  let v = [];
  for(i=0;i<tam;i++){
    v.push("");
  }
  let pos = Math.round(Math.random()*(tam-1));
  vetor.forEach(e => {
    while(v[pos]!=""){
      pos = Math.round(Math.random()*(tam-1));
    }
    v[pos] = e;
  });
  return v;
}

// Função principal que espera os dados antes de continuar
async function main() {

questoes = await ConsultaAPI(); // Aguarda a requisição antes de continuar

if (questoes) {

    document.querySelector("#corpo").innerHTML = DIV_INICIO;
    document.querySelector("#corpo").style="height:100vh;";
    let nomeJogador = await esperarEnvioNome();
    console.log("Nome do jogador: "+nomeJogador);


    document.querySelector("#corpo").innerHTML = DIV_JOGO;
    pontuacaoJogador = await jogo(questoes);
    console.log("Fim de Jogo!");

    document.querySelector("#corpo").innerHTML = DIV_FIM;
    document.querySelector("#areaAcertos").innerHTML = "Você acertou "+pontuacaoJogador+" de "+NUM_QUESTOES+" questões!";
    await enviarRegistroDeJogo(nomeJogador,pontuacaoJogador);
    await exibirRanking();
    await esperarJogarNovamente();
    window.location.reload();

  } else {
    console.log("Falha ao carregar os dados.");
    document.querySelector("#corpo").innerHTML = DIV_ERRO;
  }

}
async function jogo(questoesAPI){
  let questoes = embaralhaVetor(questoesAPI);
  let acertos = 0;

  for(let i=1;i<=NUM_QUESTOES;i++){
    document.querySelector("#progresso").textContent = "Questão "+i+" de "+NUM_QUESTOES;
    acertos += await exibeQuestao(questoes[i-1]);
  }

  return acertos;

}


// Função que exibe a questão e as alternativas na página
async function exibeQuestao(q){
    
  document.querySelector("#questao").textContent = q["question"];

  btAlternativas = document.querySelectorAll(".alternativa");

  let alternativas = embaralhaVetor([q["ans"],q["alt1"],q["alt2"],q["alt3"]]);
  
  btAlternativas.forEach(btAlternativa => {
    btAlternativa.value = alternativas.pop();
  });
    


  console.log("Esperando resposta...");
  const bt = await esperarClique(btAlternativas);
  console.log("Resposta do jogador: "+bt);
  console.log("Resposta correta: "+q["ans"]);
  if(bt==q["ans"]){
    console.log("RESPOSTA CERTA");
    return 1;
  }else{
    console.log("RESPOSTA ERRADA")
    return 0;
  }

}

function esperarClique(botoes) {
  return new Promise((resolve) => {
      botoes.forEach(botao => {
          botao.addEventListener("click", () => resolve(botao.value), { once: true });
      });
  });
}

function esperarEnvioNome() {
  let campoNome = document.querySelector("#nome");
  let btEnviarNome = document.querySelector("#btEnviarNome");

  return new Promise((resolve) => {
    btEnviarNome.addEventListener("click", () => {
        if(campoNome.value.trim()!=""){
        resolve(campoNome.value);
        }
    }, { once: true });
  });

}

function esperarJogarNovamente() {

  let btJogarNovamente = document.querySelector("#btJogarNovamente");

  return new Promise((resolve) => {
      btJogarNovamente.addEventListener("click", () => resolve(), { once: true });
  });
}


// Função que vai fazer a requisição com a API enviando os dados de registro do jogador
async function enviarRegistroDeJogo(nomeJogador,pontosJogador) {

    let response = await fetch(API_PATH_REGISTROS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name : nomeJogador, 
        score : pontosJogador,
      })
    });
    
    let r = await response.json();
    console.log(r);

}

async function exibirRanking(){
  
  let registros = await ConsultaAPIRanking();

  console.log(registros);

  DIV_RANKING = "<div id='areaRanking'><table class='table m-2'>";


  if(registros.length>=0){
    let campos = Object.keys(registros[0]);
 
DIV_RANKING += "<thead>";

  campos.forEach(campo => {
    let campoLabel = campo;
      switch(campo){
        case "name": campoLabel = "Nome";break;
        case "score" : campoLabel = "Pontuação";break;
        case "date" : campoLabel = "Data";break;
      }
    DIV_RANKING+="<th>";
    DIV_RANKING+=campoLabel;
    DIV_RANKING+="</th>";
  });

  DIV_RANKING+="</thead>";

  for(let i=0; i<registros.length; i++){
    DIV_RANKING+="<tr>";
    campos.forEach(campo => {
      DIV_RANKING+="<td>";
      
      let elemento = registros[i][campo];
      if(campo=="date"){
        let agora = new Date(elemento.replace(" ","T")+"Z");
        DIV_RANKING+=agora.toLocaleString().replace(","," - ").slice(0,-3);
      }else{
          DIV_RANKING+=elemento;
      }
      DIV_RANKING+="</td>";
    });
    DIV_RANKING+="</tr>";
  }

  DIV_RANKING+="</table></div>";

}else{
DIV_RANKING+= "</table></div>";
}

  let divRank = document.createElement("div");
  divRank.innerHTML = DIV_RANKING;
  document.querySelector("#areaFim").appendChild(divRank);
  document.querySelector("#corpo").style="height:auto;";

}

// Função que vai fazer a requisição com a API enviando os dados de registro do jogador
async function ConsultaAPIRanking() {

  try {
    const response = await fetch(API_PATH_REGISTROS);
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    
    const dados = await response.json();
    return dados;

  } catch (error) {
    console.error("Erro ao buscar os dados da API:", error);
  }
}

//Programa Principal
main();