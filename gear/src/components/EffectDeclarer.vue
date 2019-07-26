<template>
  <div class="effect-declarer">
    <div class="effect">
      <ul>
        <li v-for="effect in effectItems" v-bind:key="effect.name">
          <label>{{effect.name}}</label>
          <label>{{effect.formula}}</label>
          <a href="#!" class="btn btn-small" v-on:click="removeEffect(effect.name)">remove</a>
        </li>
      </ul>
      <input type="text" name="newEffectName" placeholder="new effect name" v-model="newEffect">
      <input
        type="text"
        name="newEffectFormula"
        placeholder="effect calculating formula"
        v-model="newEffectFormula"
      >
      <a href="#!" class="btn" v-on:click="addEffect(newEffect, newEffectFormula)">Add new effect</a>
    </div>

    <div class="element">
      <ul>
        <li v-for="elementName in elementsName" v-bind:key="elementName">
          <label>element name: {{elementName}}</label>
          <a href="#!" class="btn" v-on:click="removeElement(elementName)">remove</a>
        </li>
      </ul>
      <input type="text" name="newElementName" v-model="newElementName">
      <a href="#!" class="btn btn-small" v-on:click="addElement(newElementName)">Add new element</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "EffectDeclarer",
  data() {
    return {
      newElementName: "",
      newEffect: "",
      newEffectFormula: ""
    };
  },
  computed: {
    elementsName: function(this: Vue) {
      return this.$store.state.elementsName;
    },
    effectItems: function(this: Vue) {
      return this.$store.state.effectItems;
    }
  },
  methods: {
    removeElement: function(elementName: string) {
      this.$store.commit("removeElement", elementName);
    },
    addElement: function(elementName: string) {
      if (elementName == "") return;
      this.$store.commit("addElement", elementName);
    },
    removeEffect: function(effectName: string) {
      this.$store.commit("removeEffect", effectName);
    },
    addEffect: function(effectName: string, effectFormula: string) {
      this.$store.commit({
        type: "addEffect",
        effectName: effectName,
        formula: effectFormula
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.effect-declarer {
  @extend .col;
  @extend .s12;

  .effect {
    label {
      color: rgb(39, 39, 39);
      font-size: 14px;
      display: block;
    }
    li {
      a {
        @extend .red;
      }
    }
  }

  .element {
    label {
      color: rgb(39, 39, 39);
      font-size: 14px;
      display: block;
    }
    li {
      a {
        @extend .red;
      }
    }
  }
}
</style>

