import * as AiIcons from "react-icons/ai";

import { Container } from "./styles";

export function About() {
  return (
    <Container>
      <h1>About</h1>
      <p>This project was made to solidify what I learned on chapters I and II of the <a href="https://www.rocketseat.com.br/ignite" target="_blank" rel="noreferrer">Rocketseat ReactJS Ignite course</a>.</p>
      <p>All the data of the project comes from <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokeAPI</a>.</p>
      <p>You can find the code of the project on this <a href="https://github.com/kevinshibuya/PokeJS" target="_blank" rel="noreferrer">repository</a>.</p>
      <h1>Technologies used</h1>
      <ul>
        <li><span>ReactJS + Typescript:</span> The framework, the foundation.</li>
        <li><span>React Icons:</span> Yeah, icons.</li>
        <li><span>React Palette:</span> Used to make the background color of the pokemon page change, based on the most vibrant color of the pokemon image.</li>
        <li><span>React Router Dom:</span> Did all the application routing.</li>
        <li><span>React Spring:</span> Animation library, used on the pokemon page.</li>
        <li><span>React Modal:</span> Used to make the note when you first load the project.</li>
        <li><span>Styled Components:</span> Really good library to integrate styling with the code.</li>
      </ul>
      <h1>The Design</h1>
      <p>Since I am just a programmer, this project design was based on the works of <a href="https://dribbble.com/AC1design" target="_blank" rel="noreferrer">AC1design</a>: <a href="https://dribbble.com/shots/15128634-Pokemon-Pokedex-Website-Redesign-Concept" target="_blank" rel="noreferrer">Pokedex Website Redesign Concept</a></p>
      <h1>Contact</h1>
      <ul className="contact">
        <li><AiIcons.AiFillLinkedin /><a href="https://www.linkedin.com/in/kevin-shibuya/" target="_blank" rel="noreferrer">Linkedin</a></li>
        <li><AiIcons.AiFillGithub /><a href="https://github.com/kevinshibuya" target="_blank" rel="noreferrer">Github</a></li>
        <li><AiIcons.AiFillMail /><a href="mailto:kevinshibuyadev@gmail.com" target="_blank" rel="noreferrer">kevinshibuyadev@gmail.com</a></li>
      </ul>
    </Container>
  )
}