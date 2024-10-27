import CallList from '@/components/meeting/CallList'
import React from 'react'

const Upcoming = () => {
    return (
        <section className="flex size-full flex-col gap-8">
            <h1 className="text-3xl font-bold">Upcoming</h1>
            <CallList type="upcoming" />
        </section>
    )
}

export default Upcoming
