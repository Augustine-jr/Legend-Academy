<!-- App.vue -->
<script setup>
import { useToast } from "primevue/usetoast";
import { onMounted } from "vue";
import eventBus from "@/utils/eventBus";

const toast = useToast();

onMounted(() => {
  eventBus.on("toast", ({ severity, summary, detail }) => {
    toast.add({ severity, summary, detail, life: 5000 });
  });
});
</script>
