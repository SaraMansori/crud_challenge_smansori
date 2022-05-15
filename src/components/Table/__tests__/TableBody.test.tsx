import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { contextMockData } from '../../../context/Table/__mock__/contextMockData';
import { customRenderWithValue } from '../../../shared/utils/testingUtils';
import TableBody from '../TableBody';


const editFunction = jest.fn();
const deleteFunction = jest.fn();

test('Table Component renders a table element', () => {

  customRenderWithValue(
    <table>
      <TableBody
        handleDataDelete={deleteFunction}
        handleDataEdit={editFunction}
      />
    </table>,
    { providerProps: contextMockData }
  );

  expect(screen.getByTestId('movies-table-body')).toBeVisible()

});
