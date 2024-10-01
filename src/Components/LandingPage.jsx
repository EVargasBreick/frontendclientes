import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreickLogo from "../assets/club-breick-logo.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const styles = {
    backgroundColor: "#6A4593",
    height: "100vh",
    color: "white",
    textAlign: "center",
    padding: "20px",
    title: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "10vh",
    },
    menuBar: {
      backgroundColor: "#5cb8b2",
      padding: "10px 20px",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "flex-end",
    },
    buttonGrid: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
    },
    button: {
      backgroundColor: "#eead1a",
      borderColor: "#eead1a",
      color: "white",
      width: "100%",
      maxWidth: "200px",
    },
    images: {
      width: "calc(20vw + 10vh)",
    },
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "+59169707012"; // Replace with your actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  return (
    <div style={styles}>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center", 
                alignItems: "center", 
                height: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: "#5cb8b2",
                  padding: "20px 40px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "1em",
                }}
              >
                <Image src={BreickLogo} style={styles.images} />
                <div style={styles.title}>
                  SISTEMA DE CONSULTA PARA MIEMBROS CLUB BREICK
                </div>
                <Button
                  style={styles.button}
                  onClick={() => navigate("/consultar_puntos")}
                >
                  Consultar Puntos
                </Button>
                <Button
                  style={styles.button}
                  onClick={() =>
                    window.open("https://breick.com.bo/club-breick/", "_blank")
                  }
                >
                  Ir A la Web de Breick
                </Button>
                <Button
                  style={styles.button}
                  onClick={() => handleWhatsAppRedirect()}
                >
                  Contáctanos
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
