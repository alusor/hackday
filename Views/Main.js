import React, { Component } from 'react';
import { View, Text, StatusBar, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

class Main extends Component{

  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      characters: [],
      search: false,
      value: '',
      loading: false
    };
    this.search = this.searchInput();
    this.start = this.startSearch.bind(this);
  }
  componentWillMount(){
    this.setState({ loading: true });
    axios({
      method: 'GET',
      url: 'https://gateway.marvel.com/v1/public/characters?ts=10&apikey=8c30873c7d8444c3c4d78eaad6c668f1&hash=90e1eb97264a9e3313b4bf4da56d4b36'
    }).then(response => {
      this.setState({ characters: response.data.data.results })
                  this.setState({ loading: false });
    }).catch(error => console.log(error));
  }
   keyExtractor = (item, index) => item.id;
   renderItem = ({item}) => (
     <TouchableOpacity onPress={() => this.props.navigation.navigate('hero', { 'hero': item })} style={{ backgroundColor: 'white', marginBottom: 5, padding: 5, flexDirection: 'row' }}>
     <Image source={{ uri: `${item.thumbnail.path}/standard_fantastic.jpg`}}  style={{ width: 100, height: 100 }}/>
    <View style={{padding: 3, flex: 1}}>
      <Text style={{ fontSize: 20 }}>{item.name}</Text>
      <Text>{`Aparece en: ${item.comics.available} comics`}</Text>
    </View>
    </TouchableOpacity>
  );

  searchInput(){
    if(this.state.search){
      return(
        <View style={{ backgroundColor: 'white', height: 40, width: 250, borderRadius: 5 }}>
          <TextInput value={this.state.value} onChangeText={text => this.setState({ value: text })} style={{ marginVertical: 0, height: 40 }} underlineColorAndroid='transparent'  placeholder='Nombre'/>
        </View>
      );
    }else {
      return (<Text style={{ fontSize: 20, color: 'white' }}>Marvel Heroes</Text>);
    }
  }
  startSearch() {
        if(this.state.search){
          this.setState({ loading: true });
          axios({
            method: 'GET',
            url: `https://gateway.marvel.com/v1/public/characters?ts=10&apikey=8c30873c7d8444c3c4d78eaad6c668f1&hash=90e1eb97264a9e3313b4bf4da56d4b36&nameStartsWith=${this.state.value}`
          }).then(response => {
            this.setState({ characters: response.data.data.results })
            this.setState({ loading: false });
          }).catch(error => console.log(error));
        }
        else {
          console.log('No estaba buscando ');
        }
    this.setState({ search: !this.state.search, value: '' });

  }
  renderList(){
    if(this.state.loading){
      return <ActivityIndicator size='large' color='#e23636' />;
    } else {
      return(
        <FlatList
        data={this.state.characters}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
      );
    }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#e2e2e2' }}>
        <StatusBar />
        <View style={styles.header}>
          {this.searchInput()}
          <TouchableOpacity onPress={this.start}>
            <Text style={{ color: 'white', fontSize: 16, marginRight: 10 }}>{ this.state.search? 'Ok' : 'Buscar' }</Text>
          </TouchableOpacity> 
        </View>
        {this.renderList()}
      </View>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#e23636', 
    height: 50, 
    elevation: 5, 
    padding: 5, 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    alignItems: 'center'
  }
};

export { Main };
