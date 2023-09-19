import React, { Component } from "react";
import api from "../services/api";
import { Container, 
    Header, 
    Avatarperfil, 
    Nameperfil, 
    Bioperfil, 
    Stars, 
    Starred,
    OwnerAvatar, 
    Info, 
    Title, 
    Author } from "./style";

export default class Character extends Component {

    state = {
        infos: [],
    }


    async componentDidMount (){
        const { route } = this.props;
        const results  = route.params;
        const response = await api.get(`character/?name=${results.name}`);


        this.setState({infos: response.data})

    }

    render (){
        const { route } = this.props;
        const { results } = route.params;
        const { infos } = this.state

        return (
            <Container> 
                <Header>
                    
                    <Avatarperfil source = {{uri: results.image}}/>
                    <Nameperfil> {results.name} </Nameperfil>
                    <Bioperfil> {results.species} </Bioperfil>
                
                </Header>

            <Stars 
            
            data={infos}
            keyExtractor = { (results) => String(results.name)}
            renderItem = {({item}) => (
                
                <Starred>
                        <OwnerAvatar source = {{uri: item.image}}/>
                        <Info>
                            <Title>{item.name}</Title>
                            <Author>{item.species}</Author>
                        </Info>
                </Starred>
            )}
            /> 

            </Container>

        )

    }


}