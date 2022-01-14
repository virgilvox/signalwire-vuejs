<template>
  <div class="app">
    <TopAppBar :roomname="roomname" />

    <div id="form-selector" v-if="!roomStarted && !loadingRoom">
      <va-tabs v-model="formOption" center="true">
        <template #tabs>
          <va-tab
              v-for="tab in ['Join', 'Create']"
              :key="tab"
            >
              {{ tab }}
            </va-tab>
        </template>
      </va-tabs>
    </div>

    <div class="item" v-if="!roomStarted && !loadingRoom">
      <JoinRoomForm
        v-if="formOption == 1" 
        :backendURL="url" 
        @roomCredentials="createRoom"
      />

      <CreateRoomForm
        v-if="formOption == 2" 
        :backendURL="url" 
        @roomCredentials="createRoom"
      />
    </div>

    <div class="item" v-if="!roomStarted && !loadingRoom">
      <ListRooms 
        :backendURL="url"
      />
    </div>
    
    
    <LoadingCard 
      v-if="loadingRoom && !roomStarted"
      :username="username" 
      :roomname="roomname"
    />

    <SignalWireRoom  
      :token="token" 
      v-if="token"
      @loading="onLoading"
      @roomJoined="onRoomJoined"
      @roomEnded="onRoomEnded" 
    />

    
  </div>
</template>

<script>
import SignalWireRoom from './components/SignalWireRoom.vue'
import CreateRoomForm from './components/CreateRoomForm.vue'
import JoinRoomForm from './components/JoinRoomForm.vue'
import LoadingCard from './components/LoadingCard.vue'
import ListRooms from './components/ListRooms.vue'
import TopAppBar from './components/TopAppBar.vue'

export default {
  name: 'App',
  components: {
    SignalWireRoom,
    CreateRoomForm,
    JoinRoomForm,
    LoadingCard,
    ListRooms,
    TopAppBar
  },
  data() {
    return {
      url: process.env.VUE_APP_URL || "http://localhost:8080",
      token: '',
      roomStarted: false,
      loadingRoom: false,
      username: '',
      roomname: '',
      formOption: 1
    }
  },
  methods: {
    createRoom(username, roomname, token) {
      this.username = username
      this.roomname = roomname
      this.token = token
    },
    onLoading() {
      this.loadingRoom = true
    },
    onRoomJoined() {
      this.roomStarted = true
    },
    onRoomEnded() {
      this.username = ''
      this.roomname = ''
      this.token = ''
      this.roomStarted = false
      this.loadingRoom = false
    }
  }
}
</script>

<style>


#app {
  align-content: center;
  margin: auto;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #1a1b1d;
}

.item {
  display: flex; 
  justify-content: center; 
  margin: 25px;
}


</style>
