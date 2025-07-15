import { NavLink } from 'react-router-dom';

function NavigationBar() {
    return (
        <nav className="bg-black border-b border-red-600">
            <div className="max-w-screen-xl flex flex-nowrap items-center justify-between mx-auto p-2 md:p-4 overflow-x-auto space-x-2 md:space-x-4">
                <NavLink
                    to="/"
                    className="flex items-center flex-shrink-0 space-x-2 md:space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-xl md:text-2xl text-red-500 font-bold whitespace-nowrap">
                        GOALSIGHT
                    </span>
                </NavLink>
                <div className="flex-shrink-0">
                    <ul className="font-medium flex flex-nowrap gap-x-1 md:gap-x-8 items-center p-0 mt-0 border-0 rounded-lg bg-black">
                        <li className="flex-shrink-0">
                            <NavLink
                                to="/"
                                data-cy="nav-home"
                                end
                                className={({ isActive }) =>
                                    `px-2 md:px-3 py-1 md:py-2 text-sm md:text-md font-medium transition-colors duration-200 min-w-fit inline-block rounded-md
                                    ${isActive 
                                        ? 'bg-red-600 border border-red-500 text-white'
                                        : 'border border-transparent text-grey-300 hover:text-red-500'
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
                                    `px-2 md:px-3 py-1 md:py-2 text-sm md:text-md font-medium transition-colors duration-200 min-w-fit inline-block rounded-md
                                    ${isActive 
                                        ? 'bg-red-600 border border-red-500 text-white'
                                        : 'border border-transparent text-grey-300 hover:text-red-500'
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