import styled from "styled-components";

export const MainContainer = styled.main`
  background-color: black;
`;

export const PlayerText = styled.h1`
  color: red;
`;

export const Tile = styled.span`
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.05);
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
  height: 50vmin;
  width: 50vmin;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
`;
