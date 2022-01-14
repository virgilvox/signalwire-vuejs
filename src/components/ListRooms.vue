<template>
  <div class="listRooms" v-if="rooms" >
    <div class="row">
      <div class="room" v-for="room in rooms" :key="room.id">
        <va-card>
          <img 
            v-if="!room.preview_url"
            src="../assets/signalwire-full.png"
            style="width: 300px;"
          />
          <div class="room-preview" v-if="room.preview_url">
            <video class="room-preview-video" autoplay muted playsinline loop   
              :src="room.preview_url" type="video/mp4"
              
            ></video>
          </div>
          <va-card-title>{{room.display_name}}</va-card-title>
          <va-card-content>
            <va-button>
              Join
            </va-button>
          </va-card-content>
        </va-card>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'ListRooms',
  props: {
    backendURL: String
  },
  data() {
    return {
      rooms: null
    }
  },
  async mounted() {
    this.listRooms()
  },
  methods: {
    filterRoomsByInProgress(rooms) {
      return rooms.filter(obj => {
        return obj.status == "in-progress";
      })
    },
    async listRooms(){
      this.loadingToken = true
      try {
        let rooms = await axios.get(this.backendURL + "/list_rooms")
        rooms = this.filterRoomsByInProgress(rooms.data.rooms.data)
        console.log(rooms)
        if (rooms) this.rooms = rooms
      } catch (e) {
        console.log(e)
      }
    }
  }
}


</script>

<style scoped>


.listRooms {
  display: flex;
  align-content: center;
  margin: auto;
}

.room {
  width: 200;
  margin: 10px;
  align-content: center;
  justify-content: center;
}

.room-preview {
  overflow: hidden;
  position: relative;
  width: 300px;
}

.room-preview-video {
  height:inherit;
  width:inherit;
}

</style>