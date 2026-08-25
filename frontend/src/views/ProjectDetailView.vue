<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '../services/api';

const route = useRoute();
const project = ref(null);
const isLoading = ref(true);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    const response = await apiClient.get(`/projects/${route.params.slug}`);
    project.value = response.data;
  } catch (err) {
    errorMessage.value = 'Proyek tidak ditemukan atau gagal dimuat.';
    console.error('API Error:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <router-link to="/" class="inline-flex items-center text-teal-400 text-sm hover:underline">
      &larr; Kembali ke Beranda
    </router-link>

    <div v-if="isLoading" class="text-slate-400 animate-pulse py-8">
      Memuat detail studi kasus...
    </div>

    <div v-else-if="errorMessage" class="p-4 bg-red-950/50 border border-red-800 text-red-200 rounded-lg">
      {{ errorMessage }}
    </div>

    <article v-else-if="project" class="space-y-6">
      <header class="space-y-3">
        <h1 class="text-3xl font-extrabold text-white">{{ project.title }}</h1>
        <p class="text-slate-300 text-base leading-relaxed">{{ project.summary }}</p>
        
        <div class="flex flex-wrap gap-2 pt-2">
          <span 
            v-for="tech in project.technologies" 
            :key="tech.id"
            class="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700 text-teal-300 rounded-md font-mono"
          >
            {{ tech.name }}
          </span>
        </div>
      </header>

      <div class="p-6 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 text-sm leading-relaxed whitespace-pre-line font-mono">
        {{ project.content }}
      </div>

      <div class="flex gap-4 pt-4">
        <a 
          v-if="project.demo_url" 
          :href="project.demo_url" 
          target="_blank" 
          class="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold text-sm rounded-lg transition"
        >
          Live Demo
        </a>
        <a 
          v-if="project.github_url" 
          :href="project.github_url" 
          target="_blank" 
          class="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-sm rounded-lg transition"
        >
          GitHub Repository
        </a>
      </div>
    </article>
  </div>
</template>