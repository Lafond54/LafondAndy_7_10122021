// import { defineStore } from 'pinia'
// //VUEX
// // Create a new store instance.
// export default defineStore({
//     state() {
//         return {
//             user: null,
//         }
//     },

//     getters: {
//         user(state) {
//             return state.user
//         }
//     },
//     actions: {
//         async loadUser() {
//             const token = localStorage.getItem("token")
//             const userId = Jwt.decode(token).userId
//             const user = await axios.get(`http://localhost:3000/user/${userId}`)
//             this.user = user
            
//         }
//     }
// })