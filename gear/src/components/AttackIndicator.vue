<template>
  <div class="indicator">
    <h2>Attack Indicator</h2>
    <ul>
      <li v-bind:key="item.id" v-for="(item,index) in dataItems">
        <!-- <label class="index">{{index}}</label> -->
        <label class="name">{{item.name}}</label>
        <label class="value">{{item.value}}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "AttackIndicator",
  data() {
    return {};
  },
  computed: mapState({
    dataItems: function(this: Vue) {
      return this.$store.state.dataItems;
    },
    selectedGearList: function(this: Vue) {
      return this.$store.state.selectedGearList;
    },
    selectedCharacterName: function(this: Vue) {
      return this.$store.state.selectedCharacterName;
    }
  })
});
</script>

<style scoped lang="scss">
.indicator {
  @extend .col;
  @extend .s4;
  ul {
    background-color: rgb(238, 224, 178);
    padding: 5px;
    padding-bottom: 0.1px;
    border-radius: 5px;
    li {
      @extend .row;
      background-color: rgb(255, 209, 111);
      border-radius: 5px;
      margin-bottom: 5px;
      padding-left: 10px;
      padding-right: 10px;

      text-align: start;
      vertical-align: middle;

      display: flex;
      justify-content: start;
      align-items: center;

      .index {
        margin-right: 5px;
        font-size: 14px;
        color: rgb(46, 46, 46);
        font-weight: 300;
      }
      .name {
        margin-right: 5px;
        font-size: 14px;
        color: rgb(90, 90, 90);
        font-weight: 500;
        text-shadow: 0px 0px 3px gray;
      }
      .value {
        @extend .right;
        font-weight: bold;
        font-size: 20px;
        color: rgb(145, 74, 74);
        margin-left: auto;
      }
    }
  }

  h2 {
    font-size: 20px;
  }
}
</style>


