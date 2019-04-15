Vue.component('login-component', {
    template:`
    
    `,
    data() {
        return {
            login: {
                email:"",
                password:""
            }
        }
    },
    methods: {
        loginComponent() {
            let dataToSend = {
                email: this.login.email,
                passowrd: this.login.password
            }
            this.$emit('login', dataToSend)
        }
    },
    
})