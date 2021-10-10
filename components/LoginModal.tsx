import React, { useState, MouseEvent, ChangeEvent } from "react"
import { Form, Field } from 'react-final-form'
import { useDispatch } from "react-redux"
import Toast from 'light-toast'
import { getInfo, login, LoginProps, register, RegisterProps } from "../store/actions/userActions"
import { checkEmail, checkMobile, checkUserName } from "../utils/validators"
import ButtonCom from "./ButtonCom"
import GetCodeBtn from "./GetCodeBtn"
import InputCom from "./InputCom"
import Segement, { Seg } from "./Segement"

const tabs: Seg[] = [
    { id: 1, path: '', name: '登录' },
    { id: 2, path: '', name: '注册' }
]

type LoginForm = {
    account: string,
    password: string
}
type RegisterForm = LoginForm & {
    code: string
}

const Login = () => {
    const dispatch = useDispatch()

    const [ formData, setFormData ] = useState<LoginForm>({
        account: '',
        password: ''
    })

    const onSubmit = ({ account, password }: LoginForm) => {
        const data: LoginProps & { cb?: () => void } = { 
            password,
            cb: () => {
                dispatch(getInfo())
                dispatch({ type: 'SET_LOGIN_MODAL', payload: false })
            }
        }
        if (checkEmail(account)) {
            data.email = account
        } else if (checkMobile(account)) {
            data.mobile = account
        } else if (checkUserName(account)) {
            data.memberName = account
        } else {
            return Toast.fail('用户名格式错误！')
        }
        dispatch(login(data))
    }

    return (
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
                    <ButtonCom 
                        text="登录" 
                        type="submit" 
                        disabled={!values.account || !values.password} 
                    />
                </form>
            )}>
        </Form>
    )
}

const Register = () => {
    const dispatch = useDispatch()
    const [ formData, setFormData ] = useState<RegisterForm>({
        account: '',
        password: '',
        code: ''
    })

    const onSubmit = ({ account, password, code }: RegisterForm) => {
        const data: RegisterProps & { cb?: () => void } = { 
            password,
            code,
            cb: () => {
                dispatch(getInfo())
                dispatch({ type: 'SET_LOGIN_MODAL', payload: false })
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
                </form>
            )}>
        </Form>
    )
}

function LoginModal() {
    const dispatch = useDispatch()
    const [ active, setActive ] = useState<Seg>(tabs[0])

    const handleTab = (item: Seg) => {
        setActive(item)
    }

    return (
        <div 
            onClick={() => dispatch({ type: 'SET_LOGIN_MODAL', payload: false })}
            className="w-full h-full fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur flex justify-center items-center">
            <div 
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation()
                }}
                className="w-4/5 sm:w-96 bg-white dark:bg-black rounded-lg px-3 py-6">
                <div className="pb-3 sm:pl-12">
                    <Segement 
                        list={tabs} 
                        active={active} 
                        onChange={handleTab} 
                    />
                </div>
                <div className="pt-3">
                    { active.id === 1 ? <Login /> : <Register /> }
                </div>
            </div>
        </div>
    )
}

export default LoginModal