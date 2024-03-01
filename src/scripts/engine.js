// Declaração das variáveis para altura, largura, vidas e tempo
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

// Intervalo de criação de mosquito inicial
var criaMosquitoTempo = 1500

// Obtém o nível do jogo da query string da URL
var nivel = window.location.search
nivel = nivel.replace('?', '')

// Ajusta o tempo de criação de mosquito baseado no nível do jogo
if (nivel === 'normal') {
    // Tempo para o nível normal
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    // Tempo para o nível difícil
    criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
    // Tempo para o nível "Chuck Norris"
    criaMosquitoTempo = 750
}

// Função para ajustar o tamanho do palco do jogo
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura) // Mostra a largura e altura no console
}

// Chama a função para ajustar o tamanho do palco do jogo
ajustaTamanhoPalcoJogo()

// Inicia o cronômetro do jogo
var cronometro = setInterval(function() {
    tempo -= 1

    // Verifica se o tempo acabou
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html' // Redireciona para a página de vitória
    } else {
        document.getElementById('cronometro').innerHTML = tempo // Atualiza o cronômetro na página
    }
}, 1000)

// Função para definir a posição aleatória do mosquito
function posicaoRandomica() {
    // Remove o mosquito anterior se existir
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        // Verifica se o jogador perdeu todas as vidas
        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html' // Redireciona para a página de fim de jogo
        } else {
            // Atualiza a imagem de vida perdida
            document.getElementById('v' + vidas).src = "./src/assets/imagens/coracao_vazio.png"
            vidas++
        }
    }

    // Gera uma posição aleatória para o mosquito
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    // Garante que o mosquito não saia da tela
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY) // Mostra a posição do mosquito no console

    // Cria o elemento HTML do mosquito
    var mosquito = document.createElement('img')
    mosquito.src = './src/assets/imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove() // Remove o mosquito ao ser clicado
    }

    document.body.appendChild(mosquito) // Adiciona o mosquito ao corpo do documento
}

// Função para definir o tamanho aleatório do mosquito
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)
    
    switch(classe) {
        case 0:
            return 'mosquito1'
        
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

// Função para definir o lado aleatório do mosquito
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)
    
    switch(classe) {
        case 0:
            return 'ladoA'
        
        case 1:
            return 'ladoB'
    }
}
