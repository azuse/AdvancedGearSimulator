<template>
    <div class="effect-declarer">
        <ul>
            <li>
                <label for="">effectName</label>
                <label for="">calculate formula</label>
            </li>
        </ul>
        <input type="text" name="newEffectName" placeholder="new effect name" id="">
        <input type="text" name="newEffectFormula" placeholder="effect calculating formula" id="">
        <a href="#!" class="btn">Add new effect</a>
    </div>
    
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:"EffectDeclarer"


})
</script>
