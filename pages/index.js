/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blockies from 'react-blockies';
import router from 'next/router';
import {
  RefreshIcon, CalendarIcon, LoginIcon, TruckIcon, SearchCircleIcon, CurrencyDollarIcon,
} from '@heroicons/react/outline';
import Navbar from '../components/navbar.js';

const perks = [
  { name: '10-year all-inclusive warranty', description: 'We’ll replace it with a new one', icon: CalendarIcon },
  { name: 'Free shipping on returns', description: 'Send it back for free', icon: RefreshIcon },
  { name: 'Free, contactless delivery', description: 'The shipping is on us', icon: TruckIcon },
];

export default function Home() {
  const [browserSupported, setBrowserSupported] = useState(true);
  const [feed, setFeed] = useState([
    { address: '0x2928d49c13E9035e899d4270C8A4db70b746B3e8', amount: '120', about: 'I have a sick collection of NFTs, checkout my opensea @coolcats. Open to talk about next collections' },
  ]);

  useEffect(async () => {
    console.log('hello');
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      setBrowserSupported(false);
    }
    try {
      const feedres = await axios.get(`${process.env.SERVER_IP}/feed`);
      setFeed(feedres.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {}, [feed]);

  return (
    <div className="relative bg-gray-800 overflow-hidden h-full">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

        <main className="sm:mt-24">
          <div className="mx-auto max-w-7xl">

            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

              <div className="px-4 sm:px-6 sm:text md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <div>
                  <h1 className="text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl ">
                    <span className="md:block">Contact Any Ethereum Address.</span>
                    {' '}
                    <span className="text-indigo-400 md:block">Or Get Paid for Yours.</span>
                  </h1>
                  <p className="text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Meet cool traders, developers and NFT collectionners. Verify your email and ethereum address to get paid. All payments are made
                    trustlessly on Polygon using Superfluid.
                  </p>
                  <div>
                    <br />
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-purple-700 to-indigo-400  hover:from-pink-500 hover:to-yellow-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => { router.push('/register'); }}
                    >
                      Register for Free
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-t from-purple-700 to-indigo-400 hover:from-pink-500 hover:to-yellow-500 hover:bg-indigo-700"
                      onClick={() => { router.push('/search'); }}
                    >
                      Put a Bounty
                    </button>
                  </div>
                  <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">Made With</p>
                  <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">

                    <div className="flex flex-wrap items-start justify-between y-1">
                      <div className="flex justify-center bg-white rounded-md p-1">
                        <img
                          className="h-14 sm:h-10 "
                          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/xhwcodrzvkpktyzwfjjw"
                          alt="Tuple"
                        />
                      </div>
                      <div className="flex justify-center bg-white rounded-md p-1">
                        <img
                          className="h-11 sm:h-10 "
                          src="https://polygon.technology/wp-content/uploads/2021/07/polygon-logo.svg"
                        />
                      </div>
                      <div className="flex justify-center px-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden bg-gradient-to-tr from-purple-700 to-indigo-400">
                  <div className="px-4 py-8 sm:px-10">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-white">Explore or Contact The Latest Bounties</h2>
                    </div>
                    <ul role="list" className="space-y-3 ">
                      {feed.slice(0, 4).map((item) => (
                        <li
                          key={item.address}
                          className="bg-white shadow overflow-hidden rounded-md px-6 py-4 border-2 hover:border-indigo-400 border-dashed"
                          onClick={(e) => { e.preventDefault(); router.push(`/bounty/${item.address}`); }}
                        >
                          <div className="sm:flex">
                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4 pt-2">
                              <Blockies
                                seed={item.address}
                                size={10}
                                scale={5}
                                color="#dfe"
                                bgColor="#9d03fc"
                                className="identicon"
                              />
                              <div className="align-items-center pt-2">
                                <p className="inline-block align-middle pr-2 font-bold">
                                  {item.amount}
                                </p>
                                <img
                                  className="h-5 inline-block align-middle"
                                  src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013"
                                  alt="dai logo"
                                />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold">{`${item.address.substring(0, 14)}...${item.address.substring(item.address.length - 14, item.address.length - 1)}`}</h4>
                              <p className="mt-1 text-xs">
                                {item.about}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <br />
            <br />
            <br />
            <br />

            <div className="bg-gray-800">
              <h2 className="sr-only">How does it work?</h2>
              <div className="max-w-7xl mx-auto divide-y divide-gray-200 lg:py-8 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x">
                <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
                  <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
                    <div className="ml-4 flex-auto flex flex-col-reverse">
                      <h3 className="font-medium text-white">Input your email, your bounty amount and sign your Ethereum Address. </h3>
                      <p className="text-xl text-gray-100">Register your Address</p>
                    </div>
                    <LoginIcon
                      className="flex-shrink-0 h-12 w-12 text-white"
                    />
                  </div>
                </div>
                <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
                  <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
                    <div className="ml-4 flex-auto flex flex-col-reverse">
                      <h3 className="font-medium text-white">Put a bounty on a specific address to try to find them.</h3>
                      <p className="text-xl text-gray-100">Search</p>
                    </div>
                    <SearchCircleIcon
                      className="flex-shrink-0 h-12 w-12 text-white"
                    />
                  </div>
                </div>
                <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
                  <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
                    <div className="ml-4 flex-auto flex flex-col-reverse">
                      <h3 className="font-medium text-white">If a bounty is claimed a DAI stream will automatically start.</h3>
                      <p className="text-xl text-gray-100">Get Paid</p>
                    </div>
                    <CurrencyDollarIcon
                      className="flex-shrink-0 h-12 w-12 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
