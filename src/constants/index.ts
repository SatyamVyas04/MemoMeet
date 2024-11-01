import {
    HomeIcon,
    CalendarDaysIcon,
    DocumentDuplicateIcon,
    VideoCameraIcon,
    UserGroupIcon,
    PlusIcon,
    RocketLaunchIcon,
} from '@heroicons/react/24/outline'

export const sidebarLinks = [
    {
        label: 'Home',
        route: '/home',
        imgUrl: HomeIcon,
    },
    {
        label: 'Upcoming',
        route: '/upcoming',
        imgUrl: CalendarDaysIcon,
    },
    {
        label: 'Previous',
        route: '/previous',
        imgUrl: DocumentDuplicateIcon,
    },
    {
        label: 'Recordings',
        route: '/recordings',
        imgUrl: VideoCameraIcon,
    },
    {
        label: 'Personal Room',
        route: '/personal-room',
        imgUrl: UserGroupIcon,
    },
]

export const homePageLinks = [
    {
        label: 'Create New Meeting',
        className: '#f97316',
        test: 'bg-emerald-400',
        icon: PlusIcon,
        description: 'Create a new meeting now',
    },
    {
        label: 'Schedule a Meeting',
        className: '#3b82f6',
        test: 'bg-emerald-400',
        icon: DocumentDuplicateIcon,
        description: 'Schedule a new meeting for later',
    },
    {
        label: 'Join a Meeting',
        className: '#10b981',
        test: 'bg-emerald-400',
        icon: RocketLaunchIcon,
        description: 'Join a meeting now',
    },
    {
        label: 'View Recordings',
        className: '#8b5cf6',
        test: 'bg-emerald-400',
        icon: VideoCameraIcon,
        description: 'View previous meeting recordings',
    },
]

export const avatarImages = [
    '/images/avatar-1.jpeg',
    '/images/avatar-2.jpeg',
    '/images/avatar-3.png',
    '/images/avatar-4.png',
    '/images/avatar-5.png',
  ];