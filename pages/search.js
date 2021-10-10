/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-nested-ternary */
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
import { FaCrosshairs } from 'react-icons/fa';
import { isAddress } from '../utils/utils';
import {
  getSignature, approveDAI, registerSearchBounty,
} from '../customHooks/contracts.js';
import Navbar from '../components/navbar.js';
import { validateEmail } from '../utils/utils.js';

export default function Register() {
  const [account, setAccount] = useState('');
  const [step2, setStep2] = useState(false);
  const [validAmount, setValidAmount] = useState(true);
  const [noEthereum, setNoEthereum] = useState(false);

  const [progress, setProgress] = useState([
    {
      id: 'Step 1', name: 'Signature', href: sign, status: 'current',
    },
    {
      id: 'Step 2', name: 'Approve DAI', href: handleApproveDai, status: 'currentdzea',
    },
    {
      id: 'Step 3', name: 'Register', href: '#', status: 'currentdazd',
    }]);

  const [validEmail, setValidEmail] = useState(true);
  const [validSeller, setValidSeller] = useState(true);

  const validateAmount = (amount) => {
    const amountNum = new BigNumber(amount);
    return amountNum.gte(1) && amountNum.lte(10000);
  };

  useEffect(async () => {
    if (window.ethereum === undefined) {
      setNoEthereum(true);
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    setAccount(account0);
  }, []);

  async function handleRegisterSelfBounty() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    const seller = document.getElementById('seller').value;
    const amount = document.getElementById('bounty').value;
    console.log(seller, amount);
    registerSearchBounty(window.ethereum, amount, seller, account0);
  }

  async function handleApproveDai() {
    const amount = document.getElementById('bounty').value;
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    approveDAI(amount, window.ethereum, account0);
    setProgress([
      {
        id: 'Step 1', name: 'Signature', href: sign, status: 'done',
      },
      {
        id: 'Step 2', name: 'Approve DAI', href: handleApproveDai, status: 'done',
      },
      {
        id: 'Step 3', name: 'Register', href: handleRegisterSelfBounty, status: 'current',
      }]);
  }

  async function sign() {
    console.log('Ethereum address', account);
    if (window.ethereum === undefined) {
      alert('No Metamask Detected');
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    console.log('Ethereum address', account0);
    setAccount(account0);

    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
      setValidEmail(false);
      return;
    }
    const seller = document.getElementById('seller').value;
    console.log(isAddress(seller));
    if (!isAddress(seller)) {
      setValidSeller(false);
      return;
    }
    const amount = document.getElementById('bounty').value;
    if (!validateAmount(amount)) {
      console.log('invalid amount');
      setValidAmount(false);
      return;
    }
    const about = document.getElementById('about').value;

    const signature = await getSignature(window.ethereum, account0);

    const payload = {
      email, seller, amount, about, buyer: account0, signature,
    };

    const res = await axios.post('http://localhost:8081/register_search', payload);
    console.log(res);

    setProgress([
      {
        id: 'Step 1', name: 'Signature', href: sign, status: 'done',
      },
      {
        id: 'Step 2', name: 'Approve DAI', href: handleApproveDai, status: 'current',
      },
      {
        id: 'Step 3', name: 'Register', href: '#', status: 'done',
      }]);
  }

  useEffect(() => {}, [progress]);

  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

        <main className="sm:mt-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center rounded-lg bg-gray-800">

            <div className="bg-gray-700 overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-xl text-white text-center font-bold items-top">
                  <FaCrosshairs className="h-10 inline pr-1 pb-1 items-top" />
                  <p className="inline items-top">
                    Looking for an Address?
                  </p>
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
                    2. Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="seller"
                      id="seller"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-9/12 h-10 sm:text-sm border-gray-300 rounded-md px-4"
                      placeholder="0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
                    />
                  </div>
                  {validSeller ? (
                    <p className="mt-2 text-md text-gray-50" id="email-description">
                      The address you want to contact.
                      {' '}
                    </p>
                  ) : (
                    <p className="mt-2 text-md text-red-500 font-semibold" id="email-description">
                      This does not look like a valid Ethereum address.
                      {' '}
                    </p>
                  )}

                </div>

                <div className="pt-5">
                  <label htmlFor="email" className="block text-lg font-medium text-white y-4">
                    3. Bounty Amount
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="bounty"
                      id="bounty"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-7/12 h-10 sm:text-sm border-gray-300 rounded-md px-4"
                      placeholder="10"
                      min="1"
                      max="10000"
                      aria-describedby="email-description"
                    />
                  </div>
                  <p className="mt-2 text-md text-gray-50" id="email-description">
                    How much DAI are you willing to pay to contact this address?
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
                      placeholder="Saw your trades on the Polygon chain, would be interested to have a talk!"
                    />
                  </div>
                  <p className="mt-2 text-md text-gray-50" id="email-description">
                    Why do you want to contact this address?
                  </p>
                </div>
                <br />
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
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>

  );
}
