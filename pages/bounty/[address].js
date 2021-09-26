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
import Navbar from '../../components/navbar.js';
import { approveDAI, buySelfBounty } from '../../customHooks/contracts.js';

const DNP = '0xA70beb9330F62968b71522da6D63df78ADDF54c9';

export default function Register() {
  const pageRouter = useRouter();
  const [account, setAccount] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [step2, setStep2] = useState(false);
  const [bounty, setBounty] = useState({ address: '', amount: '', about: '' });

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
    <div className="relative bg-purple-800 overflow-hidden h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
            <span className="md:block">Start the conversation</span>
          </h1>
          <br />
          <br />
          <br />
          <div className="flex bg-purple-300 px-4 py-4">
            <div className="mr-4 flex-shrink-0 self-center">
              <Blockies
                seed={sellerAddress}
                size={10}
                scale={4}
                color="#dfe"
                bgColor="#9d03fc"
                className="identicon"
              />
            </div>
            <div>
              <h4 className="text-lg font-bold">{sellerAddress}</h4>
              <p className="mt-1">
                {bounty.about}
              </p>
              <p className="mt-1">
                Price
                {' '}
                {bounty.amount}
                {' '}
                DAI
              </p>
            </div>
          </div>
          <br />

          <div className="flex bg-purple-300 px-4 py-4">
            <div className="mr-4 self-center" />
            <div>
              <h4 className="text-lg font-bold">Enter email address.</h4>
              <h4 className="text-s">
                Enter the email address on which you would like to receive this address contact information.
                <br />
                {' '}
                As soon as you start streaming, they email address will be sent to you.
              </h4>
              <br />
              <div className="mt-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
                <br />
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>

          <br />
          <div className="flex bg-purple-300 px-4 py-4">
            <center>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={(e) => { e.preventDefault(); approveDAIhandler(); }}
              >
                1. Approve DAI
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={(e) => { e.preventDefault(); purchase(); }}
              >
                2. Start Streaming
              </button>
            </center>
          </div>
        </div>

      </div>
    </div>

  );
}
