<template>
    <div class="slider-wrapper" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :class="{ active:currentPageIndex === index }">
            </span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import {addClass} from 'common/js/dom';

    export default {
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 2000
            }
        },
        mounted() {
            // 先渲染dom 再初始化组件 页面默认是17ms刷新 所以设置20ms之后再初始化组件
            setTimeout(() => {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();
            }, 20);

            // 自动轮播
            if (this.autoPlay) {
                this._play();
            }

            // 监听视口发生改变
            window.addEventListener('resize', () => {
                if (!this.slider) return;
                this._setSliderWidth(true);
                this.slider.refresh();
            });
        },
        methods: {
            // 设置宽度
            _setSliderWidth(isResize) {
                // 获取轮播项
                this.children = this.$refs.sliderGroup.children;

                let containerWidth = 0;
                // 获取容器宽度
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let i = 0, len = this.children.length; i < len; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item');

                    child.style.width = sliderWidth + 'px';
                    containerWidth += sliderWidth;
                }
                if (this.loop && !isResize) {
                    containerWidth += 2 * sliderWidth;
                }
                this.$refs.sliderGroup.style.width = containerWidth + 'px';
            },
            // 初始化小圆点
            _initDots(){
                // 在拷贝图片之前 初始化小圆点 和图片的数量保持一致
                this.dots = new Array(this.children.length);
            },
            // 初始化better-scroll组件
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {
                        speed: 400,
                        threshold: 0.3,
                        loop: this.loop,
                    },
                });

                // 监听滚动结束 设置索引
                this.slider.on('scrollEnd', () => {
                    // bette-scroll中获取当前元素索引的方法
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    // 如果是循环播放的话 当前索引得-1
                    if (this.loop) pageIndex -= 1;
                    this.currentPageIndex = pageIndex;

                    if (this.autoPlay) {
                        clearTimeout(this.timer);
                        this._play();
                    }
                });
            },
            // 自动轮播
            _play(){
                let pageIndex = this.currentPageIndex + 1;
                if (this.loop) pageIndex += 1;
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400);
                }, this.interval);
            }
        },
        destroyed(){
            clearTimeout(this.timer);
        }
    }

</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .slider-wrapper
        min-height: 1px
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>