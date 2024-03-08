import { NavLink } from "react-router-dom"

const tabs = [
    { name: 'Iniciar sesion', href: '/login' },
    { name: 'Registrarse', href: '/register' },

]


export default function Tab() {
    return (
        <div>
            <div className="w-full">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex justify-center" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.name}
                                to={tab.href}
                                className={({ isActive }) =>
                                    `w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium transition  duration-700 ease-in-out ${isActive
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
