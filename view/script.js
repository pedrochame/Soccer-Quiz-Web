async function ConsultaAPI() {

  try {
    const response = await fetch("http://127.0.0.1:5000/questions");
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    
    const dados = await response.json(); // Aguarda a conversão para JSON
    
    return dados;

  } catch (error) {
    console.error("Erro ao buscar os dados da API:", error);
    return [];
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
    document.querySelector("#areaJogo").hidden = false;
    document.querySelector("#areaFim").hidden = true;
    await jogo(questoes);
    document.querySelector("#areaJogo").hidden = true;
    document.querySelector("#areaFim").hidden = false;
    console.log("Fim de Jogo!");
  } else {
    console.log("Falha ao carregar os dados.");
  }
}

async function jogo(questoesAPI){
  let questoes = embaralhaVetor(questoesAPI);
  let acertos = 0;
  let i = 0;
  let numQuestoes = 5;

  while(i<numQuestoes){
    document.querySelector("#desempenho").textContent = "Desempenho: "+acertos+" acertos";
    document.querySelector("#progresso").textContent = "Progresso: "+(i+1)+"/"+numQuestoes;
    acertos += await exibeQuestao(questoes[i]);
    i += 1;
    document.querySelector("#desempenho").textContent = "Desempenho: "+acertos+" acertos";
    document.querySelector("#progresso").textContent = "Progresso: "+(i+1)+"/"+numQuestoes;
  }

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

// Chama a função principal
main();