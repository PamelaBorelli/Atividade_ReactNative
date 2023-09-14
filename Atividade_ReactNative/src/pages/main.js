import React, { Component} from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        newCard: '',
        cards: [],
        loading: false
    }

    handleAddCard = async () => {
        try{
            const {cards, newCard} = this.state

            this.setState({loading: true})

            const response = await api.get(`/cards/${newCard}`)

            const data = {
                name: response.data.name,
                status: response.data.status,
                species: response.data.species,
                type: response.data.type,
                gender:  response.data.gender
            }

            this.setState({
                cards: [...cards, data],
                newCard: '',
                loading: false,
            })

            Keyboard.dismiss();

        }catch(error){
            Alert('Card não encontrado')
            this.setState({loading: false})
        }
        console.log(response.data);
    }

    render(){
        const { cards, newCard, loading } = this.state;

        return(
            <Container>
            <Form>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Adicionar card"
                value={newCard}
                onChangeText={text => this.setState({newCard: text})}
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


        </Container>
        )
    }
    

}