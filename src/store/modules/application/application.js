export default {
    namespaced: true,   //для обращения к текущему модулю из вне без слеша
    state: {
        notifications:[]
    },
    mutations: {
        addNotification(state, payload){        //state ссылка на state, payload переданные параметры
            state.notifications.push(payload)
        },
        removeNotification(state, payload){        //state ссылка на state, payload переданные параметры
            state.notifications.splice(payload,1)
        }
    },
    actions: {
        addNotification(ctx, payload) {
            return new Promise((resolve)=>{
                ctx.commit('addNotification', payload);
                resolve(true)
            })
        },
        removeNotification(ctx, payload) {
            return new Promise((resolve)=>{
                ctx.commit('removeNotification', payload);
                resolve(true)
            })
        }
    },
    getters: {
        notifications(state){
            return state.notifications;
        }
    }

}