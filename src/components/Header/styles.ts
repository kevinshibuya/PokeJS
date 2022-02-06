import styled from "styled-components";

export const Container = styled.div`
  nav {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 4rem;
    background: #fff;
    border-radius: 20px;
    -webkit-box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30); 
    box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30);

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
          border-bottom: 4px solid #FF5350;
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
            border-bottom: 4px solid #FF5350;
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
          border-bottom: 4px solid #FF5350;
        }

        &:first-child {
          padding-left: 3rem;

          &:before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 10%;
            width: 90%;
            border-bottom: 4px solid #FF5350;
          }
        }
      }
    }
  }
`