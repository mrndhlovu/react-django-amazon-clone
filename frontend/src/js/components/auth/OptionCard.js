import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { UIHeader } from "../shared";

const Card = styled(NavLink)`
  ${({ theme }) => theme.helpers.useFlex()};
  ${({ theme }) => theme.helpers.hoverTransition()};
  color: ${({ theme }) => theme.colors.black};
  padding: 15px;
  border: 1px solid #00000054;
  border-radius: 3px;
  height: 85px;
  cursor: pointer;
  margin: 0 15px 15px 0;
  text-decoration: none;

  &:hover {
    background-color: #68686847;
  }

  @media (max-width: 685px) {
    margin-right: 0;
  }
`;

const Content = styled.p``;

const IconContainer = styled.div`
  ${({ theme }) => theme.helpers.useFlex()};
  padding: 25px;
  max-width: 45%;


  @media (max-width: 685px) {
    padding: 8px;
  }
`;

const ContextWrapper = styled.div`
  flex-grow: 1;
  & > p {
    font-size: 12px;
    padding: 3px;
  }

  & > h4 {
    ${({ theme }) => theme.fonts.weight.medium};
    font-size: 12px;
    padding: 3px;
  }
`;

const OptionCard = forwardRef(
  ({ icon: Icon, header, content, onClick, pageId }, ref) => {
    return (
      <Card to={`/user-profile?flowId=${pageId}`} onClick={onClick}>
        <IconContainer>
          <Icon />
        </IconContainer>
        <ContextWrapper>
          <UIHeader ref={ref} as="h4" content={header} />
          <Content>{content}</Content>
        </ContextWrapper>
      </Card>
    );
  }
);

OptionCard.defaultProps = {
  icon: () => {},
};

OptionCard.propTypes = {
  icon: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default OptionCard;
