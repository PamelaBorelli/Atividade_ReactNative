// import React, { useState, Component} from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Keyboard, ActivityIndicator} from 'react-native';
// import api from '../services/api';
// import {
//     Container,
//     Form,
//     Input,
//     SubmitButton,
//     List,
//     User,
//     Avatar,
//     Name,
//     Bio,
//     ProfileButton,
//     ProfileButtonText,
//   } from './style';
  

// export default class Main extends Component {
//     state = {
//         newCharacter: '',
//         characters: [],
//         loading: false,
//     }


//     async componentDidMount() {
      
//       const characters = await AsyncStorage.getItem(`character/${characters}`);

  
//       if (characters) {
//         this.setState({characters: JSON.parse(characters)});
//       }
//     }
  

//     async componentDidUpdate(_, prevState) {


//       const {characters} = this.state

  
//       if (prevState.characters !== characters) {
//         await AsyncStorage.setItem('character', JSON.stringify(characters));
//       }
//     }
  
//     handleAddCard = async () => {
//         try{
//             const {characters, newCharacter} = this.state

//             this.setState({loading: true})

//             const response = await api.get(`/character/${newCharacter}`+id)
            



//             const data = {
//                 name: response.data.name,
//                 url: response.data.url,
//                 species: response.data.species,
//                 image: response.data.image,
//                 page: response.data.page,
//                 id: response.data.id,
//                 page: response.data.page

//             }

//             this.setState({
//               characters: [...characters, data],
//               newCharacter: '',
//               loading: false,
//             })

//         Keyboard.dismiss();

//         }catch(error){
//           alert('Personagem não encontrado')
//           this.setState({loading: false})
//         }

//     }

//     render(){
//         const { characters, newCharacter, loading } = this.state;

//         return(
//             <Container>
//             <Form>
//               <Input
//                 autoCorrect={false}
//                 autoCapitalize="none"
//                 placeholder="Procurar Personagem"
//                 value={newCharacter}
//                 onChangeText={text => this.setState({newCharacter: text})}
//                 returnKeyType="send"
//                 onSubmitEditing={this.handleAddCard}
//               />
//             <SubmitButton loading={loading} onPress={this.handleAddCard}>
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Icon name="add" size={20} color="#fff" />
//             )}
//           </SubmitButton>
//         </Form>

//         <List
//           showsVerticalScrollIndicator={false}
//           data={characters}
//           keyExtractor={characters => characters.id.toString()}
//           // renderItem={({item}) => (
//           //   <User>
//           //     <Avatar source={{uri: item.image}} />
//           //     <Name>{item.name}</Name>
//           //     <Bio>{item.species}</Bio>

//           //     <ProfileButton onPress={() => (
//           //       this.props.navigation.navigate('character', {character: item})
//           //     )}>
//           //       <ProfileButtonText>Ver perfil</ProfileButtonText>
//           //     </ProfileButton>

//           //     <ProfileButton
//           //       onPress={() => {
//           //         this.setState({
//           //           cards: this.state.cards.filter(
//           //             character => character.url !== character.url,
//           //           ),
//           //         });
//           //       }}
//           //       style={{backgroundColor: '#FFC0CB', borderRadius: 10}}>
//           //       <ProfileButtonText>Excluir</ProfileButtonText>
//           //     </ProfileButton>


//           //   </User>
//           // )}
//         />     

//         </Container>


//         )

//     }
    

// }

import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, Pressable, TextInput, Alert, Image } from "react-native"


const CharacterSearch = ({ navigation }) => {

    const [characterList, setCharacterList] = useState([]);
    const [inputName, setInputName] = useState("")

    useEffect(() => {
        getDataFromAPI()
    }, []);


    const getDataFromAPI = async () => {

        const apiURL = `https://rickandmortyapi.com/api/character/?name=${inputName}`;

        const response = await fetch(apiURL);
        const json = await response.json();
        setCharacterList(json.results);
        if (!json.results) {
            Alert.alert("No matching result found")
        }
    }

    // new component that outputs the UI for the divider
    const ItemDivider = () => {
        return (
            <View style={{ height: 15, width: "100%", backgroundColor: "white" }} />
        )
    }
    const extract = (episodesArray) => {
        let episodesNumbers = []
        for (let i = 0; i < episodesArray.length; i++) {
            let parts = episodesArray[i].split(`/`)
            episodesNumbers.push(parts[parts.length - 1])
        }
        return episodesNumbers
    }

    const renderItem = ({ item }) => (
        <Pressable onPress={() => {
            navigation.navigate('CharacterDetail', { image: item.image, name: item.name, species: item.species, episodesNumbers: extract(item.episode) })
        }}>
            <View>
                <View>
                    <Image
                        style={styles.characterImage}
                        source={{ uri: item.image }} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <View style={styles.status}>
                        {(item.status == "Alive") && <Text style={styles.alive}>{item.status}</Text>}
                        {(item.status == "Dead") && <Text style={styles.dead}>{item.status}</Text>}
                        {(item.status == "unknown") && <Text style={styles.unknown}>{item.status}</Text>}
                    </View>
                </View>
                <View style={{ margin: 8 }}>
                    <Text style={styles.location}>Originally From: {item.origin.name}</Text>
                    <Text style={styles.location}>Originally From: {item.location.name}</Text>
                </View>
            </View>
        </Pressable>
    )

    return (
        <SafeAreaView>
            <View style={styles.constainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter character name"
                    onChangeText={setInputName}
                    onSubmitEditing={() => {
                        getDataFromAPI()
                    }
                    }
                />
                <FlatList
                    data={characterList}
                    keyExtractor={(item) => { return item.id }}
                    renderItem={renderItem}
                    ItemSeparatorComponent={ItemDivider}
                />
            </View>
        </SafeAreaView>
    )

}



const styles = StyleSheet.create({
    constainer: {
        borderWidth: 1,
        borderColor: "black",
        borderStyle: 'dashed',
        marginBottom: 15,
        marginRight: 30,
        marginLeft: 30,
        marginTop: 10,
        padding: 8,
        height: 800,
        backgroundColor: "white"
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "grey",
        padding: 5,
        marginBottom: 8
    },
    characterImage: {
        width: '100%',
        height: 200,
    },
    nameText: {
        height: 40,
        fontSize: 15,
        padding: 10,
        color: "white",
        backgroundColor: "black",
        opacity: 0.6
        // backgroundColor: "transparent"
    },
    name: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    status: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    alive: {
        color: "white",
        backgroundColor: "green",
        height: 40,
        padding: 10,
    },
    dead: {
        color: "white",
        backgroundColor: "red",
        height: 40,
        padding: 10,
    },
    unknown: {
        color: "white",
        backgroundColor: "grey",
        height: 40,
        padding: 10,
    },
    location: {
        color: "grey",
        backgroundColor: "white",
        // marginLeft: 8
    }
})
export default CharacterSearch