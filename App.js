import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native';
import Header from './src/components/Header';
import store from './src/store';
import QuestionsPage from './src/components/QuestionsPage';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Header />
        <QuestionsPage />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
