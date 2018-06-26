//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import MapView from "react-native-maps";

import coloFonts from "../assets/styles/Common";

// create a component
class Location extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor={coloFonts.PRIMARY_YELLOW_COLOR}
                    barStyle="dark-content"
                />
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 12.8937198,
                        longitude: 77.6344609,
                        latitudeDelta: 0.0,
                        longitudeDelta: 0.0, 
                    }}
                        mapType={"standard"}                                               
                        showsUserLocation
                        // showsPointsOfInterest={false}
                        // showsCompass={true}
                        // showsTraffic={false}
                        // showsIndoors={false}
                        // rotateEnabled={true}
                        // followsUserLocation={false}
                        // toolbarEnabled={true}
                        // showsMyLocationButton
                    >
                    
                    <MapView.Marker
                        coordinate={{latitude: 12.8937198,
                        longitude: 77.6344609}}
                        title={"Current Location"}
                        description={"This is the Place where I can Come to Office"}
                    />
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
      }
});

//make this component available to the app
export default Location;
