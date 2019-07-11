<template>
  <div class="home">
    <div class="container row">
      <AttackIndicator/>
      <AttackIndicator/>
      <AttackIndicator/>
      <CharacterSelector/>
      <GearSelector/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import AttackIndicator from '@/components/AttackIndicator.vue'
import CharacterSelector from '@/components/CharacterSelector.vue'
import GearSelector from '@/components/GearSelector.vue'


@Component({
  components: {
    HelloWorld,
    AttackIndicator,
    CharacterSelector,
    GearSelector
  }
})
export default class Home extends Vue {}
</script>
