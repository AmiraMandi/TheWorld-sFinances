import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Card, Button } from 'react-bootstrap';
import Logo from "../../../../public/worlds-finances-06.png"
import "../../styles/NewsCards.css"

export const NewsCards = ({title}) => {
    const { store, actions } = useContext(Context);

    return(
        <div className="container">
      <div className="row">
        {store.news && store.news.map(article => (
          <div className="col-md-4" key={article.title}>
            <Card>
              {article.image ? (
                <Card.Img variant="top" src={article.image} />
              ) : (
                <Card.Img variant="top" src={Logo} />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Text>{article.author}</Card.Text>
                <Button variant="primary" href={article.url} target="_blank">Read more</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
    )
}

export default NewsCards