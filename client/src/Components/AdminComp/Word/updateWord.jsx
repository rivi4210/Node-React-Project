
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useGetWordsByIdLessQuery, useUpdateWordMutation } from "./wordApiSlice";

const UpdateWord = ({ w, refetch }) => {
    const toast = useRef(null);
    const [formUpdate, setFormUpdate] = useState(false)
    const [_id, setId] = useState("")
    const [updatedWord, { isError, isSuccess, error }] = useUpdateWordMutation()
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        console.log(event);
        if (event)
            setSelectedFile(event.target.files[0]);
    };

    let defaultValues = {
        word: w.word,
        translating: w.translating,
        Img: w.Img,
        _id: w._id,
        lesson: w.lesson
    };
    useEffect(() => {
        reset({
            word: w.word,
            translating: w.translating,
            Img: w.Img,
            _id: w._id,
            lesson: w.lesson
        })
    }, [w])
    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        console.log("aaaaaaa");
        console.log(data);
        console.log(defaultValues);
        data.value && show();
        const formData = new FormData();

        for (const value of formData.values()) {
            console.log('fd', value);
        }

        formData.append('word', data.word);
        formData.append('_id', data._id);
        formData.append('translating', data.translating);
        selectedFile ? formData.append('Img', selectedFile) : formData.append('Img', data.Img);
        formData.append('lesson', data.lesson);
        updatedWord(formData)
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
                        name="word"
                        control={control}
                        rules={{ required: 'category is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.word} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >
                                    <InputText id={field.word} defaultValue={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.word} >מילה</label>

                                </span>

                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="translating"
                        control={control}
                        rules={{ required: 'translating is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.translating} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >
                                    <InputText id={field.translating} defaultValue={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.translating} >תרגום</label>

                                </span>

                                {getFormErrorMessage(field.name)}
                            </>
                        )}
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

                    <Button label="עדכן" type="submit" ></Button>
                    <Button label="ביטול" onClick={(e) => { setFormUpdate(false) }} ></Button>


                </div>

            </form>
        </Dialog>
    </>
    )
}
export default UpdateWord