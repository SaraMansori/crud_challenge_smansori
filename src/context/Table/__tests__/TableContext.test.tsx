import { contextMockData } from '../__mock__/contextMockData';
import { screen } from '@testing-library/react';
import { IIndexable } from '../../../types';
import { customRenderWithValue, TestConsumer } from '../../../shared/utils/testingUtils';

test('TestConsumer shows value from provider', () => {

  const providerProps = contextMockData;

  customRenderWithValue(<TestConsumer />, { providerProps });

  Object.keys(providerProps)
    .filter(key => typeof (providerProps as IIndexable)[key] === 'string')
    .forEach(key => {
      expect(screen.getByTestId(key)).toHaveTextContent(
        (providerProps as IIndexable)[key]
      );
    });

  Object.keys(providerProps)
    .filter(key => {
      const item = (providerProps as IIndexable)[key];
      return (
        Array.isArray(item) &&
        item.length > 0 &&
        typeof item[0] === 'object' &&
        !Array.isArray(item[0]) &&
        item[0] !== null
      );
    })
    .forEach(key => {
      const arrayOfObjects = (providerProps as IIndexable)[key];
      arrayOfObjects.forEach((object: {}, i: number) => {
        Object.keys(object).forEach((objectKey) => {
          expect(
            screen.getByTestId(`tableData-${objectKey}-${i}`)
          ).toHaveTextContent((object as IIndexable)[objectKey]);
        });
      });
    });

  Object.keys(providerProps)
    .filter(key => {
      const item = (providerProps as IIndexable)[key];
      return (
        Array.isArray(item) && item.length > 0 && typeof item[0] === 'string'
      );
    })
    .forEach(key => {
      const arrayOfStrings = (providerProps as IIndexable)[key];
      arrayOfStrings.forEach((value: string, i: number) => {
        expect(screen.getByTestId(`columnKey-${value}`)).toHaveTextContent(
          arrayOfStrings[i]
        );
      });
    });
});