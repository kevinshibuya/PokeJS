import styled from 'styled-components';

export const Container = styled.div`
  min-width: 300px;
  width: 90%;
  padding: 1rem;
  border-radius: 20px;
  margin: auto;
  background: #FFF;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30); 
  box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30);

  div.img {
    width: 4rem;
    height: 4rem;
    margin-top: -3.5rem;
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
    color: #758A97;
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

    div.type {
      padding: 0.5rem;
      margin: 0.4rem;
      background: #A9BBCD;
      color: #011030;
      font-weight: 700;
      border-radius: 8px;
    }
  }
`