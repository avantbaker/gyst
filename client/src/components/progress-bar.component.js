import React, { Component } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    View
} from 'react-native';

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#bbbbbb',
        height: 5,
        overflow: 'hidden'
    },
    fill: {
        backgroundColor: '#3b5998',
        height: 5
    }
});

class ProgressBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: new Animated.Value(0)
        };

        this.update = this.update.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.progress >= 0 && this.props.progress !== prevProps.progress) {
            this.update();
        }
    }

    update(){
        Animated.timing(this.state.progress, {
            easing: this.props.easing,
            duration: this.props.easingDuration,
            toValue: this.props.progress
        }).start();
    }

    render() {

        let fillWidth = this.state.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1 * this.props.style.width],
        });

        return (
            <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
                <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]}/>
            </View>
        );
    }

}

ProgressBar.defaultProps = {
  style: styles,
  easing: Easing.inOut(Easing.ease),
  easingDuration: 500
};


export default ProgressBar;