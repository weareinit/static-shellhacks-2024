import React from 'react'
import { ReactElement } from 'react'

type Props = {
    children : ReactElement;
    className ?: string;
    id ?: string;
}

export default function ExpandedSection({children, className, id}: Props) {
  return (
    <section className={`max-w-[1200px] w-[70vw] min-w-[350px] ${className}`} id = {id}>
        {children}
    </section>
  )
}