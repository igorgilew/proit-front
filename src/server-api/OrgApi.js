import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/org/',
});

export const OrgApi = {
    getListByParams(start, pageSize, orderBy, orderDir) {
        return instance.post(`list`,
            {
                    start: start,
                    page: pageSize,
                    params:{
                        name:orderBy,
                        orderDir
                    }
            });
        },

    delete(orgIdd){
        return instance.delete(`${orgIdd}`);
    },

    getAllOrgs(){
        return instance.get(`list/all`);
    },

    create(data){
        return instance.post("", data);
    },

    getOrgByIdd(orgIdd){
        return instance.get(`${orgIdd}`);
    },

    update(orgIdd, data){
      return instance.patch(`${orgIdd}`, data);
    },

    getOrgTree(){
        return instance.get(`tree`);
    }

};
