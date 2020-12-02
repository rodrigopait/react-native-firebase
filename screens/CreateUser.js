import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'


const CreateUser = (props) => {

	const [state, setState] = useState({
		name: '',
		email: '',
		phone: ''
	}
	)

	const handleChangeText = (name, value) => {
		setState({ ...state, [name]: value })
	}

	const saveNewUser = async () => {
		if (state.name === '') {
			alert('Please provide a name')
		}
		else {
			await firebase.db.collection('users').add({
				name: state.name,
				email: state.email,
				phone: state.phone
			})
			props.navigation.navigate('UserList')
		}

	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput placeholder="Name User" onChange={(event) => handleChangeText('name', event.target.value)} />
			</View>
			<View style={styles.inputGroup}>
				<TextInput placeholder="Email User" onChange={(event) => handleChangeText('email', event.target.value)} />
			</View>
			<View style={styles.inputGroup}>
				<TextInput placeholder="Phone User" onChange={(event) => handleChangeText('phone', event.target.value)} />
			</View>
			<View>
				<Button title="Save User" onPress={() => saveNewUser()} />
			</View>
		</ScrollView>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 35
	},

	inputGroup: {
		flex: 1,
		padding: 0,
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccccc'
	}
})
export default CreateUser