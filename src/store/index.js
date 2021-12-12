import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  questions: [],
  current: 0,
  currentQuestion: null,
  score: 0,
  category: 9,
  difficulty: 'easy',
  isLoading: false,
};

//async thunk function

export const getQuestions = createAsyncThunk(
  'quiz/getQuestions',
  //callback function
  async ({category, difficulty}) => {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`,
    );
    return response.data.results;
  },
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    start(state) {
      state.current = 0;
      state.score = 0;
      state.currentQuestion = state.questions[state.current];
      state.current++;
      state.category = initialState.category;
      state.difficulty = initialState.difficulty;
      state.isLoading = initialState.isLoading;
    },
    changeQuestion(state) {
      state.currentQuestion = state.questions[state.current++];
    },
    increase(state) {
      state.score++;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [getQuestions.pending]: state => {
      state.isLoading = true;
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
      state.current = 0;
      state.score = 0;
      state.currentQuestion = state.questions[state.current];
      state.current++;
      state.category = initialState.category;
      state.difficulty = initialState.difficulty;
      state.isLoading = initialState.isLoading;
    },
    [getQuestions.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export const quizActions = quizSlice.actions;

const store = configureStore({
  reducer: quizSlice.reducer,
});

export default store;
