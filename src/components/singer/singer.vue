<template>
    <div class="singer-wrapper">
        哈哈哈哈哈
    </div>

</template>

<script type="text/ecmascript-6">
    import Singer from 'common/js/singer';
    import {getSingerList} from 'api/singer';
    import {ERR_OK} from 'api/config';

    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;

    export default {
        data(){
            return {
                singers: []
            }
        },
        created(){
            this._getSingerList();
        },
        methods: {
            _getSingerList() {  // 获取歌手数据
                getSingerList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.singers = res.data.list;
                        console.log(this._normalizeSinger(this.singers));
                    }
                });
            },
            _normalizeSinger(list){  // 规范歌手数据
                let map = {  // 创建对象
                    hot: {
                        title: HOT_NAME,
                        items: []  // 内层数组
                    }
                }
                list.forEach((item, index) => {  // 遍历list
                    if (index < HOT_SINGER_LEN) {  // 默认10条
                        map.hot.items.push(new Singer({  // 热门数据填充items
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name
                        }));
                    }
                    const key = item.Findex;  // Findex歌手首字母
                    if (!map[key]) {  // 如果没有以这个key为聚合的对象的话 那就创建一个
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({  // 给map[key].items填充数据
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name
                        }
                    ));
                });
                // 因为遍历对象得到的结果是无序的 为了得到有序列表 我们要处理给map排序

            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer-wrapper
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>