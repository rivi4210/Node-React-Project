import { Button } from "primereact/button"
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useDeleteUserMutation } from "./usersApiSlice";
const DeleteUser = ({_id,refetch}) => {
    console.log(_id)
    const toast = useRef(null);
    const [deleteUser, { isError, isSuccess, error }] = useDeleteUserMutation()

    useEffect(() => {
        if (isSuccess) {

            toast.current.show({ severity: 'success', summary: 'Success', detail: `You have deleted ` });
        }
    }, [isSuccess])
    const accept = () => {

        deleteUser(_id)
        refetch()
    }
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: '?האם תרצה למחוק משתמש זה',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,
        });


    };

    return (
        <>
        {console.log("im here")}
            <Toast ref={toast} />
            <ConfirmPopup />
            <Button onClick={confirm} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>
        </>
    )
}
export default DeleteUser
