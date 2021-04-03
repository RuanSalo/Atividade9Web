let jogo;

const elementos = {
  telaInicial: document.getElementById('inicial'),
  telaJogo: document.getElementById('jogo'),
  telaCadastro: document.getElementById('cadastro'),
  telaMensagem: document.querySelector('.mensagem'),
  textoMensagem: document.querySelector('.mensagem .texto'),
  teclado: document.querySelector('.teclado'),
  palavra: document.querySelector('.palavra'),
  dica: document.querySelector('.dica .pista'),
  formulario: {
    dificuldades: document.querySelectorAll('[name="dificuldade"]'),
    dificuldadeSelecionada: function () {
      for (const dificuldade of this.dificuldades) {
        if (dificuldade.checked) {
          return dificuldade.value;
        }
      }
    },
    limparRadios: function () {
      for (const dificuldade of this.dificuldades) {
        dificuldade.checked = false;
      }
    },
    palavra: document.getElementById('palavraCadastro'),
    dica: document.getElementById('dicaCadastro'),
    botaoCadastro: document.getElementById('botaoCadastro'),
  },
  botoes: {
    facil: document.querySelector('.botao-facil'),
    medio: document.querySelector('.botao-medio'),
    dificil: document.querySelector('.botao-dificil'),
    cadastrar: document.querySelector('.botao-cadastrar'),
    reiniciar: document.querySelector('.reiniciar'),
  },
  boneco: [
    document.querySelector('.boneco-cabeca'),
    document.querySelector('.boneco-corpo'),
    document.querySelector('.boneco-braco-esquerdo'),
    document.querySelector('.boneco-braco-direito'),
    document.querySelector('.boneco-perna-esquerda'),
    document.querySelector('.boneco-perna-direita'),
  ],
};

const palavras = {
  facil: [
    { valor: 'anciã', dica: 'Mulher de idade avançada, antigo, velho, respeitável' },
    { valor: 'série', dica: 'Repetições de exercícios físicos' },
    { valor: 'avaro', dica: 'Zelo/ciúme' },
    { valor: 'maior', dica: 'Menor' },
    { valor: 'noite', dica: 'A _____ é uma criança' },
    { valor: 'ímpar', dica: 'Triângulo tem lados _____' },
    { valor: 'salvo', dica: 'Ñ _____' },
    { valor: 'vetor', dica: '...são segmentos de retas usados para representar alguma grandeza' },
    { valor: 'prado', dica: 'substantivo masculino Terreno coberto de plantas herbáceas que servem para pastagem; campina.' },
    { valor: 'pecha', dica: 'tem a _____ de mentiroso' },
  ],
  medio: [
    { valor: 'cônjuge', dica: 'meu _______ que me pediu em casamento' },
    { valor: 'exceção', dica: 'aquele que se desvia ou exclui de regras e padrões' },
    { valor: 'efêmero', dica: 'que é passageiro, temporário, transitório' },
    { valor: 'prolixo', dica: 'cansativo por estender-se demais no tempo; que tende a arrastar-se' },
    { valor: 'idílico', dica: 'que é maravilhoso, ideal' },
    { valor: 'análogo', dica: 'de função semelhante mas de origem embriologicamente distinta (diz-se de órgão em relação a outro)' },
    { valor: 'caráter', dica: 'define a índole da pessoa e como ela rege as suas atitudes' },
    { valor: 'genuíno', dica: 'próprio, exato, legítimo, verdadeiro' },
    { valor: 'estória', dica: 'narrativa de cunho popular e tradicional' },
    { valor: 'sublime', dica: 'superlativamente belo, esteticamente perfeito; grandioso, soberbo' },
  ],
  dificil: [
    { valor: 'concepção', dica: 'ação ou efeito de gerar (ou ser gerado) um ser vivo' },
    { valor: 'plenitude', dica: 'estado do que é inteiro, completo; totalidade, integridade' },
    { valor: 'essencial', dica: 'que constitui o mais básico ou o mais importante em algo' },
    { valor: 'hipócrita', dica: 'é o ato de fingir ter crenças, virtudes, ideias e sentimentos que a pessoa na verdade não possui' },
    { valor: 'corolário', dica: 'é uma afirmação deduzida de uma verdade já demonstrada' },
    { valor: 'paradigma', dica: 'um exemplo que serve como modelo; padrão' },
    { valor: 'dicotomia', dica: 'aspecto que tem um planeta ou um satélite ao se apresentar dividido ao meio, metade claro, metade escuro' },
    { valor: 'hegemonia', dica: 'autoridade soberana; liderança, predominância ou superioridade' },
    { valor: 'ratificar', dica: 'patentear a verdade de; comprovar, corroborar' },
    { valor: 'propósito', dica: 'aquilo que se busca alcançar; objetivo, finalidade, intuito' },
  ],
};

