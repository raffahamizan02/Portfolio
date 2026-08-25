<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
    <!-- Navbar -->
    <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <router-link to="/" class="font-extrabold text-xl text-teal-400 tracking-wide">
          PORTFOLIO.
        </router-link>
        <nav class="flex gap-6 text-sm font-medium text-slate-300">
          <router-link to="/" class="hover:text-teal-400 transition" active-class="text-teal-400">Home</router-link>
          <router-link to="/contact" class="hover:text-teal-400 transition" active-class="text-teal-400">Contact</router-link>
        </nav>
      </div>
    </header>

    <!-- Main View Container -->
    <main class="flex-1 max-w-4xl w-full mx-auto px-6 py-10">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
      &copy; 2026 Panca Raditya. Decoupled Architecture with Laravel 11 & Vue 3.
    </footer>
  </div>
</template>