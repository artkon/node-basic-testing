import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout');

    const timeout = 1000;
    const callback = () => 'callback';

    doStuffByTimeout(callback, timeout);

    expect(spySetTimeout).toHaveBeenCalledTimes(1);
    expect(spySetTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();

    const timeout = 1000;

    doStuffByTimeout(mockCallback, timeout);

    expect(mockCallback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(timeout);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval');

    const interval = 1000;
    const callback = () => 'callback';

    doStuffByInterval(callback, interval);

    expect(spySetInterval).toHaveBeenCalledTimes(1);
    expect(spySetInterval).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();

    const interval = 1000;

    doStuffByInterval(mockCallback, interval);

    expect(mockCallback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(interval);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(path, 'join');
    const pathToJoin = 'pathToJoin';

    await readFileAsynchronously(pathToJoin);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToJoin);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'pathToNonExistingFile';

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    const mockExistSync = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const mockReadFile = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from(fileContent, 'utf-8'));

    const pathToFile = 'pathToExistingFile';

    const result = await readFileAsynchronously(pathToFile);

    expect(mockExistSync).toHaveBeenCalledTimes(1);
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(result).toBe(fileContent);
  });
});
