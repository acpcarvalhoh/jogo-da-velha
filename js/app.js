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
                console.log(event.target.id)
                console.log(`jogador atual é ${App.state.currentPlayer}`)

                const currentPlayer = App.state.currentPlayer
                const icon = document.createElement('i')

                if(currentPlayer == 1){
                    icon.classList.add('fa-solid', 'fa-x', 'turquoise')
                }else{
                    icon.classList.add('fa-solid', 'fa-o', 'yellow')
                }

                App.state.currentPlayer = App.state.currentPlayer == 1? 2 : 1

                event.target.replaceChildren(icon)

            })

        
            //<i class="fa-solid fa-x yellow"></i>
            //<i class="fa-solid fa-o turquoise"></i>
        })
    }
};

window.addEventListener('load', () => App.init())
