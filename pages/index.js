import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  AnnotationIcon,
  ChatAlt2Icon,
  InboxIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

const solutions = [
  {
    name: 'Inbox',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: InboxIcon,
  },
  {
    name: 'Messaging',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: AnnotationIcon,
  },
  { name: 'Live Chat', description: "Your customers' data will be safe and secure.", href: '#', icon: ChatAlt2Icon },
  {
    name: 'Knowledge Base',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: QuestionMarkCircleIcon,
  },
]
const navigation = [
  { name: 'Pricing', href: '#' },
  { name: 'Partners', href: '#' },
  { name: 'Company', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Home() {
  return (
      <div className="min-h-screen bg-white">
        <header>
          <Popover className="relative bg-white">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                  />
                </a>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                      >
                        <span>Solutions</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>
  
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                              {solutions.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white sm:h-12 sm:w-12">
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
  
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="text-base font-medium text-gray-500 hover:text-gray-900">
                    {item.name}
                  </a>
                ))}
              </Popover.Group>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <a href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  Sign in
                </a>
                <a
                  href="#"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </a>
              </div>
            </div>
  
            <Transition
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                          alt="Workflow"
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid grid-cols-1 gap-7">
                        {solutions.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                              <item.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <div className="py-6 px-5">
                    <div className="grid grid-cols-2 gap-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-gray-900 hover:text-gray-700"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </a>
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?
                        <a href="#" className="text-gray-900">
                          Sign in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </header>
  
        <main>
          <div>
            {/* Hero card */}
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      className="h-full w-full object-cover"
                      // src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                      // src="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5vbnltb3VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                      src="https://media.istockphoto.com/photos/world-map-global-business-global-map-blockchain-picture-id1254598358?b=1&k=20&m=1254598358&s=170667a&w=0&h=W7gEfaIjSQ9XZfT9o2APdF3mzvb5yLKmlqI1fpuEL58="
                      alt="People working on laptops"
                    />
                    <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
                  </div>
                  <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                      <span className="block text-white">Doxx.Network</span>
                      <span className="block text-indigo-200">Where pseudonymity ends</span>
                    </h1>
                    <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                     Monetize your on chain identity with Doxx.Network. Discover and meet interesting traders, NFT collectionners etc.
                    </p>
                    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                      <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                        <a
                          href="#"
                          className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                        >
                          Get started
                        </a>
                        <a
                          href="#"
                          className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                        >
                          Live demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Logo cloud */}
            <div className="bg-gray-100">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                  Built with..
                </p>
                <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                  <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img className="h-12" src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=013" alt="Tuple" />
                  </div>
                  <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img className="h-12" src="data:image/png;base64,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" alt="Mirage" />
                  </div>
                  <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img
                      className="h-12"
                      src="https://gblobscdn.gitbook.com/spaces%2F-MKEcOOf_qoYMObicyRu%2Favatar-1603361891616.png?alt=media"
                      alt="StaticKit"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                    <img
                      className="h-12"
                      src="https://cryptologos.cc/logos/aave-aave-logo.png" 
                      alt="Transistor"
                    />
                  </div>
                  <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                    <img
                      className="h-12"
                      src="data:image/png;base64,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"
                      alt="Workcation"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* More main page content here... */}
        </main>
      </div>
  )
}
