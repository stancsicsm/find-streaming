import React, {useState} from "react";
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap';

export interface PageNavigationProps {
  filterParams: Map<string, string | number>;
  setFilterParams: (filters: Map<string, string | number>) => void;
  totalPages: number;
}

const PageNavigation: React.FC<PageNavigationProps> = (pageNavigationProps) => {
  const {filterParams, setFilterParams, totalPages} = pageNavigationProps;

  const [page, setPage] = useState<number>(1);

  const updatePageInFilters = (newPage: number) => {
    const filters = new Map<string, string | number>(filterParams);
    filters.set("page", newPage);
    setFilterParams(filters);
  };

  const previousPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage > 1 ? prevPage - 1 : prevPage;
      updatePageInFilters(newPage);
      return newPage;
    });
  };

  const nextPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      updatePageInFilters(newPage);
      return newPage;
    });
  };

  return (
    <Row className="mb-2">
      <Col className="d-flex justify-content-end">
        <ButtonGroup>
          <Button
            className="rounded-circle me-2"
            variant={`outline-secondary ${page === 1 ? "disabled" : ""}`}
            onClick={previousPage}
            disabled={page === 1}
          >
            &lt;
          </Button>
          <Button
            className="rounded-circle"
            variant={`outline-secondary ${page === totalPages ? "disabled" : ""}`}
            onClick={nextPage}
          >
            &gt;
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default PageNavigation;
