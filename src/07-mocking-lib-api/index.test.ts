import axios, { AxiosInstance } from 'axios';

import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.useFakeTimers();

    const baseURL = 'https://jsonplaceholder.typicode.com';
    const mockAxios = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/');

    jest.runOnlyPendingTimers();

    expect(mockAxios).toBeCalled();

    const resultBaseURL = mockAxios.mock.results[0]?.value.defaults.baseURL;

    expect(resultBaseURL).toBe(baseURL);

    mockAxios.mockRestore();
    jest.runAllTimers();
  });

  test('should perform request to correct provided url', async () => {
    jest.useFakeTimers();

    const relativePath = '/posts/1';

    const mockAxiosInstance = {
      get: jest.fn(),
    } as unknown as AxiosInstance;

    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance);

    const mockGet = jest.mocked(mockAxiosInstance.get).mockResolvedValue({
      data: 'mocked data',
    });
    await throttledGetDataFromApi(relativePath);

    jest.runOnlyPendingTimers();
    expect(mockGet).toHaveBeenCalledWith(relativePath);

    jest.restoreAllMocks();
    jest.runAllTimers();
  });

  test('should return response data', async () => {
    jest.useFakeTimers();

    const expectedResponse = 'mocked data';

    const mockAxiosInstance = {
      get: jest.fn(),
    } as unknown as AxiosInstance;

    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance);

    jest.mocked(mockAxiosInstance.get).mockResolvedValue({
      data: expectedResponse,
    });
    const fetchedData = await throttledGetDataFromApi('');

    jest.runOnlyPendingTimers();
    expect(fetchedData).toBe(expectedResponse);

    jest.restoreAllMocks();
    jest.runAllTimers();
  });
});
