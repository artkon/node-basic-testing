import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const balance = bankAccount.getBalance();

    expect(balance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;
    const sumToWithdraw = 1001;
    const bankAccount = getBankAccount(initialBalance);

    const throwingFunction = () => bankAccount.withdraw(sumToWithdraw);
    const expectedError = new InsufficientFundsError(initialBalance);

    expect(throwingFunction).toThrow(expectedError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const sumToTransfer = 1001;
    const sourceBankAccount = getBankAccount(initialBalance);
    const targetBankAccount = getBankAccount(0);

    const throwingFunction = () =>
      sourceBankAccount.transfer(sumToTransfer, targetBankAccount);
    const expectedError = new InsufficientFundsError(initialBalance);

    expect(throwingFunction).toThrow(expectedError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 1000;
    const sumToTransfer = 1000;
    const sourceBankAccount = getBankAccount(initialBalance);

    const throwingFunction = () =>
      sourceBankAccount.transfer(sumToTransfer, sourceBankAccount);
    const expectedError = new TransferFailedError();

    expect(throwingFunction).toThrow(expectedError);
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const sumToDeposit = 500;
    const bankAccount = getBankAccount(initialBalance);

    const balance = bankAccount.deposit(sumToDeposit).getBalance();
    const expectedBalance = initialBalance + sumToDeposit;

    expect(balance).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const sumToWithdraw = 500;
    const bankAccount = getBankAccount(initialBalance);

    const balance = bankAccount.withdraw(sumToWithdraw).getBalance();
    const expectedBalance = initialBalance - sumToWithdraw;

    expect(balance).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const initialSourceAccountBalance = 1000;
    const initialTargetAccountBalance = 0;
    const sumToTransfer = 500;
    const sourceBankAccount = getBankAccount(initialSourceAccountBalance);
    const targetBankAccount = getBankAccount(initialTargetAccountBalance);

    sourceBankAccount.transfer(sumToTransfer, targetBankAccount);
    const targetAccountBalance = targetBankAccount.getBalance();
    const expectedTargetBalance = initialTargetAccountBalance + sumToTransfer;

    expect(targetAccountBalance).toBe(expectedTargetBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);

    const fetchedBalance = await bankAccount.fetchBalance();

    const isRequestFailed = fetchedBalance === null;
    const isNumberFetched = typeof fetchedBalance === 'number';

    const isNumberOrFail = isNumberFetched || isRequestFailed;

    expect(isNumberOrFail).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);

    const fetchBalanceMockData = 500;

    const spyFetchBalance = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValue(fetchBalanceMockData);

    await bankAccount.synchronizeBalance();

    const resultBalance = bankAccount.getBalance();

    expect(spyFetchBalance).toBeCalled();
    expect(resultBalance).toBe(fetchBalanceMockData);

    spyFetchBalance.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);

    const fetchBalanceMockData = null;

    const spyFetchBalance = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValue(fetchBalanceMockData);

    const throwSynchronizeFunc = async () =>
      await bankAccount.synchronizeBalance();

    const expectedError = new SynchronizationFailedError();

    await expect(throwSynchronizeFunc).rejects.toThrow(expectedError);
    await expect(spyFetchBalance).toBeCalled();

    spyFetchBalance.mockRestore();
  });
});
