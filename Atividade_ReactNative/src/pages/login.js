import React, { useState }from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';



const Login = () => {

    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();


    const handleLogin = () => {
        if (email === '' && password === ''){
            navigation.navigate('main');
        }else{
            alert('E-mail ou senha não encontrado. Faça seu cadastro!')
        }
    }

    const handleRegister = () =>{
            navigation.navigate('register')
    }

    return (
        <View style={styles.container}>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
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

export default Login;