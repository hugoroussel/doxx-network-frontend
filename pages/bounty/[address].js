/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import router, { useRouter } from 'next/router';
import Blockies from 'react-blockies';
import Navbar from '../../components/navbar.js';
import erc20 from '../../abis/erc20';

const DNP = '0xA24440D66941244270272658625Fa4df5A363477';

export default function Register() {
  const [account, setAccount] = useState('');
  const [step2, setStep2] = useState(false);
  const [bounty, setBounty] = useState({ address: '', amount: '', about: '' });

  const pageRouter = useRouter();
  const { address } = pageRouter.query;

  // TODOs
  async function saveEmail() {

  }

  async function approveDAI() {

  }

  async function payBounty() {

  }

  useEffect(async () => {
    console.log('Hello this is the address', address);
    const res = await axios.post('http://localhost:8081/bounty', { address });
    console.log('Hello this is the response', res);
    setBounty(res.data[0]);
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
                seed={address}
                size={10}
                scale={4}
                color="#dfe"
                bgColor="#9d03fc"
                className="identicon"
              />
            </div>
            <div>
              <h4 className="text-lg font-bold">{address}</h4>
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
              <h4 className="text-lg font-bold">Enter the email you wish to receive the address information.</h4>
              <h4 className="text-s">You will receiver the information of this email as soon as you pay.</h4>
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
              >
                Approve DAI
              </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Start Streaming
              </button>
            </center>
          </div>
        </div>

      </div>
    </div>

  );
}
