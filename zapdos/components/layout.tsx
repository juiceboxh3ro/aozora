
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import MobileSidebar from './mobileSidebar'
import StaticSidebar from './staticSidebar'
import UserAvatar from './userAvatar'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <MobileSidebar navigation={navigation} />
      <StaticSidebar navigation={navigation} />

      <div className="flex flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-slate-600 shadow">
          <div className="flex flex-1 justify-between px-4">
            <div className="w-full flex items-center justify-end">
              {/* <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button> */}
              <UserAvatar />
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6 mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
