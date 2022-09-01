import { useState } from 'react'
import styled from 'styled-components'
import { cards } from './Cards'

function App() {
  const [cardOpen, setCardOpen] = useState(false)
  const [move, setMove] = useState(0)
  const [clickedI, setClickedI] = useState<null | number>(null)

  function handleClick() {
    setCardOpen(!cardOpen)
    if (cardOpen) {
      (Array.from(document.getElementsByClassName('cardview') as HTMLCollectionOf<HTMLElement>))
        .map(item => {
          item.classList.add('card')
          item.classList.remove('cardview')
        })
    }
  }
  function openView(e: React.MouseEvent<HTMLElement>, i: null | number = null) {
    if (e.currentTarget.classList.contains("cardview")) {
      e.currentTarget.classList.remove("cardview")
      e.currentTarget.classList.add("card")
      setClickedI(null)
      setMove(0)
    } else {
      e.currentTarget.classList.add("cardview")
      e.currentTarget.classList.remove("card")
      setMove(i as number * -40 - 10)
      setClickedI(i)
    }
  }

  return (
    <Container className={cardOpen ? "overview" : ""} onClick={handleClick}>
      <Top />
      {cards.map((card, i) => {
        const isLastCard = (i === (cards.length - 1))
        const CardComponent = isLastCard ? LastCard : Card;
        return (
          <CardComponent key={card.title} color={card.color} style={i === clickedI ? { translate: `0 ${move}px` } : {}} className="card" onClick={e => { openView(e, i) }}>
            <Title fontColor={card.font}>
              {card.title}
            </Title>
            <CardImage image={card.barcode} />
          </CardComponent>
        )
      })
      }
    </Container>
  );
}

document.documentElement.classList.add('dark') // define background color

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: top;
min-height: 100vh;
padding-bottom: 40px;
`
const Card = styled.div`
width: 90%;
max-width: 380px;
top: 40px;
position: sticky;
height: 40px;
background-color: ${props => props.color};
box-shadow: 0 10px ${props => props.color};
border: 1px solid gray;
border-bottom: 0;
border-radius: 15px 15px 0 0;
transition: all 0.5s ease;
`
const LastCard = styled(Card)`
height: 60vh;
max-height: 520px;
border-radius: 15px;
`
const Top = styled.div`
height: 40px;
top: 40px;
width: 90%;
`
const CardImage = styled.div`
width: 100%;
height: calc(100% - 65px + 10px);
background-color: ${props => props.color};
border-radius: 0 0 15px 15px;
background-image: url(${(props: { image: string }) => props.image});
background-size: 100%;
background-repeat: no-repeat;
background-position: center;
`
const Title = styled.div`
color: ${(props: { fontColor: string }) => props.fontColor};
font-size: 18px;
font-weight: 500;
padding-top: 10px;
height: 55px;
`

export default App;
