<template>
  <div class="h-screen flex flex-col md:flex-row">
    <!-- Left Section with login form -->
    <div class="md:w-1/2 lg:w-7/12 flex items-center justify-center bg-white p-4 md:p-8">
      <LoginForm />
    </div>
    
    <!-- Right Section with welcome message -->
    <div class="md:w-1/2 lg:w-5/12 bg-legend-orange relative">
      <!-- Overlay for the image -->
      <div class="absolute inset-0 bg-black opacity-40"></div>
      
      <!-- Background image with person -->
      <div 
        class="w-full h-full bg-cover bg-center"
        style="background-image: url('/public/login-photo.svg');"
      ></div>
      
      <!-- Content overlay -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-6 md:p-10">
        <div class="max-w-md text-center z-10">
          <h1 class="text-xl md:text-2xl font-bold mb-2">
            Welcome to <span class="font-bold">Legend Academy</span>
          </h1>
          
          <p class="mt-2 text-sm md:text-base opacity-90">
            Lorem ipsum is a dummy text used as a place holder before the actual information is inputted. Don't bother reading this. Why are you still reading?
          </p>
          
          <button class="mt-6 px-6 py-2 border border-white rounded-md hover:bg-white hover:text-legend-orange transition-colors">
            Read more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<style scoped>
/* We'll handle most styling with Tailwind classes */
</style>