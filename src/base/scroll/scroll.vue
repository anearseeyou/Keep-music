<template>
    <div ref="scrollWrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';

    export default{
        data(){
            return {}
        },
        props: {
            // 快速拖动或者缓慢拖动
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            }
        },
        mounted(){
            setTimeout(() => {
                this._initScroll();
            }, 20);
        },
        methods: {
            _initScroll(){
                if (!this.$refs.scrollWrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.scrollWrapper, {
                    probeType: this.probeType,
                    click: this.click
                });
            },
            // 代理方法
            enable(){
                this.scroll && this.scroll.enable();
            },
            disable(){
                this.scroll && this.scroll.disable();
            },
            refresh(){
                this.scroll && this.scroll.refresh();
            }
        },
        watch: {
            data(){
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
        }
    }
</script>

