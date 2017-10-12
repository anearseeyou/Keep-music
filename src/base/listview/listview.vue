<template>
    <scroll class="list-wrapper" :data="data" ref="listView">
        <ul>
            <li class="list-group" v-for="group in data" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="item in group.items">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li class="item" v-for="(item,index) in shortcutList" :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll';
    import {getAttrOrSetAttr} from 'common/js/dom'

    const ANCHOR_HEIGHT = 18;

    export default {
        created(){
            this.touch = {}
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
            shortcutList(){
                return this.data.map((group) => {
                    return group.title.substr(0, 1);
                });
            }
        },
        methods: {
            // 点击右边的字母 左边的列表滚动到对应的位置
            onShortcutTouchStart(e){
                let currentIndex = getAttrOrSetAttr(e.target, 'index');
                this.touch.startY = e.touches[0].pageY;
                this.touch.currentIndex = currentIndex;
                this._scrollTo(currentIndex);
            },
            // 滑动右边的字母 左边的列表滚动到对应的位置
            onShortcutTouchMove(e){
                this.touch.moveY = e.touches[0].pageY;
                let eleNum = (this.touch.moveY - this.touch.startY) / ANCHOR_HEIGHT | 0;
                let currentIndex = parseInt(this.touch.currentIndex) + eleNum;
                this._scrollTo(currentIndex);
            },
            _scrollTo(index){
                this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0);
            }
        },
        components: {
            Scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .list-wrapper
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>