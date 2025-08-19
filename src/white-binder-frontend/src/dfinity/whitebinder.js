// src/wchl-hackathon-frontend/src/dfinity/whitebinder.js
import { white_binder_backend } from '../../../declarations/white-binder-backend'

export default {
  async init() {
    return await white_binder_backend.init();
  },

  async register(username, password) {
    return await white_binder_backend.register(username, password);
  },

  async login(username, password) {
    return await white_binder_backend.login(username, password);
  },

  async listUsers() {
    return await white_binder_backend.listUsers();
  },

  async scanWallet(address) {
    return await white_binder_backend.scanWallet(address);
  },

  async getAnalytics(address) {
    return await white_binder_backend.getAnalytics(address);
  }
}