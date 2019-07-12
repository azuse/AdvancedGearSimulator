<template>
  <div class="gear-selector">
    <h2>Gear Selector</h2>
    
    <label for="">gear selected</label>
    <ul>
        <transition-group name="fade">
          <li class="gear" v-bind:key="gear.index" v-for="gear in selected_gears" v-on:click="removeGear(gear.index)">
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
        gears:[
          {
            id:0,
            name: "a gun",
            effect:{
              attack:10,
              defend:0
            }
          },
          {
            id:1,
            name: "a shield",
            effect:{
              attack:0,
              defend:10
            }
          }
        ],
        selected_gears: [] as any[],
        max_gear_num:2
      }
    },
    methods:{
      gearSelect:function(gear:object){
        if(this.selected_gears.length < 2){
          let tmp = JSON.parse(JSON.stringify(gear))
          tmp.index = this.selected_gears.length
          this.selected_gears.push(tmp)
        
        }
        else
          console.log("max gear num reached!")
      },

      removeGear:function(gearindex:number){
        this.selected_gears.forEach((element,index) => {
          if(element.index == gearindex)
            this.selected_gears.splice(index,1)
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
