import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Card, Button } from 'react-bootstrap';

export const NewsCards = ({title}) => {
    const { store, actions } = useContext(Context);
    console.log(store.news);
    console.log(store.news);

    return(
        <div className="container">
      <div className="row">
        {store.news && store.news.map(article => (
          <div className="col-md-4" key={article.title}>
            <Card>
              <Card.Img variant="top" src={article.img} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
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