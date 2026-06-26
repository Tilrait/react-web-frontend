import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TokenContext, baseURL } from "./utility.js"

export default function DeleteAcc({ updateToken }) {
    const [p, setP] = useState('');
    const [errors, setErrors] = useState({});


    const token = useContext(TokenContext);
    const redirect = useNavigate();

    async function handleFormSubmit(event) {
        event.preventDefault();
        console.log(p)
        const body = new URLSearchParams();
        body.append("password", p)
        const response = await fetch(`${baseURL}/delete`, { method: "post", body: body, headers: { Authorization: `Bearer ${token}` } });
        if (response.ok) {
            updateToken(undefined);
            redirect("/login")
        } else if (response.status === 406) {
            setErrors((await response.json()).errors)
        } else {
            window.alert(response.status + ": " + response.statusText);
        }
    }
    return (
        <>
            {!token && <Navigate to="/login" />}
            {token &&
                <>
                    <h1>Подтверждение пароля для удаления аккаунта</h1>
                    <form onSubmit={handleFormSubmit}>
                        <input type="password" value={p} onChange={(event) => {
                            setP(event.target.value)
                        }} />
                        {errors.password && (
                            <div>
                                <span className='label error'>{errors.password.msg}</span>
                            </div>
                        )}
                        <div className="horizontal">
                            <input type="submit" className="warning" value="Удалить аккаунт" />
                        </div>
                    </form>
                </>
            }
        </>
    )
}