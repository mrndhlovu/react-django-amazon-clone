import { css } from "styled-components";

const shadowPrimary = css`
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset;
`;

const useFlex = (direction, justify = "center", align = "center") => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
`;

const absoluteCenter = (top = "auto", bottom = "auto") => css`
  position: absolute;
  left: 50%;
  top: ${top};
  bottom: ${bottom};
  transform: translate(-50%);
`;

const containerSize = (width = "100vw", height = "100vh") => css`
  width: ${width};
  height: ${height};
`;

const hoverText = (color) => css`
  &:hover {
    color: ${color};
    transition-duration: 500ms;
    transition-property: color;
    transition-timing-function: ease-in-out;
  }
`;

const hoverTransition = (property) => css`
  transition: 500ms !important;
  transition-property: ${property};
  transition-timing-function: ease-in-out;
`;

const gridLayout = (columns) => css`
  display: grid;
  grid-template-columns: ${columns};
`;

const useOverFlowWrap = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

export default {
  useFlex,
  shadowPrimary,
  absoluteCenter,
  containerSize,
  hoverText,
  hoverTransition,
  gridLayout,
  useOverFlowWrap,
};
