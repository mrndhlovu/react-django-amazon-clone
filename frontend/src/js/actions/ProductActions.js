import {
  GET_PRODUCT_DETAIL,
  //   PRODUCT_DETAIL_ERROR,
  //   PRODUCT_DETAIL_SUCCESS,
} from "./ActionTypes";
import { fireAction } from "./action.helpers";

export const getProductDetailAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(GET_PRODUCT_DETAIL, data));
  };
};
