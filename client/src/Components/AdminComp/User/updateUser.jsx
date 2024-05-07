import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "./usersApiSlice";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";

const UpdateUser = ({ user ,refetch}) => {
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


    const onSubmit = (data) => {
        data.value && show();
        console.log(data);
        updatedUser(data);
        setFormUpdate(false)
        // refetch()
        console.log('err', { isSuccess, isError, error });
        
        reset();
    };
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    const roles = [
        { name: 'User', code: 'user' },
        { name: 'Admin', code: 'admin' }
    ];

    return (<>
        <Button icon="pi pi-user-edit" className="p-button-rounded" onClick={() => { setFormUpdate(true) }}></Button>

        <Dialog
            visible={formUpdate}

            onHide={() => setFormUpdate(false)}>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="flex flex-column  gap-3  flex-row  gap-2" >
                   
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: 'role is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >


                                    <Dropdown value={field.value} onChange={(e) =>{console.log(e.value.code);field.onChange(e.value.code)} } options={roles} optionLabel="name"
                                        placeholder="בחר תפקיד" className="w-full md:w-14rem" />
                                   

                                </span>

                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />


                  
                    <div >
                        <Button label="עדכן" type="submit" ></Button>
                    </div> <div>
                        <Button label="ביטול" onClick={(e) => { setFormUpdate(false) }} ></Button>
                    </div>

                </div>

            </form>
        </Dialog>
        
    </>
    )
}
export default UpdateUser