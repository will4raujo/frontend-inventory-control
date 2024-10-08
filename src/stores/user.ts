import { defineStore } from 'pinia';
import api from '../services/api'; 


interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role_id: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User | null,
  }),
  actions: {
    async fetchUser() {
      const token = localStorage.getItem('@inventorystocktoken');
      if (!token) {
        console.error('Token não encontrado.');
        return;
      }

      try {
        const response = await api.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        this.user = response.data;
      } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
        this.user = null;
      }
    }        
  },
});