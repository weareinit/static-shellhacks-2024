import React from 'react'
import Image from 'next/image'

import Button from '../input/Button'
import NoticeBox from '../NoticeBox'
import { NoticeStyles } from '../NoticeBox'
export default function NetworkCallout() {
  return (
    <section className="m-2 p-4 h-fit pt-16" id="about">
      <h1 className="mb-6 font-console text-crate_brown text-4xl text-center"><span className='text-deep_blue'>Network:</span> Career Fair</h1>
      <div className="flex flex-col lg:flex-row justify-center items-stretch w-full gap-x-4 gap-y-4">
        <NoticeBox className = "flex-1 text-clamp-sm h-fill" color = {NoticeStyles.Blue}>
            <>
              <p>Looking for your next internship or job opportunity? Our career fair is the perfect place for you to connect with recruiters and professionals from leading tech companies! You'll have the chance to learn about each company’s culture, interview process, and open internship and job opportunities.</p>
              <br/>
              <p>This is your chance to make connections and land interviews early in the recruiting season. Make sure to bring your resume, enthusiasm, and curiosity as you explore the diverse opportunities available at the career fair. For a full list of companies attending the career fair, be sure to check out the Hacker Guide on your Dashboard!</p>
            </>
        </NoticeBox>
        <div className="relative flex-1 aspect-[4/3] w-full">
          <Image src="/images/networking.jpg" alt="Hackers at ShellHacks 2022" fill className="object-cover h-full" />
        </div>
      </div>
    </section>

  )
}