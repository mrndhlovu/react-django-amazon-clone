import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  AmazonButton,
  AmazonLogo,
  TextDivider,
  UIForm,
  UIHeader,
} from "../shared";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  position: relative;

  .amazon__form__logo {
    ${({ theme }) => theme.helpers.absoluteCenter("2%")};
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.helpers.absoluteCenter("8%")};
  ${({ theme }) => theme.helpers.useFlex("column", "space-evenly")};
  z-index: 10;

  height: 50%;
  max-width: 350px;

  button {
    font-weight: ${({ theme }) => theme.fonts.weight.light};
    color: ${({ theme }) => theme.colors.black};
    font-size: 13px;
  }

  .amazon__button.secondary {
    margin: 0;
  }

  .auth__divider__account {
  }
`;

const FooterLink = styled.div`
  position: relative;
  padding-top: 15px;

  hr {
    margin: 13px 0;
  }

  a,
  span {
    font-size: 11px;
    padding-right: 5px;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }

  a {
    color: ${({ theme }) => theme.colors.amazonBlue};
  }
`;

const FormWrapper = styled.div`
  ${({ theme }) => theme.helpers.shadowPrimary};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border: 1px #ddd solid;
  border-radius: 4px;

  h2 {
    padding-bottom: 10px;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }
`;

const PageDivider = styled.div`
  background-color: #dddddd42;
  height: 42vh;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: -4px -4px 29px 1px rgba(0, 0, 0, 0.12);
`;

const FormContainer = ({
  children,
  header,
  footerButtonProps,
  footerLinkProps,
  dividerContent,
  dataTestId,
}) => {
  return (
    <Wrapper data-testid={dataTestId}>
      <Link to="/" className="amazon__form__logo">
        <AmazonLogo
          dataTestId={`${(header || "auth")
            .toLowerCase()
            .split(" ")
            .join("-")}-form`}
          height="60"
          width="100"
          fill="#000"
        />
      </Link>

      <Container>
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
          <UIForm.Button
            button={() => (
              <AmazonButton
                buttonText={footerButtonProps.content}
                dataTestId={footerButtonProps.testId}
                handleClick={footerButtonProps.onClick}
                secondary
              />
            )}
          />
        )}
      </Container>
      <PageDivider />
    </Wrapper>
  );
};

FormContainer.defaultProps = {
  dataTestId: "",
  dividerContent: "",
  footerButtonProps: {},
  footerLinkProps: {},
  header: "",
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
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
};

export default FormContainer;
