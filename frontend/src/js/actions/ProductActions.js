import {
  GET_PRODUCT_DETAIL,
  PRODUCT_DETAIL_ERROR,
  PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCTS_LIST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_ERROR,
  GET_FILTERED_PRODUCTS,
  FILTERED_PRODUCT_LIST_SUCCESS,
  FILTERED_PRODUCT_ERROR,
} from "./ActionTypes";
import { fireAction } from "./action.helpers";

import {
  requestProductList,
  requestProductDetail,
} from "../api/product.requests";

export const getProductDetailAction = (id) => {
  return (dispatch) => {
    dispatch(fireAction(GET_PRODUCT_DETAIL));
    requestProductDetail(id)
      .then((response) => {
        dispatch(fireAction(PRODUCT_DETAIL_SUCCESS, response?.data[0]));
      })
      .catch(() => {
        dispatch(fireAction(PRODUCT_DETAIL_ERROR));
      });
  };
};

export const getProductList = (filterParams) => {
  return (dispatch) => {
    dispatch(
      fireAction(filterParams ? GET_FILTERED_PRODUCTS : GET_PRODUCTS_LIST)
    );
    requestProductList(filterParams)
      .then((response) => {
        dispatch(
          fireAction(
            filterParams
              ? FILTERED_PRODUCT_LIST_SUCCESS
              : PRODUCTS_LIST_SUCCESS,
            response?.data
          )
        );
      })
      .catch(() => {
        dispatch(
          fireAction(
            filterParams ? FILTERED_PRODUCT_ERROR : PRODUCTS_LIST_ERROR
          )
        );
      });
  };
};
