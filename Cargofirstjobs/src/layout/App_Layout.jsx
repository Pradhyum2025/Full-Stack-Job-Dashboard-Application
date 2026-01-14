// ---------------------------------------------------------------------
// <copyright file="App_Layout.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import AppSidebar from '../component/Sidebar'
import { Separator } from '../components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '../components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-8 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center gap-2 px-4">
          
            <SidebarTrigger className="-ml-1 text-blue-500" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
