<template>
  <div class="home">
    <div class="container row">
      <AttackIndicator/>
      <AttackIndicator/>
      <AttackIndicator/>
      <CharacterSelector/>
      <GearSelector/>
      <div class="divider" style="width:100%;"></div>
      <EffectDeclarer/>
      <div id="gear-selector"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import AttackIndicator from "@/components/AttackIndicator.vue";
import CharacterSelector from "@/components/CharacterSelector.vue";
import GearSelector from "@/components/GearSelector.vue";
import EffectDeclarer from "@/components/EffectDeclarer.vue";
import Vuex from "vuex";
import { mapState } from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedCharacterName: "shigure",
    selectedGearList: [] as any[],
    maxGearNum: 2,
    dataItems: [
      {
        id: 1,
        name: "attack",
        value: 0
      },
      {
        id: 2,
        name: "defend",
        value: 0
      }
    ],
    characters: [
      {
        id: 0,
        name: "taihou",
        effect: {
          attack: 10,
          defend: 0
        }
      },
      {
        id: 1,
        name: "shigure",
        effect: {
          attack: 0,
          defend: 10
        }
      }
    ],
    gears: [
      {
        id: 0,
        name: "a gun",
        effect: {
          attack: 10,
          defend: 0
        }
      },
      {
        id: 1,
        name: "a shield",
        effect: {
          attack: 0,
          defend: 10
        }
      }
    ],
    elementsName: ["attack", "defend"],
    effects: [{ name: "ATTACK", formula: "attack*10" }]
  },
  mutations: {
    selectCharacter: (state, character) =>
      (state.selectedCharacterName = character),
    addGear(state, gear: object) {
      state.selectedGearList.push(gear);
    },
    removeGear(state, index: number) {
      state.selectedGearList.splice(index, 1);
    },
    updateData(state, obj: any) {
      state.dataItems[0].value = obj.attack;
      state.dataItems[1].value = obj.defend;
    },
    removeElement(state, elementName: string) {
      state.elementsName.forEach((element, index) => {
        if (element == elementName) {
          state.elementsName.splice(index, 1);
        }
      });
    },
    addElement(state, elementName: string) {
      let keyduplicate = 0;
      state.elementsName.forEach(element => {
        if (element == elementName) keyduplicate = 1;
      });
      if (keyduplicate) return;
      state.elementsName.push(elementName);
    },
    removeEffect(state, effectName:string){
      state.effects.forEach((effect,index)=>{
        if(effect.name == effectName)
          state.effects.splice(index,1)
      })
    },
    addEffect(state, obj){
      let keyduplicate = 0;
      state.effects.forEach(element=>{
        if(element.name == obj.effectName)keyduplicate = 1
      })
      if(keyduplicate == 1)return
      state.effects.push({name:obj.effectName, formula:obj.formula})
    }
  }
});

// @Component({
//   components: {
//     HelloWorld,
//     AttackIndicator,
//     CharacterSelector,
//     GearSelector
//   },
//   store:store
// })

export default Vue.extend({
  name: "Home",
  store,
  components: {
    HelloWorld,
    AttackIndicator,
    CharacterSelector,
    GearSelector,
    EffectDeclarer
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
  }),
  watch: {
    selectedGearList: {
      handler(newList, oldList) {
        this.calculateData(newList, this.$store.state.selectedCharacterName);
      },
      immediate: true
    },
    selectedCharacterName: {
      handler(newCh, oldCh) {
        this.calculateData(this.$store.state.selectedGearList, newCh);
      }
    }
  },
  methods: {
    calculateData: function(
      selectedGearList: any[],
      selectedCharacterName: any
    ) {
      let attack_new = 0;
      let defend_new = 0;
      selectedGearList.forEach(element => {
        attack_new += element.effect.attack;
        defend_new += element.effect.defend;
      });
      let selectCharacter = this.$store.state.characters[0];
      this.$store.state.characters.forEach(element => {
        if (element.name == selectedCharacterName) {
          selectCharacter = element;
        }
      });
      attack_new += selectCharacter.effect.attack;
      defend_new += selectCharacter.effect.defend;
      console.log(attack_new, defend_new);
      store.commit({
        type: "updateData",
        attack: attack_new,
        defend: defend_new
      });
    }
  }
});
</script>
