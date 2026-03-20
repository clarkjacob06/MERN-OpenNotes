import api from '../lib/axios.js';

function LoginPage() {

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            
        } catch (error) {
            
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter your Email"/>
                <input type="password" placeholder="Enter Password" />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginPage