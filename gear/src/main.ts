import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Vuex from "vuex"
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import AttackIndicator from '@/components/AttackIndicator.vue'
import CharacterSelector from '@/components/CharacterSelector.vue'
import GearSelector from '@/components/GearSelector.vue'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    selectedCharacterName: "shigure",
    selectedGearList : []
  },
  mutations:{
    selectCharacter: (state, character) => state.selectedCharacterName = character
  }
})

const app = new Vue({
  router,
  render: h => h(App),
  store,
  components:{
    HelloWorld,
    AttackIndicator,
    CharacterSelector,
    GearSelector
  }
}).$mount('#app')

// const AttackIndicator = {
//   computed:{
//     selectedCharacterName(){
//       return this.$store.state.selectedCharacterName
//     }
//   }
// }