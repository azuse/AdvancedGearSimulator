<template>
  <div class="character-selector">
    <h2>Character Selector</h2>
    <ul>
      <li
        v-bind:key="character.id"
        v-for="character in characters"
        v-bind:class="{selected: character.name==selectedCharacterName}"
        v-on:click="()=>{updateCharacter(character.name)}"
      >{{character.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)


export default Vue.extend({
  name: "CharacterSelector",
  data() {
    return {
      
    };
  },
  computed:{
    selectedCharacterName():string{
      return this.$store.state.selectedCharacterName
    },
    characters():any{
      return this.$store.state.characters
    }
  },
  methods:{
    updateCharacter:function(name:string){
      this.$store.commit("selectCharacter", name)
    },
    log:function(this:Vue){console.log(this.$store.state.selectedCharacterName)}
  },
  created(){
    console.log(this)
  }
});
</script>

<style lang="scss" scoped>
.character-selector {
  @extend .col;
  @extend .s4;
  ul {
    li {
      @extend .row;
      background-color: gray;
      padding-bottom: 10px;
      padding-top: 10px;
      margin-bottom: 5px;
      border-radius: 5px;
    }

    .selected {
      background-color: yellow;
    }
  }

  h2{
      font-size: 20px;
  }
}
</style>
