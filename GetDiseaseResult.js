'use strict';
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    FlatList,
    Text
} from 'react-native';

class ListItem extends React.PureComponent {
    render() {
        const item = this.props.item;
        return (
            <TouchableHighlight
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.arrayItem}>{item}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }
}

type Props = {};
export default class GetDiseaseResult extends Component<Props> {
    static navigationOptions = {
        title: 'Disease Result',
    };
    _keyExtractor = (item, index) => index.toString();
    _renderItem = ({ item, index }) => (
        <ListItem
            item={item}
            index={index}
        />
    );
    render() {
        const { params } = this.props.navigation.state;
        var disease = params.disease;
        var name = disease.name;
        return (
            <ScrollView style={styles.container}>

                <View style={styles.heading}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.arrayItem}>{name}</Text>
                    <View style={styles.separator} />
                </View>
                <View style={styles.heading}>
                    <Text style={styles.title}>Symptoms</Text>
                    <View style={styles.separator} />
                </View>
                <FlatList
                    data={disease.symptoms}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                <View style={styles.heading}>
                    <Text style={styles.title}>Remedies</Text>
                    <View style={styles.separator} />
                </View>
                <FlatList
                    data={disease.remedies}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    heading: {
        backgroundColor: '#F8F8F8',
    },
    separator: {
        height: 1,
        backgroundColor: '#DDDDDD'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
        color: '#48BBEC'
    },
    arrayItem: {
        fontSize: 18,
        margin: 5,
        color: '#656565'
    }
});
