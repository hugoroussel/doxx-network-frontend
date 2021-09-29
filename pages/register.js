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
import { getSignature, registerSelfBounty } from '../customHooks/contracts.js';
import Navbar from '../components/navbar.js';
import { validateEmail } from '../utils/utils.js';

export default function Register() {
  const [account, setAccount] = useState('');
  const [step2, setStep2] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validAmount, setValidAmount] = useState(true);
  const [noEthereum, setNoEthereum] = useState(false);

  // validity that amount is between 10 and 1000
  const validateAmount = (amount) => {
    const amountNum = new BigNumber(amount);
    return amountNum.gte(10) && amountNum.lte(1000);
  };

  useEffect(async () => {
    if (window.ethereum === undefined) {
      setNoEthereum(true);
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    setAccount(account0);
    localStorage.setItem('eth_address', account0);
  }, []);

  async function submitInfosToServer() {
    if (noEthereum) {
      alert('No Metamask Detected');
      return;
    }
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
      setValidEmail(false);
      return;
    }
    const amount = document.getElementById('bounty').value;
    if (!validateAmount(amount)) {
      setValidAmount(false);
      return;
    }
    const signature = await getSignature(window.ethereum, account);
    localStorage.setItem('signature', signature);
    const about = document.getElementById('about').value;
    const data = {
      email, address: account, signature, about, amount,
    };
    await axios.post('http://localhost:8081/registerself', data);
    setStep2(true);
  }

  async function registerBountyAction() {
    const bounty = document.getElementById('bounty').value;
    await registerSelfBounty(bounty, window.ethereum, account);
  }

  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

        <main className="sm:mt-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center rounded-lg bg-gray-800">

            <div className="bg-gray-700 overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-xl text-white text-center font-bold">
                  Register your Account into the Bounty System
                </div>
                <div className="pt-5">
                  <label htmlFor="email" className="block text-lg font-medium text-white y-4">
                    1. Your Email
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
                  {validEmail ? (
                    <p className="mt-2 text-md text-gray-50" id="email-description">
                      Use an email address that you check often. We advice you to not use the one you use for exchanges.
                    </p>
                  ) : (
                    <p className="mt-2 text-md text-red-500 font-semibold" id="email-description">
                      Please use a valid email address. Otherwise the buyer will not be able to contact you and stop the stream.
                    </p>
                  )}

                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-lg font-medium text-white y-4">
                    2. Bounty Amount
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="bounty"
                      id="bounty"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-7/12 h-10 sm:text-sm border-gray-300 rounded-md px-4"
                      placeholder="10"
                      min="10"
                      max="1000"
                      aria-describedby="email-description"
                    />
                  </div>
                  <p className="mt-2 text-md text-gray-50" id="email-description">
                    How much DAI contact you and reveal your email address? (1 DAI = 1 DAI)
                  </p>
                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-lg font-medium text-white y-4">
                    3. About (optional)
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md px-4 py-2"
                      placeholder="I have a sick collection of NFTs, checkout my opensea @coolcats. Open to talk about next collections"
                    />
                  </div>
                  <p className="mt-2 text-md text-gray-50" id="email-description">
                    Some information on why people would be interested in contacting you.
                  </p>
                </div>
                <br />
                {!step2 ? (
                  <>
                    {' '}
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-t from-purple-700 to-indigo-400 hover:from-pink-500 hover:to-yellow-500 hover:bg-indigo-700"
                      onClick={(e) => { e.preventDefault(); submitInfosToServer(); }}
                    >
                      1. Signature
                      {' '}
                      {`${account.substring(0, 5)}...${account.substring(account.length - 4, account.length - 1)}`}
                    </button>
                  </>
                )
                  : (
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-t hover:from-purple-700 hover:to-indigo-400 from-pink-500 to-yellow-500"
                        onClick={(e) => { e.preventDefault(); registerBountyAction(); }}
                      >
                        2. Register Bounty
                      </button>
                    </>
                  )}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>

  );
}
