import { FaSave, FaEdit, FaTrash } from 'react-icons/fa';
import { IIndexable } from '../../types';
import { UIText } from '../../shared/constants';

const iconsMap = {
  [UIText.SAVE]: () => <FaSave />,
  [UIText.EDIT]: () => <FaEdit />,
  [UIText.DELETE]: () => <FaTrash />
};

function TableData({
  onClick,
  icon,
  text,
  testId
}: {
  onClick?: () => void;
  icon?: string;
  text?: string;
  testId: string;
}) {
  return (
    <td data-testid={testId} onClick={onClick}>
      <div className={`icon-wrapper ${text?.toLowerCase()}`}>
        {icon && (iconsMap as IIndexable)[icon]()}
        {text && <p> {text} </p>}
      </div>
    </td>
  );
}

export default TableData;
