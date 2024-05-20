import React, { useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Navigate, renderMatches, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import { Controller, useForm } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';

import { Link, useParams } from "react-router-dom";
import { useDeleteWordMutation, useGetWordsByIdLessQuery, useGetWordsByIdLessQuery as useGetWordsByIdWordQuery, useGetWordsQuery, useUpdateWordMutation } from './wordApiSlice';
import UpdateWord from './updateWord';
import DeleteWord from './deleteWord';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { render } from 'react-dom';
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
const ListWordOfLesson = () => {
    const { idLess } = useParams();
    console.log(idLess);
    const domNode = document.getElementById('root');

    const navigate = useNavigate()
    const toast = useRef(null);
    const [_id, setId] = useState("")
    const [deleteWord, {  isSuccess }] = useDeleteWordMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `You have deleted ` });
        }
    }, [isSuccess])

    const accept = () => {
        deleteWord(_id)
    }
    const defaultValues = {
        _id: '',
        word: '',
        translating: '',
        Img: {}
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const {
        data: words,
        isLoading,
        isError,
        error,
        refetch
    } = useGetWordsByIdLessQuery(idLess)
    if (isLoading) return <h1>...טוען</h1>
    if (isError) return <h2>{error}</h2>

    const showImg = (word) => {
        return <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto" src={'http://localhost:5225/upload/'.concat(word.Img)} alt={word.name} />
    }

    const sendToUpdate = (word) => {
        console.log(word);
        return <UpdateWord w={word} refetch={refetch} />
    }

    const sendToDelete = (word) => {
        return (<DeleteWord _id={word._id} refetch={refetch}/>)
    }

    return (
        <div>
            <Button icon="pi pi-arrow-left" onClick={() => navigate("/admin/learn")} />
            <div align='center'><Button
                label="הוסף מילה לשיעור"
                text
                onClick={() => { navigate('/admin/addWord/'.concat(idLess)) }}
            /></div>
            {words.length&&
            <DataTable value={words} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="word" header="מילה" style={{ width: '33%' }}></Column> 
            <Column field="translating" header="תרגום" style={{ width: '33%' }}></Column>
            <Column header="תמונה" style={{ width: '33%' }} body={showImg}></Column>
            <Column body={sendToDelete}></Column>
            <Column  body={sendToUpdate}></Column>
            </DataTable>}
        </div>
    )

}
export default ListWordOfLesson