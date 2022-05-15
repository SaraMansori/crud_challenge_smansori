import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { customRender } from '../../../shared/utils/testingUtils';
import CustomTable from '../CustomTable';

test('Table Component renders a table element', () => {
  const editFunction = jest.fn();
  const deleteFunction = jest.fn();

  customRender(
    <CustomTable
      handleDataDelete={deleteFunction}
      handleDataEdit={editFunction}
    />
  );

  expect(screen.getByTestId('movies-table')).toBeVisible()

});

test('Table executes edit and delete functions', () => {
  const editFunction = jest.fn();
  const deleteFunction = jest.fn();

  customRender(
    <CustomTable
      handleDataDelete={deleteFunction}
      handleDataEdit={editFunction}
    />
  );

  fireEvent.click(screen.getByTestId('edit'));
  fireEvent.click(screen.getByTestId('save'));
  expect(editFunction).toBeCalled();

  fireEvent.click(screen.getByTestId('delete'));
  expect(deleteFunction).toBeCalled();
});
