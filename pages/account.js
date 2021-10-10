/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  gAllSearchBountiesBuy, gAllSelfBountiesSold, gSelfBountyAmount,
  isApprovedSeller, gAllSelfBountiesSellerForBuyer,
  stopStreamSelfBounty,
} from '../customHooks/contracts.js';
import Navbar from '../components/navbar.js';
import { getAccount } from '../utils/ethereum';

export default function Register() {
  const [noEthereum, setNoEthereum] = useState(false);
  const [verified, setVerified] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [bountyAmount, setBountyAmount] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [totalSearching, setTotalSearching] = useState([]);
  const [totalStreamsStarted, setTotalStreamsStarted] = useState([]);

  useEffect(async () => {
    if (!window.ethereum) {
      setNoEthereum(true);
      return;
    }
    const address = localStorage.getItem('eth_address');
    console.log('this is the address', address);
    if (address === '') {
      const aa = await getAccount();
      setAccountAddress(aa);
    } else {
      setAccountAddress(address);
      const res = await isApprovedSeller(window.ethereum, address);
      console.log('this is the res', res);
      setVerified(res);
      const ba = await gSelfBountyAmount(window.ethereum, address);
      setBountyAmount(parseInt(ba._hex, 16) / 1e18);
      const ts = await gAllSelfBountiesSold(window.ethereum, address);
      console.log('this is the ts', ts);
      setTotalSold(ts.length);
      const tsf = await gAllSearchBountiesBuy(window.ethereum, address);
      setTotalSearching(tsf);
      const tss = await gAllSelfBountiesSellerForBuyer(window.ethereum, address);
      setTotalStreamsStarted(tss);
      console.log('this is the tss', tss, tss.length);
    }
  }, []);

  async function handleStopStream(seller, buyer) {
    stopStreamSelfBounty(window.ethereum, seller, buyer);
  }

  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

        <main className="sm:mt-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center rounded-lg bg-gray-800">

            <div className="mt-5 sm:mt-24 lg:mt-0 lg:col-span-4">
              <div className="sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden bg-gradient-to-tr from-purple-700 to-indigo-400">
                <div className="px-4 py-8 sm:px-10">
                  <div>
                    <h2 className="text-2xl font-bold text-white text-center">Your Account</h2>
                  </div>
                  <ul role="list" className="py-3">
                    <li className="text-white text-center">
                      Address :
                      {' '}
                      {accountAddress}
                    </li>
                    <li className="text-white text-center py-2">
                      {verified
                        ? (
                          <div>
                            You are a verified seller
                          </div>
                        )
                        : (<div>Register your account now</div>)}

                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <br />
            <div className="mt-5 sm:mt-24 lg:mt-0 lg:col-span-4">
              <div className="sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden bg-gradient-to-tr from-purple-700 to-indigo-400">
                <div className="px-4 py-8 sm:px-10">
                  <div>
                    <h2 className="text-2xl font-bold text-white text-center">
                      Your Streams :
                      {' '}
                      {totalStreamsStarted.length}
                    </h2>
                    <h2 className="text-md font-bold text-white text-center">Stop the stream here if the person never replied :(</h2>
                  </div>

                  {totalStreamsStarted.length === 0 ? (<p className="text-white text-center">You bought 0 addresses details</p>) : (
                    <ul role="list" className="space-y-3 py-2">
                      {totalStreamsStarted.map((item, itemIdx) => (
                        <li className="text-white text-center py-2 p-2 border-2 rounded-lg border-red-500">
                          <p className="text-md text-left">
                            Stream
                            {' '}
                            {itemIdx + 1}
                          </p>
                          <p className="text-xs py-2">{item}</p>
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={(e) => { e.preventDefault(); handleStopStream(item, accountAddress); }}
                          >
                            Stop Stream
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>

  );
}
