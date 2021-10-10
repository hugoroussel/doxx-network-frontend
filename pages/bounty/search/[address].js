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
import Navbar from '../../../components/navbar';
import {
  approveDAI, buySelfBounty, DNP, getSignature, buySearchBounty,
} from '../../../customHooks/contracts';
import { validateEmail } from '../../../utils/utils';

export default function Register() {
  const pageRouter = useRouter();
  const [bounty, setBounty] = useState([]);
  const [account, setAccount] = useState('');
  const [validEmail, setValidEmail] = useState(true);

  const [progress, setProgress] = useState([
    {
      id: 'Step 1', name: 'Signature', href: handleSign, status: 'current',
    },
    {
      id: 'Step 2', name: ' Accept Bounty', href: purchase, status: 'done',
    }]);

  async function purchase() {
    console.log('Purchase');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    const buyerAddress = localStorage.getItem('buyer');
    await buySearchBounty(window.ethereum, account0, buyerAddress);
  }

  async function handleSign() {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
      setValidEmail(false);
      return;
    }

    if (window.ethereum === undefined) {
      alert('No Metamask Detected');
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];

    const buyerAddress = localStorage.getItem('buyer');
    console.log('buyer Address', buyerAddress);

    const signature = await getSignature(window.ethereum, account0);

    if (signature === '') {
      alert('Signature is empty');
      return;
    }

    const payload = {
      seller: account0, buyer: buyerAddress, signature, email,
    };

    console.log('payload', payload);

    axios.post('http://localhost:8081/buy_search', payload);
    setProgress([
      {
        id: 'Step 1', name: 'Signature', href: handleSign, status: 'done',
      },
      {
        id: 'Step 2', name: ' Accept Bounty', href: purchase, status: 'current',
      }]);
  }

  async function getBounty(buyer, seller) {
    const payload = { buyer, seller };
    const res = await axios.post('http://localhost:8081/get_search_bounty', payload);
    console.log('The bounty is', res.data);
    setBounty(res.data[res.data.length - 1]);
  }

  useEffect(async () => {
    if (!pageRouter.isReady) return;
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    setAccount(account0);
    if (pageRouter && pageRouter.query) {
      const { address } = pageRouter.query;
      console.log('address', address);
      console.log('We got the buyer and the seller', address, account0);
      localStorage.setItem('buyer', address);
      getBounty(address, account0);
    }
  }, [pageRouter]);

  useEffect(() => {}, [bounty]);

  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

        <main className="sm:mt-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center rounded-lg bg-gray-800">

            <div className="bg-gray-700 overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-xl text-white text-center font-bold">
                  Accept Bounty
                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-xl font-medium text-white y-4">
                    About :
                  </label>
                  <div className="mt-1">
                    <p className="mt-2 text-md text-gray-50" id="email-description">
                      {bounty.about}
                    </p>
                  </div>

                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-xl font-medium text-white y-4">
                    Amount :
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
                    This amount will be streamed during a week. The counterparty can stop it anytime if you do not reply to his messages!
                  </p>
                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-xl font-medium text-white y-4">
                    Email Address :
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
                      The bounty setter will receive this email. Please make sure it is correct and one you do not use on exchanges. Check it often, they will receive an email as soon as you accept the bounty!
                    </p>
                  ) : (
                    <p className="mt-2 text-md text-red-500" id="email-description">
                      Please enter a valid email
                    </p>

                  )}

                </div>
                <br />

                <div>

                  <nav aria-label="Progress">
                    <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                      {progress.map((step) => (
                        <li key={step.name} className="md:flex-1">
                          {step.status === 'current' ? (
                            <div
                              className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                              aria-current="step"
                            >
                              <span className="text-xs text-white font-semibold tracking-wide uppercase">{step.id}</span>
                              <br />
                              <button
                                type="button"
                                className="btn-primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  step.href();
                                }}
                              >
                                {step.name}
                              </button>
                            </div>
                          ) : (
                            <a
                              href={step.href}
                              className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                              <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                                {step.id}
                              </span>
                              <br />
                              <button
                                type="button"
                                className="btn-disabled"
                              >
                                {step.name}
                              </button>
                            </a>
                          )}
                        </li>
                      ))}
                    </ol>
                  </nav>

                  {/*! step2 ? (
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-t from-purple-700 to-indigo-400 hover:from-pink-500 hover:to-yellow-500 hover:bg-indigo-700"
                        onClick={(e) => { e.preventDefault(); handleSign(); }}
                      >
                        1. Signature
                        {' '}
                        {`${account.substring(0, 5)}...${account.substring(account.length - 4, account.length - 1)}`}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-t from-purple-700 to-indigo-400 hover:from-pink-500 hover:to-yellow-500 hover:bg-indigo-700"
                        onClick={(e) => { e.preventDefault(); purchase(); }}
                      >
                        2. Buy Bounty
                        {' '}
                      </button>
                    </>
                  ) */}
                </div>

              </div>
            </div>

          </div>

        </main>
      </div>
    </div>

  );
}
