export const formsRoutes = [
    {
      path: '/forms',
      name: 'Forms',
      component: () => import('../views/forms/index.vue'),
      meta: { requiredAuth: true},
      children: [
        {
          path: '',
          name: 'ListForm',
          component: () => import('../views/forms/list/index.vue'),
        },
        {
          path: 'create',
          name: 'CreateForm',
          component: () => import('../views/forms/create/index.vue'),
        },
        {
          path: 'details/:id',
          name: 'FormDetails',
          component: () => import('../views/forms/details/index.vue'),
        }
      ]
    }
]
