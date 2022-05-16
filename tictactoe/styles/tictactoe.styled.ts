import styled from 'styled-components';

export const MainContainer = styled.main`
  position: relative;
  background-color: #363636;
  height: 713px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlayerText = styled.h1`
  color: whitesmoke;
`;

export const Tile = styled.span`
  border-radius: 5px;
  background: white;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.2);
  position: relative;

    &[data-player="x"] {
    &:before,
    &:after {
      content: "";
      position: absolute;
      height: 100%;
      width: 0.2rem;
      background: red;
      left: calc(50% - 0.1rem);
      top: 0;
    }

    &:before {
      transform: rotate(-45deg);
    }
    &:after {
      transform: rotate(45deg);
    }
  }

  &[data-player="o"] {
    &:before {
      content: "";
      height: 80%;
      width: 80%;
      left: 10%;
      top: 10%;
      position: absolute;
      border-radius: 50%;
      border: 0.2rem solid blue;
    }
`;

export const Container = styled.div`
  display: grid;
  height: 350px;
  width: 50vmin;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
`;

export const ResetButton = styled.button`
  margin-bottom: 4%;
`;

export const WinnerText = styled.p``;
