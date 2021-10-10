/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-redundant-roles */
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
import router from 'next/router';
import BigNumber from 'bignumber.js';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { getSignature, registerSelfBounty } from '../customHooks/contracts.js';
import Navbar from '../components/navbar.js';
import { validateEmail } from '../utils/utils.js';

export default function Register() {
  const [account, setAccount] = useState('');
  const [step2, setStep2] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validAmount, setValidAmount] = useState(true);
  const [noEthereum, setNoEthereum] = useState(false);
  const [open, setOpen] = useState(false);

  const [progress, setProgress] = useState([
    {
      id: 'Step 1', name: 'Signature', href: submitInfosToServer, status: 'current',
    },
    {
      id: 'Step 2', name: ' Register Bounty', href: registerBountyAction, status: 'currentdzea',
    }]);

  // validity that amount is between 10 and 1000
  const validateAmount = (amount) => {
    const amountNum = new BigNumber(amount);
    return amountNum.gte(10) && amountNum.lte(1000);
  };

  async function submitInfosToServer() {
    if (noEthereum) {
      alert('No Metamask Detected');
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    console.log(account0);
    setAccount(account0);
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
    const signature = await getSignature(window.ethereum, account0);
    if (signature === '') {
      alert('Signature Error');
      return;
    }
    const about = document.getElementById('about').value;
    const data = {
      email, address: account0, signature, about, amount,
    };
    await axios.post('http://localhost:8081/registerself', data);
    setStep2(true);
    setProgress([
      {
        id: 'Step 1', name: 'Signature', href: submitInfosToServer, status: 'done',
      },
      {
        id: 'Step 2', name: 'Approve DAI', href: registerBountyAction, status: 'current',
      }]);
  }

  async function registerBountyAction() {
    const bounty = document.getElementById('bounty').value;
    console.log(bounty);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    console.log(account0);
    await registerSelfBounty(bounty, window.ethereum, account0);
    setOpen(true);
  }

  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                  <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Registering Successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You will receive a confirmation email shortly.
                        </p>
                        <br />

                        <a
                          className="twitter-share-button"
                          href="https://twitter.com/intent/tweet?text=I just shared my address on Doxx.Network! Come check it out at doxx.network"
                          data-size="large"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Tweet About It!
                        </a>
                        <img
                          className="h-6 inline-block px-2 pb-1"
                          src="https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Twitter_bird_logo_2012.svg/944px-Twitter_bird_logo_2012.svg.png"
                          alt="twitter"
                        />

                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => router.push('/')}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

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
