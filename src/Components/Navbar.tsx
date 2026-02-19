import { useLocation } from 'react-router-dom';
import PillNav from './HeaderStyle/PillNav';
import { GiGraduateCap } from 'react-icons/gi';

const Navbar = () => {
    const location = useLocation();

    return (
        <div className="fixed top-6 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
            <div className="pointer-events-auto">
                <PillNav
                    logoComponent={<GiGraduateCap size={22} />}
                    items={[
                        { label: 'Home', href: '/Home' },
                        { label: 'Notice', href: '/notices' },
                        { label: 'Complaint', href: '/complaint' },
                    ]}
                    activeHref={location.pathname}
                />
            </div>
        </div>
    );
};

export default Navbar;