import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // Import the auth store
import MainLayout from '@/components/Layout/MainLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'

// Lazy load views to improve performance
const DashboardView = () => import('@/views/dashboard/DashboardView.vue')
const AdminManagementView = () => import('@/views/admin/AdminManagementView.vue')
const CoursesView = () => import('@/views/courses/CoursesView.vue')
const DiscussionForumView = () => import('@/views/discussion/DiscussionForumView.vue')
const MessagesView = () => import('@/views/messages/MessagesView.vue')
const NotificationsView = () => import('@/views/notifications/NotificationsView.vue')
const ResourcesView = () => import('@/views/resources/ResourcesView.vue')
const RewardsView = () => import('@/views/rewards/RewardsView.vue')
const SettingsView = () => import('@/views/settings/SettingsView.vue')
const SupportView = () => import('@/views/support/SupportView.vue')

// Define child routes separately for better readability and maintainability
const dashboardRoutes = [
  { path: '', name: 'Dashboard', component: DashboardView },
  { path: 'admin', name: 'Admin', component: AdminManagementView },
  { path: 'courses', name: 'Courses', component: CoursesView },
  { path: 'discussion-forum', name: 'DiscussionForum', component: DiscussionForumView },
  { path: 'messages', name: 'Messages', component: MessagesView },
  { path: 'notifications', name: 'Notifications', component: NotificationsView },
  { path: 'resources', name: 'Resources', component: ResourcesView },
  { path: 'rewards', name: 'Rewards', component: RewardsView },
  { path: 'settings', name: 'Settings', component: SettingsView },
  { path: 'support', name: 'Support', component: SupportView },
]

const routes = [
  {
    path: '/dashboard',
    component: MainLayout,
    children: dashboardRoutes, // Use the extracted dashboard routes
    meta: { requiresAuth: true }, // only allow authenticated users
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // If the route requires authentication and the user is not logged in, redirect to the login page
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
