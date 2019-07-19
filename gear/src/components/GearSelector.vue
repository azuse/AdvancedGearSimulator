<template>
  <div class="gear-selector">
    <h2>Gear Selector</h2>
    
    <label for="">gear selected</label>
    <ul>
        <transition-group name="fade">
          <li class="gear" v-bind:key="gear.index" v-for="gear in selectedGearList" v-on:click="removeGear(gear.index)">
            <label class="name">{{gear.name}}</label>
            <label class="effect">attack: {{gear.effect.attack}} defend:{{gear.effect.defend}}</label>
          </li>
        </transition-group>
    </ul>

    <label for="">gear for select</label>
    <ul>
      <li class="gear" v-bind:key="gear.id" v-for="gear in gears" v-on:click="gearSelect(gear)">
        <label class="name">{{gear.name}}</label>
        <label class="effect">attack: {{gear.effect.attack}} defend:{{gear.effect.defend}}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:"GearSelector",
    data(){
      return{
      }
    },
    computed:{
      selectedGearList():any[]{
        return this.$store.state.selectedGearList
      },
      gears():any{
        return this.$store.state.gears
      }
    },
    methods:{
      gearSelect:function(gear:object){
        if (this.$store.state.selectedGearList.length < this.$store.state.maxGearNum){
          let tmp = JSON.parse(JSON.stringify(gear))
          tmp.index = this.$store.state.selectedGearList.length
          this.$store.commit("addGear",tmp)
                    
        }
        else console.log("max gear num reached");
      },

      removeGear:function(gearIndex:number){
        this.$store.state.selectedGearList.forEach((element:any, index:number) => {
        if (element.index == gearIndex) this.$store.commit("removeGear",gearIndex)
      });
      }
    }
})
</script>

<style lang="scss" scoped>
  .gear-selector{
    @extend .col;
    @extend .s4;
    .gear{
      background-color: rgb(0, 78, 78);
      position: relative;
      .name{
        display: block;
      }
      .effect{

      }
    }

    ul{
      padding: 5px;
      border-radius: 5px;
      padding-bottom: 0.1px;
      li{
        margin-bottom: 5px;
        border-radius: 5px;
      }
    }

    h2{
      font-size: 20px;
    }
  }

  .fade-enter-active{
    transition: all 0.1s ease-in;

  }

  .fade-leave-active{
    transition: all 0.1s ease-out;
  }

  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
