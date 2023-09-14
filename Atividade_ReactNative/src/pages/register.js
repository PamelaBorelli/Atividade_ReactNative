import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Register = () => {

    const [nome, setNome] = useState ('')
    const [telefone, setTelefone] = useState ('')
    const [cpf, setCPF] = useState ('')
    const [curso, setCurso] = useState ('')
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();


    const handleRegister = () =>{
        if (email === '' && password === ''){
            navigation.navigate('login');
        }else{
            alert('E-mail ou senha já cadastrado. Faça o login')
        }
    }

    return (

        <View style={styles.container}>

            <TextInput
            style={styles.input}
            placeholder='Nome'
            value={nome}
            onChangeText={setNome}
            />
            <TextInput
            style={styles.input}
            placeholder='Telefone'
            value={telefone}
            onChangeText={setTelefone}
            />
            <TextInput
            style={styles.input}
            placeholder='CPF'
            value={cpf}
            onChangeText={setCPF}
            />
            <TextInput
            style={styles.input}
            placeholder='Curso'
            value={curso}
            onChangeText={setCurso}
            />

            <TextInput
            style={styles.input}
            placeholder='E-mail'
            value={email}
            onChangeText={setEmail}
            />
            <TextInput
            style={styles.input}
            placeholder='Senha'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            />


            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>


        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical:10,
        width: '80%',
    },
    button:{
        marginTop: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default Register;