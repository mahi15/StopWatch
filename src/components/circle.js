import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ripple from 'react-native-material-ripple';

class CircleButton extends Component {

    render() {

        return (
            < TouchableWithoutFeedback >
                <Ripple rippleContainerBorderRadius={100}
                    style={[styles.circle, this.props.style]}
                    onPress={this.props.onPress}>
                    <View>
                        <Text style={styles.buttonTitle} >{this.props.title}</Text>
                        {this.props.children}
                    </View>
                </Ripple>
            </TouchableWithoutFeedback >
        )
    }
}

CircleButton.defaultProps = {

}

const styles = StyleSheet.create({
    buttonTitle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(33, 150, 243)',
        elevation: 3,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 0.5
    },
});

export default CircleButton;
