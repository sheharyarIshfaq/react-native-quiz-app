import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import UserChoice from './UserChoice';
import Questions from './Questions';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {getQuestions} from '../store';

const QuestionsPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.isLoading);
  const category = useSelector(state => state.category);
  const difficulty = useSelector(state => state.difficulty);
  const score = useSelector(state => state.score);

  const startQuizHandler = async () => {
    setShowScore(false);
    dispatch(getQuestions({category, difficulty}));
    setShowQuiz(true);
  };
  return (
    <>
      {isLoading && <ActivityIndicator color="#334cb7" size="large" />}
      {!showQuiz && !isLoading && (
        <>
          <UserChoice />
          <TouchableOpacity style={styles.btnContainer}>
            <Button
              color="#344cb7"
              title="Start the Quiz"
              onPress={startQuizHandler}
            />
          </TouchableOpacity>
        </>
      )}
      {showScore && !isLoading && !showQuiz && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>You scored {score} out of 5</Text>
        </View>
      )}
      {showQuiz && !isLoading && (
        <Questions
          showScore={value => {
            setShowScore(value);
          }}
          showQuiz={value => setShowQuiz(value)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  scoreContainer: {
    backgroundColor: '#344cb7',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  scoreTitle: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
});

export default QuestionsPage;
