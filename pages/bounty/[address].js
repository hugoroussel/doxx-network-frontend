/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import Blockies from 'react-blockies';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import Navbar from '../../components/navbar.js';
import { approveDAI, buySelfBounty } from '../../customHooks/contracts.js';

const DNP = '0xA70beb9330F62968b71522da6D63df78ADDF54c9';

export default function Register() {
  const pageRouter = useRouter();
  const [account, setAccount] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [step2, setStep2] = useState(false);
  const [bounty, setBounty] = useState({ address: '0x2928d49c13E9035e899d4270C8A4db70b746B3e8', amount: '120', about: 'I have a sick collection of NFTs, checkout my opensea @coolcats. Open to talk about next collections' });

  async function approveDAIhandler() {
    console.log(bounty, typeof bounty.amount);
    approveDAI(bounty.amount, window.ethereum, account);
  }

  async function purchase() {
    const buyerEmail = document.getElementById('email').value;
    const txHash = await buySelfBounty(window.ethereum, sellerAddress, account);
    console.log('here is the tx hash', txHash);
    const payload = {
      sellerAddress, buyerAddress: account, buyerEmail, txHash,
    };
    const res = await axios.post('http://localhost:8081/buyself', payload);
    console.log('here is the response', res);
  }

  useEffect(async () => {
    const { address } = pageRouter.query;
    setSellerAddress(address);

    console.log('Hello this is the address', address);
    const res = await axios.post('http://localhost:8081/bounty', { address });
    console.log('Hello this is the response', res);
    setBounty(res.data[0]);
    if (window.ethereum === undefined) {
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    setAccount(account0);
  }, []);

  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

        <main className="sm:mt-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center rounded-lg bg-gray-800">

            <div className="bg-gray-700 overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-xl text-white text-center font-bold">
                  Let's Get You in Touch
                </div>
                <div className="pt-5">

                  <label htmlFor="email" className="block text-xl font-medium text-white y-4">
                    The address you are purchasing
                  </label>
                  <div className="pt-5 text-white text-lg align-items-center text-center">
                    <Blockies
                      seed={sellerAddress}
                      size={10}
                      scale={5}
                      color="#dfe"
                      bgColor="#9d03fc"
                      className="identicon inline-block mr-4 "
                    />
                    <br />
                    <a
                      href={`https://zapper.fi/account/${sellerAddress}`}
                      className="text-white hover:text-gray-300 inline-block pt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {sellerAddress}
                      &nbsp;
                      <ExternalLinkIcon className="h-8 inline-block pb-2 text-white" />
                    </a>

                  </div>
                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-xl font-medium text-white y-4">
                    2. About
                  </label>
                  <div className="mt-1">
                    <p className="mt-2 text-md text-gray-50" id="email-description">
                      {bounty.about}
                    </p>
                  </div>

                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-xl font-medium text-white y-4">
                    3. Amount
                  </label>
                  <div className="mt-1 align-top">
                    <p className="mt-2 text-md inline-block text-gray-50" id="email-description">
                      {bounty.amount}
                      {' '}
                      DAI
                    </p>
                    &nbsp;&nbsp;&nbsp;
                    <img
                      className="h-5 inline-block align-middle"
                      src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013"
                      alt="dai logo"
                    />
                  </div>
                  <p className="mt-2 text-md text-gray-50" id="email-description">
                    This amount will be streamed during a week. You can withdraw it at any time during this period.
                  </p>
                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-xl font-medium text-white y-4">
                    4. Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-7/12 h-10 sm:text-sm border-gray-300 rounded-md px-4"
                      placeholder="you@example.com"
                      aria-describedby="email-description"
                    />
                  </div>
                  <p className="mt-2 text-md text-gray-50" id="email-description">
                    You will receive the bounty details in your email.
                  </p>
                </div>
                <br />

              </div>
            </div>

          </div>

        </main>
      </div>
    </div>

  );
}
