import { fireEvent, render, screen } from '@testing-library/react';
import { initialState } from '..';
import { IIndexable } from '../../../types';
import { newContextMockData } from '../__mock__/contextMockData';
import { customRender, TestConsumer } from '../../../shared/utils/testingUtils';

test('TestConsumer shows default value', () => {
  render(<TestConsumer />);

  Object.keys(initialState)
    .filter(key => typeof (initialState as IIndexable)[key] === 'string')
    .forEach(key => {
      expect(screen.getByTestId(key)).toHaveTextContent(
        (initialState as IIndexable)[key]
      );
    });

  Object.keys(initialState)
    .filter(key => Array.isArray((initialState as IIndexable)[key]))
    .forEach(key => {
      const arrayOfObjects = (initialState as IIndexable)[key];
      arrayOfObjects.forEach((object: {}, i: number) => {
        Object.keys(object).forEach((objectKey) => {
          expect(
            screen.getByTestId(`tableData-${objectKey}-${i}`)
          ).toHaveTextContent((object as IIndexable)[objectKey]);
        });
      });
    });
});

test('Context changes when methods are called', () => {

  customRender(<TestConsumer />);

  fireEvent.click(screen.getByText('Change sort order to ascending'));
  fireEvent.click(screen.getByText('Change sort by to director'));
  fireEvent.click(screen.getByText('Change searched text'));
  fireEvent.click(screen.getByText('Change table data'));
  fireEvent.click(screen.getByText('Change column keys'));

  //TODO: Actualizar el contextMockData

  expect(screen.getByTestId('sortOrder')).not.toHaveTextContent(initialState.sortOrder);
  expect(screen.getByTestId('sortBy')).not.toHaveTextContent(initialState.sortBy);
  expect(screen.getByTestId('sortBy')).toHaveTextContent('director');
  expect(screen.getByTestId('text')).not.toHaveTextContent(initialState.text);
  expect(screen.getByTestId('text')).toHaveTextContent('testSearchedText');
  expect(screen.getByTestId('tableData-title-0')).not.toHaveTextContent(initialState.tableData[0].title);
  expect(screen.getByTestId('tableData-title-0')).toHaveTextContent(newContextMockData.tableData[0].title);
  // expect(screen.getByTestId('columnKeys-title')).not.toBe(initialState.tableData[0].title);

})

