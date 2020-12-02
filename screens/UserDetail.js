import React, { useEffect, useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import firebase from '../database/firebase'

const UserDetail = (props) => {
	const initialState = {
		id: '',
		name: '',
		email: '',
		phone: ''
	}
	const [user, setUser] = useState(initialState)

	const [loading, setLoading] = useState(true)

	const getUserById = async (id) => {
		const query = firebase.db.collection('users').doc(id)
		const doc = await query.get()
		const user = doc.data()
		setUser({
			...user,
			id: doc.id
		})
		setLoading(false)
	}

	useEffect(() => {
		getUserById(props.route.params.userId)
	}, [])

	const handleChangeText = (name, value) => {
		setUser({ ...user, [name]: value })
	}

	const deleteUser = async () => {
		let dbRef = firebase.db.collection('users').doc(props.route.params.userId)
		await dbRef.delete()
		props.navigation.navigate('UserList')
	}

	const updateUser = async () => {
		let dbRef = firebase.db.collection('users').doc(user.id)
		await dbRef.set({
			name: user.name,
			email: user.email,
			phone: user.phone
		})
		setUser(initialState)
		props.navigation.navigate('UserList')
	}

	const openConfirmationAlert = () => {
		Alert.alert('Remove the user', 'Are you sure?', [
			{ text: 'Yes', onPress: () => deleteUser() },
			{ text: 'No', onPress: () => console.log(false) }
		])
	}


	if (loading) {
		return (
			<View>
				<ActivityIndicator size="large" color="#9E9E9E" />
			</View>
		)
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput placeholder="Name User" value={user.name} onChangeText={(value) => handleChangeText('name', value)} />
			</View>
			<View style={styles.inputGroup}>
				<TextInput placeholder="Email User" value={user.email} onChangeText={(value) => handleChangeText('email', value)} />
			</View>
			<View style={styles.inputGroup}>
				<TextInput placeholder="Phone User" value={user.phone} onChangeText={(value) => handleChangeText('phone', value)} />
			</View>
			<View>
				<Button color='#19AC52' title="Update User" onPress={() => updateUser()} />
			</View>
			<View>
				<Button color='#E37399' title="Delete User" onPress={() => openConfirmationAlert()} />
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

export default UserDetail