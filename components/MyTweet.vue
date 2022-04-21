<template>
  <div class="todo-item">
    <!-- <div v-if="update"> -->
    <div class="end" v-if="isUpdating">
      <p>
        <input type="text" v-model="title" required />
      </p>
    </div>
    <p v-else>{{ tweet.title }}</p>
    <!-- </div> -->

    <div class="btns" v-if="tweet.userId == this.$store.state.id">
      <button v-if="!isUpdating" class="btn" @click="updateTweet">
        Update
      </button>
      <button
        v-if="!isUpdating"
        class="btn-danger"
        @click="deleteTweet(tweet.id)"
      >
        Delete
      </button>
      <button class="button" v-else @click="submitTweet">Submit</button>
    </div>

    <div>
      <h3>Tweet Comments</h3>
      <div v-for="(comments, i) in comments" :key="i">
        <div>
          {{ comments.text
          }}<button
            class="delete"
            v-if="(comments.UserId = id)"
            @click="deleteComment(comments.id)"
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <label for="">Comment Here</label>
        <input type="text" v-model="text" />
        <button class="comment" @click="createComment">Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      text: '',
      isUpdating: false,
      title: '',
    }
  },
  //   props: {
  //     item: {
  //       type: Object,
  //       required: true,
  //     },
  //   },
  computed: {
    ...mapState(['tweet', 'id', 'comments']),
  },
  async created() {
    await this.$store.dispatch('getAllComments')
    return
  },
  methods: {
    async createComment() {
      await this.$store.dispatch('createComment', this.text)
      await this.$store.dispatch('getAllComments')
      this.text = ''
    },
    async deleteComment(id) {
      await this.$store.dispatch('deleteComment', id)
      await this.$store.dispatch('getAllComments')
    },
    updateTweet() {
      this.isUpdating = true
      this.title = this.tweet.title
      // await this.$$store.dispatch('updatePost', this.title)
    },
    async update(id) {
      this.isVisible = false
      console.log(id)
      console.log(this.title)
      await this.$store.dispatch('updateTweet', { id: id, title: this.title })
    },
    async deleteTweet(id) {
      console.log(id)
      await this.$store.dispatch('deleteTweet', id)
      this.$router.push('/UserHome')
    },
    async submitTweet() {
      this.isUpdating = false
      await this.$store.dispatch('updateTweet', this.title)
      this.$store.commit('updateTweet', this.title)
    },
  },
}
</script>

<style>
/* .todo-item {
  display: flex;
  margin-top: 8px;
  background-color: rgb(231, 231, 228);
  border: 1px solid rgb(31, 30, 30);
  border-radius: 12px;
  justify-content: space-between;
  padding: 4px;
} */
.btn {
  margin-top: 15px;
  background-color: rgb(9, 10, 10);
  padding: 5px;
  color: rgb(239, 246, 247);
  border: none;
  border-radius: 10px;
}

.btn-danger {
  margin-top: 15px;
  background-color: rgb(22, 23, 22);
  padding: 5px;
  color: rgb(243, 236, 236);
  border: none;
  border-radius: 10px;
}
.end {
  display: flex;
}
.button {
  margin-top: 17px;
  margin-right: 16px;
  background-color: rgb(12, 11, 12);
  padding: 5px;
  color: rgb(243, 236, 236);
  border: none;
  border-radius: 10px;
}
.delete {
  background-color: rgb(26, 27, 28);
  border-radius: 25px;
  color: white;
  border: 0px solid;
  float: right;
}
.comment {
  background-color: rgb(20, 20, 23);
  border-radius: 25px;
  color: white;
  border: 0px solid;
  padding: 4px;
}
</style>