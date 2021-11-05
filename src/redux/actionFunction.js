import {
  MESSAGE,
  GET_ALL_CUSTOMER,
  GET_ALL_ITEM,
  GET_ALL_REPLACEMENT_PARTNER,
} from "./action";

export const message = (data) => {
  return {
    type: MESSAGE,
    payload: data,
  };
};

export const getAllCustomer = (data) => {
  return {
    type: GET_ALL_CUSTOMER,
    payload: data,
  };
};
export const getAllItem = (data) => {
  return {
    type: GET_ALL_ITEM,
    payload: data,
  };
};
export const getAllPartner = (data) => {
  return {
    type: GET_ALL_REPLACEMENT_PARTNER,
    payload: data,
  };
};
