import {
    HomeIcon,
    CalendarDaysIcon,
    ClockIcon,
    VideoCameraIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline'

export const sidebarLinks = [
    {
        label: 'Home',
        route: '/',
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
        imgUrl: ClockIcon,
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
