import React, { Component} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Keyboard, ActivityIndicator} from 'react-native';
import api from '../services/api';
import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
  } from './style';
  

export default class Main extends Component {
    state = {
        newCharacter: '',
        characters: [],
        loading: false,
    }


    async componentDidMount() {
      const characters = await AsyncStorage.getItem('characters');
  
      if (characters) {
        this.setState({characters: JSON.parse(characters)});
      }
    }
  
    async componentDidUpdate(_, prevState) {
      const {characters} = this.state;
  
      if (prevState.characters !== characters) {
        await AsyncStorage.setItem('characters', JSON.stringify(characters));
      }
    }
  
    handleAddCard = async () => {
        try{
            const {characters, newCharacter} = this.state

            this.setState({loading: true})

            const response = await api.get(`/characters/${newCharacter}`)

            const data = {
                name: response.data.name,
                url: response.data.url,
                species: response.data.species,
                image: response.data.avatar,
                login: response.data.login,

            }

            this.setState({
              characters: [...characters, data],
              newCharacter: '',
              loading: false,
            })

        Keyboard.dismiss();

        }catch(error){
          alert('Personagem não encontrado')
          this.setState({loading: false})
        }
        console.log(response.data);
    }

    render(){
        const { characters, newCharacter, loading } = this.state;

        return(
            <Container>
            <Form>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Procurar Personagem"
                value={newCharacter}
                onChangeText={text => this.setState({newCharacter: text})}
                returnKeyType="send"
                onSubmitEditing={this.handleAddCard}
              />
            <SubmitButton loading={loading} onPress={this.handleAddCard}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          showsVerticalScrollIndicator={false}
          data={characters}
          keyExtractor={character => character.login}
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.image}} />
              <Name>{item.name}</Name>
              <Bio>{item.species}</Bio>

              {/* <ProfileButton onPress={() => (
                this.props.navigation.navigate('character', {character: item})
              )}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>

              <ProfileButton
                onPress={() => {
                  this.setState({
                    cards: this.state.cards.filter(
                      character => character.url !== character.url,
                    ),
                  });
                }}
                style={{backgroundColor: '#FFC0CB', borderRadius: 10}}>
                <ProfileButtonText>Excluir</ProfileButtonText>
              </ProfileButton> */}
            </User>
          )}
        />     

        </Container>
        )
    }
    

}