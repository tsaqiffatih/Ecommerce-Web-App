
import { myEndpoint } from '../utils/axios'

function ButtonGoogle() {
    const { useEffect } = require("react");

    async function handleCredentialResponse(response) {
        try {
            // console.log("Encoded JWT ID token: " + response.credential);

            await myEndpoint({
                method: 'post',
                url:'/credentials/google-login',
                headers: {
                    google_token: response.credential
                }
            })

        } catch (error) {

        }

    }

    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: "327393961797-76i7f899lt4u2gbckuqsh3shnal3gp0a.apps.googleusercontent.com",
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
            google.accounts.id.prompt(); // also display the One Tap dialog
        }
    }, [])


    return (
        <>
            <div id="buttonDiv"></div>
        </>
    )
}