// import React, { useRef, useState ,useEffect} from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { Button } from 'primereact/button';
// import { classNames } from 'primereact/utils';
// import { Toast } from 'primereact/toast';
// import { InputText } from "primereact/inputtext";
// import { Password } from 'primereact/password';
// import { Link, Navigate, useNavigate } from "react-router-dom";

// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import Register from './register';

// const Login=()=>{

//     const navigate=useNavigate()

//     const toast = useRef(null);
    
//     const show = () => {
//         toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
//     };

//     const defaultValues = {
//         username:'',
//         password:''
//     };

//     const {
//         control,
//         formState: { errors },
//         handleSubmit,
//         getValues,
//         reset
//     } = useForm({ defaultValues });

//     const onSubmit = (data) => {
//         data.value && show();
//         console.log(data);
//         navigate('/home')

//         reset();
//     };

//     const getFormErrorMessage = (name) => {
//         return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
//     };
//     return (
//         <div className="card flex justify-content-center">
//             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
//                 <Toast ref={toast} />
                
//                 <Controller
//                     name="username"
//                     control={control}
//                     rules={{ required: 'username is required.' }}
//                     render={({ field, fieldState }) => (
//                         <>
//                             <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
//                             <span className="p-float-label">
//                             <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
//                                 <label htmlFor={field.name}>username</label>
//                             </span>
                            
//                             {getFormErrorMessage(field.name)}
//                         </>
//                     )}
//                 />
                
//                 <Controller
//                     name="password"
//                     control={control}
//                     rules={{ required: 'Password is required.' }}
//                     render={({ field, fieldState }) => (
//                         <>
//                             <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
//                             <span className="p-float-label">
//                                 <Password id={field.name} {...field} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} feedback={false} />
//                             <label htmlFor={field.name}>password</label></span>
//                             {getFormErrorMessage(field.name)}
//                  </>
//                 )}
//                         />
//                 <Button label="כניסה" type="submit" icon="pi pi-check" />
//             </form>
            
//                 <Button label="הרשמה" onClick={()=>{navigate('/register')}} icon="pi pi-check" />
            
            
// </div>
// )}

// export default Login

import React from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Controller } from 'react-hook-form';


import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { useLoginMutation, useRegisterMutation } from '../Components/auth/authApiSlice';
import { setToken } from "../Components/auth/authSlice";
import { useDispatch } from 'react-redux';
import useAuth from '../Components/auth/useAuth';
export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);

    const [registerFunc, { isErrorReg, isSuccessReg, isLoadingReg, dataReg, errorReg }] = useRegisterMutation()
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()

    const toast = useRef(null);
    const{role}=useAuth()
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
           
            console.log('aaa', role);
            if (role == 'user')
                navigate('/user')
            else if (role == 'admin')
                navigate('/admin')
        }
    })

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [email, setEmail] = useState('')
    // const [name, setName] = useState('')
    // const [phone, setPhone] = useState('')


    // console.log(data);
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        username: '',
        password: '',
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        data.username && show();
        console.log(data);
        loginFunc(data)
        reset();
    };
    

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (
        <div className="card flex justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">


                <Toast ref={toast} />
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'username is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >

                                {/* <div > */}
                                    {/* <label className="w-6rem">Username</label> */}
                                    <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)}  />
                                    <label htmlFor={field.name}>שם משתמש</label>
                                {/* </div> */}

                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                                <Password id={field.name} {...field} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} feedback={false}  toggleMask/>
                                <label htmlFor={field.name}>סיסמא</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />

                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <Button label="כניסה" icon="pi pi-user" className="w-10rem mx-auto" type='submit'></Button>
                </div>

            </form>

            <div className="w-full md:w-2">
                <Divider layout="vertical" className="hidden md:flex">
                    <b>OR</b>
                </Divider>
                <Divider layout="horizontal" className="flex md:hidden" align="center">
                    <b>OR</b>
                </Divider>
            </div>
            <div className="w-full md:w-5 flex align-items-center justify-content-center py-5" align='center'>
                <Button label="הרשמה" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={() => { navigate('/register'); setVisible(true) }} ></Button>
            </div>
        </div>
    )
}


