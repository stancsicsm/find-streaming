import {Row, Col} from "react-bootstrap";

const Title = () => {
  return (
    <Row className="justify-content-md-center mt-2 mb-3">
      <Col>
        <div className="d-flex">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            height='40px'
            className="rounded me-2"
          />
          <h1 className="my-auto">Find Streaming</h1>
        </div>
      </Col>
    </Row>
  )
}

export default Title;
