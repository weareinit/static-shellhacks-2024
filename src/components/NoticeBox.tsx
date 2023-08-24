import React, { ReactElement } from 'react'

export enum NoticeStyles {
    Pink = "bg-light_pink text-pink",
    Cyan = "bg-light_blue text-cyan_blue",
    Blue = "bg-sky_purple text-deep_blue",
}

interface NoticeBoxProps {
    color : NoticeStyles; 
    children?: ReactElement;
    className? : string;
}

export default function NoticeBox({ color, children, className } : NoticeBoxProps) {

  return (
      <article className={`p-4 ${color} ${className}`}>{children}</article>
  )
}
