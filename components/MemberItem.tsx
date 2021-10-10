import dayjs from "dayjs"
import React from "react"
import { IoPerson } from "react-icons/io5"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Member from "../types/Member"

type MemberItemProps = {
    member: Member
}

function MemberItem({ member }: MemberItemProps) {
    return (
        <div className="flex items-center p-3 bg-white dark:bg-gray-900 shadow-md rounded-lg mb-4">
            <div className="w-16">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                {
                    member.avatar ? 
                    <LazyLoadImage
                        className="w-full h-full object-cover"
                        src={process.env.img_url + member.avatar} 
                        alt="">
                    </LazyLoadImage> :
                    <div className="text-gray-400 text-5xl w-full h-full bg-gray-200 flex justify-center items-center">
                        <IoPerson />
                    </div>
                }
                </div>
                <p className="text-xs text-center mt-1">
                    {
                        member.status === 1 
                        ? <span className="text-green-500">正常</span> 
                        : <span className="text-red-500">禁用</span>}
                </p>
            </div>
            <div className="flex-1 pl-3">
                <h1 className="text-black dark:text-gray-100">
                    {member.memberName || member.email || member.mobile}
                </h1>
                <div className="flex text-sm text-gray-400">
                    充值总金额：<span className="text-yellow-500 font-bold">{member.totalRecharge}</span>元
                </div>
                <p className="text-sm text-gray-400">注册时间：{member.createTime}</p>
            </div>
        </div>
    )
}

export default MemberItem