import React from "react";
import {Row, Col} from "react-bootstrap";

interface FooterProps {
  totalPages: number;
  filterParams: Map<string, string | number>;
}

const Footer: React.FC<FooterProps> = ({totalPages, filterParams}) => {
  return (
    <Row className="justify-content-md-center">
      <Col>
        <footer className="text-center mt-3">
          <p>{filterParams.get("page")} / {totalPages}</p>
        </footer>
      </Col>
    </Row>
  )
}

export default Footer;