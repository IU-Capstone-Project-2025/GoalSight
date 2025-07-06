import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
    return (
        <nav className="bg-black border-b border-red-600">
            <div className="max-w-screen-xl flex flex-nowrap items-center justify-between mx-auto p-4 overflow-x-auto space-x-4">
                <a className="flex items-center flex-shrink-0 space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl text-red-500 font-bold whitespace-nowrap">
                        ⚽ GOALSIGHT
                    </span>
                </a>
                <div className="flex-shrink-0">
                    <ul className="font-medium flex flex-nowrap gap-x-2 md:gap-x-8 items-center p-0 mt-0 border-0 rounded-lg bg-black">
                        <li className="flex-shrink-0">
                            <NavLink
                                to="/"
                                data-cy="nav-home"
                                end
                                className={({ isActive }) =>
                                    `text-grey-300 hover:text-red-500 px-3 py-2 text-md font-medium transition-colors duration-200 min-w-fit inline-block rounded-md ${
                                        isActive
                                            ? 'bg-red-600 border border-red-500 text-white'
                                            : 'border border-transparent'
                                    }`
                                }
                            >
                                HOME
                            </NavLink>
                        </li>
                        <li className="flex-shrink-0">
                            <NavLink
                                to="/tournaments"
                                data-cy="nav-tournament"
                                className={({ isActive }) =>
                                    `text-grey-300 hover:text-red-500 px-3 py-2 text-md font-medium transition-colors duration-200 min-w-fit inline-block rounded-md ${
                                        isActive
                                            ? 'bg-red-600 border border-red-500 text-white'
                                            : 'border border-transparent'
                                    }`
                                }
                            >
                                TOURNAMENT
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;