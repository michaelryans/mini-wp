var serverUrl = "http://localhost:3000"
var app = new Vue({
  el:"#app",
  data: {
      homeSeen: true,
      editorSeen: false,
      searchbar:"",
      onEdit:true,
      articlesData:[], //all article data, get in created() when the page load
      title:"",     //title in editr, selected by id
      text:"",      //text in editor, selected by id
      id_onEdit:"", //id of article in editor
  },
  created() {
    axios
      .get(serverUrl + '/articles')
      .then(({data}) => {
        console.log(data)
        console.log('---ini data article')
        this.articlesData = data
      })
      .catch(err => {
        console.log(err)
      })
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  methods: {
    test() {
      console.log()
    },
    searchContent() {
      axios
        .get(serverUrl+ '/articles/')
        .then(({data}) => {
          this.articlesData = []
          data.forEach(el => {
            console.log(this.searchbar)
            if (el.title.toLowerCase().includes(this.searchbar.toLowerCase()) || el.content.toLowerCase().includes(this.searchbar.toLowerCase())) {
              this.articlesData.push((el))
            }
          })
        })
        .catch(err=> {
          console.log(err)
        })
    },
    closeEditor() {
      this.homeSeen = true,
      this.editorSeen = false
    },
    openEditor() {
      this.homeSeen = false,
      this.editorSeen = true
    },
    getArticleById(id) {
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
    anotherFunction(input) {

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
        .post(serverUrl + '/articles/', new_article)
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
      .patch(serverUrl + '/articles/' + id, edited)
      .then(({data}) => {
        console.log(data)
        
        this.closeEditor();

        for ( let i = 0; i < this.articlesData.length; i++) {
          if(this.articlesData[i]._id.includes(this.id_onEdit)) {
            this.articlesData[i] = data
            this.articlesData[i].title += '<mark>Updated</mark>'
          }
        }
      })
      .catch(err => {
        console.log({
          error : err,
          message: "error when patching article"
        })
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