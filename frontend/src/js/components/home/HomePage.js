/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Avatar } from "@material-ui/core";

import { UIHeader, UILinkButton, DashboardProduct } from "../shared";
import { IMAGES } from "../../constants/constants";
import Hero from "./Hero";
import ProductCard from "../shared/ProductCard";
import UICard from "../shared/UICard";
import UISmall from "../shared/UISmall";

const FAKE_PRODUCTS = [
  {
    header: "Laptops",
    footerLink: "Show now",
    image: IMAGES.PRODUCTS[1],
    rating: 5,
    price: 99.5,
    short_description:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
  },
  {
    header: "Featured Computers & Accessories",
    footerLink: "See the range",
    image: IMAGES.PRODUCTS[2],
    rating: 3.5,
    price: 5.89,
    short_description:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
  },
  {
    header: "Shop smart home",
    footerLink: "See more",
    image: IMAGES.PRODUCTS[3],
    rating: 0,
    price: 4.88,
    short_description:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
  },
];

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const FeaturedList = styled.div`
  top: -11% !important;
  background-color: transparent;
  display: flex;
  left: 50%;
  position: relative;
  transform: translate(-50%);
  vertical-align: top;
  height: 400px;

  h5 {
    margin-left: 4%;
  }
`;

const CardContent = styled(UICard.Content)`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  min-height: 78%;
  grid-gap: 2px;
  height: 78%;
  width: 100%;
  position: relative;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.helpers.useFlex()};

    background-color: #00a4b40d;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  & > div:first-child {
    margin-right: 10px;
  }
  & > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CardImage = styled.img``;

const TopLinkContainer = styled.div`
  ${({ theme }) => theme.helpers.useFlex("column", "space-around")};
  position: relative;
  max-width: 150px;
  height: 100%;

  img {
    width: 100%;
    height: 100px;
    mix-blend-mode: multiply;
    cursor: pointer;
  }
`;

const TopLink = ({ image, header, redirectTo }) => (
  <Link to={redirectTo}>
    <TopLinkContainer>
      <CardImage src={image} />
      <UIHeader as="h6" content={header} />
    </TopLinkContainer>
  </Link>
);

const HomePage = () => {
  const {
    auth: { isAuthenticated, data },
  } = useSelector((state) => state);

  return (
    <Container>
      <Hero />
      <FeaturedList>
        <UICard>
          <UICard.Header
            avatar={
              <AvatarContainer>
                <Avatar>{data?.image}</Avatar>
                <div>
                  <UIHeader
                    as="h3"
                    content={`Hi, ${
                      isAuthenticated ? data?.full_name.split(" ")[0] : "Guest"
                    }`}
                  />
                  {isAuthenticated && <UISmall content="Customer since 2019" />}
                </div>
              </AvatarContainer>
            }
          />

          <UIHeader as="h5" content="Top links for you." />
          <CardContent>
            <TopLink
              header="Orders"
              redirectTo="/orders"
              image={IMAGES.PRODUCTS[0]}
            />
            <TopLink
              header="Books"
              redirectTo="/orders"
              image={IMAGES.PRODUCTS[0]}
            />
            <TopLink
              header="Electronics"
              redirectTo="/orders"
              image={IMAGES.PRODUCTS[0]}
            />
            <TopLink
              header="Computers"
              redirectTo="/orders"
              image={IMAGES.PRODUCTS[0]}
            />
          </CardContent>
        </UICard>
        <UICard>
          <UICard.Header
            avatar={<UIHeader as="h3" content="Recently viewed" />}
          />
          <ProductCard image={IMAGES.PRODUCTS[1]} />
          <UICard.Action>
            <UILinkButton content="Show more" />
          </UICard.Action>
        </UICard>
        <UICard>
          <UICard.Header
            avatar={<UIHeader as="h3" content="Deal of the day" />}
          />
          <ProductCard image={IMAGES.PRODUCTS[1]} />
          <UICard.Action>
            <UILinkButton content="Show more deals" />
          </UICard.Action>
        </UICard>
      </FeaturedList>

      <DashboardProduct.List products={FAKE_PRODUCTS} />
      <DashboardProduct.Books books={IMAGES.BOOKS} />
      <DashboardProduct.RatedList products={FAKE_PRODUCTS} />
      {/* <DashboardProduct.RatedList products={FAKE_PRODUCTS} /> */}
    </Container>
  );
};

TopLink.propTypes = {
  image: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default HomePage;
