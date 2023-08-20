import React from 'react'

export default function VideoCallout() {
  return (
    <section className='pt-36 flex flex-col w-full'>
        <h1 className='mb-6 font-console text-crate_brown text-4xl text-center'>The ShellHacks Experience</h1>
        <iframe className = "w-full h-auto aspect-video" src="https://www.youtube.com/embed/qZO8Kh9Cl3g" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </section>
  )
}