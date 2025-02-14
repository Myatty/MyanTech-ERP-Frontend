const initialState = {
  mode: localStorage.getItem("mode") || "light", // Persist theme mode
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      return { ...state, mode: newMode };
    default:
      return state;
  }
};

export default themeReducer;
