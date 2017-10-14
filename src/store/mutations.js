/**
 * 3.定义修改操作(方法)
 */
import * as types from './mutation-types';

const mutations = {
    [types.SET_SINGER](state, singer){
        state.singer = singer;
    },
    [types.SET_PLAYING_STATE](state, flag){
        state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state, flag){
        state.fullScreen = flag;
    },
    [types.SET_PLAYLIST](state, list){
        state.playList = list;
    },
    [types.SET_SQUENCE_LIST](state, list){
        state.squenceList = list;
    },
    [types.SET_PLAY_MODE](state, mode){
        state.mode = mode;
    },
    [types.SET_CURRENT_INDEX](state, index){
        state.currentIndex = index;
    }
}

export default mutations;