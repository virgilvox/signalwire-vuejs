<template>
  <div class="createRoomForm">
    <div v-if="!roomLoading">
      <va-form
        style="width: 300px;"
        tag="form"
        @submit.prevent="createRoom"
      >
        <va-input
          v-model="username"
          label="Username"
        />
        
        <br />
        <va-input
          v-model="displayName"
          label="Room Name"
        />

        <br />
        <va-switch 
          style="color: white;"
          v-model="enableRoomPreviews" 
          label="Enable Room Previews"
          color="success" 
          class="mr-4" 
        />

        <va-button type="submit" class="mt-2" :loading="loadingToken" :rounded="false">
          Create Persistant Room
        </va-button>
      </va-form>
    </div>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'CreateRoomForm',
  props: {
    backendURL: String
  },
  data() {
    return {
      username: '',
      displayName: '',
      enableRoomPreviews: false,
      loadingToken: false
    }
  },
  async mounted() {
    console.log(this.backendURL)
  },
  methods: {
    toKebabCase(text) {
      return text.toLowerCase().replace(/\s/g, '').replace(/[^A-Z0-9]+/ig,'-')

    },
    async createRoom(){
      this.loadingToken = true
      try {
        let token = await axios.post(this.backendURL + "/create_room", {
          user_name: this.username,
          room_name: this.toKebabCase(this.displayName),
          display_name: this.displayName,
          enable_room_previews: this.enableRoomPreviews
        })
        this.$emit("roomCredentials", this.username, this.displayName, token.data.token)
      } catch (e) {
        console.log(e)
      }
      this.loadingToken = false
    }
  }
}


</script>

<style scoped>



</style>