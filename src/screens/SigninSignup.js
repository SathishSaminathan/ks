//import liraries
import React, { Component } from 'react';
import { View, Text,ImageBackground, StyleSheet,Dimensions,Image, TextInput, Switch } from 'react-native';
import images from "../assets/img/images";


const {width,height} = Dimensions.get("window");

// create a component
class SigninSignup extends Component {
    constructor (props){
        super(props);
        this.state = {
            switch1Value: false,
        }
    }
    toggleSwitch = () => {
        this.setState({
            switch1Value : !this.state.switch1Value
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground  source={images.appBackground}
                    style={{ opacity: 0.4, height: height, width: width}} 
                    > </ImageBackground>
                       <View  style={styles.wrapperClass} >
                        <Text style={styles.text}> sign up </Text> 
                        <Switch 
                        onValueChange = {this.toggleSwitch}
                            value = {this.state.switch1Value}  
                        /> 
                        <Text style={styles.text}>sign in </Text>   
                    </View>
                </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapperClass: {
        flex: 1,
        opacity: 1,
        marginTop: 100,
        marginLeft: "30%",
        flexDirection: "row",
        position: "absolute"

    },
    text: {
        color: "black",
        height: 36
    }
});

//make this component available to the app
export default SigninSignup;
