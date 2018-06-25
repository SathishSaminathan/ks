//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions,Image, TextInput, Switch } from 'react-native';
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
                <View
                        style={{flex: 1}}                   
                >
                    <Image 
                        source={images.appBackground}
                        style={{
                            opacity: 0.4
                        }} 
                    />
                </View>
               <View>
                   <View
                        style={styles.switchWrapper}
                    >
               <Switch
                   onValueChange = {this.toggleSwitch}
                   value = {this.state.switch1Value}
                />
                </View>
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
    switchWrapper: {
        marginTop: 100,
        marginLeft: "45%"
    }
});

//make this component available to the app
export default SigninSignup;
