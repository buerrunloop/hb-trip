import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            name: "home",
            component: () => import("@/views/home/home.vue")
        },
        {
            path: "/favor",
            name: "favor",
            component: () => import("@/views/favor/favor.vue")
        },
        {
            path: "/order",
            name: "order",
            component: () => import("@/views/order/order.vue")
        },
        {
            path: "/message",
            name: "message",
            component: () => import("@/views/message/message.vue")
        },
        {
            path: "/city",
            name: "city",
            component: () => import("@/views/city/city.vue"),
            meta: {
                hiddenTabbar: true
            }
        }
    ]
})

export default router