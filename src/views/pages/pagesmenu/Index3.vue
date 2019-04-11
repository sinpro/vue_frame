<template>
    <div class="animated fadeIn">
        <!--轮播-->
        <Carousel autoplay :height="300" style="background: #0d5477">
            <Carousel-item style="background: #012f04;color: #fff;">
                <div class="demo-carousel">1</div>
            </Carousel-item>
            <Carousel-item style="background: #0e83cd">
                <div class="demo-carousel">2</div>
            </Carousel-item >
            <Carousel-item style="background: #63c2de">
                <div class="demo-carousel">3</div>
            </Carousel-item>
            <Carousel-item style="background: #520c46">
                <div class="demo-carousel">4</div>
            </Carousel-item>
        </Carousel>


    </div>
</template>

<script>
    export default {
        name: "Index3"
    }
</script>

<style scoped>

</style>
