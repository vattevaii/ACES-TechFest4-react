export const initialState = {
   user: null,
   jwt: "",
};

export const actionTypes = {
   SET_USER: 'SET_USER',
   SET_TOKEN: "SET_TOKEN",
   DEL_TOKEN: "DEL_TOKEN",
   OPEN_MODAL: "OPEN_MODAL"
};

const reducer = (state, action) => {
   switch (action.type) {
      case actionTypes.SET_USER:
         // console.log('reducer', action.payload)
         return {
            ...state,
            user: action.payload.user,
            jwt: action.payload.accessToken,
         };
      case actionTypes.SET_TOKEN:
         // console.log('set token', action.payload)
         return {
            ...state,
            user: action.payload.user,
            jwt: action.payload.token
         };
      case actionTypes.DEL_TOKEN:
         return {
            ...state,
            user: null,
            jwt: ''
         };

      default:
         return state;
   }
};

export default reducer;