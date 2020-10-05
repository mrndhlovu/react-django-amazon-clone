/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Avatar } from "@material-ui/core";

import { IMAGES } from "../../constants/constants";
import { UIHeader, UILinkButton, DashboardProduct, UIFooter } from "../shared";
import { VIEWED_RECENT } from "../../utils/localStorageUtils";
import Carousel from "./Carousel";
import ProductCard from "../shared/ProductCard";
import UICard from "../shared/UICard";
import UISmall from "../shared/UISmall";

const Container = styled.div`
  height: 100vh;
  justify-content: center;
  padding: 0 15%;
`;

const Hero = styled.div`
  height: fit-content;
  width: 100%;
  position: relative;
`;

const FeaturedList = styled.div`
  background-color: transparent;
  display: flex;
  left: 50%;
  position: absolute;
  transform: translate(-50%, 22%);
  vertical-align: top;
  height: 400px;
  bottom: 0;
  width: 100%;
  padding: 0 10%;

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

const ProductList = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%, 6.5%);
`;

const TopLinkContainer = styled.div`
  ${({ theme }) => theme.helpers.useFlex("column", "space-evenly")};
  position: relative;
  max-width: 150px;
  height: 100%;

  img {
    width: auto;
    height: 70px;
    mix-blend-mode: multiply;
    cursor: pointer;
  }
`;

const HomePage = () => {
  const {
    auth: { isAuthenticated, data },
    products: { list },
  } = useSelector((state) => state);
  const BOOKS = list.filter((item) => item.category === "books");

  const VIEWED_RECENT_ITEM = list.find(
    (item) => item.id === (VIEWED_RECENT ? VIEWED_RECENT[0] : null) && item
  );

  const DEAL_ITEM = list.find((item) => item.top_sell && item);

  return (
    <>
      <Container>
        <Hero>
          <Carousel />
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
                          isAuthenticated
                            ? data?.full_name.split(" ")[0]
                            : "Guest"
                        }`}
                      />
                      {isAuthenticated && (
                        <UISmall content="Customer since 2019" />
                      )}
                    </div>
                  </AvatarContainer>
                }
              />

              <UIHeader as="h5" content="Top links for you." />
              <CardContent>
                <TopLink
                  header="Orders"
                  redirectTo="/orders"
                  image={IMAGES.TOP_LINK.link1}
                />
                <TopLink
                  header="Books"
                  redirectTo="/category-list?category=books"
                  image={IMAGES.TOP_LINK.link2}
                />
                <TopLink
                  header="Electronics"
                  redirectTo="/category-list?category=tvs"
                  image={IMAGES.TOP_LINK.link3}
                />
                <TopLink
                  header="Computers"
                  redirectTo="/category-list?category=pc-tech"
                  image={IMAGES.TOP_LINK.link4}
                />
              </CardContent>
            </UICard>
            <UICard>
              <UICard.Header
                avatar={
                  <UIHeader
                    as="h3"
                    content={
                      VIEWED_RECENT_ITEM ? "Recently viewed" : "Discover"
                    }
                  />
                }
              />
              <ProductCard
                image={
                  VIEWED_RECENT_ITEM
                    ? VIEWED_RECENT_ITEM?.image
                    : BOOKS && BOOKS[0]?.image
                }
              />
              <UICard.Action>
                <Link
                  to={
                    VIEWED_RECENT_ITEM
                      ? "/view-history"
                      : "/category-list?category=books"
                  }
                >
                  <UILinkButton content="Show more" />
                </Link>
              </UICard.Action>
            </UICard>
            <UICard>
              <UICard.Header
                avatar={<UIHeader as="h3" content="Deal of the day" />}
              />
              <ProductCard image={DEAL_ITEM?.image} />
              <UICard.Action>
                <Link to={`product-detail/${DEAL_ITEM?.id}/`}>
                  <UILinkButton content="Show more deals" />
                </Link>
              </UICard.Action>
            </UICard>
          </FeaturedList>
        </Hero>
        <ProductList>
          <DashboardProduct>
            <DashboardProduct.Featured
              category="tvs"
              header="TVs"
              footerLink="Show now"
            />

            <DashboardProduct.Featured
              category="books"
              header="Books"
              footerLink="See the range"
            />

            <DashboardProduct.Featured
              category="gym"
              header="Health and Fitness"
              footerLink="See more"
            />
          </DashboardProduct>
          <DashboardProduct.Books books={BOOKS} />
          <DashboardProduct.RatedList products={list} />
        </ProductList>
        <UIFooter />
      </Container>
    </>
  );
};

const TopLink = ({ image, header, redirectTo }) => (
  <Link to={redirectTo}>
    <TopLinkContainer>
      <CardImage src={image} />
      <UIHeader as="h6" content={header} />
    </TopLinkContainer>
  </Link>
);

TopLink.propTypes = {
  image: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default HomePage;
