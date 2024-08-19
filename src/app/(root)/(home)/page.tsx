import React from 'react'

const Home = () => {
    const now = new Date()
    const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    })
    const date = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
    }).format(now)

    return (
        <section className="flex size-full flex-col gap-8 text-background dark:text-foreground">
            <div className="bg-hero h-[300px] w-full rounded-lg bg-cover bg-center">
                <div className="flex h-full flex-col justify-between max-md:p-4 md:p-12">
                    <h2 className="max-w-[300px] rounded-full border border-primary py-2 text-center font-bold backdrop-blur-2xl">
                        Upcoming Meetings at 12:30PM
                    </h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-5xl font-extrabold uppercase lg:text-7xl">
                            {time}
                        </h1>
                        <p className="text-lg font-bold text-primary lg:text-xl">
                            {date}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
