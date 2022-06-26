import axios from "axios";
import Cookies from "universal-cookie";

const host = 'http://20.91.190.130/';
class UserService {
    register = (Email, Name, Password, School) => {
        console.log(Email, Name, Password, School)
        return axios.post(host + 'register', {
            Name, Email, School, Password
        });
    }

    login = (Email, Password) => {
        return axios.post(host + 'login', {
            Email, Password
        }).then((response) => {
            if (response.status === 200) {
                this.setCookie(response.data)
                return response
            }
        }
        );
    }

    getID = () => {
        return axios.post(host + 'authentication/translatetoID', null, {
            "Content-Type": "application/json",
            headers: { Authorization: "Bearer " + new Cookies().get("Jwt") }
        }).
            then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    return response
                }
            }).catch(
                console.log("mislukt")
            );
    }

    getUserData = (ID) => {
        return axios.post(host + 'api/User/getUserData',parseInt(ID), {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + new Cookies().get("Jwt")
            }
        }).then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                return response
            }
        });
    }

    editUser = (ID, email, name, password, newPassword, school) => {
        let id = parseInt(ID)
        console.log(id);
        return axios.post(host + 'api/user/updateUser', { id, email, name, password, newPassword, school }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + new Cookies().get("Jwt")
            }
        }).then((response) => {
            if (response.status === 200) {
                return response
            }
        })
    }

    setCookie(jwt) {
        const expiration = new Date();
        const cookie = new Cookies();

        expiration.setHours(expiration.getHours() + 3);
        cookie.remove("Jwt", { path: "/" });
        cookie.set("Jwt", jwt, {
            path: "/",
            sameSite: true,
            expires: expiration,
        });
    }

    deleteCookie() {
        const cookie = new Cookies();
        cookie.remove("Jwt", { path: "/" });
    }
}
export default new UserService();
