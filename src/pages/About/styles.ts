import styled from "styled-components";

export const Container = styled.div`
  h1 {
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.3rem;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 0.3rem;

      span {
        font-weight: bold;
      }
    }
  }

  li, p {
    font-size: 1.1rem;
  }

  .contact {
    li {
      display: flex;
      justify-content: start;
      align-items: center;
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 5px;
    }
  }
`