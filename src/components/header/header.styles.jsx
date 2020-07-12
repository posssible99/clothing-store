import styled from "styled-components";
import { Link } from "react-router-dom";

// If we find that more than one component uses the css styles, we do this.Then we use string interpolation and we give
// to many components the same styles.
// const optionContainerStyles = css`
//   padding: 10px 15px;
//   cursor: pointer;
// `;

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

// This is how we create a new styled component, that is not a div or common tag.
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

// export const OptionDiv = styled.div`
//   ${optionContainerStyles}
// `;
