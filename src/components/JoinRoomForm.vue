<template>
  <div class="joinRoomForm">
    <va-form
      style="width: 300px;"
      tag="form"
      @submit.prevent="joinWithUsername"
    >
      <va-input
        v-model="username"
        label="Username"
      />
      <br />
      <va-input
        v-model="roomname"
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
        Join Meeting
      </va-button>
    </va-form>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'JoinRoomForm',
  props: {
    backendURL: String
  },
  data() {
    return {
      username: '',
      roomname: '',
      enableRoomPreviews: false,
      loadingToken: false
    }
  },
  async mounted() {
    console.log(this.backendURL)
  },
  methods: {
    toKebabCase(text) {
      return text.toLowerCase().replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '')
    },
    async joinWithUsername(){
      console.log(this.roomname)
      console.log(this.toKebabCase(this.roomname))
      this.loadingToken = true
      try {
        let token = await axios.post(this.backendURL + "/get_token", {
          user_name: this.username,
          room_name: this.toKebabCase(this.roomname),
          room_display_name: this.roomname,
          enable_room_previews: this.enableRoomPreviews
        })
        this.$emit("roomCredentials", this.username, this.roomname, token.data.token)
      } catch (e) {
        console.log(e)
      }
      this.loadingToken = false
    }
  }
}


</script>
