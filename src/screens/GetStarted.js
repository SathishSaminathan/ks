//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions,Image } from 'react-native';
import images from "../assets/img/images";


const {width,height} = Dimensions.get("window");

// create a component
class GetStarted extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View
                    // style={{height:height/1.5, backgroundColor:"red"}}
                >
                    <Image 
                        source={images.appBackground} 
                        style={{height:height/1.5,width:width}}
                    />
                </View>
                <View
                    style={{flex:1, backgroundColor:"green"}}
                >
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
});

//make this component available to the app
export default GetStarted;
