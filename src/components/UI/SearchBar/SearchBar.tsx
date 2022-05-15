import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function SearchBar({
  placeholder,
  value,
  onChange
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="search">
        <FaSearch />
      </InputGroup.Text>
      <FormControl
        placeholder={placeholder}
        aria-label="Search Value"
        aria-describedby="search"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </InputGroup>
  );
}

export default SearchBar;
