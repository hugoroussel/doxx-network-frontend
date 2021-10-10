/* eslint-disable jsx-a11y/no-redundant-roles */
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
import { ExternalLinkIcon, CheckIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Navbar from '../../components/navbar';
import { approveDAI, buySelfBounty, DNP } from '../../customHooks/contracts';
import { validateEmail } from '../../utils/utils';
/* This example requires Tailwind CSS v2.0+ */

export default function Register() {
  const pageRouter = useRouter();
  const [account, setAccount] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [bounty, setBounty] = useState({ address: '', amount: '', about: '' });
  const [validEmail, setValidEmail] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    if (!pageRouter.isReady) return;

    const { address } = pageRouter.query;
    setSellerAddress(address);
    const res = await axios.post(`${process.env.SERVER_IP}/bounty`, { address });
    console.log(res);
    setBounty(res.data[0]);
    if (window.ethereum === undefined) {
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    setAccount(account0);
  }, [pageRouter]);

  async function purchase() {
    const buyerEmail = document.getElementById('email').value;
    if (!validateEmail(buyerEmail)) {
      setValidEmail(false);
      return;
    }

    if (window.ethereum === undefined) {
      alert('Please install MetaMask to use this feature');
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    setAccount(account0);
    console.log(sellerAddress);

    const txHash = await buySelfBounty(window.ethereum, sellerAddress, account0);
    const payload = {
      sellerAddress, buyerAddress: account0, buyerEmail, txHash,
    };
    await axios.post(`${process.env.SERVER_IP}/buyself`, payload);
    setOpen(true);
  }

  const [progress, setProgress] = useState([
    {
      id: 'Step 1', name: 'Approve DAI', href: approveDAIhandler, status: 'current',
    },
    {
      id: 'Step 2', name: 'Buy Bounty', href: purchase, status: 'currentdzea',
    }]);

  async function approveDAIhandler() {
    if (window.ethereum === undefined) {
      alert('Please install MetaMask to use this feature');
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    const buyerEmail = document.getElementById('email').value;
    if (!validateEmail(buyerEmail)) {
      setValidEmail(false);
      return;
    }
    await approveDAI(bounty.amount, window.ethereum, account0);
    setProgress([
      {
        id: 'Step 1', name: 'Approve DAI', href: approveDAIhandler, status: 'done',
      },
      {
        id: 'Step 2', name: 'Buy Bounty', href: purchase, status: 'current',
      }]);
  }

  useEffect(async () => {
    if (!pageRouter.isReady) return;

    const { address } = pageRouter.query;
    setSellerAddress(address);
    const res = await axios.post(`${process.env.SERVER_IP}/bounty`, { address });
    console.log(res);
    setBounty(res.data[0]);
    if (window.ethereum === undefined) {
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    setAccount(account0);
  }, [pageRouter]);

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
                          href="https://twitter.com/intent/tweet?text=I just bought my first address details on Doxx.Network! Come check it out at doxx.network"
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
                  Let's Get You in Touch
                </div>
                <div className="pt-5">

                  <label htmlFor="email" className="block text-xl font-medium text-white y-4">
                    Purchase this Address Details :
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
                    This amount will be streamed during a week. You can stop it at any time.
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
                  {validEmail ? (
                    <p className="mt-2 text-md text-gray-50" id="email-description">
                      You will receive the address details at this mail.
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

                </div>

              </div>
            </div>

          </div>

        </main>
      </div>
    </div>

  );
}
