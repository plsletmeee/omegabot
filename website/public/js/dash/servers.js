async function getData() {
    const authCookie = getCookie('auth')
    const apiResponse = await fetch(`api/data/auth/${authCookie}`)
    if(apiResponse.status == 401 && authCookie) return window.location('dashboard')
    if(apiResponse.status == 401 && !authCookie) return window.location('auth')

    const authData = await apiResponse.json()

    console.log(authData.identity)
    console.log(authData.guilds)
}

getData()

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length === 2) return parts.pop().split(';').shift();
}