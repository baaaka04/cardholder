import { useState } from 'react'
import styled from 'styled-components'
import metroJPG from './images/metro.jpg'
import miratorgJPG from './images/miratorg.jpg'
import vernyiJPG from './images/vernyi.jpg'
import sparJPG from './images/spar.jpg'
import diksiJPG from './images/diksi.jpg'
import hmJPG from './images/hm.jpg'
import okeyJPG from './images/okey.jpg'
import lentaJPG from './images/lenta.jpg'
import perekrestokJPG from './images/perekrestok.jpg'
import pyaterkaJPG from './images/pyaterka.jpg'

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
background-color: ${props => props.color};
border-radius: 0 0 15px 15px;
background-image: url(${(props: { image: string }) => props.image});
background-size: contain;
background-repeat: no-repeat;
background-position: center;
`
const Title = styled.div`
height: 55px;
`
const lcard = {
  title: 'Лента',
  color: '#253c88',
  barcode: lentaJPG,
}
const cards = [
  {
    title: 'Дикси',
    color: 'orange',
    barcode: diksiJPG,
  },
  {
    title: 'Верный',
    color: '#e01e27',
    barcode: vernyiJPG,
  },
  {
    title: 'Хмельная миля',
    color: '#f0cc33',
    barcode: hmJPG,
  },
  {
    title: 'Metro',
    color: '#1a3c7b',
    barcode: metroJPG,
  },
  {
    title: 'SPAR',
    color: '#e01c22',
    barcode: sparJPG,
  },
  {
    title: 'OKEY',
    color: 'gold',
    barcode: okeyJPG,
  },
  {
    title: 'Мираторг',
    color: 'white',
    barcode: miratorgJPG,
  },
  {
    title: 'Перекресток',
    color: '#005526',
    barcode: perekrestokJPG,
  },
  {
    title: 'Пятерочка',
    color: '#e22b22',
    barcode: pyaterkaJPG,
  },
]

function App() {

  const [cardOpen, setCardOpen] = useState<boolean>(false)

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
            <CardImage image={card.barcode} />
          </Card>
        )
      })}

      <LastCard color={lcard.color} className="card" onClick={e => { openView(e) }}>
        <Title>
          {lcard.title}
        </Title>
        <CardImage image={lcard.barcode} />
      </LastCard>
    </Container>
  );
}

export default App;
