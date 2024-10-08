const initialState = {
  orders: [],
  allOrders: [],
  totalOrders: 0,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
        allOrders: action.payload,
      };
    case "SET_TOTAL_ORDERS":
      return {
        ...state,
        totalOrders: action.payload,
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };
    case "CREATE_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case 'CREATE_ORDERS_FROM_EXCEL':
      return {
        ...state,
        orders: action.payload,
      };
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.id !== action.payload
        ),
      };
    default:
      return state;
  }
};


export default orderReducer;