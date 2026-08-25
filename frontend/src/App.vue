<script setup>
import { ref, onMounted } from 'vue';
import apiClient from './services/api';

const projects = ref([]);
const technologies = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    const [projectRes, techRes] = await Promise.all([
      apiClient.get('/projects?featured=1'),
      apiClient.get('/technologies'),
    ]);

    projects.value = projectRes.data;
    technologies.value = techRes.data;
  } catch (error) {
    errorMessage.value = 'Gagal memuat data dari server backend.';
    console.error('API Error:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
    <div class="max-w-4xl mx-auto space-y-10">
      
      <!-- Header -->
      <header class="border-b border-slate-800 pb-6">
        <h1 class="text-3xl font-bold tracking-tight text-teal-400">
          Personal Portfolio
        </h1>
        <p class="text-slate-400 text-sm mt-1">
          Decoupled Full-Stack: Laravel 11 + Vue.js 3 + Tailwind CSS
        </p>
      </header>

      <!-- Status Loading & Error -->
      <div v-if="isLoading" class="text-slate-400 animate-pulse">
        Menghubungkan ke API backend...
      </div>

      <div v-else-if="errorMessage" class="p-4 bg-red-950/50 border border-red-800 text-red-200 rounded-lg">
        {{ errorMessage }}
      </div>

      <!-- Content -->
      <div v-else class="space-y-10">
        
        <!-- Featured Projects -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-slate-200">Featured Projects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article 
              v-for="project in projects" 
              :key="project.id" 
              class="p-5 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-3 hover:border-teal-500/50 transition duration-200"
            >
              <h3 class="text-lg font-bold text-white">{{ project.title }}</h3>
              <p class="text-slate-300 text-sm leading-relaxed">{{ project.summary }}</p>
              
              <div class="flex flex-wrap gap-1.5 pt-2">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech.id"
                  class="text-xs px-2.5 py-0.5 bg-slate-700 text-teal-300 rounded-md font-mono"
                >
                  {{ tech.name }}
                </span>
              </div>
            </article>
          </div>
        </section>

        <!-- Core Technologies -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-slate-200">Core Technologies</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <div 
              v-for="tech in technologies" 
              :key="tech.id"
              class="p-3 bg-slate-800 border border-slate-700/50 rounded-lg text-center space-y-1"
            >
              <div class="font-medium text-sm text-slate-200">{{ tech.name }}</div>
              <div class="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                {{ tech.category }}
              </div>
            </div>
          </div>
        </section>

      </div>

    </div>
  </div>
</template>