const React = require('react-native');

const {
	AlertIOS,
	ActivityIndicatorIOS,
	View,
	Text,
	TextInput,
	TouchableHighlight,
	StyleSheet
} = React;

// external modules
const api = require('../Utils/api.js');
const STYLES = require('./Helpers/styles.js');
// external Components
const YelpResults = require('./YelpResults.js');

class SuggestionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			barName: '',
			barLocation: '',
			isLoading: false
		};
	}
	handleSubmit() {
		// cache barName for the title of the next navigator
		let barName = this.state.barName;
		this.setState({
			barName: '',
			barLocation: '',
			isLoading: true
		});
		let name = this.state.barName.toLowerCase().trim();
		let location = this.state.barLocation.toLowerCase().trim();
		api.addSuggestion({
			name,
			location
		})
		.then(results => {
			this.setState({isLoading: false});
			this.props.navigator.push({
				component: YelpResults,
				title: `Which "${barName}"?`,
				passProps: {results}
			});
		});
	}
	handleNameChange(e) {
		this.setState({
			barName: e.nativeEvent.text
		});
	}
	handleLocationChange(e) {
		this.setState({
			barLocation: e.nativeEvent.text
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.formBarName}>
					<Text style={styles.title}>
						Bar Name
					</Text>
					<TextInput
						style={styles.textInput}
						value={this.state.barName}
						onChange={this.handleNameChange.bind(this)}
						placeholder="Enter name..."/>
				</View>
				<View style={styles.formBarLocation}>
					<Text style={styles.title}>
						Bar Location
					</Text>
					<TextInput
						style={styles.textInput}
						value={this.state.barLocation}
						onChange={this.handleLocationChange.bind(this)}
						placeholder="Enter location..."/>
					}
				</View>
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="#FFF">
					<Text style={styles.buttonText}>
						SUBMIT
					</Text>
				</TouchableHighlight>
				<View style={styles.spinner}>
					<ActivityIndicatorIOS
						animating={this.state.isLoading}
						color="#111"
						size="large" />
				</View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 55,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: STYLES.primaryColor
	},
	title: {
		marginBottom: 10,
		fontSize: 25,
		textAlign: 'center',
		color: '#FFF'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: '#FFF',
		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	spinner: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	textInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		marginBottom: 15,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#FFF',
		borderRadius: 8,
		color: '#FFF'
	},
	formBarName: {

	},
	formBarLocation: {

	}
});

module.exports = SuggestionForm;