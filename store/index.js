const state = () => ({
    token: null,
    myTweet: [],
    name: null,
    email: null,
    tweet: [],
    comments:[],
    id: null,
  });
  
  const getters = {}
  
  const mutations = {
    setToken (state, data) {
      state.token = data.token;
      state.email = data.email;
      state.name = data.name;
      state.id = data.id;
      console.log(state.token);
    },

    
    GetMyTweet(state, data) {
      state.MyTweet = data;
    },


    allTweet(state, data) {
      state.tweet = data;
      console.log(state.tweet);
    },
    setTweet(state, data) {
      state.tweet = data;
    },
    updateTweet(state, data) {
      state.tweet.title = data;

    },
    updateUser(state, data) {
      state.name = data;
  },

    // deleteTweet(state, data) {
    //   state.tweet.id = data;

    // },


    allComments(state, data) {
      state.comments = data;
      console.log(state.comments);
    }
  
  };
  
  const actions = {
   
    async login({ commit }, data) {
      console.log(data.email)
      console.log(data.password)
      await this.$axios.post('http://localhost:5000/api/user/login', {
          email: data.email,
          password: data.password
        })
        .then((res) => {
          console.log(res.data.token)
          this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token);
          commit('setToken', res.data)
        })
    },
    async registerUser({ commit, state }, data) {
        console.log(data);
        const res = await this.$axios.post('http://localhost:5000/api/user/SignUp', data).then((res) => {
            // commit('createUser', res.data)
            alert(" registration success, please log in")
        })

    },
  
    async CreateTweet({ commit, state }, data) {
      
      await this.$axios.post('http://localhost:5000/api/Tweet', {
        tweet_id: data.tweet_id,
        title: data.title,
        // description: data.description,
        // created_at: data.created_at,
        user_id: data.user_id
      }, { headers: { Authorization: 'Bearer ' + state.token } })
        .then((res) => {
          console.log(res.data);
        //   commit('CreateTweet', res.data);
        alert(" create success")
        })
    },
  
    async getMyTweet({ commit, state }) {
      await this.$axios
        .get('http://localhost:5000/api/Tweet', {
          headers: { Authorization: 'Bearer ' + state.token }
        })
        .then((res) => {
          console.log(res.data)
          commit('myTweet', res.data)
        })
    },
    async getAllTweet({ commit, state }) {
        console.log("")
      await this.$axios
        .get('http://localhost:5000/api/Tweet')
        .then((res) => {
          console.log(res.data)
          commit('allTweet', res.data)
        
        
        })
    },
    // async Update ({ commit, state }) {
    //   await this.$axios
    //     .get('http://localhost:5000/api/Tweet', {
    //       headers: { Authorization: 'Bearer' + state.token }
    //     })
    //     .then((res) => {
    //       console.log(res.data)
    //       this.$router.put('/UserHome')
    //       commit('Update', res.data)
    //     })
    // },
    async createComment({ commit, state }, data) {
      const res = await this.$axios.post('http://localhost:5000/api/comment/' + state.tweet.id, { text: data, });
      // commit('commentCreate', data);
  },

  async deleteComment({ }, data) {
    const res = await this.$axios.delete('http://localhost:5000/api/comment/' + data);
    console.log(res.data);
},

async deleteTweet({ }, data) {
  const res = await this.$axios.delete('http://localhost:5000/api/Tweet/' + data);
  console.log(res.data);
},

async getAllComments({ commit, state, }) {
  await this.$axios.get('http://localhost:5000/api/comment?id=' + state.tweet.id).then((res) => {
      console.log(res.data);
      // this.$router.push('/');
      commit('allComments', res.data);
  })
},

async myTweet({ commit }, data) {
  console.log(data)
  const res = await this.$axios.get('http://localhost:5000/api/Tweet/' + data);
  console.log(res.data)
  commit('setTweet', res.data)
},


async updateTweet({ state }, data) {
  const res = await this.$axios.put('http://localhost:5000/api/Tweet/' + state.tweet.id, { title: data });
  console.log(res.data);
},

async updateUser({ state }, data) {
  const res = await this.$axios.put('http://localhost:5000/api/user/id', { full_name: data });
}
       
  } 
  
  export default {
    state,
    getters,
    mutations,
    actions
  }
  