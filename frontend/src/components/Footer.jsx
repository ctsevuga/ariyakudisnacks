import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Karaikudi E - Mart &copy; {currentYear}</p>
            <p>Contact: 9789911533</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
