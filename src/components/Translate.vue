<template>
    <div>
        <el-input class="translate-input" placeholder="Input text you want to translate (in English)"
                  v-model="inputText"></el-input>
        <el-button @click="translate" type="success" plain>翻訳</el-button>
        <p v-if="translatedText">
            {{ translatedText }}
        </p>
        <div class="error">{{ error }}</div>
    </div>
</template>
<script>

    window.LOG_LEVEL = 'VERBOSE';
    import { Predictions } from 'aws-amplify';

    export default {
        name: 'Translate',
        data() {
            return {
                inputText: "",
                translatedText: "",
                error: ""
            }
        },
        methods: {
            translate: function () {
                Predictions.convert({
                    translateText: {
                        source: {
                            text: this.inputText,
                        },
                    }
                }).then(result => {
                    this.error = "error dude";
                    this.translatedText = result.text
                }).catch(error => this.error = JSON.stringify(error))
            }
        }
    }
</script>

<style src="../assets/style.css"/>