<template>
    <div class="recommend-wrapper">
        <scroll class="recommend-content" :data="musicList" ref="scroll">
            <!-- 滚动内容 -->
            <div class="scroll-content">
                <div class="slider-wrapper" v-if="sliderList.length">
                    <slider>
                        <div v-for="item in sliderList">
                            <a :href="item.linkUrl">
                                <img class="needsclick" @load="loadImage" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li class="item" v-for="(music,index) in musicList">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="music.picUrl">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="music.songListAuthor"></h2>
                                <p class="desc" v-html="music.songListDesc"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 正在加载 -->
            <div class="loading-container" v-show="!musicList.length"></div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slider from 'base/slider/slider';
    import Scroll from 'base/scroll/scroll';
    import Loading from 'base/loading/loading';
    import {getRecommend} from 'api/recommend';
    import {ERR_OK} from 'api/config';

    export default{
        data(){
            return {
                musicList: [],
                sliderList: []
            }
        },
        created(){
            this._getRecommend();
        },
        methods: {
            _getRecommend(){
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.sliderList = res.data.slider;
                        this.musicList = res.data.songList;
                    }
                })
            },
            loadImage(){
                if (!this.checkLoaded) {
                    this.$refs.scroll.refresh();
                }
                this.checkLoaded = true;
            }
        },
        components: {
            Slider,
            Scroll,
            Loading
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .recommend-wrapper
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            overflow: hidden
            height: 100%
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>