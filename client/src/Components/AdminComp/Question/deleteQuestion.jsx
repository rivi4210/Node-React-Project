import { Button } from "primereact/button"
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useDeleteQuestionMutation } from "./questionApiSlice";
const DeleteQuestion = ({_id}) => {
    console.log(_id)
    const toast = useRef(null);
    const [deleteQuestion, { isError, isSuccess, error }] = useDeleteQuestionMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `You have deleted ` });
        }
    }, [isSuccess])
    const accept = () => {
        deleteQuestion(_id)
    }
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: '?האם תרצה למחוק שאלה זו',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,
        });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmPopup />
            <Button onClick={confirm} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>
        </>
    )
}
export default DeleteQuestion
