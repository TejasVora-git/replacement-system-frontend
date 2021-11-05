import {
  MESSAGE,
  GET_ALL_CUSTOMER,
  GET_ALL_ITEM,
  GET_ALL_REPLACEMENT_PARTNER,
} from "../action";

const INITIAL_STATE = {
  message: "",
  getAllCustomer: [],
  getAllItem: [],
  getAllPartner: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case GET_ALL_CUSTOMER:
      return {
        ...state,
        getAllCustomer: action.payload,
      };
    case GET_ALL_ITEM:
      return {
        ...state,
        getAllItem: action.payload,
      };
    case GET_ALL_REPLACEMENT_PARTNER:
      return {
        ...state,
        getAllPartner: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
