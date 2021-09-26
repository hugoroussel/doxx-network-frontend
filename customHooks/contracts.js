/* eslint-disable no-await-in-loop */
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import dnpAbi from '../abis/dnp.js';
import erc20Abi from '../abis/erc20.js';

const DNP = '0xA70beb9330F62968b71522da6D63df78ADDF54c9';
const DAI = '0x88271d333C72e51516B67f5567c728E702b3eeE8';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDNPContract(ethereumProvider) {
  const provider = new ethers.providers.Web3Provider(ethereumProvider);
  const dnpContract = new ethers.Contract(DNP, dnpAbi, provider);
  return dnpContract;
}

async function getSignature(ethereumProvider, accountAddress) {
  const provider = new ethers.providers.Web3Provider(ethereumProvider);
  const signer = provider.getSigner();
  let signature;
  try {
    // eslint-disable-next-line no-underscore-dangle
    signature = await signer.signMessage(accountAddress);
    return signature;
  } catch (error) {
    return '';
  }
}

async function registerSelfBounty(amount, ethereumProvider, account) {
  const dn = await getDNPContract(ethereumProvider);
  const bn = new BigNumber(amount * 1e18);
  const res = await dn.populateTransaction.registerSelfBounty(bn.toFixed());
  res.from = account;
  res.chainId = 5;
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  console.log(txHash);
}

async function getDAIContract(ethereumProvider) {
  const provider = new ethers.providers.Web3Provider(ethereumProvider);
  const daiContract = new ethers.Contract(DAI, erc20Abi, provider);
  return daiContract;
}

async function approveDAI(amount, ethereumProvider, account) {
  const dai = await getDAIContract(window.ethereum);
  const bn = new BigNumber(amount * 1e18);
  const res = await dai.populateTransaction.approve(DNP, bn.toFixed());
  res.from = account;
  res.chainId = 5;
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  console.log(txHash);
}

async function buySelfBounty(ethereumProvider, seller, account) {
  const dn = await getDNPContract(ethereumProvider);
  const res = await dn.populateTransaction.buySelfBounty(seller);
  res.from = account;
  res.chainId = 5;
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  return txHash;
}

export {
  getDNPContract, getSignature, registerSelfBounty, approveDAI, buySelfBounty,
};
