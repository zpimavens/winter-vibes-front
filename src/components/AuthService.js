import decode from 'jwt-decode'
import { requestUrls } from '../urls'

export const login = ( username, password ) => {
    return fetchFun(requestUrls.LOGIN, {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => {
        setToken(res.token)
        return Promise.resolve(res)////dddddddddddddddddddddddddddddddddddddddd
    })
}

export const isLoggedIn = () => {
    const token = getToken()
    return !!token && !isTokenExpired(token)
}

const isTokenExpired = token => {
    try {
        const decoded = decode(token)
        if (decoded.exp < Date.now() / 1000) {
            return true
        } else return false
    } catch (err) {
        return false
    }
}

const setToken = token => {
    localStorage.setItem("token", token)
}

const getToken = () => {
    return localStorage.getItem("token")
}

export const logout = () => {
    fetch(requestUrls.LOGOUT, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    localStorage.removeItem("token")
}

//    //////////////////////////////////////////
//    const  getConfirm = () => {
//        let answer = decode(getToken())
//        console.log("Recieved answer - token!"+ answer)
//        return answer
//    }

const fetchFun = (url, options) => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
    if (isLoggedIn()) {
        headers["Authorization"] = "Bearer " + getToken()
    }

    return fetch(url, {
        headers,
        ...options
    })
        .then(_checkStatus)
        .then(response => response.json())
}

const  _checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
