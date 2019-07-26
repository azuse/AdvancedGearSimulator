<template>
  <div class="home">
    <div class="container row">
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
import Vuex,{ Store } from "vuex";
import { mapState } from "vuex";
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex);

const initalValElement = 10;
"use strict";

interface element {
  [key: string]: any; // Add index signature
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store<any>({
  state: {
    selectedCharacterName: "shigure",
    selectedGearList: [] as any[],
    maxGearNum: 2,
    effectItems: [
      {
        name: "ATTACK",
        formula: "gear.attack * 10 + character.attack",
        value: 0
      },
      {
        name: "DEFEND",
        formula: "gear.defend + character.defend",
        value: 0
      }
    ],
    characters: [
      {
        name: "taihou",
        element: {
          attack: 10,
          defend: 0
        }
      },
      {
        name: "shigure",
        element: {
          attack: 0,
          defend: 10
        }
      }
    ],
    gears: [
      {
        name: "a gun",
        element: {
          attack: 10,
          defend: 0
        }
      },
      {
        name: "a shield",
        element: {
          attack: 0,
          defend: 10
        }
      }
    ],
    elementsName: ["attack", "defend"]
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
      state.effectItems[0].value = obj.attack;
      state.effectItems[1].value = obj.defend;
    },
    removeElement(state, elementName: string) {
      state.elementsName.forEach((element:any, index:number) => {
        if (element == elementName) {
          state.elementsName.splice(index, 1);
        }
      });
    },
    addElement(state, elementName: string) {
      let keyduplicate = 0;
      state.elementsName.forEach((element:any) => {
        if (element == elementName) keyduplicate = 1;
      });
      if (keyduplicate) return;
      state.elementsName.push(elementName);

      state.gears.forEach((gear:any) => {
        for (let [key, value] of Object.entries(gear.element)) {
          if (
            typeof state.elementsName.find((element:any) => {
              return element == key;
            }) !== undefined
          ) {
            Vue.set(gear.element, elementName, 0);
          }
        }
      });

      state.characters.forEach((character:any) => {
        for (let [key, value] of Object.entries(character.element)) {
          if (
            typeof state.elementsName.find((element:any) => {
              return element == key;
            }) !== undefined
          ) {
            Vue.set(character.element, elementName, 0);
          }
        }
      });
    },
    removeEffect(state, effectName: string) {
      state.effectItems.forEach((effect:any, index:number) => {
        if (effect.name == effectName) state.effectItems.splice(index, 1);
      });
    },
    addEffect(state, obj) {
      let keyduplicate = 0;
      state.effectItems.forEach((element:any) => {
        if (element.name == obj.effectName) keyduplicate = 1;
      });
      if (keyduplicate == 1) return;
      state.effectItems.push({
        name: obj.effectName,
        formula: obj.formula,
        value: 0
      });
    },
    updateDateItems(state, effectsList) {
      effectsList.forEach((effect:any, index:number) => {
        let formula: string = effect.formula;

        //calculate values
        // gear
        state.elementsName.forEach((element:any, index:number) => {
          let val: number = 0;
          formula.replace(
            "gear." + element,
            String(state.effectItems[index].value)
          );
        });
        // character
        state.elementsName.forEach((element:any, index:number) => {
          let val: number = 0;
          formula.replace(
            "character." + element,
            String(state.effectItems[index].value)
          );
        });

        state.effectItems.push({
          name: effect.name,
          value: eval(formula),
          formula: effect.formula
        });
      });
    },
    updateEffectValues(state) {
      state.effectItems.forEach((effect:any, index:number) => {
        let formula: string = effect.formula;

        //calculate values
        // gear
        state.elementsName.forEach((element:any, index:number) => {
          let val: number = 0;
          formula.replace(
            "gear." + element,
            String(state.effectItems[index].value)
          );
        });
        // character
        state.elementsName.forEach((element:any, index:number) => {
          let val: number = 0;
          formula.replace(
            "character." + element,
            String(state.effectItems[index].value)
          );
        });

        effect.value = eval(formula);
      });
    }
  },
  getters: {
    effectsNameValue: state => {
      let tmp_effectsNameValue: any[] = [];
      state.effectItems.forEach((effect:any, index:number) => {
        let formula: string = effect.formula;

        //calculate values
        // gear
        // gear.attack = SUM( foreach gear in selectedGearList { gear.attack } )
        // gear.attack = MUL( foreach gear in selectedGearList { gear.attack } )
        //
        state.elementsName.forEach((element:any, index:number) => {
          let val: number = 0;
          state.selectedGearList.forEach((gear:any, index:number) => {
            if (typeof gear.element[element] !== undefined)
              val += gear.element[element];
          });
          formula = formula.replace("gear." + element, String(val));
        });
        // character
        state.elementsName.forEach((element:any, index:number) => {
          let val: number = 0;
          state.characters.forEach((character:any) => {
            if (character.name == state.selectedCharacterName)
              val = character.element[element];
          });
          formula = formula.replace("character." + element, String(val));
        });

        effect.value = eval(formula);
        tmp_effectsNameValue.push({
          name: effect.name,
          value: effect.value,
          formula: effect.formula
        });
      });

      return tmp_effectsNameValue;
    }
  },
  plugins: [vuexLocal.plugin]

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
    effectsNameValue: function(this: Vue) {
      return this.$store.getters.effectsNameValue;
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
    },
    effects: {
      handler(newList, oldList) {}
    }
  },
  methods: {
    calculateData: function(
      selectedGearList: any[],
      selectedCharacterName: any
    ) {
      let attack_new = 0;
      let defend_new = 0;
      selectedGearList.forEach(gear => {
        attack_new += gear.element.attack;
        defend_new += gear.element.defend;
      });
      let selectCharacter = this.$store.state.characters[0];
      this.$store.state.characters.forEach(ch => {
        if (ch.name == selectedCharacterName) {
          selectCharacter = ch;
        }
      });
      attack_new += selectCharacter.element.attack;
      defend_new += selectCharacter.element.defend;
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
