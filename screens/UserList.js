import { useLinkProps } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'
import { ListItem, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


const UserList = (props) => {

	const [users, setUsers] = useState([])

	useEffect(() => {
		firebase.db.collection('users').onSnapshot(querySnapshot => {
			const users = []
			querySnapshot.docs.forEach(doc => {
				const { name, email, phone } = doc.data()
				users.push({
					id: doc.id,
					name,
					email,
					phone
				})
			})
			setUsers(users)
		})
	}, [])

	return (
		<ScrollView>
			<Button title="Create User" onPress={() => props.navigation.navigate('CreateUser')} />
			{
				users.map(user => {
					return (
						<ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('UserDetail', {
							userId: user.id
						})}>
							<ListItem.Chevron />
							<Icon
								name='user'
								size={30} />
							<ListItem.Content>
								<ListItem.Title>{user.name}</ListItem.Title>
								<ListItem.Subtitle>{user.email}</ListItem.Subtitle>
							</ListItem.Content>
						</ListItem>
					)
				})
			}
		</ScrollView >
	)
}

export default UserList