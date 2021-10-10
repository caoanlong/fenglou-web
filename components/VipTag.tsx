function VipTag({ permission }: { permission: number }) {
    return (
        <>
            {
                permission ?
                <div 
                    className="absolute -top-1 -left-6 z-10 px-6 pb-1 pt-2 transform -rotate-45 bg-yellow-500 text-white text-center font-bold text-xs shadow">
                    VIP
                </div> : <></>
            }
        </>
        
    )
}

export default VipTag