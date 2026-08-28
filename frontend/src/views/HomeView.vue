<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../services/api';

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
  } catch (err) {
    errorMessage.value = 'Gagal memuat data dari server backend.';
    console.error('API Error:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-10 space-y-3">
      <h1 class="text-4xl md:text-5xl font-extrabold text-teal-400 tracking-tight">
        Halo, Saya Muhammad Abhiraffa Hamizan
      </h1>
      <p class="text-slate-400 text-lg max-w-xl mx-auto">
        Back-End Developer yang berfokus pada pengembangan website berbasis desktop.
      </p>
    </section>

    <!-- Status Loading / Error -->
    <div v-if="isLoading" class="text-center text-slate-400 animate-pulse py-8">
      Memuat data portofolio...
    </div>

    <div v-else-if="errorMessage" class="p-4 bg-red-950/50 border border-red-800 text-red-200 rounded-lg">
      {{ errorMessage }}
    </div>

    <div v-else class="space-y-12">
      <!-- Featured Projects Section -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-slate-100">Featured Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <router-link
            v-for="project in projects"
            :key="project.id"
            :to="`/projects/${project.slug}`"
            class="block p-5 bg-slate-800/60 border border-slate-700/60 rounded-xl hover:border-teal-500/50 hover:bg-slate-800/90 transition duration-200"
          >
            <h3 class="text-lg font-bold text-white">{{ project.title }}</h3>
            <p class="text-slate-300 text-sm mt-2 leading-relaxed">{{ project.summary }}</p>
            
            <div class="flex flex-wrap gap-1.5 pt-4">
              <span 
                v-for="tech in project.technologies" 
                :key="tech.id"
                class="text-xs px-2.5 py-0.5 bg-slate-700 text-teal-300 rounded-md font-mono"
              >
                {{ tech.name }}
              </span>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Tech Stack Section -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-slate-100">Core Technologies</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div 
            v-for="tech in technologies" 
            :key="tech.id"
            class="p-4 bg-slate-800/60 border border-slate-700/50 rounded-lg text-center space-y-1"
          >
            <div class="font-semibold text-sm text-slate-200">{{ tech.name }}</div>
            <div class="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
              {{ tech.category }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>