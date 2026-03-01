import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    ProfileHeader,
    ProfileStats,
    PersonalInfoCard,
    AddressCard,
    QuickLinksCard,
    SecurityCard,
} from '../components/profile';
import { MOCK_USER } from '../data/mockUser';

/* ═════════════════════ MAIN PAGE ═════════════════════ */

const UserProfilePage = () => {
    const user = MOCK_USER; // TODO: replace with auth context

    return (
        <div className="min-h-screen bg-[#f5f5f7] font-sans">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* Profile header */}
                <ProfileHeader user={user} />

                {/* Stats */}
                <div className="mt-6">
                    <ProfileStats stats={user.stats} />
                </div>

                {/* Main content grid */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Quick links */}
                    <div className="lg:col-span-1">
                        <QuickLinksCard />
                    </div>

                    {/* Right: Info cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <PersonalInfoCard user={user} />
                        <AddressCard address={user.address} />
                        <SecurityCard />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UserProfilePage;
