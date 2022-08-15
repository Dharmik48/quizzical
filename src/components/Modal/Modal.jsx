import React from "react"

export function Modal({ children }) {
  return (
    <div className="absolute m-auto bg-white h-full lg:max-h-[600px] max-w-[500px] z-50 p-8 rounded-md overflow-y-scroll">
      <div className="flex flex-col justify-between gap-y-4">{children}</div>
    </div>
  )
}
