import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Animated,
    Platform,
} from "react-native";

let styles = StyleSheet.create({
    defaultContainer: {
        flexDirection: 'row'
    },
    textContainer: {
        flex: 1,
        padding: 8
    }
});

export default class Dropdown extends Component {

    static defaultProps =  {
        closeInterval: 4000,
        startDelta: -100,
        endDelta: 0,
        showCancel: false,
        tapToCloseEnabled: true,
        panResponderEnabled: true,
        replaceEnabled: true,
        containerStyle: {
            padding: 16,
            flexDirection: 'column'
        },
        elevation: 1,
    };

    constructor(props) {
        super(props);
        this.state = {
            animationValue: new Animated.Value(0),
            duration: 450,
            type: '',
            message: '',
            title: '',
            isOpen: false,
            startDelta: props.startDelta,
            endDelta: props.endDelta,
            topValue: 0,
        };

        this.renderDropDown = this.renderDropDown.bind(this);
        this.alertWithType = this.alertWithType.bind(this);
        this.dismiss = this.dismiss.bind(this);
        this.animate = this.animate.bind(this);
    }

    alertWithType() {
            let delayInMilliSeconds = 0;

            if (this.state.isOpen === true) {
                delayInMilliSeconds = 475;
                this.dismiss()
            }

            const self = this;
            setTimeout(function() {
                if ( self.state.isOpen === false) {
                    self.setState({
                        isOpen: true,
                        topValue: 0
                    })
                }
                self.animate(1);
            }.bind(this), delayInMilliSeconds)
    }

    dismiss() {
        if (this.state.isOpen) {
            this.animate(0);
            setTimeout(function() {
                if (this.state.isOpen) {
                    this.setState({
                        isOpen: false
                    });
                }
            }.bind(this), (this.state.duration))
        }
    }

    animate(toValue) {
        Animated.spring (
            this.state.animationValue, {
                toValue: toValue,
                duration: this.state.duration,
                friction: 9,
            }
        ).start()
    }

    renderDropDown(isOpen) {
        if ( isOpen === true ) {
            let style = [styles.defaultContainer, StyleSheet.flatten(this.props.containerStyle)];
            return (
                <Animated.View
                    style={{
                        transform: [{
                            translateY: this.state.animationValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [this.state.startDelta, this.state.endDelta]
                            }),
                        }],
                        position: 'absolute',
                        top: this.state.topValue,
                        left: 0,
                        right: 0,
                        elevation: this.props.elevation
                    }}>
                    <View style={style}>
                        { this.props.children }
                    </View>
                </Animated.View>
            )
        }
        return null
    }
    render() {
        return (
            this.renderDropDown(this.state.isOpen)
        )
    }
}

