import { FaSave, FaEdit, FaTrash } from "react-icons/fa";
import { IIndexable } from "../../../types";
import { UIText } from "../../../shared/constants";

const iconsMap = {
  [UIText.SAVE]: () => <FaSave />,
  [UIText.EDIT]: () => <FaEdit />,
  [UIText.DELETE]: () => <FaTrash />
}

function TableData({ onClick, icon, text }: { onClick?: () => void, icon?: string, text?: string }) {
  return (
    <td onClick={onClick}>
      {icon && (iconsMap as IIndexable)[icon]()}
      {text && <p> {text} </p>}
    </td>
  );
}

export default TableData;