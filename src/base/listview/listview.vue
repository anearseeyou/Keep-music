<template>
    <scroll class="list-wrapper"
            ref="listView"
            :data="data"
            :listenScroll="listenScroll"
            :probeType='probeType'
            @scroll="scroll">
        <ul>
            <li class="list-group" v-for="group in data" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="item in group.items" @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut"
             @touchstart="onShortcutTouchStart"
             @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item,index) in shortcutList"
                    class="item"
                    :class="{'current':currentIndex === index}"
                    :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixedEle">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll';
    import Loading from 'base/loading/loading';
    import {getAttrOrSetAttr} from 'common/js/dom'

    const ANCHOR_HEIGHT = 18;
    const TITLE_HEIGHT = 30;

    export default {
        data(){
            return {
                diff: -1,
                scrollY: -1,
                currentIndex: 0
            }
        },
        created(){
            this.touch = {};
            this.listHeight = [];
            this.listenScroll = true;
            this.probeType = 3;
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
            },
            fixedTitle(){
                if (this.scrollY > 0) {
                    return '';
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        methods: {
            selectItem(item){
                this.$emit('select', item);
            },
            // 点击右边的字母 左边的列表滚动到对应的位置
            onShortcutTouchStart(e){
                let anchorIndex = getAttrOrSetAttr(e.target, 'index');
                this.touch.startY = e.touches[0].pageY;
                this.touch.anchorIndex = anchorIndex;
                this._scrollTo(anchorIndex);
            },
            // 滑动右边的字母 左边的列表滚动到对应的位置
            onShortcutTouchMove(e){
                this.touch.moveY = e.touches[0].pageY;
                let eleNum = (this.touch.moveY - this.touch.startY) / ANCHOR_HEIGHT | 0;
                let anchorIndex = parseInt(this.touch.anchorIndex) + eleNum;
                this._scrollTo(anchorIndex);
            },
            scroll(pos){
                this.scrollY = pos.y;
            },
            // 私有方法放在最下面
            _scrollTo(index){
                this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0);
            },
            // 计算从第一区间到最后一个的所有高度 然后和scrollY的落点 进行比对就会得到当前位置
            _calculateHeight(){
                this.listHeight = [];
                const list = this.$refs.listGroup;
                let height = 0;
                this.listHeight.push(height);
                // 遍历整个区间 得到每一个区间的高度
                for (let i = 0, len = list.length; i < len; i++) {
                    let item = list[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            }
        },
        watch: {
            data(){  // 观测data的变化
                setTimeout(() => {
                    this._calculateHeight();
                }, 20);
            },
            scrollY(newY){  // 这是better-scroll的方法 可以直接拿来用
                const listHeight = this.listHeight;
                // 当滚动到顶部的时候 newY>0
                if (newY > 0) {
                    this.currentIndex = 0;
                    return;
                }
                // 当在中间区域内滚动的时候 length比实际的数量多一个
                for (let i = 0, len = listHeight.length - 1; i < len; i++) {
                    let nextHeight = listHeight[i];
                    let prevHeight = listHeight[i + 1];
                    // 如果在上一个和下一个区间之间 那就说明是当前区间
                    if (-newY >= nextHeight && -newY < prevHeight) {
                        this.currentIndex = i;
                        this.diff = prevHeight + newY;
                        return;
                    }
                }
                // 当滚动到底部的时候 且-newY大于最后一个元素的上限的时候
                this.currentIndex = listHeight.length - 2;
            },
            diff(newVal){  // 固定顶部列表和滚动之间差值
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                if (fixedTop === this.fixedTop) {
                    return
                }
                this.fixedTop = fixedTop;
                this.$refs.fixedEle.style.transform = `translate3D(0, ${fixedTop}px, 0)`
            }
        },
        components: {
            Scroll,
            Loading
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