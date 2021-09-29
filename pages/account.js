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
import BigNumber from 'bignumber.js';
import { isApprovedSeller } from '../customHooks/contracts.js';
import Navbar from '../components/navbar.js';
import { getAccount } from '../utils/ethereum';

export default function Register() {
  const [noEthereum, setNoEthereum] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
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
    }
  }, []);

  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

        <main className="sm:mt-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center rounded-lg bg-gray-800">

            <div className="bg-gray-700 overflow-hidden rounded-lg">
              <div className="text-xl text-white text-center font-semibold">
                {accountAddress}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>

  );
}
