import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Collapse,
  Alert,
  Spinner,
  Table,
} from "react-bootstrap";
import BreickLogo from "../../assets/club-breick-logo.png";
import { getClientPoints } from "../../Services/clubServices";

export default function PointRequest() {
  const [codCliente, setCodCliente] = useState("");
  const [points, setPoints] = useState(null);
  const [showPoints, setShowPoints] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [showTitle, setShowTitle] = useState(true);
  const [notFound, setNotFound] = useState("");

  const styles = {
    backgroundColor: "#6a4593",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    images: {
      maxWidth: "45%",
      marginBottom: "20px",
    },
    titleBox: {
      border: "2px solid white",
      borderRadius: "10px",
      padding: "10px 20px",
      fontWeight: "bold",
      fontSize: showTitle ? "1.5rem" : "0.8rem", // Transition font size
      textAlign: "center",
      marginBottom: "20px",
      transition: "font-size 1s ease-in-out", // Smooth transition for font size change
      opacity: 1, // Keep opacity consistent since we are only changing font size
      height: "auto", // Maintain auto height
      overflow: "hidden", // Prevents content overflow during transition
    },
    subtitle: {
      fontSize: "1.2rem",
      marginBottom: "20px",
      textAlign: "center",
    },
    table: {
      backgroundColor: "white",
      color: "#000",
      borderRadius: "10px",
      marginTop: "20px",
      overflowX: "auto",
      overFlowY: "auto",
      maxHeight: "30vh",
    },
  };

  const formStyles = {
    backgroundColor: "#5cb8b2",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const buttonStyles = {
    backgroundColor: "#eead1a",
    borderColor: "#eead1a",
    color: "white",
    width: "100%",
    marginTop: "15px",
  };

  const handleRequestPoints = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Show loader
      setShowPoints(false); // Hide previous result
      const retrievedPoints = await getClientPoints(codCliente);
      console.log("Retrieved points", retrievedPoints);
      if (retrievedPoints.data.code == 200) {
        setNotFound("");
        console.log("ENTRO AKA");
        setPoints(retrievedPoints.data.data.puntos);
        setLoading(false); // Hide loader
        if (retrievedPoints !== null) {
          setShowTitle(false); // Hide the title if points are retrieved
          setRewards(retrievedPoints.data.data.premios); // Retrieve the rewards list
        } else {
          setShowTitle(true); // Show the title if no points are retrieved
        }
        setShowPoints(true); // Show the points field
      }
    } catch (error) {
      setLoading(false);
      console.log("Data del error", error.response.data);
      if (error.response.data.code == 404) {
        setShowPoints(true);
        setNotFound(error.response.data.message);
        setPoints(null);
      }
    }
  };

  return (
    <div style={styles}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <div style={formStyles}>
              <Image src={BreickLogo} style={styles.images} />
              <div style={styles.titleBox}>¡BIENVENIDO AL CLUB BREICK!</div>
              <div style={styles.subtitle}>Consulta de puntos</div>
              <Form onSubmit={handleRequestPoints}>
                <Form.Group controlId="codCliente">
                  <Form.Label>Ingrese su código cliente por favor</Form.Label>
                  <Form.Control
                    type="text"
                    value={codCliente}
                    onChange={(e) =>
                      !isNaN(e.target.value) && setCodCliente(e.target.value)
                    }
                    placeholder="Código Cliente"
                    required
                  />
                </Form.Group>
                <Button style={buttonStyles} type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Consultar Puntos"
                  )}
                </Button>
              </Form>

              <Collapse in={showPoints}>
                <div>
                  {notFound == "" ? (
                    <>
                      <Alert variant="success" className="mt-3">
                        Tienes {points} puntos disponibles.
                      </Alert>
                      <div style={styles.table}>
                        {rewards.length > 0 && (
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th colSpan={2}>
                                  ¡Puedes acceder a estos premios!
                                </th>
                              </tr>
                              <tr>
                                <th>Premio</th>
                                <th>Puntos Requeridos</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rewards.map((reward, index) => (
                                <tr key={index}>
                                  <td>{reward.nombre}</td>
                                  <td>{reward.puntos}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </div>
                    </>
                  ) : (
                    <Alert variant="danger" className="mt-3">
                      {notFound != ""
                        ? notFound
                        : `No se pudo recuperar los puntos. Inténtalo de nuevo.`}
                    </Alert>
                  )}
                </div>
              </Collapse>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
