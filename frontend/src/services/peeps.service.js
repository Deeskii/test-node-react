import http from "../http.common";

class PeepDataService {
    getAll() {
        return http.get("/peeps");
    }

    get(id) {
        return http.get(`/peeps/${id}`);
    }

    create(data) {
        return http.post("/peeps", data);
    }

    update(id, data) {
        return http.put(`/peeps/${id}`, data);
    }

    delete(id) {
        return http.delete(`/peeps/${id}`);
    }

    deleteAll() {
        return http.delete(`/peeps`);
    }

    findByTitle(title) {
        return http.get(`/peeps?title=${title}`);
    }
}

export default new PeepDataService();
