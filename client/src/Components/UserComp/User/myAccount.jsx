import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useGetUserQuery } from "./userApiSlice"
import MyMarks from "./myMarks"
// import SignOut from "./signOut"
import UpdateUserUser from "./updateUser"
import useAuth from "../../auth/useAuth"

const MyAccount = () => {
    const {
        data: user,
        isLoading,
        isError,
        error,
        refetch
    } = useGetUserQuery()

const{username,name,role,email}=useAuth()

    if (isLoading) return <h1>...טוען</h1>
    if (isError) return <h2>{error}</h2>
    console.log(user);
    return (
        <>

            <div className="col-12">
                <div>
                    <div className="flex flex-column xl:flex-row xl:align-items-center p-4 gap-5">
                        <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                                <div className="flex flex-column gap-1">
                                    <div>
                                        <span className="text-4xl font-bold text-1000">Hi  </span>
                                        <span className="text-3xl font-bold  text-1200">  {user.name} !</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div> <UpdateUserUser user={user} refetch={refetch} /></div>
                        {/* <div><SignOut /></div> */}
                        </div>
                        <div ><MyMarks user={user}/></div>
                    
                </div>
            </div>
        </>
    )
}


export default MyAccount