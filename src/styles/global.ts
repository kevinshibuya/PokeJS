import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --normal: #A8A878;
    --normal-text: #2e2e21;

    --fire: #F08030;
    --fire-text: #5c3112;
    
    --water: #6890F0;
    --water-text: #253457;

    --grass: #78C850;
    --grass-text: #264019;

    --electric: #F8D030;
    --electric-text: #594b11;

    --ice: #98D8D8;
    --ice-text: #364d4d;

    --fighting: #C03028;
    --fighting-text: #4a120f;

    --poison: #A040A0;
    --poison-text: #471c47;

    --ground: #E0C068;
    --ground-text: #5e512a;

    --flying: #A890F0;
    --flying-text: #473c66;

    --psychic: #F85888;
    --psychic-text: #6e253b;

    --bug: #A8B820;
    --bug-text: #3a400b;

    --rock: #B8A038;
    --rock-text: #524718;

    --ghost: #705898;
    --ghost-text: #2f2440;
    
    --dark: #705848;
    --dark-text: #29201a;
    
    --dragon: #7038F8;
    --dragon-text: #321970;
    
    --steel: #B8B8D0;
    --steel-text: #555561;
    
    --fairy: #F0B6BC;
    --fairy-text: #75585b;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: #F6F8FC;
    -webkit-font-smoothing: antialiased;
    max-width: 1120px;
    margin: 0 auto;
  }

  body, input, textarea, button {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .note-modal-overlay {
    position: fixed;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .note-modal {
    inset: 50% auto auto 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 600px;
    position: absolute;
    border-radius: 1.8rem;
    background: rgb(255, 255, 255);
    overflow: auto;
    outline: none;
    padding: 2rem;

    .note-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;

      svg {
        font-size: 2rem;
        cursor: pointer;
      }
    }

    p {
      font-size: 1.1rem;
    }
  }
`