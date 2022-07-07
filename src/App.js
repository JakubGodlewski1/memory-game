import {useEffect, useState} from 'react'
import './App.css'
import Card from "./components/Card";

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false, clicked: false},
  { "src": "/img/potion-1.png", matched: false, clicked: false },
  { "src": "/img/ring-1.png", matched: false, clicked: false },
  { "src": "/img/scroll-1.png", matched: false, clicked: false },
  { "src": "/img/shield-1.png", matched: false, clicked: false },
  { "src": "/img/sword-1.png", matched: false, clicked: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)



  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random()}))
      
    setCards(shuffledCards)
    setTurns(0)
      setChoiceOne(null)
      setChoiceTwo(null)
  }

  //handle a choice of card and if they match
  const handleClick = (card) => {
      if (!choiceTwo){
        if (!choiceOne)
          setChoiceOne(card)
        else {
          setChoiceTwo(card)
        }
      }
  }

  //compare 2 selected cards
  useEffect(()=>{
    if (choiceOne && choiceTwo){
      setTurns((prev)=>prev+1)
      if ( choiceOne.src === choiceTwo.src){
        setCards((prev)=>{
          return prev.map((card)=>{
           if (card.src === choiceOne.src){
             return {...card, matched: true}
            }else {
             return card;
           }

          })
        })
      }
      setTimeout(()=>{
        setChoiceOne(null)
        setChoiceTwo(null)
      },600)

    }
  },[choiceOne, choiceTwo])

  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card)=> {
          return(
            <Card
                handleClick={handleClick}
                key={card.id}
                card={card}
                flipped={card === choiceOne || card === choiceTwo || card.matched === true}
            />
              )
        })}
      </div>
      <div className="counter">
        <h2>Your turns: {turns}</h2>
      </div>
    </div>
  );
}

export default App
