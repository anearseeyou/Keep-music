<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from 'components/music-list/music-list';
    import {mapGetters} from 'vuex';
    import {getSingerDetail} from 'api/singer';
    import {ERR_OK} from 'api/config';
    import {createSong} from 'common/js/song';

    export default{
        data(){
            return {
                songs: []
            }
        },
        created(){
            this._getDetail();
        },
        computed: {
            title(){
                return this.singer.name;
            },
            bgImage(){
                return this.singer.avatar;
            },
            ...mapGetters([
                'singer'
            ])
        },
        methods: {
            _getDetail(){
                if (!this.singer.id) {
                    this.$router.push('/singer');
                    return;
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if (res.code === ERR_OK) {
                        this.songs = this._normalizeSongs(res.data.list);
                        // console.log(this.songs);
                    }
                })
            },
            // 规范歌曲列表数据 --> 也就是规范成我们期望的数据结构
            _normalizeSongs(list){
                let ret = [];
                list.forEach((item) => {
                    let {musicData} = item;
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData));
                    }
                })
                return ret;
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable";

    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>