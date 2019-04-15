Vue.component('article-view', {
    props: ['viewer'],
    template:`
    
    <div id="viewer" >
        <div class="row">
            
            <div  ><h2>{{viewer.title}}</h2></div>
        </div>
        <div class="row">
            <div class="article-viewer"  v-html="viewer.text"></div>
        </div>
    </div>
    `,
    
})

