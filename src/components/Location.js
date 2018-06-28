//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,Dimensions,ToastAndroid,TouchableOpacity,Image,Modal } from 'react-native';
import MapView from "react-native-maps";
import { Icon } from "native-base";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import colorFonts from "../assets/styles/Common";
import images from '../assets/img/images';

const {width,height} = Dimensions.get("window")
const currentRegion = []

MODAL_HEADER_HEIGHT = height/7

const homePlace = {
description: 'Home',
geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};

const workPlace = {
description: 'Work',
geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

// create a component
class Location extends Component {

    constructor(props) {
    super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error:null,
            modalVisible: false,
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
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({modalVisible:!this.state.modalVisible})}
                >
                <View style={{marginTop: 0}}>
                    <View
                        style={styles.modelHeaderStyle}
                    >
                        <Icon
                            onPress={()=>this.setState({modalVisible:!this.state.modalVisible})} 
                            name="md-arrow-back"
                        />
                        <View
                            style={{
                                flex:1,
                                flexDirection:"row",
                                justifyContent:"flex-start"
                            }}
                        >
                            <Text
                                style={{
                                    paddingHorizontal:30,
                                    fontFamily:"Roboto-Light",
                                    fontSize:colorFonts.MEDIUM,
                                    fontWeight:"bold",
                                    color:"black"
                                }}
                            >Enter pickup location</Text>
                        </View>
                    </View>                    
                    <View
                        style={{
                            position:"absolute",
                            top:MODAL_HEADER_HEIGHT-(MODAL_HEADER_HEIGHT/2),
                            width:width,
                            zIndex:10
                        }}
                    >
                        <View
                            style={{
                                height:MODAL_HEADER_HEIGHT*6,
                                // backgroundColor:"transparent",
                                margin:10,
                                borderWidth:0
                            }}
                        >
                            <GooglePlacesAutocomplete
                                placeholder="Search"
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                listViewDisplayed="auto" // true/false/undefined
                                fetchDetails
                                renderDescription={row => row.description || row.vicinity} // custom description render|| row.vicinity} // custom description render
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    console.log(data);
                                    console.log(details);
                                }}
                                getDefaultValue={() => {
                                    return ''; // text input default value
                                }}
                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyDFEriONLHfkV3MOPfM4r__IJ7CA5HIuik',
                                    language: 'en', // language of the results
                                    types: '(regions)', // default: 'geocode'
                                }}
                                styles={{
                                    textInputContainer:{
                                        backgroundColor:"white",
                                        borderWidth:1
                                    },
                                    container:{
                                        // backgroundColor:"red",
                                    },
                                    listView:{
                                        borderWidth:1
                                    },
                                    description: {
                                        fontWeight: 'bold'
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                }}
                                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                    rankby: 'distance',
                                    types: 'food',
                                }}
                                filterReverseGeocodingByTypes={[
                                    'locality',
                                    'administrative_area_level_3',
                                ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                predefinedPlaces={[homePlace, workPlace]}
                                debounce={200}
                            />
                        </View>
                        
                    </View>
                </View>
                </Modal>

                {/* origin picker */}
                <View
                    style={styles.pickDropStyle}
                >
                    <View
                        style={styles.pickArea}
                    >
                        <Image 
                            source={images.pickUpIcon}
                            style={styles.pinStyle}
                            resizeMode="contain"
                        />
                        <Text
                            onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}
                            style={styles.pickText}
                        >Enter Pick Up Location</Text>
                    </View>
                </View>
                {/* origin picker */}

                <View
                    style={styles.distanceIconStyle}
                >
                    <Image 
                        source={images.distanceIcon}
                        resizeMode="contain"
                        style={{
                            flex:1,
                            width:undefined,
                            height:undefined
                        }}
                    />
                </View>

                {/* destination picker */}
                <View
                    style={[styles.pickDropStyle,{top:((height/13)*2)+((height/13)/2)}]}
                >
                    <View
                        style={styles.pickArea}
                    >
                        <Image 
                            source={images.dropPin}
                            style={styles.pinStyle}
                            resizeMode="contain"
                        />
                        <Text
                            onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}
                            style={styles.pickText}
                        >Enter Drop Location</Text>
                    </View>
                </View>
                {/* destination picker */}

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
     pickDropStyle:{         
        position:"absolute",
        height:height/12.5,
        backgroundColor:colorFonts.PICK_LOCATION_BACKGROUND,
        width:width/1.1,
        top:height/13,
        elevation:5,
        borderRadius:2,
        flexDirection:"column",
        justifyContent:"center"
     },
     pinStyle:{                    
        width:30,
        height:30,    
     },
     pickArea:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start"
    },
    pickText:{
        color:"black",
        fontFamily:"Roboto-Light"
    },
    distanceIconStyle:{   
        position:"absolute",                     
        width:100,
        height:45,
        overflow:"hidden",
        top:((height/13)*2)+((height/13)/22)
    },
    modelHeaderStyle:{
        height:MODAL_HEADER_HEIGHT,
        backgroundColor:colorFonts.PRIMARY_YELLOW_COLOR,
        flexDirection:"row",
        paddingTop:StatusBar.currentHeight-10,
        paddingHorizontal:30,
        zIndex:0,
        borderBottomWidth:1
    }
});

//make this component available to the app
export default Location;
