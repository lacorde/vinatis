const Post = {
  template: "<div>{{$route.params.id}}</div>",
};

const router = new VueRouter({
  routes: [
    // Les segments dynamiques commencent avec la ponctuation deux-points
    { path: "/post/:id", component: Post }
  ],
});

const vinatisApp = new Vue({
  router,
  el: "#vinatis-app",
  data: {
    posts: [],
    baseUrl: "https://jsonplaceholder.typicode.com/",
    page: 1,
    perPage: 30,
    pages: [],
  },
  methods: {
    getPosts() {
      axios
        .get(this.baseUrl + "posts")
        .then((response) => {
          this.posts = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    getAuthors() {
      axios
        .get(this.baseUrl + "users")
        .then((response) => {
          this.authors = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    },
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  created() {
    this.getPosts();
  },
});
