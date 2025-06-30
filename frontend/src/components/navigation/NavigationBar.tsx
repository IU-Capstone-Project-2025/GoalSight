import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
    return (
        <nav className="bg-black border-b border-red-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl text-red-500 font-bold whitespace-nowrap">
                        ⚽ FOOTBALL LEAGUE
                    </span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black">
                        <li>
                            <NavLink
                                to="/"
                                data-cy="nav-home"
                                end
                                className={({ isActive }) =>
                                    `text-grey-300 hover:text-red-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-red-600 border border-red-500'
                                            : ''
                                    }`
                                }
                            >
                                HOME
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/tournaments"
                                data-cy="nav-tournament"
                                className={({ isActive }) =>
                                    `text-grey-300 hover:text-red-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-red-600 border border-red-500'
                                            : ''
                                    }`
                                }
                            >
                                TOURNAMENT
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `text-grey-300 hover:text-red-500 px-3 py-2 rounded-md text-md font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-red-600 border border-red-500'
                                            : ''
                                    }`
                                }
                            >
                                ABOUT US
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;