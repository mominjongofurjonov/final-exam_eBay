import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import instance from "../../api/axios"
import { getUserProfile } from "../../redux/mainSlice"

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const token = useSelector(state => state.actions.token)
    const profile = useSelector(state => state.actions.user)

    useEffect(() => {
        instance.get("/auth/profile", {
            headers: {
                "Authorization" : "bearer " + token
            }
        })
        .then(response => {
            dispatch(getUserProfile(response.data));
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
         
    }, [])

    return (
        <div>
            {loading ? ( 
                <h1 style={{textAlign: 'center'}}>Loading...</h1>
            ) : (
                profile && (
                    <div>
                        <h1>email: {profile.email}</h1>
                        <h2>name: {profile.name}</h2>
                        <h3>role: {profile.role}</h3>
                        <img width={300} src={profile.avatar} alt="#" />
                    </div>
                )
            )}
        </div>
    )
}

export default Admin
