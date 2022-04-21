<template>
  <div class="container">
    <UserHeader />
    <br />
    <br />
    <br />
    <br />
    <div class="title">
      <h1>TWEETS</h1>
    </div>
    <main class="list">
      <ul id="list" v-for="(tweet, i) in $store.state.tweet" :key="i">
        <!-- <li class="listElement">{{ i + 1 }}. {{ todo.title }}</li> -->
        <li class="listElement">{{ i + 1 }}</li>
        <li>
          {{ tweet.title
          }}<button class="button" @click="myTweet(tweet.id)"></button>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  async mounted() {
    await this.$store.dispatch('getAllTweet')

    return
  },
  methods: {
    async myTweet(id) {
      console.log(id)
      await this.$store.dispatch('myTweet', id)
      await this.$router.push('/MyTweet')
    },
  },
}
</script>
<style  scoped>
#list {
  text-align: center;
}
.button {
  border-radius: 40px;
  padding: 8px;
  border: 0px solid gray;
  /* color: rgb(12, 12, 45); */
  background-color: #629fb3;
  color: white;
  float: right;
  cursor: pointer;
}
</style>