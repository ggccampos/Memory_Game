// Variaveis de estado do jogo

let flippedCards = [] // array que armazena as cartas viradas (sempre terá no maximo 2)
let mathcedPairs = 0 // Contador de pares encontrados
let attempts = 0 // Contador de tentativas do jogador
let isCheckingPair = false // trava o jogo enquanto verifica o par ou esconde as cartas

// Array com todas as cartas do jogo (lista de emojis)
const cardItens = [
  { id: 1, content: "🤖", matched: false},
  { id: 2, content: "🤖", matched: false},
  { id: 3, content: "🚀", matched: false},
  { id: 4, content: "🚀", matched: false},
  { id: 5, content: "⛩", matched: false},
  { id: 6, content: "⛩", matched: false},
  { id: 7, content: "🏆", matched: false},
  { id: 8, content: "🏆", matched: false},
  { id: 9, content: "🎮", matched: false},
  { id: 10, content: "🎮", matched: false},
  { id: 11, content: "🎸", matched: false},
  { id: 12, content: "🎸", matched: false},
  { id: 13, content: "🃏", matched: false},
  { id: 14, content: "🃏", matched: false},
  { id: 15, content: "🎱", matched: false},
  { id: 16, content: "🎱", matched: false},
]

// Função de embaralhar as cartas
function suffleCards(array){
  // se positivo vai depois, se negativo vai antes.
  const suffled = array.sort(() => Math.random() > 0.5 ? 1 : -1) 

  return suffled
}

// Criar cartas
function createCard(card){
  //cria o elemento principal da carta
  const cardElement = document.createElement("div")
  cardElement.className = "card"
  
  //cria o elemento do emoji
  const emoji = document.createElement("span")
  emoji.className = "card-emoji"
  emoji.textContent = card.content

  //adiciona a span (emoji) dentro do elemento da div (card)
  cardElement.appendChild(emoji)

  //adiciona o evento de click na carta
  cardElement.addEventListener("click", () => handleCardClick(cardElement, card))

  return cardElement
}

// Rederizar cartas
function renderCards(){
  const deck = document.getElementById("deck")
  deck.innerHTML = ""


  const cards = suffleCards(cardItens)
  cards.forEach((item) => {
    const cardElement = createCard(item)
    deck.appendChild(cardElement)

  })
}

function handleCardClick(cardElement, card){
  if(
    isCheckingPair || //ignora o clieck enquanto verifica o par
    cardElement.classList.contains("revealed") // ignora o click se a carta ja esta virada
  ){
    return
  }

  // Revela a carta
  cardElement.classList.add("revealed")

  //Adiciona no array as cartas que estão viradas
  flippedCards.push({cardElement, card}) // como o nome do elemento é o mesmo que vai ser exibido não precisa ser {cardElement : cardElement, card : card}

  // Verifica se é a segunda carta virada
  if(flippedCards.length === 2){
    // Atualiza para verdadeiro, para sinalizar que vamos verificar o par
    isCheckingPair = true
    // Incrementa o contador de tentativas
    attempts++

    //selecionar as cartas viradas
    const [firstCard, secondCard] = flippedCards

    //Verifica se as cartas formam um par
    if(firstCard.card.content === secondCard.card.content){
      //Incrementa os pares encontrados
      mathcedPairs++
      

      // Marcar as cartas como encontradas
      cardItens.forEach(item =>{
        if(item.content === firstCard.card.content){
          item.matched = true
        }
      })

      // Limpa Array de cartas viradas
      flippedCards = []

      // Libera a proxima rodada
      isCheckingPair = false

      //Atualiza o placar
      updatedStats() 

      //Verifica se tem itens para encontrar.
      const toFind = cardItens.find( item => item.matched === false)

      if(!toFind){
        alert("Parabens, você encontrou todos os pares!")
      }
    } else {
      setTimeout(() => {
      firstCard.cardElement.classList.remove("revealed")
      secondCard.cardElement.classList.remove("revealed")

      flippedCards = []
      isCheckingPair = false
      updatedStats() 
      }, 1000)
    }
   
  } 
  
}

function updatedStats(){
  document.getElementById("stats").textContent = `${mathcedPairs} acertos de ${attempts} tentaivas`
}

// função que reinicia o jogo.
function resetGame (){
  flippedCards = []
  mathcedPairs = 0
  attempts = 0
  isCheckingPair = false

  // Desmarcar todas as cartas
  cardItens.forEach((card) => card.matched = false)

  // Renderiza novamente e atualiza o placar
  renderCards()
  updatedStats()
}



function initGame(){
  renderCards()

  // Adiciona o evento de reiniciar o jogo no botão
  document.getElementById("restart").addEventListener("click", resetGame)
}

initGame()