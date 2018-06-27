//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,Dimensions,ToastAndroid,TouchableOpacity,Image } from 'react-native';
import MapView from "react-native-maps";

import colorFonts from "../assets/styles/Common";
import images from '../assets/img/images';

const {width,height} = Dimensions.get("window")
const currentRegion = []

// create a component
class Location extends Component {

    constructor(props) {
    super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error:null,
        };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                });
                currentRegion = {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0034
                };
                if(this.state.latitude !== null){
                    this.mapView.animateToRegion(currentRegion, 2000);
                }
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
            );
    }

    animate(){
        currentRegion = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
        };
        if(this.state.latitude !== null){
            this.mapView.animateToRegion(currentRegion, 2000);
        }
    }
    
    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor={colorFonts.PRIMARY_YELLOW_COLOR}
                    barStyle="dark-content"
                />
                <TouchableOpacity
                    style={styles.mapButton}
                    onPress={ () => this.animate() }
                >
                    <Image 
                        source={images.myLocationIcon}
                        style={{
                            flex:1,
                            width:null,
                            height:null,
                        }}
                    />
                </TouchableOpacity>
                <MapView
                    showsMyLocationButton
                    showsUserLocation                    
                    // showsPointsOfInterest={false}
                    // showsCompass={true}
                    // showsTraffic={false}
                    // showsIndoors={false}
                    // rotateEnabled={true}
                    // followsUserLocation={false}
                    // toolbarEnabled={true}
                    // showsMyLocationButton
                    ref = {(ref)=>this.mapView=ref}
                    style={[styles.map]}
                    region={{
                        latitude: 35.688442,
                        longitude: 51.403753,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}
                    onMapReady={()=>this.animate()}
                >
                 {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                        coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                        title={"Your Location"}
                    />}
                </MapView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      map: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1
      },
      mapDrawerStyle:{
          position:'absolute',
          top: 0,
          left: 0,
      },
      mapDrawerImage:{
          width:70,
          height:70
      },
      mapButton: {
        width:45,
        height:45,
        borderRadius:60/2,
        overflow:"hidden",
        marginLeft:10,
        backgroundColor:colorFonts.PRIMARY_YELLOW_COLOR,
        marginTop:height/1.8,
        marginLeft:width/1.3
     },
});

//make this component available to the app
export default Location;
