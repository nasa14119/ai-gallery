
export function MenuItem({Icon, body, ...rest}) {
  return (
    <div className="grid grid-rows-[80%_auto] bg-slate-500/40 rounded-3xl cursor-pointer md:aspect-square md:h-full md:mx-auto" {...rest}>
        <span className="grid place-content-center p-4">
            <Icon/>
        </span>
        <span className="text-xs md:text-base text-center pb-2">
            {body}
        </span>
    </div>
  )
}
