// ---------------------------------------------------------------------
// <copyright file="Sidebar.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../components/ui/sidebar';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import { 
  FiHome,
  FiBriefcase, 
  FiUser, 
  FiBarChart2,
  FiLogOut,
  FiSettings,
  FiHelpCircle,
  FiSearch
} from 'react-icons/fi';

function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const fullName = user?.name || 'User';
  const profileImageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(fullName)}`;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/jobs', label: 'Job Posted', icon: FiBriefcase },
    { path: '/profile', label: 'Profile', icon: FiUser },
    { path: '/analysis', label: 'Customer Analysis', icon: FiBarChart2 },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        {/* png - dummy Logo of CargoFirst */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg shadow-sm">
        CF
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          CargoFirst
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Job Dashboard
        </p>
      </div>
    </div>
  </SidebarHeader>


      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                // onClick={}
                  asChild
                  isActive={active}
                  tooltip={item.label}
                >
                  <Link to={item.path}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t space-y-3">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900" title="Settings">
            <FiSettings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900" title="Get Help">
            <FiHelpCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900" title="Search">
            <FiSearch className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate('/profile')}>
          <img 
            src={profileImageUrl} 
            alt={fullName}
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{fullName}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || 'pradhyum999@gmail.com'}</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full flex justify-start mx-0 text-gray-600 hover:text-red-600 hover:bg-red-50 pr-0"
        >
          <p className='w-full flex justify-start items-center gap-3 py-1 rounded-lg'>

          <FiLogOut className="w-4 h-4 " />
          <span>
          Logout
          </span>
          </p>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
