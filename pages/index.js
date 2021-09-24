/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, Fragment, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import router from 'next/router';
import Blockies from 'react-blockies';
import Navbar from '../components/navbar.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [browserSupported, setBrowserSupported] = useState(true);
  const [address, setAddress] = useState('');
  const [feed, setFeed] = useState([{ about: '', address: '', amount: '' }]);

  useEffect(async () => {
    console.log('hello');
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      setBrowserSupported(false);
    }
    const feedres = await axios.get('http://localhost:8081/feed');
    setFeed(feedres.data.slice(0, 5));
  }, []);

  useEffect(() => {}, [feed]);

  async function handleClick(e) {
    e.preventDefault();
    // console.log('The link was clicked.', window.web3.version.network);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('provider', provider);
    const signer = provider.getSigner();
    console.log('block number', await provider.getBlockNumber());
    console.log('signer', signer);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    setAddress(account);
    let signature;
    try {
      // eslint-disable-next-line no-underscore-dangle
      signature = await signer.signMessage(account);
      console.log(signature);
    } catch (error) {
      console.log(error);
    }

    const payload = { address: account, signature };
    await axios.post('http://localhost:8081/verify', payload);
  }

  async function handleClick2(e) {
    e.preventDefault();
    await axios.get('http://localhost:8081/hello');
  }

  return (
    <div className="relative bg-purple-800 overflow-hidden h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true" />
        <div className="relative pt-6 pb-16 sm:pb-24">
          <main className="mt-16 sm:mt-24">
            <div className="mx-auto max-w-7xl">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                  <div>
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                      <span className="md:block">Put a Bounty On Any Ethereum Address.</span>
                      {' '}
                      <span className="text-green-400 md:block">Or Get Paid for yours.</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Monetize your on chain activity with Doxx. Meet cool NFT collectioners, traders and developers.
                    </p>

                    <div className="mt-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={(e) => { router.push('./register'); }}
                      >
                        Register My Addres
                      </button>
                    &nbsp;
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={(e) => { handleClick2(e); }}
                      >
                        Looking for an Address?
                      </button>
                    </div>
                    <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">Made with</p>
                    <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                      <div className="flex flex-wrap items-start justify-between">
                        <div className="flex justify-center px-1">
                          <img
                            className="h-9 sm:h-10"
                            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/xhwcodrzvkpktyzwfjjw"
                            alt="Superfluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                  <div className="bg-transparent from-gray-400 bg-opacity-1 bg-gradient-to-tr  sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                    <p className="text-xl text-white px-4 py-4">
                      Explore Latest Bounties
                    </p>
                    <ul role="list" className="divide-y divide-gray-200 px-6">
                      {feed.map((person) => (
                        <li
                          key={person.address}
                          className="py-4 flex "
                          onClick={() => { router.push(`/bounty/${person.address}`); }}
                        >
                          <Blockies
                            seed={person.address}
                            size={10}
                            scale={4}
                            color="#dfe"
                            bgColor="#9d03fc"
                            className="identicon"
                          />
                          <div className="ml-3 hover:bg-purple-300">
                            <p className="text-sm font-medium text-white">{person.address}</p>
                            <p className="text-sm text-white">{person.about}</p>
                            <p className="text-sm text-white">
                              {person.amount}
                              {' '}
                              DAI
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              </div>
            </div>

            <center className="text-white text-2xl">
              How does it work?
            </center>
          </main>
        </div>
      </div>
    </div>
  );
}
