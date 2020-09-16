<template>
    <div>
        <input type="file" @change="identifyFromFile"/><br/>
        <img width="150px" v-show="uploadedImage" :src="uploadedImage"/>
        <el-table v-if="labels.length" :data="labels">
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="metadata.confidence" label="Confidence[%]">
            </el-table-column>
        </el-table>
        <div class="error">{{ error }}</div>
    </div>
</template>
<script>
    import {Predictions} from 'aws-amplify';

    window.LOG_LEVEL = 'VERBOSE';
    export default {
        name: 'ObjectDetection',
        data() {
            return {
                uploadedImage: '',
                error: '',
                labels: []
            };
        },
        methods: {
            identifyFromFile: function (e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files) {
                    return;
                }
                this.createImage(files[0]);
                Predictions.identify({
                    labels: {
                        source: {
                            file: files[0]
                        },
                        type: 'ALL'
                    }
                })
                    .then(result => (this.labels = result.labels))
                    .catch(error => (this.error = JSON.stringify(error)));
            },
            createImage(file) {
                let reader = new FileReader();
                reader.onload = e => {
                    this.uploadedImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    };
</script>