const App = {
    $:{
        menu: document.querySelector('[data-id="menu"]'),
        menuItens: document.querySelector('[data-id="menu-items"'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        squares: document.querySelectorAll('[data-id="squares"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalText: document.querySelector('[data-id="modal-text"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
        turn: document.querySelector('[data-id="turn"]'),
    },

    state: {
        moves: []   
    },

    getGameStatus(moves){

        const p1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId)
        const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId)

        // verifique se tem um vecendor ou uma gravata
        const winningPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];

        let winner = null

        winningPatterns.forEach(pattern => {
            const p1Wins = pattern.every(v => p1Moves.includes(v))
            const p2Wins = pattern.every(v => p2Moves.includes(v))


            if(p1Wins) winner = 1
            if(p2Wins) winner = 2
        })

        

        return{
            status: moves.length === 9 || winner != null ? 'Jogo completo' : 'Jogo em progresso',
            winner
        }
    },

    

    init(){ 
        App.registerEventListener()
    },


    registerEventListener(){
        // DONE
        App.$.menu.addEventListener('click', function() {
            App.$.menuItens.classList.toggle('hidden');
        });

        App.$.resetBtn.addEventListener('click', event => {
            console.log('Resete o jogo')
        })

        App.$.newRoundBtn.addEventListener('click', event => {
            console.log('Nova rodada')
        })

        App.$.modalBtn.addEventListener('click', (event) => {
            App.state.moves = []

            App.$.modal.classList.add('hidden')
            App.$.squares.forEach(square => square.replaceChildren())
            
        })

        App.$.squares.forEach(square => {
            square.addEventListener('click', (event) => {
               
                // verifica de já há uma jogada, então retorne.

                const hasMove = (squareId) => {
                    const existingMoves = App.state.moves.find((move) => move.squareId === squareId)
                    return existingMoves !== undefined
                }

                if(hasMove(+square.id)){
                    return
                }

                const lastMove = App.state.moves.at(-1)
                const getOppositePlayer = (playerId) => playerId == 1? 2: 1

                const currentPlayer = App.state.moves.length == 0? 
                1: getOppositePlayer(lastMove.playerId)

                const nexPlayer = getOppositePlayer(currentPlayer)

                const squareIcon = document.createElement('i')
                const turnIcon = document.createElement('i')
                const turnLabel = document.createElement('p')
                turnLabel.innerText = `Jogador ${nexPlayer}, sua vez!`

                ///  Determine qual icone de jogador adicionar no quadrado
                if(currentPlayer == 1){
                    squareIcon.classList.add('fa-solid', 'fa-x', 'turquoise')
                    turnIcon.classList.add('fa-solid', 'fa-o', 'yellow')

                    turnLabel.classList = 'yellow'
                }else{
                    squareIcon.classList.add('fa-solid', 'fa-o', 'yellow')
                    turnIcon.classList.add('fa-solid', 'fa-x', 'turquoise')

                    turnLabel.classList = 'turquoise'
                }

                App.$.turn.replaceChildren(turnIcon, turnLabel)

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                })

                console.log(App.state.moves)
                App.state.currentPlayer = currentPlayer == 1? 2 : 1

                
                

                square.replaceChildren(squareIcon)

                // verificar se tem um vencedor 
                const game = App.getGameStatus(App.state.moves)

                if(game.status === 'Jogo completo'){
                    App.$.modal.classList.remove('hidden')

                    let message = ''
                    if(game.winner){
                        message = `Jodador ${game.winner} venceu!`

                    }else{
                        message = 'Jogo sem vencedor!'
                    }


                    App.$.modalText.innerHTML = message
                }

                

            })

        })
    }
};

window.addEventListener('load', () => App.init())
