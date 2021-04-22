/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {
	LAppDelegate
} from './lappdelegate'; //加载定义相关的模型信息例如模型的大小等
import {
	LAppLive2DManager
} from './lapplive2dmanager'; //模型管理类
import * as LAppDefine from './lappdefine'; //基本参数定义

/**
 * ブラウザロード後の処理
 */
// window.onload = (): void => {
// 	// create the application instance
// 	if (LAppDelegate.getInstance().initialize(LAppDefine.CanvasId) == false) {
// 		return;
// 	}
// 	LAppDelegate.getInstance().run();
// };

/**
 * 終了時の処理
 */
// window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

/**
 * Process when changing screen size.
 */
// window.onresize = () => {
// 	if (LAppDefine.CanvasSize === 'auto') {
// 		LAppDelegate.getInstance().onResize();
// 	}
// };

export const win: any = window;
win.Live2d = {
	LAppDefine,
	LAppDelegate,
	LAppLive2DManager
}