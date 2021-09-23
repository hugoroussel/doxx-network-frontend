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
import Navbar from '../components/navbar.js';

export default function Register() {
  const [account, setAccount] = useState('');
  const [step2, setStep2] = useState(false);

  useEffect(async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account0 = accounts[0];
    setAccount(account0);
  }, []);

  async function submitInfosToServer() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let signature;
    try {
      // eslint-disable-next-line no-underscore-dangle
      signature = await signer.signMessage(account);
      console.log(signature);
    } catch (error) {
      console.log(error);
      alert('Signature refused');
    }
    const email = document.getElementById('email').value;
    const about = document.getElementById('about').value;
    const amount = document.getElementById('bounty').value;
    const data = {
      email, address: account, signature, about, amount,
    };
    await axios.post('http://localhost:8081/register', data);
    setStep2(true);
  }
  return (
    <div className="relative bg-purple-800 overflow-hidden h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
            <span className="md:block">Gm! Let's get you started.</span>
          </h1>
          <br />
          <br />
          <br />
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-white">
                  Registering
                </h3>
                <p className="mt-1 text-sm text-white">
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    Registering address :
                    {' '}
                    {account}
                    <br />
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                          1. Email
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="you@email.com"
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          We do not share your email with anyone except for those paying you.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        2. About (optional)
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="you@example.com"
                          defaultValue=""
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Why people should be interested in your on chain activity.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        3. Bounty Amount in DAI
                      </label>
                      <div className="mt-1">
                        <input
                          id="bounty"
                          min="10"
                          max="1000"
                          name="bounty"
                          type="number"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="10"
                          defaultValue=""
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        How much should it cost to contact you? Minimum is 10 DAI. Maximum is 1000 DAI.
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={(e) => { e.preventDefault(); submitInfosToServer(); }}
                    >
                      1. Signature of your address
                    </button>

                    &nbsp;&nbsp;
                    { step2 ? (
                      <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        2. Register the bounty
                      </button>
                    ) : (<></>) }
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}
