import React, { Component } from "react";
import "./ListArticles.css";
import ShowArticle from "../ShowArticle/ShowArticle";
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/Card';

class ListArticles extends Component {

	constructor(props) {
		super(props);
		this.state = {
			articles: null,
			searchValue: '',
			searchType: 'lastName'
		}
		this.onFormChange = this.onFormChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

	}

	componentDidMount() {
		console.log('on the list article page');
	}

	onFormSubmit(evt) {
		evt.preventDefault();
		// let firstName = null;
		// let lastName = null;

		// switch (this.state.searchType) {
		// 	case "firstName":
		// 		firstName = this.state.searchValue;

		// 		console.log("first " + this.state.searchValue);
		// 		break;
		// 	case "lastName":
		// 		console.log("first " + this.state.searchValue);

		// 		lastName = this.state.searchValue;
		// 		break;
		// 	default:
		// 		console.log("Error please contact administrator")
		// 		break;
		// }
		let date = new Date().toISOString();
		date = date.slice(0, -14)

		const url = `https://newsapi.org/v2/everything?q=COVID-19 OR corona OR covid OR coronavirus&from=${date}&to=${date}&language=en&apiKey=0acee784ba22481b86477d513f4fba25`;
		const req = new Request(url);
		fetch(req)
			.then(response => response.json())
			.then(data => {
				console.log(data.articles)
				this.setState({
					articles: data.articles
				})
			});
		// const proxyurl = "https://immense-ridge-41704.herokuapp.com/";

		// try{
		// 	fetch(proxyurl + `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&skip=0&limit=20&user_key=765d4d94d563c485b63d477fa8644e1d`)
		// 		.then(response => response.json())
		// 		.then(doctors => {
		// this.setState({
		// doctors: doctors.data
		// })
		// 		});
		// } catch (err) {
		// 	alert(err); // Failed to fetch
		// }
	}

	onFormChange(evt) {
		const element = evt.target;
		const name = element.name;
		const value = element.value;
		const newState = {};
		newState[name] = value;
		this.setState(newState);
	}
	render() {
		if (this.state.articles != null) {
			return (
				<div className='ListArticles'>
					<div className='container'>
						{this.state.articles.map((article, index) => {
							return (
								<CardGroup>
									<ShowArticle
										key={index}
										article={article}
									/>
								</CardGroup>
							)
						})}
					</div>
				</div>
			)
		}
		else {
			return (
				<div className='ListArticles'>
					<div className='container'>
						<div className='form'>
							<Button onClick={this.onFormSubmit} variant="primary">Load Articles</Button>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default ListArticles;