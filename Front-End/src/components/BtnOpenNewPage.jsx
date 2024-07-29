import Icon from "../assets/Icons/ExternalLinkIcon"

export function BtnOpenNewPage({href, className = ""}) {
  return (
    <a className={`h-full w-full ${className}`} target='_blank' href={href}><Icon/></a>
  )
}
