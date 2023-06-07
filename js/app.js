const App = {
    $:{
        menu: document.querySelector('[data-id="menu"]'),
        menuItens: document.querySelector('[data-id="menu-items"'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        squares: document.querySelectorAll('[data-id="squares"]')
    },

    state: {
        currentPlayer: 1   
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

        App.$.squares.forEach(square => {
            square.addEventListener('click', (event) => {
               
                // verifica de já há uma jogada, então retorne.
                if(square.hasChildNodes()){
                    return
                }

                const currentPlayer = App.state.currentPlayer
                const icon = document.createElement('i')

                ///  Determine qual icone de jogador adicionar no quadrado
                if(currentPlayer == 1){
                    icon.classList.add('fa-solid', 'fa-x', 'turquoise')
                }else{
                    icon.classList.add('fa-solid', 'fa-o', 'yellow')
                }

                App.state.currentPlayer = App.state.currentPlayer == 1? 2 : 1

                square.replaceChildren(icon)

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

            })

        })
    }
};

window.addEventListener('load', () => App.init())
