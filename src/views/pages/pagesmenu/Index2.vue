<template>
    <div class="animated fadeIn">
        <!--上传文件-->
        <Upload
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
            </div>
        </Upload>
        <!---->

    </div>
</template>

<script>
    export default {
        name: "Index2"
    }
</script>

<style scoped>

</style>
