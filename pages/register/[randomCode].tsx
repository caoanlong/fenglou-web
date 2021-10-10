import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import React, { ChangeEvent, useState } from "react"
import { Field, Form } from "react-final-form"
import { useDispatch, useSelector } from "react-redux"
import ButtonCom from "../../components/ButtonCom"
import GetCodeBtn from "../../components/GetCodeBtn"
import InputCom from "../../components/InputCom"
import SEO from "../../components/SEO"
import { RootState } from "../../store"
import { getInfo, register, RegisterProps } from "../../store/actions/userActions"
import { checkEmail, checkMobile } from "../../utils/validators"

type RegisterProp = {
    randomCode: string
}

type RegisterForm = {
    account: string,
    password: string
    code: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { randomCode } = context.query
    return {
        props: {
            randomCode
        }
    }
}

function Register({ randomCode }: RegisterProp) {
    const dispatch = useDispatch()
    const router = useRouter()
    const seo = useSelector((state: RootState) => state.config.seo)
    
    const [ formData, setFormData ] = useState<RegisterForm>({
        account: '',
        password: '',
        code: ''
    })

    const onSubmit = ({ account, password, code }: RegisterForm) => {
        const data: RegisterProps & { cb?: () => void } = {
            randomCode,
            password,
            code,
            cb: () => {
                dispatch(getInfo())
                dispatch({ type: 'SET_LOGIN_MODAL', payload: false })
                router.push('/')
            }
        }
        if (checkEmail(account)) {
            data.email = account
        } else if (checkMobile(account)) {
            data.mobile = account
        }
        dispatch(register(data))
    }
    
    return (
        <main>
            <SEO 
				title={`注册-${seo?.seoTitle}`} 
				description={seo?.seoDescription} 
				canonical={process.env.site_url}
			/>
            <div className="p-4 sm:w-96 sm:mx-auto">
                <h1 className="text-2xl text-center py-3 text-gray-400">注册</h1>
                <Form 
                    onSubmit={onSubmit}
                    initialValues={formData}
                    validate={(values) => {
                        const errors: any = {}
                        if (!values.account) {
                            errors.account = '账号不能为空'
                        }
                        if (!values.password) {
                            errors.password = '密码不能为空'
                        }
                        if (!values.code) {
                            errors.code = '验证码不能为空'
                        }
                        return errors
                    }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="account">
                                {({ input, meta }) => (
                                    <InputCom 
                                        {...input} 
                                        type="text" 
                                        placeholder="请输入邮箱/手机号"
                                        tips={meta.touched && meta.error && <span>{meta.error}</span>}
                                    />
                                )}
                            </Field>
                            <Field name="password">
                                {({ input, meta }) => (
                                    <InputCom 
                                        {...input} 
                                        type="password" 
                                        placeholder="请输入密码" 
                                        tips={meta.touched && meta.error && <span>{meta.error}</span>}
                                    />
                                )}
                            </Field>
                            <Field name="code">
                                {({ input, meta }) => (
                                    <InputCom 
                                        {...input} 
                                        type="number" 
                                        placeholder="请输入验证码" 
                                        right={
                                            <div className="h-full flex justify-center items-center text-sm text-yellow-500">
                                                <GetCodeBtn 
                                                    key={values.account}
                                                    account={values.account}
                                                />
                                            </div>
                                        }
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setFormData({
                                                ...values,
                                                code: e.target.value
                                            })
                                        }}
                                        tips={meta.touched && meta.error && <span>{meta.error}</span>}
                                    />
                                )}
                            </Field>
                            <ButtonCom 
                                text="注册" 
                                type="submit" 
                                disabled={!values.account || !values.password || !values.code} 
                            />
                            <div 
                                onClick={() => router.push('/')}
                                style={{height: '48px', lineHeight: '48px'}}
                                className="w-full rounded-lg bg-white dark:bg-black text-gray-600 dark:text-gray-400 border dark:border-gray-800 text-center mt-4">
                                返回首页
                            </div>
                        </form>
                    )}>
                </Form>
            </div>
        </main>
    )
}

export default Register