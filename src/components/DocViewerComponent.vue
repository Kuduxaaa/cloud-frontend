<template>
    <div class="doc-viewer" v-if="embeddedUrl !== null">
        <iframe :src="embeddedUrl" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: 'DocViewerComponent',

    props: {
        url: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            embeddedUrl: null,
        }
    },

    mounted() {
        this.embeddedUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(this.url)}&embedded=true`;
    }
}
</script>

<style scoped>
.doc-viewer {
    width: 100%;
    height: 230px;
    border: none;
    background-color: #f5f5f5;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

iframe {
    width: 100%;
    height: 100%;
    border: none;
}
</style>
