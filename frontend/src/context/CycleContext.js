import { createContext, useReducer } from "react";

export const CyclesContext = createContext();

export const cyclesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CYCLES": {
      return {
        cycles: action.payload,
      };
    }
    case "CREATE_CYCLE": {
      return {
        cycles: [action.payload, ...state.cycles],
      };
    }
    case "DELETE_CYCLE": {
        return {
            cycles: state.cycles.filter((cycle) => cycle._id !== action.payload._id)
        }
    }
    default: {
      return state;
    }
  }
};

export const CyclesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cyclesReducer, {
    cycles: null,
  });
  return (
    <CyclesContext.Provider value={{...state, dispatch }}>
      {children}
    </CyclesContext.Provider>
  );
};
