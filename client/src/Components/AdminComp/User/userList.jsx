import React, { useRef } from 'react';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { DataScroller } from 'primereact/datascroller';
import { Navigate, useNavigate } from 'react-router-dom';


import { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } from './usersApiSlice';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Search from '../../Search/search';
import { useSearchParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import DeleteUser from './deleteUser';
import UpdateUser from './updateUser';

const UserList = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const q = searchParams.get("q")
    const toast = useRef(null);
    

    const sendToUpdate = (user) => {
        return <UpdateUser user={user} refetch={refetch}/>
    }

    const sendToDelete = (user) => {
        return <DeleteUser _id ={user._id} refetch={refetch}  />
    }
    const getSeverity = (role) => {
        switch (role.role) {
            case 'admin':
                return 'success';

            default:
                return 'danger';
        }
    };
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.role} severity={getSeverity(rowData)}></Tag>
    }
    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch
    } = useGetUsersQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    const filterData = !q ? [...users] : users.filter(u => u.name.indexOf(q) > -1)
    
    return (

        <div>
            <div align='center'><Button label="הוסף משתמש" text onClick={() => { navigate('/admin/addUser') }} /></div>
         <Search placeholders={"search by user name"} />
        

        <DataTable value={filterData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="שם" style={{ width: '25%' }}></Column>
            <Column field="username" header="שם משתמש" style={{ width: '25%' }}></Column>
            <Column field="email" header="אמייל" style={{ width: '25%' }}></Column>
            <Column field="role" header="תפקיד" body={statusBodyTemplate} style={{ width: '25%' }}></Column>
            <Column body={sendToUpdate}></Column>
            <Column body={sendToDelete}></Column>
        </DataTable>
        </div>

        

    );
};
export default UserList;
