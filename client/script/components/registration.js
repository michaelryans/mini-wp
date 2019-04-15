Vue.component('registration-component', {
    template:
    `
    <div id="registration">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter email" v-model="register.email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with
                    anyone else.</small>
            </div>
            <div class="form-group">
                <label for="InputPassword1">Password</label>
                <input type="password" class="form-control" id="InputPassword1"
                    placeholder="Password" v-model="register.password">
            </div>
            <div class="form-group">
                <label for="InputPassword2">Confirm Password</label>
                <input type="password" class="form-control" id="InputPassword2"
                    placeholder="Password" v-model="register.confirmPass">
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button class="btn btn-primary" @click="submitRegistration">Submit</button>
        </form>
    </div>
    `,
    data() {
        return {
            register:{
                email:"",
                password: "",
                confirmPass: ""
            }
        }
    },
    methods: {
        submitRegistration() {
            if(this.register.password == this.register.confirmPass) {
                let dataToSend = {
                    email: this.register.email,
                    password:this.register.password,
                }
                this.$emit('submit-registration', this.register)
            } else {
                console.log('password tidak sama')
            }
        }
    }
})