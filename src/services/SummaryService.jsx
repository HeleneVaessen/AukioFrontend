import axios from "axios";
const host = 'http://localhost:20001/';
class SummaryService {
    addSummary = () => {
        console.log(Email, Tittle, Summary, Subject)
        return axios.post(host + 'addSummary', {
            Name, Email, School, Password
        });
    }

    getSummaries = (Email)=> {
        return axios.post(host + 'getSummaries', {
            Email
        });
    }

    openSummary = (Email) => {
        return axios.post(host + 'openSummary', {
            Email
        });
    }
}
export default new SummaryService();