/**
 * 3.定义修改操作(方法)
 */
import * as types from './mutation-types';

const mutations = {
    [types.SET_SINGER](state, singer){
        state.singer = singer;
    }
}

export default mutations;