<template>
  <div class="w-full max-w-md mx-auto bg-white p-8 shadow-xl rounded-lg">
    <div class="text-center mb-6">
      <h1 class="flex justify-center items-center">
        <img src="/public/legend 1.svg" alt="Legend Academy" class="" />
      </h1>
      <p class="text-black font-medium">Academy</p>
    </div>
    
    <div class="mt-10 mb-6">
      <h2 class="text-center text-gray-700 font-normal">Enter your credentials below</h2>
    </div>
    
    <form @submit.prevent="handleLogin" class="mt-8">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          v-model="email" 
          class="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-legend-orange" 
          placeholder="name@suburbanfiberco.com" 
          required 
        />
      </div>
      
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div class="relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="password" 
            class="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-legend-orange" 
            placeholder="••••••••••••" 
            required 
          />
          <button 
            type="button" 
            class="absolute inset-y-0 right-3 text-gray-400" 
            @click="showPassword = !showPassword"
          >
            <i class="pi" :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"></i>
          </button>
        </div>
      </div>
      
      <div class="flex items-center mb-6">
        <input 
          type="checkbox" 
          id="remember-me"
          v-model="rememberMe" 
          class="h-4 w-4 text-legend-orange border-gray-300 rounded focus:ring-legend-orange"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-700">
          Remember me
        </label>
      </div>
      
      <button 
        type="submit" 
        class="w-full bg-legend-orange text-white py-2 rounded-md hover:bg-legend-orange-dark transition-colors"
        :disabled="authStore.loading"
      >
        <span v-if="authStore.loading">
          <i class="pi pi-spinner pi-spin mr-2"></i>Logging in...
        </span>
        <span v-else>Login</span>
      </button>
    </form>

    <div class="text-center mt-16 text-xs text-gray-500">
      (c) 2025 Legend PLC. All rights reserved
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'primevue/usetoast';
import eventBus from '@/utils/eventBus';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const authStore = useAuthStore();
const toast = useToast();

const handleLogin = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });
    
    // Handle remember me functionality
    if (rememberMe.value) {
      localStorage.setItem('rememberedEmail', email.value);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    // Show success message
    eventBus.emit('toast', {
      severity: 'success',
      summary: 'Success',
      detail: 'Login successful!'
    });
    
  } catch (error) {
    // Show error message
    eventBus.emit('toast', {
      severity: 'error',
      summary: 'Login Failed',
      detail: error.message || 'Invalid credentials'
    });
  }
};

// Check for remembered email on component mount
if (localStorage.getItem('rememberedEmail')) {
  email.value = localStorage.getItem('rememberedEmail');
  rememberMe.value = true;
}
</script>