'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    Button,
    Alert,
    Text,
    View,
    ActivityIndicator,
    ImageBackground,
    PixelRatio,
    TouchableOpacity,
    Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
type Props = {};
const baseUrl = "http://192.168.43.219:5000/";
const baseKisanAppUrl = "http://192.168.43.219:3000/diseases";
function getKisanApiUrl(id) {
    return baseKisanAppUrl + "/" + id;
}

export default class ImagePickerPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            ImageSource: null,
            isLoading: false
        };
    }
    static navigationOptions = {
        title: 'KisanApp - InfyMakeathon',
    };
    uploadImage = (file) => {
        const formData = new FormData();
        formData.append('image', file);
        this.setState({ isLoading: true });
        return fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        })
            .then(response => response.json())
            .then(json => this._showAlert(json))
            .catch(
                error => {
                    this.setState({ isLoading: false });
                    console.log('uploadImage error:', error.TypeError);
                });
    };
    _getDisease = (id) => {
        const query = getKisanApiUrl(id);
        this._executeQuery(query);
    };
    _showAlert = (response) => {
        this.setState({ isLoading: false, message: '' });
        Alert.alert(
            'Response from Server',
            'Would you like to see details for disease ' + response.name + ' now?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this._getDisease(response.id) },
            ],
            { cancelable: false }
        )
    };
    _getFormula = (max) => {
        return Math.floor(Math.random() * (max));
    };
    _getIcon = () => {
        var backgroundImages: String[] = ['./Resources/background1.jpg', './Resources/background2.jpg', './Resources/background3.jpg', './Resources/background4.jpg', './Resources/background5.jpg'];
        var index = this._getArrayIndex(backgroundImages.length);
        var icon;
        switch (index) {
            case 0: {
                icon = require('./Resources/background1.jpg');
                break;
            }
            case 1: {
                icon = require('./Resources/background2.jpg');
                break;
            }
            case 2: {
                icon = require('./Resources/background3.jpg');
                break;
            }
            case 3: {
                icon = require('./Resources/background4.jpg')
                break;
            }
            case 4: {
                icon = require('./Resources/background5.jpg');
                break;
            }
            default: {
                break;
            }
        };
        return icon;
    };
    _getArrayIndex = (max) => {
        var number = this._getFormula(max);
        while (number === max)
            number = this._getFormula(max);
        return number;
    };
    _handleAddPhoto = (photo) => {
        this.uploadImage({
            uri: photo.uri,
            type: photo.type,
            name: photo.fileName,
        });
    }
    selectPhotoTapped() {
        const options = {
            title: 'Select image to upload',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: false,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    ImageSource: source
                });
                this._handleAddPhoto({
                    fileName: response.fileName,
                    path: response.path,
                    type: response.type,
                    uri: response.uri,
                    width: response.width,
                    height: response.height,
                });
            }
        });
    }
    _executeQuery = (query) => {
        this.setState({ isLoading: true });
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                })
            });
    };
    _handleResponse = (response) => {
        this.setState({ isLoading: false, message: '' });
        this.props.navigation.navigate('DiseaseResult', { disease: response });
    };
    render() {
        var icon = this._getIcon();
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large' /> : null;
        return (
            <ImageBackground source={icon}
                style={styles.BackgroundImage}>
                <View style={styles.Container}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={styles.ImageContainer}>
                            {
                                this.state.ImageSource === null ? <Text style={styles.TextStyles}>Touch here to select(upload) Photo</Text> :
                                    <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                {spinner}
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextStyles: {
        color: 'white',
        fontSize: 20
    },
    ImageContainer: {
        borderRadius: 0,
        width: 400,
        height: 400,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        // justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#CDDC39',
    },
    BackgroundImage: {
        backgroundColor: '#fc0',
        width: '100%', // applied to Image
        height: '100%'
    },
    ImageStyle: {
        resizeMode: 'cover' // works only here!
    }
});
