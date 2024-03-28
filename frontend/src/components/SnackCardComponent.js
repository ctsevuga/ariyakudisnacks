import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SnackCardComponent = ({ snack, idx }) => {
  const images = [
    "/images/Athirasam.jpg",
    "/images/kaimurukku.jpg",
    "/images/manoholam.jpg",
    "/images/Murukku.jpg",
    "/images/Seeppuseedai.jpg",
    "/images/sinnaseedai.jpg",
   
  ];
  return (
    <Card>
      <Card.Img crossOrigin="anonymous" variant="top" src={images[idx]} />
      <Card.ImgOverlay>
        <Card.Title>{snack}</Card.Title>
  
        </Card.ImgOverlay>
    </Card>
  );
};

export default SnackCardComponent;

