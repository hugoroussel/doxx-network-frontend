/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-await-in-loop */
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import dnpAbi from '../abis/dnp.js';
import erc20Abi from '../abis/erc20.js';

const DNP = '0x03D370812d754021E66926CEF9f420178B60d1fc';
const DAI = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';

function hexToInt(hexstring) {
  return parseInt(hexstring, 16);
}

// SIGNATURE
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

async function getDNPContract(ethereumProvider) {
  const provider = new ethers.providers.Web3Provider(ethereumProvider);
  const dnpContract = new ethers.Contract(DNP, dnpAbi, provider);
  return dnpContract;
}

// DNP SELF BOUNTIES STATE CHANGE CALLS
async function registerSelfBounty(amount, ethereumProvider, account) {
  const dn = await getDNPContract(ethereumProvider);
  const bn = new BigNumber(amount * 1e18);
  const res = await dn.populateTransaction.registerSelfBounty(bn.toFixed());
  res.from = account;
  res.chainId = parseInt(process.env.CHAIN_ID, 10);
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  console.log(txHash);
}

async function buySelfBounty(ethereumProvider, seller, account) {
  const dn = await getDNPContract(ethereumProvider);
  const res = await dn.populateTransaction.buySelfBounty(seller, account);
  res.from = account;
  res.chainId = parseInt(process.env.CHAIN_ID, 10);
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  return txHash;
}

async function stopStreamSelfBounty(ethereumProvider, seller, account) {
  const dn = await getDNPContract(ethereumProvider);
  const res = await dn.populateTransaction.stopStreamSelfBounty(seller, account);
  res.from = account;
  res.chainId = parseInt(process.env.CHAIN_ID, 10);
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  return txHash;
}

// DNP SEARCH BOUNTIES STATE CHANGE CALLS

async function registerSearchBounty(ethereumProvider, bounty, seller, buyer) {
  const dn = await getDNPContract(ethereumProvider);
  const bn = new BigNumber(bounty * 1e18);
  const res = await dn.populateTransaction.registerSearchBounty(bn.toFixed(), seller);
  res.from = buyer;
  res.chainId = parseInt(process.env.CHAIN_ID, 10);
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  console.log(txHash);
}

async function buySearchBounty(ethereumProvider, seller, buyer) {
  const dn = await getDNPContract(ethereumProvider);
  const res = await dn.populateTransaction.buySearchBounty(seller, buyer);
  res.from = seller;
  res.chainId = parseInt(process.env.CHAIN_ID, 10);
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  return txHash;
}

// DNP GETTERS

async function isApprovedSeller(ethereumProvider, sellerAddress) {
  const dn = await getDNPContract(ethereumProvider);
  const result = await dn.verifyApprovedSeller(sellerAddress);
  return result;
}

async function gSelfBountyAmount(ethereumProvider, sellerAddress) {
  const dn = await getDNPContract(ethereumProvider);
  const result = await dn.getSelfBountyAmount(sellerAddress);
  return result;
}

async function gAllSelfBountiesSold(ethereumProvider, sellerAddress) {
  const dn = await getDNPContract(ethereumProvider);
  const result = await dn.getAllSelfBountiesSold(sellerAddress);
  return result;
}

async function gAllSearchBountiesBuy(ethereumProvider, sellerAddress) {
  const dn = await getDNPContract(ethereumProvider);
  const result = await dn.getAllSearchBountiesBuy(sellerAddress);
  return result;
}

async function gAllSelfBountiesSellerForBuyer(ethereumProvider, account) {
  const dn = await getDNPContract(ethereumProvider);
  const result = await dn.getAllSelfBountiesSellerForBuyer(account);
  return result;
}

async function getAllSearchBountiesForBuyer(ethereumProvider, account) {
  const dn = await getDNPContract(ethereumProvider);
  const result = await dn.getAllSearchBountiesBuy(account);
  return result;
}

async function getAllAvailableBounties(ethereumProvider, account) {
  const dn = await getDNPContract(ethereumProvider);
  const result = await dn.getAllAvailableBounties(account);
  return result;
}

async function getSearchBountyAmount(ethereumProvider, sellerAddress, buyerAddress) {
  const dn = await getDNPContract(ethereumProvider);
  const result = await dn.getSearchBountyAmount(sellerAddress, buyerAddress);
  console.log(result);
  return hexToInt(result._hex) / 1e18;
}

// DNP SELF SETTERS

// DAI CALLs
async function getDAIContract(ethereumProvider) {
  const provider = new ethers.providers.Web3Provider(ethereumProvider);
  const daiContract = new ethers.Contract(DAI, erc20Abi, provider);
  return daiContract;
}

async function approveDAI(amount, ethereumProvider, account) {
  const dai = await getDAIContract(window.ethereum);
  const bn = new BigNumber(1e5 * 1e18);
  const res = await dai.populateTransaction.approve(DNP, bn.toFixed());
  res.from = account;
  res.chainId = parseInt(process.env.CHAIN_ID, 10);
  const txHash = await ethereumProvider.request({
    method: 'eth_sendTransaction',
    params: [res],
  });
  console.log(txHash);
}

export {
  getSignature,
  approveDAI,
  getDNPContract, registerSelfBounty, buySelfBounty,
  isApprovedSeller,
  gSelfBountyAmount,
  gAllSelfBountiesSold,
  gAllSearchBountiesBuy,
  gAllSelfBountiesSellerForBuyer,
  stopStreamSelfBounty,
  DNP,
  registerSearchBounty,
  getAllAvailableBounties,
  getSearchBountyAmount,
  buySearchBounty,
  getAllSearchBountiesForBuyer,
};
