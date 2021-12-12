import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {quizActions} from '../store';
import Option from './Option';

const Questions = props => {
  const [options, setOptions] = useState([]);
  const [rightOption, setRightOption] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const currentQuestion = useSelector(state => state.currentQuestion);
  const current = useSelector(state => state.current);

  const dispatch = useDispatch();

  const randomNum = maxNum => {
    return Math.floor(Math.random() * Math.floor(maxNum));
  };

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }
    setRightOption(currentQuestion.correct_answer);

    let options = [...currentQuestion.incorrect_answers];
    const randomIdx = randomNum(currentQuestion.incorrect_answers.length);
    options.splice(randomIdx, 0, currentQuestion.correct_answer);
    setOptions(options);
  }, [currentQuestion]);

  const checkOptionHandler = value => {
    setSubmitted(true);
    if (!submitted && value === rightOption) {
      dispatch(quizActions.increase());
    }
  };

  const nextQuestionHandler = () => {
    setSubmitted(false);
    dispatch(quizActions.changeQuestion());
  };

  const checkScoreHandler = () => {
    setSubmitted(false);
    props.showScore(true);
    props.showQuiz(false);
  };

  return (
    <>
      {currentQuestion && (
        <View style={styles.container}>
          <Text style={styles.title}>Question {current}/5</Text>
          <Text style={styles.para}>{currentQuestion.question}</Text>
          <View style={styles.optionsList}>
            {options.map(option => (
              <Option
                key={option}
                style={
                  submitted
                    ? option !== rightOption
                      ? styles.false
                      : styles.true
                    : ''
                }
                textStyle={
                  submitted
                    ? option !== rightOption
                      ? styles.falseText
                      : styles.trueText
                    : ''
                }
                text={option}
                onPress={checkOptionHandler}
              />
            ))}
          </View>
          <TouchableOpacity>
            <View style={styles.btnContainer}>
              {current < 5 && (
                <Button title="Next" onPress={nextQuestionHandler} />
              )}
              {current > 4 && (
                <Button title="Check Score" onPress={checkScoreHandler} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#344cb7',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    marginVertical: 6,
  },
  para: {
    color: '#fff',
  },
  optionsList: {
    marginVertical: 10,
    paddingVertical: 10,
  },
  true: {
    borderColor: '#00ff5e',
  },
  trueText: {
    color: '#00ff5e',
    textAlign: 'center',
  },
  false: {
    borderColor: '#ff0000',
  },
  falseText: {
    color: '#ff0000',
    textAlign: 'center',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Questions;
