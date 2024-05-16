import http from "../http-common";

class TechDataService {
  getAll() {
    return http.get("/techItems");
  }

  get(id) {
    return http.get(`/techItems/${id}`);
  }

  create(data) {
    return http.post("/techItems", data);
  }

  update(id, data) {
    return http.put(`/techItems/${id}`, data);
  }

  delete(id) {
    return http.delete(`/techItems/${id}`);
  }

  deleteAll() {
    return http.delete(`/techItems`);
  }

  findByTechName(techName) {
    return http.get(`/techItems?techName=${techName}`);
  }
}

export default new TechDataService();