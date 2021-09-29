async function getAccount(ethereumProvider) {
  const accounts = await ethereumProvider.request({ method: 'eth_requestAccounts' });
  const account0 = accounts[0];
  return account0;
}

module.exports = { getAccount };
