/* eslint-disable no-await-in-loop */
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
import React, { useState } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import router from 'next/router';
import Navbar from '../components/navbar.js';
import {
  gAllSelfBountiesSellerForBuyer,
  getAllAvailableBounties, getSearchBountyAmount,
} from '../customHooks/contracts.js';

export default function Check() {
  const [bounties, setBounties] = useState([]);
  const [bountiesAmounts, setBountiesAmounts] = useState([]);
  const [account, setAccount] = useState('');
  const [open, setOpen] = useState(false);
  const [buyer, setBuyer] = useState('');
  const [amount, setAmount] = useState('');
  const [about, setAbout] = useState('');

  async function getSearchBounties() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    const payload = { address: account0 };
    const res = await axios.post('http://localhost:8081/search_bounties', payload);
    console.log('this is the data', res.data);
    setBounties(res.data);
  }

  async function handleBuy(buyer, about, amount) {
    setBuyer(buyer);
    setAbout(about);
    setAmount(amount);
    setOpen(true);
  }

  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />
        {/* POPUP CODE */}
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
                        Claiming Bounty
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Bounty from
                          {' '}
                          {buyer}
                        </p>
                        <div className="text-md py-2 inline-block">
                          Price :
                          {' '}
                          {0}
                          <img
                            className="h-6 px-2 pb-1 inline-block"
                            src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013"
                            alt="dai logo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* POPUP CODE */}

        <main className="sm:mt-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center rounded-lg bg-gray-800">

            <div className="mt-5 sm:mt-24 lg:mt-0 lg:col-span-4">
              <div className="sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden bg-gradient-to-tr from-purple-700 to-indigo-400">
                <div className="px-4 py-8 sm:px-10">
                  <div>
                    <h2 className="text-2xl font-bold text-white text-center">Your Account</h2>
                  </div>
                  <div>
                    <br />
                    <center>
                      <button
                        className="btn-secondary"
                        onClick={(e) => { e.preventDefault(); getSearchBounties(); }}
                      >
                        Click To Check Your Address
                      </button>
                    </center>

                    {bounties.length === 0 ? (<p className="text-white text-center" />) : (
                      <ul role="list" className="space-y-3 py-2">
                        {bounties.map((item, itemIdx) => (
                          <li className="text-white text-center py-2 p-2 border-2 rounded-lg border-red-500">
                            <p className="text-md text-left">
                              Bounty
                              {' '}
                              {itemIdx + 1}
                            </p>
                            <p className="text-md py-2">
                              About :
                              {' '}
                              {item.about}
                            </p>
                            <div className="text-md py-2 inline-block">
                              Price :
                              {' '}
                              {item.amount}
                              <img
                                className="h-6 px-2 pb-1 inline-block"
                                src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013"
                                alt="dai logo"
                              />
                            </div>

                            <p className="text-xs py-2 inline-block">
                              Buyer :
                              {' '}
                              {item.buyer}
                            </p>
                            <button
                              className="btn-secondary"
                              onClick={(e) => { e.preventDefault(); router.push(`/bounty/search/${item.buyer}`); }}
                            >
                              Buy
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

  );
}
