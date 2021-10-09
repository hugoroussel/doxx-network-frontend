/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const navigation = [
  { name: 'My Account', href: '/account', current: true },
  { name: 'Explore', href: '/search', current: false },
  { name: 'Check my Address', href: '/check', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  return (
    <>
      <Popover>
        <nav
          className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex items-center flex-1 align-bottom">
            <div className="flex items-center justify-between w-full md:w-auto align-middle">
              <a href="/">
                <h1 className="text-white text-3xl">Doxx.Network</h1>
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-10 md:flex md:ml-10">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="pt-3 font-medium text-white hover:text-gray-300">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              Metamask
            </a>
          </div>
        </nav>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-md bg-gray-700 ring-1 ring-black ring-opacity-5 overflow-hidden align-bottom">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <a href="/">
                    <h1 className="text-white text-xl">Doxx.Network</h1>
                  </a>
                </div>
                <div className="-mr-2">
                  <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-400"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href="#"
                className="block w-full px-5 py-3 text-center font-medium text-white hover:text-gray-400"
              >
                Metamask
              </a>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
