import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: top;
min-height: 100vh;
`
// top: ${props => props.position*30}px;
const Card = styled.div`
position: absolute;
width: 90vw;
height: 70vh;
background-color: ${props => props.color};
border-radius: 5%;
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
]

function App() {
  return (
    <Container>
      {cards.map((card,ind) => {
        return (
          <Card key={card.title} color={card.color} >{card.title}</Card>
        )
      })}
    </Container>
  );
}

export default App;
