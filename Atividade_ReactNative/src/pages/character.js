import React, { Component } from "react";
import api from "../services/api";
import {Container } from "./style";

export default class Character extends Component {

    state = {
        infos: [],
    }


    async componentDidMount (){
        const { route } = this.props;
        const { character } = route.params;
        const response = await api.get(`characters/${character.login}/character`)

        this.setState({infos: response.data})
        console.log(response.data);
    }

    render (){
        const { route } = this.props;
        const { character } = route.params;
        const { infos } = this.state

        return (
            <Container> 
                <Header>
                    
                    <Avatarperfil source = {{uri: character.image}}/>
                    <Nameperfil> {character.name} </Nameperfil>
                    <Bioperfil> {character.species} </Bioperfil>
                
                </Header>

            <Stars 
            
            data={infos}
            keyExtractor = { (info) => String(info.id)}
            renderItem = {({item}) => (
                
                <Starred>
                        <OwnerAvatar source = {{uri: item.owner.avatar_url}}/>
                        <Info>
                            <Title>{item.name}</Title>
                            <Author>{item.owner.login}</Author>
                        </Info>
                </Starred>
            )}
            /> 

            </Container>

        )

    }


}