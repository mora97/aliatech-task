export const authRoutes = [
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/auth/index.vue'),
    }
]
