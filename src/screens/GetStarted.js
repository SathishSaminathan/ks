//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions,Image,TouchableOpacity,StatusBar } from 'react-native';
import * as Animatable from "react-native-animatable";

import colorFonts from "../assets/styles/Common";
import images from "../assets/img/images";


const {width,height} = Dimensions.get("window");

BACKGROUND_IMAGE_HEIGHT = height/1.2
APP_ICON_HEIGHT=150

// create a component
class GetStarted extends Component {
    constructor (props){
        super(props);
        this.state={
            open: false
        }
    }
    render() {
        return (
            <View style={styles.container}>

                <StatusBar 
                    barStyle="dark-content"
                    backgroundColor={colorFonts.PRIMARY_YELLOW_COLOR}
                    translucent={false}
                />
                {/* TOP */}
                <Animatable.View  
                    animation="slideInDown"
                    iterationCount={1}
                    duration={200}
                    style={{
                        height:BACKGROUND_IMAGE_HEIGHT,
                        width:width,
                        zIndex:0
                    }}              
                >
                    <Image 
                        source={images.appBackground} 
                        style={{flex:1,height:undefined,width:undefined}}
                    /> 
                    <Animatable.View
                        animation="zoomIn"
                        duration={300}
                        style={{
                            position:"absolute",
                            marginTop:BACKGROUND_IMAGE_HEIGHT/3,
                            height:BACKGROUND_IMAGE_HEIGHT/4,
                            width:width/1.5,
                            backgroundColor:"white",
                            elevation:5,
                            alignSelf:"center"
                        }}
                    >
                    </Animatable.View>
                </Animatable.View >
                {/* TOP */}

                {/* Bottom */}
                <Animatable.View 
                    animation="slideInUp"
                    iterationCount={1}
                    duration={200}
                    style={{flex:1}}
                >
                    <View
                        style={{
                            flex:1,
                            flexDirection:"column",
                            justifyContent:"space-around",
                            alignContent:"center",
                            backgroundColor:"black"
                        }}
                    >
                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                paddingHorizontal:20
                            }}
                        >
                            <Text
                                style={{
                                    color:colorFonts.PRIMARY_YELLOW_COLOR,
                                    fontSize:colorFonts.LARGE,
                                    fontFamily:"Roboto-Light"
                                }}
                            >
                                Get
                            </Text>                        
                            <Text                        
                                style={{
                                    color:colorFonts.PRIMARY_YELLOW_COLOR,
                                    fontSize:colorFonts.LARGE,
                                    fontFamily:"Roboto-Light"
                                }}
                            >
                                Started
                            </Text>
                        </View>
                    </View>
                </Animatable.View >         
                {/* Bottom */}
                
                <Animatable.View  
                    animation="bounceIn"        
                    iterationCount={1}    
                    duration={1500}           
                    style={{zIndex:1,alignSelf:"center",height:APP_ICON_HEIGHT,width:APP_ICON_HEIGHT,position:"absolute",borderRadius:APP_ICON_HEIGHT,marginTop:BACKGROUND_IMAGE_HEIGHT-(APP_ICON_HEIGHT/2)}}
                >  
                    <TouchableOpacity
                        onPress = {()=>this.props.getValue(true)}
                        style={{flex:1}}
                    >
                    <Image 
                        source={images.appLogo} 
                        style={{flex:1,height:undefined,width:undefined}}
                    />  
                    </TouchableOpacity>
                </Animatable.View>  
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
