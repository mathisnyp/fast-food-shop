import { RefObject, useEffect, useRef, useState } from "react"

//By https://stackoverflow.com/questions/32553158/detect-click-outside-react-component (Paul Fitzgerald)
export function useHideOnClickOutside(
  initialIsVisible: boolean
): [RefObject<HTMLElement>, boolean, (value: boolean) => void] {
  const [isComponentVisible, setIsComponentVisible] =
    useState<boolean>(initialIsVisible)
  const ref = useRef<HTMLElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  return [ref, isComponentVisible, setIsComponentVisible]
}
