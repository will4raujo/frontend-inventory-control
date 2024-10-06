import { defineStore } from 'pinia';
import api from '../services/api'; 
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role_id: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  const fetchUserProfile = async () => {
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

      user.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar o perfil do usuário:', error);
      user.value = null;
    }
  };

  return { user, fetchUserProfile };
});
  