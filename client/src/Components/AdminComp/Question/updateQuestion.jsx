
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useUpdateQuestionMutation } from "./questionApiSlice";

const UpdateQuestion = ({ q }) => {
    const toast = useRef(null);
    const [formUpdate, setFormUpdate] = useState(false)
    const [_id, setId] = useState("")
    const [updatedQuestion, { isError, isSuccess, error }] = useUpdateQuestionMutation()
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate()

    const defaultValues = {
        optional: q.optional,
        question: q.question,
        answer: q.answer,
        _id: q._id,
        option1: q.optional[0],
        option2: q.optional[1],
        option3: q.optional[2],
        lesson: q.lesson
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
            optional: q.optional,
            question: q.question,
            answer: q.answer,
            _id: q._id,
            option1: q.optional[0],
            option2: q.optional[1],
            option3: q.optional[2],
            lesson: q.lesson
        })
    }, [q])
    const onSubmit = (data) => {
        console.log(data);
        setFormUpdate(false)
        data.optional[0] = data.option1
        data.optional[1] = data.option2
        data.optional[2] = data.option3
        console.log('oppppptional', data);
        updatedQuestion(data)
        data.level && show();
        reset();
        navigate('/admin/listQuestionOfLesson/'.concat(q.lesson))
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

            <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                <div className="flex flex-column  gap-3  flex-row  gap-2" >
                    <Toast ref={toast} />
                    <Controller
                        name="question"
                        control={control}
                        rules={{ required: 'word is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>שאלה</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />

                    <Controller
                        name="answer"
                        control={control}
                        rules={{ required: 'answer is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>תשובה</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <div>
                        <Controller
                            name="option1"
                            control={control}
                            rules={{ required: 'option1 is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <div></div><div></div>
                                    <div className="flex justify-content-center" >
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label">

                                            <InputText placeholder='Option 1' defaultValue={q.optional[0]} id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        </span>
                                        {getFormErrorMessage(field.name)}</div></>)}
                        />
                        <Controller
                            name="option2"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <div></div><div></div>
                                    <div className="flex justify-content-center" >
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label">

                                            <InputText placeholder='Option 2' defaultValue={q.optional[1]} id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        </span>
                                        {getFormErrorMessage(field.name)}</div></>)}
                        />
                        <Controller
                            name="option3"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <div></div><div></div>
                                    <div className="flex justify-content-center" >
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label">

                                            <InputText placeholder='Option 3' defaultValue={q.optional[2]} id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        </span>
                                        {getFormErrorMessage(field.name)}</div></>)}
                        />
                    </div>
                    <Button label="עדכן" type="submit" />
                    <Button label="ביטול" onClick={() => setFormUpdate(false)} />

                </div>
            </form>
        </Dialog>
    </>
    )
}
export default UpdateQuestion