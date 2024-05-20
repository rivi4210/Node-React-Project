import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "./userApiSlice";
import { Password } from "primereact/password";
import { useAsyncValue } from "react-router-dom";
import { asyncThunkCreator } from "@reduxjs/toolkit";

const UpdateUserUser = ({ user, refetch }) => {
    const toast = useRef(null);
    const [formUpdate, setFormUpdate] = useState(false)
    const [_id, setId] = useState("")
    const [updatedUser, { isError, isSuccess, error }] = useUpdateUserMutation()

    const defaultValues = {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,
        _id: user._id,
        role: user.role
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    useEffect(() => {
        reset({
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone,
            _id: user._id,
            role: user.role
        })
    }, [user])

    const onSubmit = async (data) => {
        data.value && show();
        await updatedUser(data);
        await refetch()
        setFormUpdate(false)
        reset();
    };
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (<>
        <Button icon="pi pi-user-edit" label="עדכן פרטים" onClick={() => { setFormUpdate(true) }}></Button>
        <Dialog
            visible={formUpdate}

            onHide={() => setFormUpdate(false)}>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'name is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >

                                    {/* <label className="w-6rem">Username</label> */}
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
                    <div >
                        <Button label="עדכן" type="submit"></Button>
                    </div><div>
                        <Button label="ביטול" onClick={(e) => { setFormUpdate(false) }}></Button>
                    </div>

                </div>

            </form>
        </Dialog>
    </>
    )
}
export default UpdateUserUser