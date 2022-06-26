import axios from "axios";
import Cookies from "universal-cookie"

const host = 'http://20.91.190.130/';

class SummaryService {

    getSummaries = () => {
        console.log(new Cookies().get("Jwt"))
        return axios.get(host + 'api/summary/getSummaries', {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + new Cookies().get("Jwt")
            }}).
            then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    return response
                }
            }).catch(
                console.log("mislukt")
            );
    }

    addSummary = (id, title, content) => {
        let userid = parseInt(id);
        return axios.post(host + 'api/summary/postSummary', {
            userid, title, content
        },
            {headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + new Cookies().get("Jwt")
            }
            });
    }
}
export default new SummaryService();