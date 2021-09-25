import { DefaultLayout } from '@/routes/default'
import { FullPageLayout } from '@/routes/full'
import { AdminLayout } from '@/routes/admin'

const routes = [
  DefaultLayout,
  FullPageLayout,
  AdminLayout,
  {
    path: '*',
    redirect: '/404',
  },
]

export default routes
