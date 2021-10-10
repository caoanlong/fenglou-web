import React, { ChangeEvent } from "react"
import Toast from 'light-toast'
import { IoPerson } from "react-icons/io5"
import { formDataReq } from "../utils/tools"

type AvatarProps = {
    image?: string,
    changCallback?: (formData: FormData) => void
}

function Avatar({ image, changCallback }: AvatarProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            const file: File = e.target.files[0]
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                Toast.fail('只支持JPG/PNG文件')
                return
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                Toast.fail('图片必须小于5MB!')
                return
            }
            const formData = formDataReq({ avatarFile: file })
            changCallback && changCallback(formData)
        }
    }

    return (
        <div
            className="w-full h-full text-6xl text-center overflow-hidden rounded-full bg-gray-200 relative">
            <input 
                className="absolute top-0 left-0 right-0 bottom-0 z-20 w-full opacity-0" 
                type="file" 
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <div className="absolute left-0 right-0 bottom-0 z-10 h-5 leading-5 text-xs text-gray-200 bg-black bg-opacity-50">更改</div>
            {
                image ? 
                <img 
                    className="w-full h-full object-cover" 
                    src={process.env.img_url + image} 
                    alt="" 
                /> :
                <div className="text-gray-400 text-6xl w-full h-full flex justify-center items-center">
                    <IoPerson />
                </div>
            }
        </div>
    )
}

export default Avatar