const novoJogo = () => {
  jogo = {
    dificuldade: undefined,
    palavra: {
      original: undefined,
      semAcentos: undefined,
      tamanho: undefined,
      dica: undefined,
    },
    acertos: undefined,
    jogadas: [],
    chances: 6,
    definirPalavra: function (palavra) {
      this.palavra.original = palavra.valor;
      this.palavra.tamanho = palavra.valor.length;
      this.palavra.dica = palavra.dica;
      this.acertos = '';
      this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      for (let i = 0; i < this.palavra.tamanho; i++) {
        this.acertos += ' ';
      }
    },
    jogar: function (letraJogada) {
      let acertou = false;
      for (let i = 0; i < this.palavra.tamanho; i++) {
        const letra = this.palavra.semAcentos[i].toLowerCase();
        if (letra === letraJogada.toLowerCase()) {
          acertou = true;
          this.acertos = replace(this.acertos, i, this.palavra.original[i]);
        }
      }
      if (!acertou) {
        this.chances--;
      }
      return acertou;
    },
    ganhou: function () {
      return !this.acertos.includes(' ');
    },
    perdeu: function () {
      return this.chances <= 0;
    },
    acabou: function () {
      return this.ganhou() || this.perdeu();
    },
  };

  elementos.telaInicial.style.display = 'flex';
  elementos.telaCadastro.style.display = 'none';
  elementos.telaJogo.style.display = 'none';
  elementos.telaMensagem.style.display = 'none';
  elementos.telaMensagem.classList.remove('mensagem-vitoria');
  elementos.telaMensagem.classList.remove('mensagem-derrota');
  for (const parte of elementos.boneco) {
    parte.classList.remove('escondido');
    parte.classList.add('escondido');
  }

  criarTeclado();
};

const criarTeclado = () => {
  const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  elementos.teclado.textContent = '';
  for (const letra of letras) {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(letra.toUpperCase()));
    button.classList.add(`botao-${letra}`);

    elementos.teclado.appendChild(button);

    button.addEventListener('click', () => {
      if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {
        const acertou = jogo.jogar(letra);
        jogo.jogadas.push(letra);
        button.classList.add(acertou ? 'certo' : 'errado');
        mostrarPalavra();

        if (!acertou) {
          mostrarErro();
        }

        if (jogo.ganhou()) {
          mostrarMensagem(true);
        } else if (jogo.perdeu()) {
          mostrarMensagem(false);
        }
      }
    });
  }
};

const mostrarErro = () => {
  const parte = elementos.boneco[5 - jogo.chances];
  parte.classList.remove('escondido');
};

const mostrarMensagem = vitoria => {
  const mensagem = vitoria ? '<p>Parabéns!</p><p>Você GANHOU!</p>' : '<p>Que pena!</p><p>Você PERDEU!</p>';
  elementos.textoMensagem.innerHTML = mensagem;
  elementos.telaMensagem.style.display = 'flex';
  elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`);
};

const sortearPalavra = () => {
  const i = Math.floor(Math.random() * palavras[jogo.dificuldade].length);
  const palavra = palavras[jogo.dificuldade][i];
  jogo.definirPalavra(palavra);

  console.log(jogo.palavra.original);

  return jogo.palavra.original;
};

const mostrarPalavra = () => {
  elementos.palavra.textContent = '';
  elementos.dica.innerHTML = jogo.palavra.dica;
  for (let i = 0; i < jogo.acertos.length; i++) {
    const letra = jogo.acertos[i].toUpperCase();
    elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
  }
};

const iniciarJogo = dificuldade => {
  jogo.dificuldade = dificuldade;
  elementos.telaInicial.style.display = 'none';
  elementos.telaJogo.style.display = 'flex';

  sortearPalavra();
  mostrarPalavra();
};

const abrirCadastro = () => {
  elementos.telaInicial.style.display = 'none';
  elementos.telaCadastro.style.display = 'block';

  elementos.formulario.limparRadios();

  elementos.formulario.palavra.textContent = '';
  elementos.formulario.dica.textContent = '';

  elementos.formulario.botaoCadastro.addEventListener('submit', e => {
    e.preventDefault();

    const dificuldade = elementos.formulario.dificuldadeSelecionada();
    console.log(dificuldade);

    palavras[dificuldade].push({
      valor: elementos.formulario.palavra.value,
      dica: elementos.formulario.dica.value,
    });
  });
};

const replace = (str, i, newChar) => str.substring(0, i) + newChar + str.substring(i + 1);

elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'));
elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'));
elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'));
elementos.botoes.cadastrar.addEventListener('click', () => abrirCadastro());

elementos.botoes.reiniciar.addEventListener('click', () => novoJogo());

novoJogo();
