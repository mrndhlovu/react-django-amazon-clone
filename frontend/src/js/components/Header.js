import React from "react";
import { useMainContext } from "../utils/hookUtils";

const Navigation = () => {
  const { openSideBarHandler } = useMainContext();

  return (
    <div data-testid="app-header">
      <button
        data-testid="nav-burger-menu"
        onClick={() => openSideBarHandler()}
        type="button"
      >
        Amazon
      </button>
      <div data-testid="logo">Amazon</div>
      <div data-testid="nav-search-bar">Amazon</div>
      <div data-testid="nav-links-container">
        <ul>
          <li>Account & Lists</li>
          <li>Returns & Orders</li>
          <li>Try Prime</li>
        </ul>

        <div data-testid="nav-cart-container">Basket</div>
      </div>
    </div>
  );
};

export default Navigation;
