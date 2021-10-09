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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { BadgeCheckIcon } from '@heroicons/react/outline';
import {
  gAllSearchBountiesBuy, gAllSelfBountiesSold, gSelfBountyAmount,
  isApprovedSeller, gAllSelfBountiesSellerForBuyer,
  stopStreamSelfBounty,
} from '../customHooks/contracts.js';
import Navbar from '../components/navbar.js';
import { getAccount } from '../utils/ethereum';

export default function Register() {


  return (
    <div className="relative bg-gray-800 overflow-hidden h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar />

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
                      <button className="btn-secondary">
                        Click To Check Your Address
                      </button>
                    </center>

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
