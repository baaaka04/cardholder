import { useState } from 'react'
import styled from 'styled-components'
import { cards } from './Cards'

function App() {
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [move, setMove] = useState(0)
  const [clickedI, setClickedI] = useState<null | number>(null)

  function handleClick() {
    setIsCardOpen(!isCardOpen)
    if (isCardOpen) {
      setClickedI(null);
      (Array.from(document.getElementsByClassName('cardview') as HTMLCollectionOf<HTMLElement>))
        .map(item => {
          item.classList.add('card')
          item.classList.remove('cardview')
        })
    }
  }
  function openView(e: React.MouseEvent<HTMLElement>, i: null | number = null) {
    const card = e.currentTarget
    if (card.classList.contains("cardview")) {
      card.classList.remove("cardview")
      card.classList.add("card")
      setMove(0)
      setClickedI(null)
    } else {
      card.classList.add("cardview")
      card.classList.remove("card")
      setMove(i as number * -40 - 10)
      setClickedI(i)
      window.scrollTo(0, 0)
    }
  }

  return (
    <Container className={isCardOpen && clickedI !== null ? "overview" : ""} onClick={handleClick}>
      <Top />
      {cards.map((card, i) => {
        const isLastCard = (i === (cards.length - 1))
        const CardComponent = isLastCard ? LastCard : Card;
        return (
          <CardComponent key={card.title} color={card.color} style={i === clickedI ? { translate: `0 ${move}px` } : {}} className="card" onClick={e => { openView(e, i) }}>
            <Label>
              <Logo logo={card.logo} />
              <Title fontColor={card.font}>
                {card.title}
              </Title>
            </Label>
            <CardImage image={card.barcode} />
          </CardComponent>
        )
      })
      }
      <br />
      {!isCardOpen ? <Reload onClick={() => window.location.reload()}>обновить</Reload> : null}

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
`
const Label = styled.div`
display: flex;
padding: 10px 0 30px 0;
height: 25px;
align-items: center;
`
const Logo = styled.div`
width: 30px;
height: 30px;
border-radius: 50%;
border: 1px grey solid;
margin: 0 5px;
background-image: url(${(props: { logo: string }) => props.logo});
background-position: center;
background-size: cover;
`
const Reload = styled.button`
font-size: 1.2rem;
border-radius: 15px;
border: 0;
background-color: rgb(51 65 85);
color: #64747d;
margin-top: 30px;
height: 40px;
width: 90%;
`

export default App;
