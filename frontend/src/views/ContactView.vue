<script setup>
import { reactive, ref } from 'vue';
import apiClient from '../services/api';

const form = reactive({
  sender_name: '',
  email: '',
  subject: '',
  message: '',
});

const statusMsg = ref('');
const isError = ref(false);
const isSubmitting = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  statusMsg.value = '';
  isError.value = false;

  try {
    const res = await apiClient.post('/contact', form);
    statusMsg.value = res.data.message || 'Pesan Anda berhasil terkirim!';
    Object.assign(form, { sender_name: '', email: '', subject: '', message: '' });
  } catch (err) {
    isError.value = true;
    statusMsg.value = err.response?.data?.message || 'Gagal mengirim pesan. Silakan coba lagi.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="max-w-xl mx-auto space-y-6">
    <header class="space-y-1">
      <h1 class="text-3xl font-bold text-teal-400">Hubungi Saya</h1>
      <p class="text-slate-400 text-sm">Kirimkan pesan atau tawaran kerja sama melalui formulir ini.</p>
    </header>

    <div 
      v-if="statusMsg" 
      :class="isError ? 'bg-red-950/50 border-red-800 text-red-200' : 'bg-teal-950/50 border-teal-800 text-teal-200'"
      class="p-4 border rounded-lg text-sm"
    >
      {{ statusMsg }}
    </div>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1">Nama Lengkap</label>
        <input 
          v-model="form.sender_name" 
          type="text" 
          required 
          placeholder="Nama Anda"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-teal-500" 
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1">Alamat Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          required 
          placeholder="email@example.com"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-teal-500" 
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1">Subjek</label>
        <input 
          v-model="form.subject" 
          type="text" 
          required 
          placeholder="Subjek Pesan"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-teal-500" 
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1">Pesan</label>
        <textarea 
          v-model="form.message" 
          rows="4" 
          required 
          placeholder="Tulis pesan Anda di sini..."
          class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-teal-500"
        ></textarea>
      </div>

      <button 
        type="submit" 
        :disabled="isSubmitting" 
        class="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-lg transition"
      >
        {{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}
      </button>
    </form>
  </div>
</template>