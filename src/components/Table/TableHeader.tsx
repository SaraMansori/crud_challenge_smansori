import NewMovieModal from '../UI/Modal/NewMovieModal';
import SearchBar from '../UI/SearchBar/SearchBar';
import { Row, Col } from 'react-bootstrap';
import { IData } from '../../types';

import { TableContext } from '../../context/Table/TableContext';
import { useContext } from 'react';

function TableHeader({
  handleMovieSubmit
}: {
  handleMovieSubmit: (newMovie: IData) => void;
}) {
  const { changeSearchedText, text } = useContext(TableContext);

  const handleSearchBarTextChange = (text: string) => {
    changeSearchedText(text);
  };

  return (
    <Row as="section">
      <Col md="8" sm="12">
        <SearchBar
          placeholder="Search"
          onChange={handleSearchBarTextChange}
          value={text}
        />
      </Col>
      <Col md="4" sm="12">
        <NewMovieModal handleMovieSubmit={handleMovieSubmit}></NewMovieModal>
      </Col>
    </Row>
  );
}

export default TableHeader;
