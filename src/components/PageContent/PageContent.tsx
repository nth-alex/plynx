import {ReactNode} from "react"

interface PageContentProps {
  children: ReactNode
  className?: string
}

export function PageContent({children, className = ""}: PageContentProps) {
  return (
    <main className={["flex-1 overflow-y-auto bg-card rounded-md shadow-xs", className].join(" ")}>{children}</main>
  )
}
