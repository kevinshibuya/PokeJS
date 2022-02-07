import styled from 'styled-components';

export const Container = styled.button`
  min-width: 20rem;
  max-width: 25rem;
  width: 100%;
  height: 13rem;
  padding: 1rem;
  border: 0rem;
  border-radius: 1.8rem;
  margin: auto;
  background: #FFF;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30); 
  box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30);
  transition: background 0.2s ease-in;

  &:hover {
      background: #f2f2f2;
  }

  div.img {
    width: 4rem;
    height: 4rem;
    margin-top: -4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
    }
  }


  h1.id {
    margin-top: 1.5rem;
    font-size: 1rem;
    font-weight: 800;
    color: #8c8c8c;
  }

  h1.name {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #011030;
    text-transform: capitalize;
    font-size: 1.5rem;
    font-weight: 800;
  }

  div.types {
    display: flex;
  }
`

interface TypesProps {
  type: string;
}

export const Types = styled.div<TypesProps>`
  padding: 0.5rem;
  margin: 0.4rem;
  background: ${(props) => `var(--${props.type})`};
  color: ${(props) => `var(--${props.type}-text)`};
  font-weight: 800;
  border-radius: 0.5rem;
`