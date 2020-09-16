<template>
    <div>
        <div class="title">
            <h2>Amplifyで作るAIアプリ</h2>
        </div>
        <div class="main-contents">
            <el-tabs v-model="activeName">
                <el-tab-pane label="step1. 翻訳" name="first">
                    <Translate/>
                </el-tab-pane>
                <el-tab-pane label="step2. 画像の物体検知" name="second">
                    <ObjectDetection/>
                </el-tab-pane>
                <el-tab-pane label="step3. 画像のテキスト検知" name="third"></el-tab-pane>
                <el-tab-pane label="step4. テキスト分析" name="fourth"></el-tab-pane>
                <el-tab-pane label="step5. テキスト読み上げ" name="fifth"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Translate from "./components/Translate";
    import ObjectDetection from "./components/ObjectDetection";

    window.LOG_LEVEL = 'VERBOSE';
    export default {
        name: 'app',
        data() {
            return {
                activeName: 'first'
            }
        },
        components: {
            ObjectDetection,
            Translate
        }
    };
</script>

<style src="./assets/style.css"/>