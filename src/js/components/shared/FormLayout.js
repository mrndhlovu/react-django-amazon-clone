/* eslint-disable no-confusing-arrow */
import React, { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import WarningIcon from "@material-ui/icons/Warning";

import { removeAlertAction } from "../../actions/action.helpers";
import AmazonButton from "./AmazonButton";
import AmazonLogo from "./AmazonLogo";
import TextDivider from "./TextDivider";
import UIHeader from "./UIHeader";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  position: relative;
  width: 100%;

  .amazon__form__logo {
    ${({ theme }) => theme.helpers.absoluteCenter("2%")};
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.helpers.absoluteCenter("10%")};
  z-index: 10;
  max-width: 350px;

  & > button {
    color: ${({ theme }) => theme.colors.black};
    font-size: 13px;
  }

  & > .amazon__button.primary {
    font-weight: ${({ theme }) => theme.fonts.weight.light};
  }

  & > .amazon__button.secondary {
    font-weight: ${({ theme }) => theme.fonts.weight.light};
    margin: 0;
    margin-top: 8%;
  }

  @media (max-width: 1024px) {
    width: 95%;
  }

  
`;

const FooterLink = styled.div`
  position: relative;
  padding-top: 15px;

  & > hr {
    margin: 13px 0;
  }

  & > a,
  span {
    font-size: 11px;
    padding-right: 5px;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }

  & > a {
    color: ${({ theme }) => theme.colors.amazonBlue};
  }
`;

const FormWrapper = styled.div`
  ${({ theme }) => theme.helpers.shadowPrimary};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border: 1px #ddd solid;
  border-radius: 4px;
  margin-bottom: 29px;

  & > h2 {
    padding-bottom: 10px;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }
`;

const FormAlert = styled.div`
  ${({ theme }) => theme.helpers.useOverFlowWrap};
  position: relative;
  width: 100%;
  border: ${({ success }) =>
    success ? "1px solid #fba730" : "1px solid #ff00008a"};
  border-radius: 2px;
  padding: 15px 10px;
  margin-bottom: 15px;

  & > div:first-child {
    color: ${({ success }) => (success ? "#fba730" : "#ff00008a")};
    font-weight: ${({ theme }) => theme.fonts.weight.light};

    svg {
      margin-right: 10px;
    }
    ${({ theme }) => theme.helpers.useFlex(null, null, "center")};
  }

  & > div:last-child {
    margin-left: 10%;
    margin-right: 5%;
    font-weight: ${({ theme }) => theme.fonts.weight.light};
    font-size: 15px;
  }
`;

const FormLayout = ({
  children,
  header,
  footerButtonProps,
  footerLinkProps,
  dividerContent,
  dataTestId,
  success,
  className,
}) => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeAlertAction());
    };
  }, [dispatch]);

  return (
    <Wrapper className={className} data-testid={dataTestId}>
      <Link to="/" className="amazon__form__logo">
        <AmazonLogo
          dataTestId={`${(header || "auth")
            .toLowerCase()
            .split(" ")
            .join("-")}-form-logo`}
          height="60"
          width="100"
          fill="#000"
        />
      </Link>

      <Container>
        {alert.message && (
          <FormAlert success={success}>
            {!success && (
              <div>
                <WarningIcon />
                <UIHeader as="h4" content="There was a problem" />
              </div>
            )}
            <div>{alert.message}</div>
          </FormAlert>
        )}
        <FormWrapper>
          <UIHeader content={header} as="h2" />
          {children}
          {footerLinkProps?.content && (
            <>
              <TextDivider content={dividerContent} />
              <FooterLink>
                <span>{footerLinkProps.content}</span>
                <Link to={footerLinkProps.link}>
                  {footerLinkProps.linkText}
                </Link>
              </FooterLink>
            </>
          )}
        </FormWrapper>

        {dividerContent && <TextDivider content={dividerContent} />}
        {footerButtonProps?.content && (
          <AmazonButton
            buttonText={footerButtonProps.content}
            dataTestId={footerButtonProps.testId}
            handleClick={footerButtonProps.onClick}
            secondary
          />
        )}
      </Container>
    </Wrapper>
  );
};

FormLayout.defaultProps = {
  dataTestId: "",
  dividerContent: "",
  footerButtonProps: {},
  footerLinkProps: {},
  header: "",
  success: false,
  className: "",
};

FormLayout.propTypes = {
  children: PropTypes.node.isRequired,
  success: PropTypes.bool,
  header: PropTypes.string,
  footerLinkProps: PropTypes.shape({
    content: PropTypes.string,
    link: PropTypes.string,
    linkText: PropTypes.string,
  }),
  footerButtonProps: PropTypes.shape({
    content: PropTypes.string,
    onClick: PropTypes.func,
    testId: PropTypes.string,
  }),
  dividerContent: PropTypes.string,
  dataTestId: PropTypes.string,
  className: PropTypes.string,
};

export default memo(FormLayout);
