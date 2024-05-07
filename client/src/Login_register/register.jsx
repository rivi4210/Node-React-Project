import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../Components/auth/authApiSlice.jsx';

const Register = () => {
    const toast = useRef(null);
    const navigate = useNavigate()
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()


    const show = () => {
        toast.current.show({ severity: 'warning', summary: 'Form Submitted', detail: getValues('value') });
    };

    const checkAllow = (isSuccess) => {
        if (!isSuccess) {
            reset()
            // navigate('/register')
        }
        else navigate('/login')
    }

    useEffect(() => {
        checkAllow(isSuccess)
    }, [isSuccess])

    useEffect(() => {
        checkAllow(isSuccess)
    }, [error])
    const defaultValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        phone: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = async(data) => {
        
        console.log(data);
        await registerFunc(data);
        console.log('err', { isSuccess, isError, error }); 
        if(error?.status==409) {
            console.log("llllllllll");
            data.value && show();
        } 
        reset();
    };


    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    return (
        <><form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">

                </svg>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'name is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name} >שם</label>

                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'username is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name} >שם משתמש</label>


                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'password is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >
                                <Password id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} placeholder='password' toggleMask />
                                <label htmlFor={field.name} >סיסמא</label>
                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >



                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name} >אמייל</label>


                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <div className="flex align-items-center gap-2">
                    <Button label="הרשמה" type='submit' text></Button>

                    <Button label="ביטול" onClick={(e) => navigate('/')} text ></Button>
                </div>

            </div>

        </form></>
    )
}

export default Register