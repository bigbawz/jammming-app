import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';

function SearchResults({ searchResults }) {
    return (
        <Container>
        <Row className="mx-2 row row-cols-5">
            {searchResults.map((album, i) => {
                console.log(album)
                return (
                    <Card>
                        <Card.Img src={album.images[0].url} />
                        <Card.Body>
                            <Card.Title>{album.name}</Card.Title>
                        </Card.Body>
                    </Card>
                )
            })}
        </Row>
      </Container>
    )
};

export default SearchResults;