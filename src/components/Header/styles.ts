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
          left: 5%;
          width: 90%;
          border-bottom: 0.3rem solid #FF5350;
        }
      }

      &.pokedex {
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
          left: 5%;
          width: 90%;
          border-bottom: 0.3rem solid #FF5350;
        }

        &.pokedex {
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

  .menu-bars {
    display: none;
  }

  @media (max-width: 640px) {
    padding-top: 9rem;

    .navbar {
      display: block;
      z-index: 20;
      background: #fff;
      border-radius: 1.8rem;
      padding: 1rem 2rem!important;
      position: fixed;
      top: 0;
      left: 0;
      border-radius: 0;
      width: 100%;
      box-shadow: 0 1px 15px rgb(0 0 0 / 20%);
      

    .menu-bars {
      display: block;

      &.open {
        
      height: 2rem;
      width: 2rem;

      }

        svg {
          height: 2rem;
          width: 2rem;
          color: #FF5350;
        }
      }
    }


    nav {
      background: #fff;
      flex-direction: column;
      align-items: start;
      border-radius: 0;
      width: 230px;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      margin-left: -100%;
      box-shadow: 0 1px 15px rgb(0 0 0 / 20%);
      z-index: 20;
      transition: margin-left 0.5s;

      a {
        width: 100%;
        height: 60px;
        padding: 1rem 2rem!important;
        justify-content: start;

        &::before {
          left: 10%!important;
          width: 80%!important;
        }

        &:first-child {
          padding-left: 2rem!important;

          &::before {
            content: "";
            border: none!important;
          }
        }

        img {
          margin-left: -0.3rem;
          margin-right: 1rem;
          width: 2.5rem;
          height: 2.5rem;

          &.pokemon {
            margin-left: -0.6rem;
            margin-right: 0.7rem;
            width: 3.1rem;
            height: 3.1rem;
          }
          
          &.favorites {
            margin-left: -0.1rem;
            margin-right: 1.3rem;
            width: 2rem;
            height: 2rem;
          }
          
          &.about {
            margin-left: -0.1rem;
            margin-right: 1.3rem;
            width: 2rem;
            height: 2rem;
          }
        }
      }

    }

    nav.active {
      margin-left: 0;
    }

    .title-wrapper {
      margin-top: 2rem;
    }
  }
`