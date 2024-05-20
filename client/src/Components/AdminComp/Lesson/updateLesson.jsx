
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useUpdateLessonMutation } from "./lessonsApiSlice";
import { RadioButton } from "primereact/radiobutton";

const UpdateLesson = ({ less }) => {
    console.log(less);
    const toast = useRef(null);
    const [formUpdate, setFormUpdate] = useState(false)
    const [_id, setId] = useState("")
    const [updatedLesson, { isError, isSuccess, error }] = useUpdateLessonMutation()

    const defaultValues = {
        category: less.category,
        level: less.level,
        _id: less._id
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
            category: less.category,
            level: less.level,
            _id: less._id
        })
    }, [less])

    const onSubmit = (data) => {
        data.value && show();
        console.log(data);
        updatedLesson(data);
        setFormUpdate(false)
        console.log('err', { isSuccess, isError, error });
        reset();
    };
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (<>
        <Button icon="pi pi-pencil" className="p-button-rounded" onClick={() => { setFormUpdate(true) }}></Button>
        <Dialog
            visible={formUpdate}

            onHide={() => setFormUpdate(false)}>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: 'category is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >
                                    <InputText id={field.category} defaultValue={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.category} >קטגוריה</label>

                                </span>

                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="level"
                        control={control}
                        checked={less.level}
                        rules={{ required: 'Value is required.' }}
                        render={({ field }) => (
                            <>
                                <div className="flex justify-content-center">
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="f5" {...field} inputRef={field.ref} value='level 1' defaultChecked={less.level === 'level 1'} />
                                        <label htmlFor="f5" className="ml-1 mr-3">
                                            level 1
                                        </label>

                                        <RadioButton inputId="f6" {...field} inputRef={field.ref} value="level 2" defaultChecked={less.level === 'level 2'} />
                                        <label htmlFor="f6" className="ml-1 mr-3">
                                            level 2
                                        </label>

                                        <RadioButton inputId="f7" {...field} inputRef={field.ref} value="level 3" defaultChecked={less.level === 'level 3'} />
                                        <label htmlFor="f7" className="ml-1 mr-3">
                                            level 3
                                        </label>
                                    </div>
                                </div>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />

                    <Button label="עדכן" type="submit" ></Button>
                    <Button label="ביטול" onClick={(e) => { setFormUpdate(false) }} ></Button>
                </div>

            </form>
        </Dialog>
    </>
    )
}
export default UpdateLesson