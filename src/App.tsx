import { useState } from 'react'
import styled from 'styled-components'

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
top: 40px;
position: sticky;
height: 40px;
background-color: ${props => props.color};
box-shadow: 0 10px ${props => props.color};
border-radius: 15px 15px 0 0;
`
const LastCard = styled(Card)`
height: 60vh;
border-radius: 15px;
`
const Top = styled.div`
height: 40px;
top: 40px;
width: 90%;
`
const CardImage = styled.main`
width: 100%;
height: calc(100% - 55px + 10px);
background-color: purple;
border-radius: 0 0 15px 15px;
`
const Title = styled.div`
height: 55px;
`
const cards = [
  {
    title: 'Дикси',
    color: 'orange',
  },
  {
    title: 'Магнит',
    color: 'red',
  },
  {
    title: 'Перекресток',
    color: 'darkgreen',
  },
  {
    title: 'Икея',
    color: 'blue',
  },
  {
    title: 'Утконос',
    color: 'yellow',
  },
  {
    title: 'Сбербанк',
    color: 'green',
  },
  {
    title: 'Четыре лапы',
    color: 'orange',
  },
  {
    title: 'Леруа Мерлен',
    color: 'white',
  },
]

function App() {

  const [cardOpen, setCardOpen] = useState<boolean>(false)

  function handleClick() {
    setCardOpen(!cardOpen)
  }
  function openView(e: React.MouseEvent<HTMLElement>) {
    if (e.currentTarget.classList.contains("cardview")) {
      e.currentTarget.classList.remove("cardview")
      e.currentTarget.classList.add("card")
    } else {
      e.currentTarget.classList.add("cardview")
      e.currentTarget.classList.remove("card")
    }
  }


  return (
    <Container className={cardOpen ? "overview" : ""} onClick={handleClick}>
      <Top />
      {cards.map(card => {
        return (
          <Card key={card.title} color={card.color} className="card" onClick={e => { openView(e) }}>
            <Title>
              {card.title}
            </Title>
            <CardImage />
          </Card>
        )
      })}

      <LastCard color={cards[0].color} className="card" onClick={e => { openView(e) }}>
        <Title>
          {cards[0].title}
        </Title>
        <CardImage />
      </LastCard>
    </Container>
  );
}

export default App;
