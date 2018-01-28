import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import CircleButton from './circle.js'
import Ripple from 'react-native-material-ripple'

export default class StopWatchApp extends React.PureComponent {

  constructor() {
    super()
    this.id = 0
    this.state = {
      time: 0,
      shouldRun: false,
      animation: '',
      laps: []
    }
  }

  onPauseResumeButtonClicked() {
    this.setState({
      shouldRun: !this.state.shouldRun
    })
  }

  onResetButtonClicked() {
    this.setState({ shouldRun: false, laps: [] })
    var myInterval = setInterval(() => {
      if (this.state.time <= 1) {
        this.setState({ time: 0 })
        clearInterval(myInterval)
      } else {
        this.setState({
          time: this.state.time - this.state.time / 5,
        })
      }
    }, 1)
  }

  onLapButtonClicked() {
    if (this.state.shouldRun) {
      let laps = this.state.laps.slice()
      let cTime = this.state.time.toFixed(1)
      this.setState({ laps: [{ id: ++this.id, key: cTime }, ...laps] })
    }
  }

  runTimer() {
    if (this.state.shouldRun) {
      this.setState({ time: this.state.time + 0.1 })
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    )
  }

  componentDidMount() {
    setInterval(
      this.runTimer.bind(this),
      100
    )
  }

  renderLapItem({ item }) {
    return (
      <Ripple style={styles.lapItem}>
        <Text style={styles.lapItemText}>{item.key}</Text>
      </Ripple>
    )
  }

  render() {
    let parts = this.state.time.toFixed(1).toString().split(".")
    let sec = parts[0]
    let mSec = parts[1]

    return (
      <View style={styles.container}>

        <View style={styles.innerContainer} >
          <Text style={styles.second}>{sec}</Text>
          <Text style={styles.mSecond}>.</Text>
          <Text style={styles.mSecond}>{mSec}</Text>
        </View>

        <View style={styles.lap}>
          <FlatList
            data={this.state.laps}
            renderItem={this.renderLapItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={{
            flex: 2,
            alignItems: 'center'
          }} >
            <Button
              title="Lap"
              onPress={this.onLapButtonClicked.bind(this)} />
          </View>
          <View style={{
            flex: 2,
            alignItems: 'center'
          }} >
            <CircleButton
              title={this.state.shouldRun ? 'PAUSE' : 'START'}
              style={styles.startButton}
              onPress={this.onPauseResumeButtonClicked.bind(this)}>
            </CircleButton>
          </View>
          <View style={{
            flex: 2,
            alignItems: 'center'
          }} >
            <Button
              title="Reset"
              onPress={this.onResetButtonClicked.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lap: {
    margin: 10,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  lapItem: {
    paddingVertical: 5,
  },
  separator: {
    height: 1,
    width: "86%",
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: "#CED0CE",
  },
  lapItemText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20
  },
  second: {
    color: 'black',
    fontSize: 100,
    fontWeight: 'bold'
  },
  mSecond: {
    color: 'grey',
    fontSize: 100,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  innerContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButton: {

  }
});
