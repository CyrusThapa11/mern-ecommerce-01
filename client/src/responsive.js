import React from "react";
import { css } from "styled-components";

// queries :

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media (min-width: 381px) and (max-width: 850px) {
      ${props}
    }
  `;
};
