/**
 * ICard component
 * @ authors cx
 * @ date    2018-1-10
 * @ params {
 *    datalist : [    // 显示数据 (必须)
 *      id ,          // 必须
 *      picUrl,       // 必须
 *      playCount,    // 被播放数
 *      nickname,     // 作者名称
 *      desc          // 描述   必须
 *    ] ,
 *    cardclick : fn(item) // 钩子函数
 *    rowcount : 3 ,       // 每行显示几个 ，默认是 3
 *    cellcount : 1 ,      // 显示几行 ，默认是 1
 *    showht : true ,      // 是否显示头部标题
 *    icontype : 'audio'   // 头部标题图标样式 ，仅在showht为true时有效 ，目前支持两种 ：audio , video
 *  }
 */
export { default } from './icardlist.vue';
