import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import { ImageCard } from "../../components/ImageCard/ImageCard";
import { NavBar } from "../../components/Navbar/Navbar";
import { getCentersList, getTattooArtistsList } from "../../services/apiCalls";

import "./Home.css";

export const Home = () => {
  const [tattooArtistsList, setTattooArtistsList] = useState(false);
  const [centersList, setCentersList] = useState(false);

  useEffect(() => {
    //Se obtiene la lista de tatuadores
    getTattooArtistsList()
    .then((data) => {
      console.log(data);
      setTattooArtistsList(data.results);
    })
    .catch((err) => {
      console.log(err);
  
    });    

    //Se obtiene la lista de centros
    getCentersList()
    .then((data) => {
      console.log(data);
      setCentersList(data.results);
    })
    .catch((err) => {
      console.log(err);
  
    }); 
  }, []);


  return (
    
    <>
      <NavBar />

      <section id="home" className="home-wrap">

        <div className="home-bg-img" >

            <div className="container home-content">

                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <h1>I’m Void Sir.</h1>
                        <p>Tattoos have their own unique power and magic. They not only beautify the body but also the psyche.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section id="gallery" className="gallery-wrap" style={{background: "#F9F9F9",}}>

        <div className="container">

            <div className="sec-title">
                <h1>Nuestros artistas</h1>
                <div className="row">
                {tattooArtistsList ? (
                  tattooArtistsList.map(function(data) {
                    return (
                      <ImageCard imageUrl={data.photo} title={data.username} text={data.email} />
                    )
                  })
                ) : ""}
                </div>
            </div>

            <div className="sec-title">
                <h1>Nuestros centros</h1>
                <div className="row">
                {centersList ? (
                  centersList.map(function(data) {
                    return (
                      <Card className="col-xl-3 col-lg-6 col-md-6 mb-5">
                        <Card.Body>
                          <Card.Title>{data.address}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{data.phone}</Card.Subtitle>
                          <Card.Link href="#">Card Link</Card.Link>
                        </Card.Body>
                      </Card>
                    )
                  })
                ) : ""}
                </div>
            </div>

        </div>

        <div className="container-fluid">

            <div className="row">

            </div>
        </div>

      </section>
    </>
  );
};
