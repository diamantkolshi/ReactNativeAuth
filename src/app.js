import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null }

	componentWillMount() {
		firebase.initializeApp({
	    apiKey: "AIzaSyDLTHZmH7wX4X6ARIg9VAue_J5kiyWvSdw",
	    authDomain: "authentication-50f92.firebaseapp.com",
	    databaseURL: "https://authentication-50f92.firebaseio.com",
	    projectId: "authentication-50f92",
	    storageBucket: "authentication-50f92.appspot.com",
	    messagingSenderId: "1093022810952"
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	rednerContent() {
		switch (this.state.loggedIn) {
			case true: 
				return (
					<Card>
						<CardSection>
							<Button onPress={() => firebase.auth().signOut()}>
								Log Out
							</Button>
						</CardSection>
					</Card>
					);
			case false:
				return <LoginForm />;
			default: 
				return <Spinner size="large" />
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.rednerContent()}
			</View>
		);
	}
}

export default App;