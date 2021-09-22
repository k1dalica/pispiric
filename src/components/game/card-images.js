const cards = {}

const suits = ['d', 's', 'c', 'h']

suits.forEach(suit => {
  for(let i=1; i <= 13; i++)
    cards[suit + i] = require(`@/assets/images/cards/${suit}${i}.png`)
})

cards.back = require(`@/assets/images/cards/back.png`)

export default cards