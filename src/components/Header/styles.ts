import styled from "styled-components";

export const Container = styled.div`
  padding: 4rem 2rem;

  nav {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 4rem;
    background: #fff;
    border-radius: 1.8rem;
    -webkit-box-shadow: 0 1px 15px rgb(0 0 0 / 20%); 
    box-shadow: 0 1px 15px rgb(0 0 0 / 20%);

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: 1.6rem 1rem;
      text-decoration: none;
      color: #777777;
      font-size: 1.2rem;
      font-weight: 900;
      transition: all 0.2s ease-in;

      img {
        height: 3rem;
        margin-left: -0.5rem;
        margin-right: 0.5rem;
        filter: grayscale(100%);
        transition: all 0.2s ease-in;

        &.home {
          height: 2.4rem;
          margin: 0.3rem;
          margin-left: -1rem;
          margin-right: 1rem;
        }

        &.about {
          height: 2.2rem;
          margin: 0.4rem;
          margin-left: -0.3rem;
          margin-right: 1rem;
        }
        
        &.pokemon {
          height: 4.2rem;
          margin: -0.6rem;
          margin-left: -0.3rem;
          margin-right: 0.3rem;
        }

        &.favorites {
          height: 2.4rem;
          margin: 0.3rem;
          margin-left: -0.3rem;
          margin-right: 0.7rem;
        }
      }

      &:hover {
        color: #FF5350;
        
        img {
          filter: grayscale(0%);
        }

        &:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          border-bottom: 0.3rem solid #FF5350;
        }
      }

      &:first-child {
        padding-left: 3rem;

        &:hover {
          &:before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 10%;
            width: 90%;
            border-bottom: 0.3rem solid #FF5350;
          }
        }
      }

      &.active {
        color: #FF5350;

        img {
          filter: grayscale(0%);
        }
        
        &:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          border-bottom: 0.3rem solid #FF5350;
        }

        &:first-child {
          padding-left: 3rem;

          &:before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 10%;
            width: 90%;
            border-bottom: 0.3rem solid #FF5350;
          }
        }
      }
    }
  }
`