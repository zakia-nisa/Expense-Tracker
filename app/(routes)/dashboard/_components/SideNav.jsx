"use client"

import React, { useEffect } from 'react'
import Image from "next/image"
import { LayoutGrid, PiggyBank, ReceiptText, Settings, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {
  const pathname = usePathname();

  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Expenses', icon: ReceiptText, path: '/dashboard/expenses' },
    { id: 4, name: 'Upgrades', icon: ShieldCheck, path: '/dashboard/upgrades' },
    { id: 5, name: 'Settings', icon: Settings, path: '/dashboard/settings' }
  ];

  useEffect(() => {
    console.log('Path changed:', pathname);
  }, [pathname]);

  return (
    <div className='h-screen p-10 border shadow-md'>
      <Image src={'/logo.svg'} alt='logo' width={160} height={100} />

      <div className='mt-10'>
        <ul>
          {menuList.map((menu) => (
            <li key={menu.id}>
              <Link href={menu.path}>
                <div className={`flex items-center gap-2 py-5 px-4 text-gray-500 font-medium mb-2
                  cursor-pointer rounded-md hover:text-black hover:bg-blue-100 transition-all
                  ${pathname === menu.path ? 'bg-blue-100 text-primary' : ''}`}>
                  <menu.icon />
                  {menu.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
