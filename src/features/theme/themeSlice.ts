import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: 'light', // Default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      // Toggle between light and dark themes
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme); // Apply the theme to the root element
    },
    setTheme(state, action: PayloadAction<Theme>) {
      // Set a specific theme
      state.theme = action.payload;
      document.documentElement.setAttribute('data-theme', state.theme); // Apply the theme to the root element
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
