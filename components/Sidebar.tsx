import React from 'react'
import SideButton from './SideButton'
import {FireIcon, GiftIcon, SparklesIcon, WalletIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className='py-10 px-5 space-y-2'>
        <div className=''>
            <SideButton name="My Library" path="/MyLib">
                <WalletIcon className="w-6 h-6" />
            </SideButton>
        </div>
        <div className=''>
            <SideButton name="Wishlist" path="/MyLib">
                <GiftIcon className="w-6 h-6" />
            </SideButton>
        </div>
        <div className=''>
            <SideButton name="New Releases" path="/MyLib">
                <SparklesIcon className="w-6 h-6" />
            </SideButton>
        </div>
        <div className=''>
            <SideButton name="Most Popular" path="/MyLib">
                <FireIcon className="w-6 h-6" />
            </SideButton>
        </div>
    </div>
  )
}

export default Sidebar