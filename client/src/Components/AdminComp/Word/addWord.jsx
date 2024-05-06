import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddWordMutation } from './wordApiSlice';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { FileUpload } from 'primereact/fileupload';

const AddWord = () => {

    const { idLess } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);

    const toast = useRef(null);
    const navigate = useNavigate()

    const [addWord, { isErrorAdd, isSuccessAdd, errorAdd }] = useAddWordMutation()
    
    const handleFileChange = (event) => {

        setSelectedFile(event.target.files[0]);
    };

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    const defaultValues = {
        word: '',
        translating: '',
        Img: {}
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {

        const formData = new FormData();
        
        for (const value of formData.keys()) {
            console.log(value);
        }
        formData.append('word', data.word);
        formData.append('translating', data.translating);
        formData.append('Img', selectedFile);
        formData.append('lesson', idLess);

        addWord(formData)



        data.level && show();
        reset();
        navigate('/admin/listWordOfLesson/'.concat(idLess))
    };
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                <div className="flex flex-column  gap-3  flex-row  gap-2" >
                    <Toast ref={toast} />
                    <Controller
                        name="word"
                        control={control}
                        rules={{ required: 'word is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>מילה</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <Controller
                        name="translating"
                        control={control}
                        rules={{ required: 'translating is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>תרגום</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <Controller
                        name="Img"
                        type='file'
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <input type="file" name="Img" onChange={handleFileChange} />
                              
                            </>
                        )}
                    />
                   
                    <Button label="הוסף מילה" type="submit" />

                </div>
            </form>
        </>
    )
}
export default AddWord
