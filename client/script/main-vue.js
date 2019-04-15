var serverUrl = "http://localhost:3000"
var app = new Vue({
  el:"#app",
  data: {
      homeSeen: true,
      isLogin: false,
      editorSeen: false,
      searchbar:"",
      onEdit:true,
      articlesData:[], //all article data, get in created() when the page load
      userArticleData:[],
      title:"",     //title in editr, selected by id
      text:"",      //text in editor, selected by id
      id_onEdit:"", //id of article in editor
      login: {
        email:"",
        password: ""
      },
      viewer: {
        title:"",
        content:"",
        id_onView:"",
      },
      panel: {
        onViewArticle:false,
        onViewList:false,
        onMedia:false,
        onEditList:false,
        onRegister:false,
        onLogin:false,
      },
      images: {
        name:"",
        file:"",
        data:[],
      },
      googleSignInParams: {
        client_id: '931520479732-ln3tmmmvvmcdagsh93cqjhr4nphta45o.apps.googleusercontent.com'
      },
  },
  created() {
      this.getAllArticle()
      this.getAllUserImages()
      
      if(localStorage.token) {
        this.isLogin = true
        this.getAllUserArticle()
      }
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  methods: {
    hideAllWorkSpace() {
      this.panel.onMedia=false
      this.panel.onViewArticle=false
      this.panel.onViewList=false
      this.panel.onEditList=false
      this.panel.onRegister=false
    },
    showLogin() {
      this.panel.onLogin = true
    },
    showRegister() {
      this.hideAllWorkSpace()
      this.panel.onRegister = true
      this.panel.onLogin = false;
    },
    showMedia() {
      this.hideAllWorkSpace()
      this.panel.onMedia = true;
    },
    viewList() {
      this.hideAllWorkSpace()
      this.panel.onViewList = true
    },
    editList() {
      this.hideAllWorkSpace()
      this.panel.onEditList = true
    },
    viewArticle() {
      this.hideAllWorkSpace()
      this.onViewArticle = true;
    },
    searchContent() {
      axios
        .get(serverUrl+ '/articles/')
        .then(({data}) => {
          this.articlesData = []
          data.forEach(el => {
            // console.log(this.searchbar)
            if (el.title.toLowerCase().includes(this.searchbar.toLowerCase()) || 
              el.content.toLowerCase().includes(this.searchbar.toLowerCase())) {
              this.articlesData.push((el))
            }

            this.panel.onViewList = true
            this.panel.onEditList = false

          })
        })
        .catch(err=> {
          console.log(err)
        })
    },
    closeEditor() {

      Swal.fire({
        title: 'Are you sure you want to leave edit page?',
        text: "Change will not be saved",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.hideAllWorkSpace()
          this.homeSeen = true,
          this.editorSeen = false
          this.editList()
        }
      })


      
      
    },
    openEditor() {
      this.hideAllWorkSpace()
      this.homeSeen = false,
      this.editorSeen = true
    },
    editArticleById(id) {
      // console.log(id)
      axios
       .get(serverUrl + '/articles/' + id)
       .then(({data}) => {
         console.log(data)
         this.openEditor()
         this.onEdit = true;
         this.text = data.content
         this.title = data.title
         this.id_onEdit = data._id
       })
       .catch(err => { 
         console.log(err)
       })
    },
    viewArticleById(id) {
      // console.log(id)
      axios
       .get(serverUrl + '/articles/' + id)
       .then(({data}) => {
         console.log(data)
         console.log('masuk view article')
         //this.openEditor()
         this.onEdit = true;
         this.viewer.text = data.content
         this.viewer.title = data.title
         this.viewer.id_onView = data._id
         this.hideAllWorkSpace()
         this.panel.onViewArticle = true;
       })
       .catch(err => { 
         console.log(err)
       })
    },
    newArticle() {
      this.text=""
      this.title=""
      this.onEdit = false;
      this.openEditor()
    },
    saveNewArticle() {
      let new_article = {
        title: this.title,
        content: this.text,
        createdAt: new Date()
      }

      axios
        .post(serverUrl + '/articles/', new_article, {
          headers: {
            token:localStorage.token
          }
        })
        .then(({data}) => {
          console.log(data)
          this.articlesData.push(data)
          this.closeEditor()
        })
        .catch( err => {
          console.log("error di save new article")
        })
    },
    updateArticle(id) {
      let edited = {
        title: this.title,
        content: this.text,
      }

      axios
      .patch(serverUrl + '/articles/' + id, edited, {headers:{token:localStorage.token}})
      .then(({data}) => {
        console.log(data)
        
        this.closeEditor();

        for ( let i = 0; i < this.articlesData.length; i++) {
          if(this.articlesData[i]._id.includes(this.id_onEdit)) {
            this.articlesData[i] = data
            // this.articlesData[i].title += '<mark>Updated</mark>'
          }
        }
      })
      .catch(err => {
        console.log({
          error : err,
          message: "error when patching article"
        })
      })
    },
    submitLogin() {
      // console.log('masuk login - vue')

      let dataToSend = {
        email: this.login.email,
        password: this.login.password
      }

      axios
        .post(serverUrl+'/users/login', dataToSend)
        .then(({data})=> {
          // console.log(data)
          localStorage.setItem('token', data)
          console.log('data token sudah disimpan di localstorage')
          this.panel.onLogin = false
          this.isLogin = true
          Swal.fire(
            'Login success!',
            'Welcome to mini-WP',
            'success'
          )

          this.getAllArticle()
          this.getAllUserArticle()

        })
        .catch(err => {
          console.log('masuk catch - login -vue')
          console.log(err)
        })
    },
    deleteArticle(id) {
      // console.log('masuk delete article - vue')
      // console.log(id)

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios
      .delete(serverUrl + '/articles/' + id, {headers:{token:localStorage.token}})
      .then(({data}) => {
        console.log('successfully deleted')

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        
        this.getAllArticle()
        this.getAllUserArticle()
      })
      .catch(err => {
        console.log(err)
        console.log('error delete article - vue')
      })
        }
      })

      
    },
    getAllArticle() {
      axios
      .get(serverUrl + '/articles')
      .then(({data}) => {
        // console.log(data)
        // console.log('---ini data article')
        this.articlesData = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAllUserImages(){
      axios
      .get(serverUrl+'/images', {headers:{token:localStorage.token}})
      .then(({data}) => {
        // console.log(data)
        this.images.data = data
        console.log('fetching pics data by user is successful')
      })
      .catch(err => {
        console.log('error fetching userimage data')
      })
    },
    getAllUserArticle() {
      axios
       .get(serverUrl+ '/articles/users/', {headers:{token:localStorage.token}})
       .then(({data})=> {
        //  console.log('data')
        //  console.log(data)
        //  console.log('----------')
         this.userArticleData = data
       })
       .catch(err => {
         console.log('error getting user specific articles')
       })
    },
    registerUser(input) {
      axios
      .post(serverUrl+'/users/register', input)
      .then(({data})=> {
        // console.log('dataaaa register')
        // console.log(data)
        console.log('registration success')
        Swal.fire(
          'Register success!',
          'Please login',
          'success'
        )
        
      })
      .catch(err => {
        console.log('error register user-vue')
      })
    },
    logout() {
      localStorage.removeItem('token')
      this.isLogin = false
      console.log('successfully logged out & delete token from localStorage')
      
    },
    uploadImage(event) {
      console.log(event)
      console.log(event.target)
      this.images.file = event.target.files[0]
      // console.log(this.file)
    },
    submitImage() {
      // console.log(this.images.file)
      // let data_sent = {
      //   file: this.images.file,
      //   name: this.images.name,
      // }
      let formData = new FormData();
      formData.append('file', this.images.file)
      console.log(formData)

      axios
        .post(serverUrl+'/images/upload/', formData, {headers:{token:localStorage.token}})
        .then(({data})=> {
          console.log('sukseeees')
          console.log(data)
          this.getAllUserImages()
        })
        .catch(err=> {
          console.log('error upload gambar')
        })

    }
  },
  computed: {
    addUpdatedTag() {
      return this.id_onEdit
    }
  },
  watch: {

  }
})
