"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPluginOptionsDynamically = void 0;
const setPluginOptionsDynamically = (actions, store, pluginName, options) => {
    const state = store.getState();
    const { setPluginStatus } = actions;
    const plugin = state.flattenedPlugins.find((item) => item.name === pluginName);
    if (plugin) {
        plugin.pluginOptions = {
            ...plugin.pluginOptions,
            ...options,
        };
        setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin);
    }
};
exports.setPluginOptionsDynamically = setPluginOptionsDynamically;
