import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class Hero extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.hero.name
    });
    constructor(props) {
        super(props);
        this.hero = this.props.navigation.state.params.hero;
        console.log(this.hero);
    }
    render() {
        const hero = this.props.navigation.state.params.hero;        
        return (
            <View style={styles.content} >
                <Image source={{ uri: `${hero.thumbnail.path}/landscape_incredible.jpg`}} style={styles.image} />
            </View>
        );
    }
}

const styles = {
    content: {
        flex: 1
    },
    image: {
        height: 200,
        width: '100%',
        resizeMode: 'contain'
    }
}

export { Hero };