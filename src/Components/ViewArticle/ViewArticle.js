import React, { Component } from "react";
import "./ViewArticle.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class ViewArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: null
        }
    }
    componentDidMount() {
        console.log('on the view article page');
        
        const { author } = this.props.match.params;
        const title = window.location.href.split("/").pop();
        
        fetch(`https://newsapi.org/v2/everything?qInTitle="${title}"&apiKey=0acee784ba22481b86477d513f4fba25`)
            .then(response => response.json())
            .then(articles => {
                let articleList = articles.articles;
                for (let i = 0; i < articleList.length; i++) {
                    if (articleList[i].author === author) {
                        this.setState({
                            article: articleList[i],
                        });
                    }
                }
            });
    }
    render() {
        const article  = this.state.article;
        console.log(article);
        
        if (article !== null) {
            return (
                <div className='ViewArticle'>
                    <div className='container'>
                        <Card style={{ width: '25rem' }}>
                            <Card.Img variant="top" src={article.urlToImage} />
                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Subtitle>Written By {article.author}</Card.Subtitle>
                                <Card.Text>
                                    {article.content}
                                </Card.Text>
                                <Card.Link target='_blank' href={article.url}>Link To Full Article</Card.Link>
                            </Card.Body>
                        </Card>
                        <br/>
                        <div className="form">                            
                            <Button href={`/articles`} variant="primary">Back</Button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='ViewArticle'>
                    <div className='container'>
                        <h1>Nothing Here</h1>
                        <br/>
                        <div className="form">
                            <Button href={`/articles`} variant="primary">Back</Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ViewArticle;