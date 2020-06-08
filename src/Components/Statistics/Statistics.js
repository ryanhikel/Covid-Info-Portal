import React, { Component } from "react";
import "./Statistics.css";
import states from '../../Resources/states'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

class Statistics extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stateInfo: null,
			stateStats: null,
			stateCode: 'AL'
		}
		this.onFormChange = this.onFormChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

	}

	componentDidMount() {
		console.log('on the statistics page');
	}

	onFormSubmit(evt) {
		evt.preventDefault();
		console.log(this.state);
		const stateCode = this.state.stateCode.toLowerCase();

		fetch(`https://covidtracking.com/api/v1/states/${stateCode}/info.json`)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				this.setState({
					stateInfo: data
				})
			});

		fetch(`https://covidtracking.com/api/v1/states/${stateCode}/current.json`)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				this.setState({
					stateStats: data
				})
			});
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
		const stateInfo = this.state.stateInfo;
		const stateStats = this.state.stateStats;

		if (stateInfo !== null && stateStats !== null) {
			return (
				<div className='Statistics'>
					<div className='container'>
						<div className="form">
							<Button href={`/statistics`} variant="primary">Back</Button>
						</div>
						<br/>
						<Card className="item ShowArticle" style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>{stateInfo.name}</Card.Title>
								<br />
								<Card.Text>
									{stateInfo.notes}
								</Card.Text>
							</Card.Body>
							<Card.Link target='_blank' href={stateInfo.covid19Site}>Link to State COVID-19 Information Site</Card.Link>
							<br/>
							<Accordion defaultActiveKey="1">
								<Card>
									<Card.Header>
										<Accordion.Toggle as={Button} variant="link" eventKey="0">
											View Today's Stats
      							</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											Total Recovered: {stateStats.recovered === null ? 'unavailable' : stateStats.recovered}
											<br/>
											Total Death: {stateStats.death === null ? 'unavailable' : stateStats.death}
											<br/>
											Current Hospitalized: {stateStats.hospitalizedCurrently === null ? 'unavailable' : stateStats.hospitalizedCurrently}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</Card>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className='Statistics'>
					<div className='container'>
						<form className="Login control" onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
							<select name="stateCode">
								{
									Object.keys(states).map(function (key, index) {
										return <option key={index} value={key}>{states[key]}</option>
									})
								}
							</select>
							<input className='button' type="submit" value="search" />
						</form>
					</div>
				</div>
			)
		}
	}
}

export default Statistics;