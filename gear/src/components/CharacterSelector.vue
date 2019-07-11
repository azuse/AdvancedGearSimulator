<template>
  <div class="character-selector">
    <h2>Character Selector</h2>
    <ul>
      <li
        v-bind:key="character.id"
        v-for="character in characters"
        v-bind:class="{selected: character.name==selectedCharacter}"
        v-on:click="()=>{selectedCharacter=character.name}"
      >{{character.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CharacterSelector",
  data() {
    return {
      characters: [
        {
          id: 0,
          name: "taihou"
        },
        {
          id: 1,
          name: "shigure"
        }
      ],
      selectedCharacter: "shigure"
    };
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
