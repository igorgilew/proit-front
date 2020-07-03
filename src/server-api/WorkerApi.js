import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/workers/',
});

export const WorkerApi = {
    getListByParams(start, pageSize, orgName, firstName, secondName, orderDir) {
        return instance.post(`list`,
            {
                start: start,
                page: pageSize,
                params:{
                    firstName:firstName,
                    secondName:secondName,
                    orgName:orgName,
                    orderDir}
            });
    },

    delete(workerIdd){
        return instance.delete(`${workerIdd}`);
    },

    getWorkersByOrgIdd(orgIdd){
        return instance.get(`list/${orgIdd}`);
    },

    create(data){
        return instance.post("", data);
    },

    getWorkerByIdd(workerIdd){
        return instance.get(`${workerIdd}`);
    },

    update(workerIdd, data){
        return instance.patch(`${workerIdd}`, data);
    },

    getWorkerTree(){
        return instance.get(`tree`);
    }

};