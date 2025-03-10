<template>
  <div id="app">
    <!-- Toast component for notifications -->
    <Toast />
    
    <!-- This is crucial - it tells Vue where to render your routed components -->
    <router-view />
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { onMounted } from "vue";
import Toast from 'primevue/toast';
import eventBus from "@/utils/eventBus";

const toast = useToast();

onMounted(() => {
  eventBus.on("toast", ({ severity, summary, detail }) => {
    toast.add({ severity, summary, detail, life: 5000 });
  });
});
</script>