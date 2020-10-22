import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Search as SearchIcon } from "@material-ui/icons";
import { Button } from "@material-ui/core";

import { DropdownButton } from "../shared";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
import MenuList from "./MenuList";

const Container = styled.div`
  height: 80%;
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    ${({ theme }) => theme.helpers.useFlex()};
    border-radius: 5px;
    width: 100%;
    height: 100%;
    overflow: hidden;

    button:first-child {
      background-color: ${({ theme }) => theme.colors.grey};
      height: 100%;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      min-width: 50px;
    }

    span {
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
      font-size: 10px;
      padding-top: 3px;
      padding-left: 3px;
    }

    input {
      padding: 2px 10px;
      width: 100%;
      height: 100%;
      font-size: 15px;
      border: none;

      &:focus {
        border: 2px solid ${({ theme }) => theme.colors.amazon};
      }
    }

    button:last-child {
      background-color: ${({ theme }) => theme.colors.amazon};
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      min-width: 50px;
    }
  }

  @media (max-width: 845px) {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 8%;
    height: 40%;
    padding: 0 10px;
    div {
      button:first-child {
        display: none;
      }

      button:last-child {
        height: 100%;
        background-color: ${({ theme }) => theme.colors.grey};
        svg {
          font-size: 26px;
        }
      }
    }
  }
`;

const NavCenter = ({ activeCategory, handleSearch, handleChange }) => {
  return (
    <Container data-testid="nav-search-bar">
      <div>
        <DropdownButton
          disablePortal
          arrow
          buttonText={() => <span>{activeCategory}</span>}
          content={() => (
            <ul
              data-testid="nav-search-category"
              className="nav__search__categories">
              <MenuList
                list={[{ value: "All Departments", key: "" }]}
                handleClick={handleSearch}
                link={false}
              />

              <MenuList
                list={PRODUCT_CATEGORIES}
                handleClick={handleSearch}
                link={false}
              />
            </ul>
          )}
          button
        />

        <input
          className="search__input"
          onChange={(e) => handleChange(e, "search")}
          onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : {})}
        />

        <Button type="button" onClick={() => handleSearch()}>
          <SearchIcon fontSize="large" />
        </Button>
      </div>
    </Container>
  );
};

NavCenter.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default NavCenter;
