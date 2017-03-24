import Vue from 'vue'
import LoginPage from '../components/pages/LoginPage.vue'
import RegisterPage from '../components/pages/RegisterPage.vue'
import HomePage from '../components/pages/HomePage.vue'
import NewPage from '../components/pages/NewPage.vue'
import NewItemPageStep1 from '../components/pages/NewItemPageStep1.vue'
import NewItemPageStep2 from '../components/pages/NewItemPageStep2.vue'
import NewTemplatePage from '../components/pages/NewTemplatePage.vue'
import EditPage from '../components/pages/EditPage.vue'
import EditTemplatePageStep1 from '../components/pages/EditTemplatePageStep1.vue'
import EditTemplatePageStep2 from '../components/pages/EditTemplatePageStep2.vue'
import ItemPage from '../components/pages/ItemPage.vue'
import EditItemPage from '../components/pages/EditItemPage.vue'
import ToDoPage from '../components/pages/ToDoPage.vue'
import StyleGuide from '../components/pages/StyleGuide.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/app', component: LoginPage },
    { path: '/app/register', component: RegisterPage },
    { path: '/app/home', component: HomePage },
    { path: '/app/new', component: NewPage },
    { path: '/app/new-item', component: NewItemPageStep1 },
    { path: '/app/new-item-page-2', component: NewItemPageStep2 },
    { path: '/app/new-template', component: NewTemplatePage },
    { path: '/app/edit', component: EditPage },
    { path: '/app/edit-template', component: EditTemplatePageStep1 },
    { path: '/app/edit-template-page-2', component: EditTemplatePageStep2 },
    { path: '/app/item/:itemId', component: ItemPage },
    { path: '/app/item/edit/:itemId', component: EditItemPage },
    { path: '/app/todo', component: ToDoPage },
    { path: '/app/style-guide', component: StyleGuide }
  ]
})

export default router
