import { Container } from "./styles";

export function About() {
  return (
    <Container>
      <h1>About</h1>
      <p>This project was made to train my ReactJS skills. All the data comes from <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokeAPI</a>.</p>
      <p>You can find the code of the project on this <a href="https://github.com/kevinshibuya/PokeJS" target="_blank" rel="noreferrer">repository</a>.</p>
      <h1>Technologies used</h1>
      <ul>
        <li><span>ReactJS + Typescript:</span> The framework, the foundation.</li>
        <li><span>React Icons:</span> Yeah, icons.</li>
        <li><span>React Palette:</span> Used to make the background color of the pokemon page change, based on the most vibrant color of the pokemon image.</li>
        <li><span>React Router Dom:</span> Did all the application routing.</li>
        <li><span>React Spring:</span> Animation library, used on the pokemon page.</li>
        <li><span>React Modal:</span> Used to make the disclaimer when you first load the project.</li>
        <li><span>Styled Components:</span> Really good library to integrate styling with the code.</li>
      </ul>
      <h1>The Design</h1>
      <p>Since I am no designer, just a programmer, this project design was based on the works of <a href="https://dribbble.com/AC1design" target="_blank" rel="noreferrer">AC1design</a>: <a href="https://dribbble.com/shots/15128634-Pokemon-Pokedex-Website-Redesign-Concept" target="_blank" rel="noreferrer">Pokedex Website Redesign Concept</a></p>
    </Container>
  )
}