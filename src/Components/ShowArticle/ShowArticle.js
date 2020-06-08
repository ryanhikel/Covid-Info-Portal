import React, { Component } from "react";
import "./ShowArticle.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class ShowArticle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			educations: [],
			hours: ''
		}
	}

	render() {
		const article = this.props.article;
		return (
			<Card className="item ShowArticle" style={{ width: '18rem' }}>
				<Card.Img variant="top" src={article.urlToImage} alt='Article Image' />
				<Card.Body>
					<Card.Title>{article.title}</Card.Title>
					<Card.Subtitle>Written by {article.author}</Card.Subtitle>
					<br />
					<Card.Text>
						{article.description}
					</Card.Text>
				</Card.Body>
				<Button target='_blank' href={article.url} variant="primary">View Article</Button>
			</Card>
		)
	}
}

export default ShowArticle;