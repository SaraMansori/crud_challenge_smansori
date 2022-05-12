import CustomModal from "../../UI/Modal/CustomModal";
import SearchBar from "../../UI/SearchBar/SearchBar";
import { Row, Col } from "react-bootstrap";
import { IData, ITableOptions } from "../../../types";

function TableHeader({ handleMovieSubmit, handleSearchBarTextChange, tableOptions }:
  { handleMovieSubmit: (newMovie: IData) => void, handleSearchBarTextChange: (value: string) => void, tableOptions: ITableOptions }) {
  return (
    <Row as="section" fluid>
      <Col md="8" sm="12">
        <SearchBar
          placeholder="Search"
          onChange={handleSearchBarTextChange}
          value={tableOptions.text}
        />
      </Col>
      <Col md="4" sm="12">
        <CustomModal handleMovieSubmit={handleMovieSubmit}></CustomModal>
      </Col>
    </Row>
  );
}

export default TableHeader;